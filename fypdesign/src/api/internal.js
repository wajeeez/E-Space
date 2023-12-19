import axios from 'axios'

// const api = axios.create({

//     baseURL:process.env.React_App_INTERNAL_API_PATH,
//     // withCredentials:true,
//     // headers:{
//     //     "Content-Type":"application/json"
//     // }
// });
const baseURL = process.env.React_App_INTERNAL_API_PATH;
console.log(baseURL)
export const login = async (data) => {
  let response;
  try {
    response = await axios.post(baseURL + '/teacher/login', data)

  }
  catch (error) {
    console.log(error)
    return error;
  }

  return response;
}

export const Reg = async (data) => {
  let response;

  try {
    response = await axios.post(baseURL + '/teacher/register', data);
  } catch (error) {
    return error;
  }

  return response;
};

export const Logout = async () => {
  let response;

  try {
    response = await axios.post(baseURL + '/teacher/logout');
  } catch (error) {
    return error;
  }

  return response;
};


export const createclass = async (data) => {
  let response;

  try {
    response = await axios.post(baseURL + '/teacher/createclass', data);
  } catch (error) {
    return error;
  }

  return response;
};






//Student
export const stdLogin = async (data) => {

  let response;
  try {
    response = await axios.post(baseURL+ '/student/login', data )
  }
  catch (error) {
    console.log(error)
    return error;
  }

  return response;
};

export const TeacherAssignmentUpload = async (data) => {
  let response;
  try {

    response = await axios.post(baseURL + '/teacher/assignments/upload', data)

  } catch (error) {
    console.log(error)
    return error;
  }

  return response;
};

export const TeacherQuizUpload = async (data) => {
  let response;
  try {
    response = await axios.post(baseURL + '/teacher/quiz/upload', data)
  } catch (error) {
    console.log(error)
    return error;
  }
  return response;
};




export const TeacherLectureUpload = async (data) => {
  let response;
  try {

    response = await axios.post(baseURL + '/teacher/submitLecture', data)

  } catch (error) {
    console.log(error)
    return error;
  }

  return response;
};



export const StudentSubmissions = async (data) => {
  let response;
  try {

    response = await axios.post(baseURL + '/student/assignments/upload', data)

  } catch (error) {
    console.log(error)
    return error;
  }

  return response;
}



export const StudentQuiz = async (data) => {
  let response;
  try {

    response = await axios.post(baseURL + '/student/quiz/upload', data)

  } catch (error) {
    console.log(error)
    return error;
  }

  return response;
}


