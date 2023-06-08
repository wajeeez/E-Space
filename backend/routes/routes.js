const express =require('express')
const TeacherAuthController=require('../controllers/TeacherAuthController')
const TeacherCreateClass = require('../controllers/TeacherCreateClass')
const router = express.Router()
const auth = require('../middleware/auth');

const StudentAuth = require ('../controllers/Student')

router.get('/test',(req,res)=>res.json({msg:"Working Alright"}))

router.post('/teacher/register',TeacherAuthController.register)

router.post('/teacher/login',TeacherAuthController.login)

router.post('/teacher/createclass',TeacherCreateClass.createclass)

router.post('/teacher/logout',auth,TeacherAuthController.logout)

router.get('/teacher/classes/:teacherId',TeacherCreateClass.fetchclass)
router.get('/teacher/class/:_id',TeacherCreateClass.fetchsingleclass)


//student
router.post('/student/login',StudentAuth.studentlogin)
router.get('/student/classes/:stdId',StudentAuth.fetchclasses)
router.get('/student/class/:_id',StudentAuth.fetchsingleclass)

module.exports=router;