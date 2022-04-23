const router = require('express').Router();
const studentController = require('../controllers/students');

router
    .route('/')
    .get(studentController.getStudents)
    .post(studentController.createStudent);
    
router
    .route('/:id')
    .patch(studentController.assignTeacherToStudent)
    .put(studentController.editStudent);


module.exports = router;

