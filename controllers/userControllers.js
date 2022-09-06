const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth');

module.exports.getProfile = (req, res) => {
    const userData = auth.decode(req.headers.authorization);
    
    return User.findById(userData.id)
        .then(result => {
            result.password = "***";
            res.send(result);
        }).catch(err => res.send("Id not found!"));
}
// module.exports.getProfile = (req, res) => {
//     User.find({ _id: req.params.id })
//         .then(result => {
//             let copyOfResult = [...result];
//             copyOfResult[0].password = "*****";
//             return res.send(copyOfResult);
//         }).catch(err => res.send("Id not found!"));
// }

module.exports.register = (req, res) => {
    User.find({ email: req.body.email })
        .then(result => {
            if (result.length == 0) {
                let newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    mobileNumber: req.body.mobileNumber
                })

                newUser.save()
                    .then(userSaved => res.send({ message: "User has been registered" }))
                    .catch(err => res.send({ message: err.message }));

            } else {
                return res.send({ message: 'Duplicate Found. Please use another email.' });
            }
        })
}

module.exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((result) => {
            if (result) {
                console.log(result);
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
                if (isPasswordCorrect) {
                    return res.send({ token: auth.createWebToken(result) });
                } else {
                    return res.send({ error: "Password is incorrect" });
                }
            } else {
                return res.send("Email is not found");
            }
        }).catch(err => res.send(err));
}