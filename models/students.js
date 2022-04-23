const mongoose = require("mongoose");

// Student Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    class: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    assignedTeacher: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Student', studentSchema);