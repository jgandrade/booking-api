const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const Course = require('../models/Course');

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

// Enroll a Course

module.exports.enrollCourse = async (req, res) => {
    const userData = auth.decode(req.headers.authorization);
    let courseName = await Course.findById(req.body.courseId).then(result => result.courseName);

    let data = {
        userId: userData.id,
        email: userData.email,
        courseId: req.body.courseId,
        courseName: courseName
    }

    let isUserUpdated = await User.findById(data.userId).then(user => {
        user.enrollments.push({
            courseId: data.courseId,
            courseName: data.courseName
        })

        return user.save().then(result => { console.log(result); return true }).catch(err => { console.log(err); return false });
    });

    let isCourseUpdated = await Course.findById(data.courseId).then(course => {
        course.courseEnrollees.push({
            userId: data.userId,
            email: data.email
        })
        course.slots--;
        return course.save().then(result => { console.log(result); return true }).catch(err => { console.log(err); return false });
    });

    (isCourseUpdated && isUserUpdated) ? res.send(true) : res.send(false)
}