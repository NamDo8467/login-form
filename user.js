const getUsername = (data) => {
    const object = JSON.parse(data)
    const usernameArray = object.users.map(user => {
        return user.username
    })
    return usernameArray
    
}

const getPassword = (data) => {
    const object = JSON.parse(data)
    const passwordArray = object.users.map(user => {
        return user.password
    })
    return passwordArray
    
}

exports.getUsername = getUsername
exports.getPassword = getPassword

