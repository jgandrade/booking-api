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

module.exports.getAllCourse = (req, res) => {
    let data = auth.decode(req.headers.authorization);
    if (data.isAdmin) {
        Course.find({})
            .then(result => {
                res.send(result);
            }).catch(err => res.send("No courses found!"));
    } else {
        return res.send("Not allowed");
    }
}

module.exports.getAllActiveCourse = (req, res) => {
    Course.find({ isCourseActive: true })
        .then(result => {
            if (result) return res.send(result);

        }).catch(err => res.send("No courses found!"));
}

module.exports.getSpecificCourse = (req, res) => {
    Course.findById({ _id: req.params.id })
        .then(result => {
            return res.send(result);
        }).catch(err => res.send("No such id like that!"));
}

module.exports.updateCourse = (req, res) => {

    let data = auth.decode(req.headers.authorization);
    if (data.isAdmin) {
        let updateCourse = {
            courseName: req.body.courseName,
            courseDescription: req.body.courseDescription,
            coursePrice: req.body.coursePrice,
            courseSlots: req.body.courseSlots
        }
        return Course.findByIdAndUpdate(req.params.id, updateCourse, { new: true })
            .then(result => {
                return res.send(result);
            }).catch(err => res.send("No such id like that!"));
    } else {
        return res.send("Not allowed");
    }

}

module.exports.archiveCourse = (req, res) => {
    let data = auth.decode(req.headers.authorization);
    if (data) {
        let updateIsActiveField = {
            isCourseActive: req.body.isCourseActive
        }
        Course.findByIdAndUpdate(req.params.id, updateIsActiveField)
            .then(result => {
                return res.send(result);
            }).catch(err => res.send("No such id like that!"));

    } else {
        return res.send("Your token is not authorized.")
    }
}

