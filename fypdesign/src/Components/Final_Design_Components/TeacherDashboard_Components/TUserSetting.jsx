import React, { useState ,useEffect} from 'react';
import userIcon from '../../../Assets/images/user.png';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TUserSetting.css'

import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';

import axios from 'axios';
// import { estimatedDocumentCount } from '../../../../../backend/models/teachermodel';
const TUserSetting = () => {
  const passwordPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])(?!.*\s).{8,}$/;

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  const [type, setType] = useState('password');

  // validated states
  const [lowerValidated, setLowerValidated]=useState(false);
  const [upperValidated, setUpperValidated]=useState(false);
  const [numberValidated, setNumberValidated]=useState(false);
  const [specialValidated, setSpecialValidated]=useState(false);
  const [lengthValidated, setLengthValidated]=useState(false);

  const handleChange=(value)=>{
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,})')
    if(lower.test(value)){
      setLowerValidated(true);
    }
    else{
      setLowerValidated(false);
    }
    if(upper.test(value)){
      setUpperValidated(true);
    }
    else{
      setUpperValidated(false);
    }
    if(number.test(value)){
      setNumberValidated(true);
    }
    else{
      setNumberValidated(false);
    }
    if(special.test(value)){
      setSpecialValidated(true);
    }
    else{
      setSpecialValidated(false);
    }
    if(length.test(value)){
      setLengthValidated(true);
    }
    else{
      setLengthValidated(false);
    }
  }

  
  const [newPasswordFocus, setNewPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setEmail(decodedToken.email);
      setFullName(decodedToken.name)
      console.log(decodedToken.name)
    }
  }, []);


  

  const updateSetting = (email,name,pasword) =>{
    const requestData = {
      email: email,
      name: name,
      password: pasword,
    };
    
    // Make the Axios request
    axios.post(baseURL+`/teacher/update`, requestData)
      .then(response => {

        if(response.status == 200){

          toast.success("Successfully Updated")
          localStorage.setItem(email,name)
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


    setNewPasswordFocus(true);
    console.log('Full Name:', fullName);
    console.log('Password:', password);
    console.log('New Password:', newPassword);

    if (password == newPassword )
    {

      if(passwordPattern.test(newPassword)){
        updateSetting(email,fullName,newPassword)
        setTimeout(() => {
          window.location.reload();
        }, 5000);

      }else{
        toast.error("Password must meet the following criteria:\n- At least one digit\n- At least one lowercase letter\n- At least one uppercase letter\n- At least one special character\n- No whitespace characters\n- Minimum length of 8 characters");
    
      }
  
    
    }else{
      toast.error("Password does not match ")
    }
    // Add your update logic here, e.g., make an API request to update the user's information
  };

 
  
  return (
    
    <div className="container-fluid" style={{ textAlign: 'center', marginTop: '0px' ,overflow:'auto',}}>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />

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

        {/* <div className="row mb-4 justify-content-center ">
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
           </div> */}

{newPasswordFocus && (
  <div className="row mb-4 justify-content-center" style={{marginTop:'-10.2rem'}}>
    <div className="col-md-2 d-flex align-items-center">
      <h4 style={{ marginRight: '20px', whiteSpace: 'nowrap', color: 'transparent' }}>New Password :</h4>
    </div>
    <div className="col-md-4 d-flex align-items-center" style={{marginTop:'-2rem'}}>
      <main className='tracker-box'>

        <div className={`validation-item ${lowerValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${lowerValidated ? 'green' : ''}`}>
          {lowerValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one lowercase letter
        </div>

        <div className={`validation-item ${upperValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${upperValidated ? 'green' : ''}`}>
          {upperValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one uppercase letter
        </div>
        <div className={`validation-item ${numberValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${numberValidated ? 'green' : ''}`}>
          {numberValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one number
        </div>
        <div className={`validation-item ${specialValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${specialValidated ? 'green' : ''}`}>
          {specialValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one special character
        </div>
        <div className={`validation-item ${lengthValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${lengthValidated ? 'green' : 'red'}`}>
          {lengthValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least 8 characters
        </div>

      </main>
    </div>
  </div>
)}
        <div className="row mb-4 justify-content-center" style={{marginBottom:''}}>
  <div className="col-md-2 d-flex align-items-center">
    <h4 style={{ marginRight: '20px', whiteSpace: 'nowrap' }}>New Password :</h4>
  </div>
  <>



  {/* <input
    type='password'
    id="password"
    className="form-control"
    onChange={(e) => {
      setPassword(e.target.value);
      handleChange(e.target.value); // Call the handleChange function
    }}
    onFocus={() => setNewPasswordFocus(true)}
    onBlur={() => setNewPasswordFocus(false)}
  /> */}
    <FormGroup className="col-md-4 d-flex align-items-center">
      <InputGroup>
        <FormControl
          type='password'
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleChange(e.target.value); // Call the handleChange function
          }}
          onFocus={() => setNewPasswordFocus(true)}
          onBlur={() => setNewPasswordFocus(false)}
          placeholder="Enter your new password"
        />

        </InputGroup>
    </FormGroup>
    </>

    </div>

        {/* <div className="row mb-4 justify-content-center " style={{zIndex:'1'}}>
          <div className="col-md-2 d-flex align-items-center ">
            <h4 style={{ marginRight: '60px', whiteSpace: 'wrap', textAlign:'left' }}>
              Confirm Password :</h4>
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
        </div> */}


{confirmPasswordFocus && (
    <div className="row mb-4 justify-content-center" style={{marginTop:'-9rem'}}>
    <div className="col-md-2 d-flex align-items-center">
      <h4 style={{ marginRight: '20px', whiteSpace: 'nowrap', color: 'transparent' }}>Confrm Password :</h4>
    </div>
    <div className="col-md-4 d-flex align-items-center" style={{marginTop:'-3.2rem'}}>
      <main className='tracker-box'>

        <div className={`validation-item ${lowerValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${lowerValidated ? 'green' : ''}`}>
          {lowerValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one lowercase letter
        </div>

        <div className={`validation-item ${upperValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${upperValidated ? 'green' : ''}`}>
          {upperValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one uppercase letter
        </div>
        <div className={`validation-item ${numberValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${numberValidated ? 'green' : ''}`}>
          {numberValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one number
        </div>
        <div className={`validation-item ${specialValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${specialValidated ? 'green' : ''}`}>
          {specialValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one special character
        </div>
        <div className={`validation-item ${lengthValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${lengthValidated ? 'green' : ''}`}>
          {lengthValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}
          </span>
          At least 8 characters
        </div>
      </main>
    </div>
  </div>
)}

        <div className="row mb-4 justify-content-center" style={{marginBottom:''}}>
  <div className="col-md-2 d-flex align-items-center">
  <h4 style={{ marginRight: '60px', whiteSpace: 'wrap', textAlign:'left' }}>
              Confirm Password :</h4>
  </div>

  <div className="col-md-4 d-flex align-items-center">
      <input
        type="password"
        id="newPassword"
        className="form-control"
        onChange={(e) => {
          setNewPassword(e.target.value);
          handleChange(e.target.value); // Call the handleChange function
        }}
        onFocus={() => setConfirmPasswordFocus(true)}
        onBlur={() => setConfirmPasswordFocus(false)}
        placeholder="Confirm your new password"
      />

    {/* <FormGroup className="col-md-4 d-flex align-items-center">
      <InputGroup>
        <FormControl
          type='password'
          id="newPassword"
          value={password}
          onChange={(e) => {
            setNewPassword(e.target.value);
            handleChange(e.target.value); // Call the handleChange function
          }}
          onFocus={() => setConfirmPasswordFocus(true)}
          onBlur={() => setConfirmPasswordFocus(false)}

        />

        </InputGroup>
    </FormGroup> */}

    </div>



    </div>


        <div className="row mb-4 justify-content-center">
          <div className="col-md-6">
            <button
              onClick={handleUpdate}
              className="custom-button"
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

export default TUserSetting;
