// Importing the student model
const Student = require('../models/students');

// 5. Get list of students with optional filtering(class, section)
/*
    GET request on "localhost:3000/students"
    example body:
    {
        "class": 9,
        "section": "A"
    }
*/
exports.getStudents = async (req, res) => {
    try{
        const students = await Student.find(req.body);
        res.status(200).json(students);
    }catch(err){
        res.send("[ERROR] " + err);
    }
};

// 2. Create a new Sttudent object and add to the DataBase
/*
    POST request on "localhost:3000/students"
    example body:
    {
        "name": "Ravi",
        "email": "Ravi@email.com",
        "class": 8,
        "section": "B",
    }
*/
exports.createStudent = async (req, res) => {
    // Class can be 8 or 9
    if(req.body.class != 8 && req.body.class != 9){
        res.status(400).send("[ERROR] student must belong to class 8 or 9.");
    }
    // Section can be A, B, C
    if(req.body.section != "A" && req.body.section != "B" && req.body.section != "C"){
        res.status(400).send("[ERROR] student must belong to section A, B or C.");
    }
    const newStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        class: req.body.class,
        section: req.body.section
    });
    try{
        const entry = await newStudent.save();
        res.status(201).json(entry);
    }catch(err){
        res.send("[ERROR] " + err);
    }
};

// 3. Assign a Teacher to a student by respective teacher and student IDs
/*
    PATCH request on "localhost:3000/students/6264020543dd13442f7878f7"
    example body:
    {
        "teacherId": "6264042243dd13442f787903";
    }
*/
exports.assignTeacherToStudent = async (req, res) => {
    try{
        const student = await Student.findById(req.params.id);
        await Student.updateOne({_id: req.params.id}, {"assignedTeacher" : req.body.teacherId});
        res.status(200).send("Update Successful!");        
    }catch(err){
        res.send("[ERROR] " + err);
    }
};

// 6. Students can edit their profiles(editStudent)
/*
    PUT request on "localhost:3000/students/6264020543dd13442f7878f7"
    example body:
    {
        "email": "Ravi123@email.com",
        "section": "C",
    }
*/
exports.editStudent = async (req, res) => {
    try{
        await Student.updateOne({_id: req.params.id}, req.body);
        res.status(203).send("Update Successful!");             
    }catch(err){
        res.send("[ERROR] " + err);
    }
};