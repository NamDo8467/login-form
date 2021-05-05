const express = require('express')
const fs = require('fs')
const path = require('path')
const {getUsername, getPassword} = require('./user')
const app = express()

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/login.html'))
})
app.get('/user', (req, res) => {
    const data = fs.readFileSync('./data.json', 'utf-8')
    const usernameArray = getUsername(data)
    const passwordArray = getPassword(data)
    
    const username = req.query.username
    const password = req.query.password

    if (usernameArray.includes(username) && passwordArray.includes(password)) {
        res.end("<h1>Welcome to the page</h1>")
    } else {
        res.end("Incorrect username or password")
    }
    
})

app.post('/register', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (error, data) => {
        if (error) {
            res.end(error.message)
            return
        }
       
        
        const obj = JSON.parse(data)
        obj.users.push({
            'user name': req.body.username,
            'password': req.body.password,
            'email':req.body.email
        })

        fs.writeFile('./data.json', JSON.stringify(obj,null,2), (err) => {
            if (err) {
                res.end(err.message);
                return
            } 
        })
    })
    res.sendFile(path.resolve(__dirname, 'public/register.html'))
    
    
    
})


app.get('*', (req, res) => {
    res.status(404).end("Resource not found")
    
})
app.listen(5500)