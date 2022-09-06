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

module.exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== undefined) {
        let checkHeader = authHeader.split(" ")[1];
        return jwt.verify(checkHeader, secret, (err, data) => {
            if (err) return res.send({ auth: "Invalid token" })
            else next();
        })
    } else {
        res.send({ message: "Auth failed! No token provided" });
    }
}

module.exports.decode = token => {
    if (token !== undefined) {
        let jwtToken = token.split(" ")[1];
        return jwt.verify(jwtToken, secret, (err, data) => {
            let object = jwt.decode(jwtToken, { complete: true }).payload;
            console.log("payload: " + object);
            if (err) return null;
            else return jwt.decode(jwtToken, { complete: true }).payload;
        })
    } else {
        return null
    }
}