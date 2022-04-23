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
    if(err){
        console.log(err);
        return;
    }
    console.log('Database connection successful!!');
});

function Read_JSON(fileName){
    return JSON.parse(fs.readFileSync(fileName));
}

async function assignTeacherToStudent(studentId, teacherId){
    await Student.updateOne({_id: studentId}, {"assignedTeacher" : teacherId});
}

async function assignStudents(){
    const students = await Student.find();
    var StudentIds = Array();
    for(let student of students){
        StudentIds.push(student._id);
    }
    const teachers = await Teacher.find();
    var TeacherIds = Array();
    for(let teacher of teachers){
        TeacherIds.push(teacher._id);
    }
    for(let studentId of StudentIds){
        assignTeacherToStudent(studentId, TeacherIds[Math.floor(Math.random()*TeacherIds.length)]);
    }
}

function InsertIntoDB(){
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
    if(err){
        console.log(err);
        return;
    }
    console.log(`connection live on port ${port}!!`);
});

// Insert Data from local json file into the database
// Run the below command only once by removing the comment

//InsertIntoDB();



// Student Data hosted on the server
/*
[
    {
        "_id": "6263f0e5801c8490b92c203e",
        "name": "Hari",
        "email": "Hari@email.com",
        "class": 9,
        "section": "A",
        "__v": 0,
        "assignedTeacher": "626402f443dd13442f7878fb"
    },
    {
        "_id": "6263f0fa801c8490b92c2040",
        "name": "Raju",
        "email": "Raju@email.com",
        "class": 8,
        "section": "B",
        "__v": 0,
        "assignedTeacher": "6264031a43dd13442f7878fd"
    },
    {
        "_id": "6263f4bb8da2d11d07048157",
        "name": "Ramesh",
        "email": "Ramesh@email.com",
        "class": 8,
        "section": "A",
        "__v": 0,
        "assignedTeacher": "626402f443dd13442f7878fb"
    },
    {
        "_id": "6264013043dd13442f7878ed",
        "name": "Suresh",
        "email": "Suresh@email.com",
        "class": 9,
        "section": "C",
        "__v": 0,
        "assignedTeacher": "6264032c43dd13442f7878ff"
    },
    {
        "_id": "6264014143dd13442f7878ef",
        "name": "Robin",
        "email": "Robin@email.com",
        "class": 8,
        "section": "A",
        "__v": 0,
        "assignedTeacher": "626402f443dd13442f7878fb"
    },
    {
        "_id": "6264015143dd13442f7878f1",
        "name": "Alice",
        "email": "Alice@email.com",
        "class": 9,
        "section": "C",
        "__v": 0,
        "assignedTeacher": "6264037143dd13442f787901"
    },
    {
        "_id": "6264016243dd13442f7878f3",
        "name": "Bob",
        "email": "Bob@email.com",
        "class": 8,
        "section": "C",
        "__v": 0,
        "assignedTeacher": "6264031a43dd13442f7878fd"
    },
    {
        "_id": "6264019943dd13442f7878f5",
        "name": "Jonas",
        "email": "Jonas@email.com",
        "class": 9,
        "section": "B",
        "__v": 0,
        "assignedTeacher": "6264037143dd13442f787901"
    },
    {
        "_id": "6264020543dd13442f7878f7",
        "name": "Desmond",
        "email": "Desmond@email.com",
        "class": 9,
        "section": "A",
        "__v": 0,
        "assignedTeacher": "6264042243dd13442f787903"
    },
    {
        "_id": "6264026343dd13442f7878f9",
        "name": "Kiran",
        "email": "Kiran@email.com",
        "class": 8,
        "section": "B",
        "__v": 0,
        "assignedTeacher": "6264042243dd13442f787903"
    }
]
*/
////////////////////////////////////////////////////////////////

// Teacher Data hosted on the server
/*
[
    {
        "_id": "626402f443dd13442f7878fb",
        "name": "Martha",
        "email": "Martha@email.com",
        "subject": "English",
        "__v": 0
    },
    {
        "_id": "6264031a43dd13442f7878fd",
        "name": "Sunil",
        "email": "Sunil@email.com",
        "subject": "Mathematics",
        "__v": 0
    },
    {
        "_id": "6264032c43dd13442f7878ff",
        "name": "Radha",
        "email": "Radha@email.com",
        "subject": "Physics",
        "__v": 0
    },
    {
        "_id": "6264037143dd13442f787901",
        "name": "Shiva",
        "email": "Shiva@email.com",
        "subject": "Economics",
        "__v": 0
    },
    {
        "_id": "6264042243dd13442f787903",
        "name": "Sunitha",
        "email": "Sunitha@email.com",
        "subject": "Chemistry",
        "__v": 0
    }
]
*/