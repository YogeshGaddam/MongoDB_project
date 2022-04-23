const mongoose = require("mongoose");

// Teacher Schema
const teacherSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);