const Course = require('../models/Course');
const auth = require('../auth');

module.exports.addCourse = (req, res) => {
    let data = auth.decode(req.headers.authorization);
    if (data.isAdmin) {
        let newCourse = new Course({
            courseName: req.body.courseName,
            courseDescription: req.body.courseDescription,
            coursePrice: req.body.coursePrice,
            courseSlots: req.body.courseSlots
        })

        return newCourse.save()
            .then(result => res.send("Successfully Saved"))
            .catch(err => res.send(err.message));
    } else {
        res.send({ message: "You are not authorize to add a course" });
    }
}