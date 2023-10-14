const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  teacherID: {
    type: String,
    required: true,
  },
  
  lectureDesc:{
    type: String,
    required: true,

  },
  lectureName: {
    type: String,
    required: true,
  },
  fileURL: {
    type: String,
    required: true,
  },
  remarks:{
    type: String,
    default:""
  }

});

const Lecture = mongoose.model('LecturesTeachers', lectureSchema);

module.exports = Lecture;