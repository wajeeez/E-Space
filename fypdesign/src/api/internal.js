import axios from 'axios'

// const api = axios.create({
 
//     baseURL:process.env.React_App_INTERNAL_API_PATH,
//     // withCredentials:true,
//     // headers:{
//     //     "Content-Type":"application/json"
//     // }
// });

export const login =async (data) =>{
    let response;
    try{
        response=await axios.post('http://localhost:5000/teacher/login',data)
      
    }
    catch(error){
        console.log(error)
        return error;
    }

    return response;
}

export const Reg = async (data) => {
    let response;
  
    try {
      response = await axios.post('http://localhost:5000/teacher/register',data);
    } catch (error) {
      return error;
    }
   
    return response;
  };

  export const Logout = async () => {
    let response;
  
    try {
      response = await axios.post('http://localhost:5000/teacher/logout');
    } catch (error) {
      return error;
    }
  
    return response;
  };


  export const createclass = async (data) => {
    let response;
  
    try {
      response = await axios.post('http://localhost:5000/teacher/createclass',data);
    } catch (error) {
      return error;
    }
  
    return response;
  };

  
 



  //Student
export const stdLogin =async (data) =>{
    let response;
    try{
        response=await axios.post('http://localhost:5000/student/login',data)
      
    }
    catch(error){
        console.log(error)
        return error;
    }

    return response;
};
  


export const TeacherAssignmentUpload = async(data)=>{
  let response;
  try{

    response=await axios.post('http://localhost:5000/teacher/assignments/upload',data)
      
  }catch(error){
    console.log(error)
    return error;
  }
  
  return response;
};



export const StudentSubmissions = async(data)=>{
  let response;
  try{

    response=await axios.post('http://localhost:5000/student/assignments/upload',data)
      
  }catch(error){
    console.log(error)
    return error;
  }
  
  return response;
}

