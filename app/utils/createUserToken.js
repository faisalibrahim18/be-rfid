const createTokenUser = (user) => {
    return {
        name: user.name,
        username: user.username,
        userId: user._id,
        role: user.role,
        is_login: user.is_login
    }
}

module.exports = createTokenUser;