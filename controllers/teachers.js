// Importing the teacher and student models
const Teacher = require('../models/teachers');
const Student = require('../models/students');

// 4. Get list of teachers with optional filtering(subject in this case)
/*
    GET request on "localhost:3000/teachers"
    example body:
    {
        "subject": "Mathematics"
    }
*/
exports.getTeachers = async (req, res) => {
    try{
        const teachers = await Teacher.find(req.body);
        res.status(200).json(teachers);
    }catch(err){
        res.send("[ERROR] " + err);
    }
};

// 1. Create a new Teacher object and add to the DataBase
/*
    POST request on "localhost:3000/teachers"
    example body:
    {
        "name": "Arjun",
        "email": "Arjun@email.com",
        "subject": "Geography"
    }
*/
exports.createTeacher = async (req, res) => {
    const newTeacher = new Teacher({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject
    });
    try{
        const entry = await newTeacher.save();
        res.status(201).json(entry);
    }catch(err){
        res.send("[ERROR] " + err);
    }
};

// 7. Get list of students assigned to a teacher(id)
/*
    GET request on "localhost:3000/teachers/6264031a43dd13442f7878fd"
*/
exports.getAssignedStudentsToTeacher = async (req, res) => {
    try{
        const students = await Student.find({assignedTeacher: req.params.teacherId});
        res.status(200).json(students);
    }catch(err){
        res.send("[ERROR] " + err);
    }
};