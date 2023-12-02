import React, { useState ,useEffect} from 'react';
import userIcon from '../../../Assets/images/user.png';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
// import { estimatedDocumentCount } from '../../../../../backend/models/teachermodel';
const AccSetting = () => {
  const passwordPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])(?!.*\s).{8,}$/;

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email,setEmail] = useState('')

  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  useEffect(() => {
    const authToken = localStorage.getItem("StdToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setEmail(decodedToken.email);
    }
  }, []);


  

  const updateSetting = (email,name,pasword) =>{
    const requestData = {
      email: email,
      name: name,
      password: pasword,
    };
    
    // Make the Axios request
    axios.post(baseURL+`/student/update`, requestData)
      .then(response => {

        if(response.status == 200){

          toast.success("Successfully Updated")
        }else{
          toast.error("Something Went Wrong")
        }

      // Handle the response data
      })
      .catch(error => {
        toast.error("Something Went Wrong") // Handle the error response
      });

   
  }

  const handleUpdate = () => {
    // Use the values stored in state (fullName, password, newPassword)




    console.log('Full Name:', fullName);
    console.log('Password:', password);
    console.log('New Password:', newPassword);

    if (password == newPassword )
    {

      if(passwordPattern.test(newPassword)){
        updateSetting(email,fullName,newPassword)
      }else{
        toast.error("Password must meet the following criteria:\n- At least one digit\n- At least one lowercase letter\n- At least one uppercase letter\n- At least one special character\n- No whitespace characters\n- Minimum length of 8 characters");
    
      }
  
    
    }else{
      toast.error("Password does not match ")
    }
    // Add your update logic here, e.g., make an API request to update the user's information
  };

  return (
    <div className="container-fluid" style={{ textAlign: 'center', marginTop: '0px' }}>
      <center>
        <h1 style={{ background: '', padding: '5px', color: 'black', borderRadius: '20px', marginBottom: '30px' }}>
          User Settings
        </h1>

        <div className="row" style={{ marginBottom: '30px', padding: '10px' }}>
          <div className="col">
            <img
              src={userIcon}
              alt="Profile"
              className="img-fluid rounded-circle"
              style={{ width: '100px', background: 'black' }}
            />
          </div>
        </div>

        <div className="row mb-4 justify-content-center">
          <div className="col-md-2 d-flex align-items-center">
            <h4 style={{ marginRight: '20px', whiteSpace: 'nowrap' }}>Full Name :</h4>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-4 justify-content-center">
  <div className="col-md-2 d-flex align-items-center">
    <h4 style={{ marginRight: '20px', whiteSpace: 'nowrap' }}>Email :</h4>
  </div>
  <div className="col-md-4 d-flex align-items-center">
    <input
      type="email"
      id="email"
      className="form-control"
      readOnly
      value={email} // Replace with the actual email text you want to display
    />
  </div>
</div>
        <div className="row mb-4 justify-content-center ">
          <div className="col-md-2 d-flex align-items-center ">
            <h4 style={{ marginRight: '20px', whiteSpace: 'nowrap' }}>Password :</h4>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-4 justify-content-center ">
          <div className="col-md-2 d-flex align-items-center ">
            <h4 style={{ marginRight: '20px', whiteSpace: 'nowrap' }}>Confirm Password :</h4>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <input
              type="password"
              id="newPassword"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-4 justify-content-center">
          <div className="col-md-6">
            <button
              onClick={handleUpdate}
              className="btn btn-primary"
              style={{
                fontSize: '20px',
                letterSpacing: '1px',
                padding: '10px',
                borderRadius: '16px',
                margin: '20px',
                width: '200px',
              }}
            >
              Update
            </button>
          </div>
        </div>
      </center>
      <ToastContainer/>
    </div>
  );
};

export default AccSetting;
