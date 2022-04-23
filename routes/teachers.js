const router = require('express').Router();
const teacherController = require('../controllers/teachers');

router
    .route('/')
    .get(teacherController.getTeachers)
    .post(teacherController.createTeacher);

router
    .get('/:teacherId', teacherController.getAssignedStudentsToTeacher);

module.exports = router;

