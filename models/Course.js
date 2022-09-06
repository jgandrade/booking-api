const mongoose = require('mongoose');

let CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, "Course Name is required"]
    },
    courseDescription: {
        type: String,
        required: [true, "Course Description is required"]
    },
    coursePrice: {
        type: Number,
        required: [true, "Price is required"]
    },
    courseSlots: {
        type: Number,
        required: [true, "Slots is required"]
    },
    isCourseActive: {
        type: Boolean,
        default: true
    },
    courseCreateOn: {
        type: Date,
        default: new Date()
    },
    courseEnrollees: [
        {
            userId: {
                type: String,
                required: [true, "Course Id is required"]
            },
            email: {
                type: String,
                required: [true, "Course Id is required"]
            },
            isPaid: {
                type: Boolean,
                default: true
            },
            dateEnrolled: {
                type: Date,
                default: new Date()
            }
        }
    ]
});

const Course = mongoose.model("course", CourseSchema);
module.exports = Course;
