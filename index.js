const express = require('express');
const mongoose = require('mongoose');
const teacherRouter = require('./routes/teachers');
const studentRouter = require('./routes/students');
const fs = require('fs');
const studentData = './data/students.json';
const teacherData = './data/teachers.json';
const Student = require('./models/students');
const Teacher = require('./models/teachers');

//database hosted on Atlas
const url = 'mongodb+srv://admin:admin@cluster0.w5ccy.mongodb.net/TeacherStudentDB?retryWrites=true&w=majority';
mongoose.connect(url); //connecting to the database
const connection = mongoose.connection; //creating an instance of the connection

connection.on('open', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Database connection successful!!');
});

// Read local data from json files
function Read_JSON(fileName) {
    return JSON.parse(fs.readFileSync(fileName));
}

// Update the Student collection in database after teacher assignment
async function assignTeacherToStudent(studentId, teacherId) {
    await Student.updateOne({ _id: studentId }, { "assignedTeacher": teacherId });
}

// Fucntion to randomly assign a teacher to all the students
async function assignStudents() {
    const students = await Student.find();
    var StudentIds = Array();
    for (let student of students) {
        StudentIds.push(student._id);
    }
    const teachers = await Teacher.find();
    var TeacherIds = Array();
    for (let teacher of teachers) {
        TeacherIds.push(teacher._id);
    }
    for (let studentId of StudentIds) {
        assignTeacherToStudent(studentId, TeacherIds[Math.floor(Math.random() * TeacherIds.length)]);
    }
}

// Function to insert local data into database
// This can be done by using the POST request on postman as well
function InsertIntoDB() {
    Teacher.collection.drop();
    Student.collection.drop();
    var data = Read_JSON(teacherData);
    Teacher.collection.insertMany(data);
    data = Read_JSON(studentData);
    Student.collection.insertMany(data);
    assignStudents();
    console.log("Initial Insertion Complete");
}

const app = express();
//using middlewares
app.use(express.json());
app.use('/teachers', teacherRouter);
app.use('/students', studentRouter);

//listening on port 3000
const port = 3000 || process.env.PORT
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`connection live on port ${port}!!`);
});

// Insert Data from local json file into the database
// Run the below command only once by removing the comment

//InsertIntoDB();
