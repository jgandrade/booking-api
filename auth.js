const jwt = require('jsonwebtoken');
const secret = 'testbookingapi';

module.exports.createWebToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }

    return jwt.sign(data, secret, {});
}