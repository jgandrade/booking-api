const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    mobileNumber: {
        type: String,
        required: [true, "Mobile Number is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createOn: {
        type: Date,
        default: new Date()
    },
    enrollments: [
        {
            courseId: {
                type: String,
                required: [true, "Course Id is required"]
            },
            courseName: {
                type: String,
                required: [true, "Course name is required"]
            },
            enrolledOn: {
                type: Date,
                default: new Date()
            },
            status: {
                type: String,
                default: "Enrolled"
            },
            isPaid: {
                type: Boolean,
                default: true
            }
        }
    ]
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
