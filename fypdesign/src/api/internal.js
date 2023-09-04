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
  const config = {
    headers: {
      'Content-Type': 'application/json',

      // 'origin': "https://a19f-124-29-249-125.ngrok.io",
      'Access-Control-Allow-Origin': '*', // Set the 'Origin' header to your app's origin
    },
  };



  axios.defaults.baseURL = 'https://bfad-111-88-121-104.ngrok.io';
  axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'; axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  axios.post('/student/login', data)
    .then(resp => {
      let result = resp.data;
       return result ;
    })
    .catch(error => {
    
        return error;
      
    })




  // try {


  //   // axios.defaults.headers.post ['Content-Type'] = 'application/json; charset=utf-8'; 
  //   // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  //   // response = await axios.post( '/student/login', data, config)
  // }
  // catch (error) {
  //   console.log(error)
  //   return error;
  // }

  // return response;
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

