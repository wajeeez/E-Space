const Joi = require("joi");
const CreateClassDto = require("../dto/createclassDto");
const classmodel = require("../models/classes");

const mongoose = require('mongoose');
const TeacherCreateClass = {

  async createclass(req, res, next) {


    const createclass = Joi.object({
      teacherName: Joi.string().required(),
      teacherID: Joi.string().required(),
      teacherEmail: Joi.string().email().required(),
      subjectName: Joi.string().required(),
      students: Joi.array().items(Joi.string()).required(),
    });

    const { error } = createclass.validate(req.body);

    
    if (error) {
      return next(error);
    }

    const {teacherName,teacherID,teacherEmail,subjectName,students}=req.body;


    const Create_Class = new classmodel({
        teacherName,
        teacherID,
        teacherEmail,
        subjectName,
        students    
    });

    let classes = await Create_Class.save();

    const createclassDto = new CreateClassDto(classes);
    return res.status(201).json({ createclassDto });
  },



  async fetchclass(req,res,next){

    const teacherId = req.params.teacherId;

    // Find classes matching the teacherId
    console.log(teacherId)
    // const teachId = ObjectID(teacherId);
    const teacherID = new mongoose.Types.ObjectId(teacherId);
    const response = await classmodel.find({teacherID:teacherID})

    if(!response){
      res.status(500).json({ error: 'Error fetching classes' });
    }else{
      console.log(response)
      res.json({response});
    }

 

  },

  async fetchsingleclass(req,res,next){

    const classId = req.params._id;

  
    console.log(classId)
  

    const response = await classmodel.findOne({_id:classId})

    if(!response){
      res.status(500).json({ error: 'Error fetching classes' });
    }else{
    
      res.json({response});
    }
  }


};

module.exports = TeacherCreateClass;
