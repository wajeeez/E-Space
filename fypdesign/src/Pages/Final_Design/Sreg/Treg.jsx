import React, { useState } from 'react'
import styles from './Treg.module.css'
import './Treg.css'
import TextInput from "../../../Components/TextInput/TextInput";
import regSchema from "../../../schema/regschema";
import { useFormik } from "formik";

import { Reg } from "../../../api/internal";

import { setUser } from "../../../store/userSlice";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { OverlayTrigger, Popover, FormGroup, FormControl } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { InputGroup, Button } from 'react-bootstrap';

import Loader from "../../../Components/Loader/Loader";

function Treg() {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleReg = async () => {

    const data = {
      tname: values.tname,
      institute: values.institute,
      phone: values.phone,
      email: values.email,
      password: values.password,
    };
    //API 
    const response = await Reg(data);
    if (response.status === 409) {
      setError(response.response.data.message);
    }
    if (response.status === 201) {



      const teacher = {
        _id: response.data.teacher._id,
        email: response.data.teacher.email,
        auth: response.data.teacher.auth,
      };
      // localStorage.setItem("authToken", response.data.token);
      dispatch(setUser(teacher));
      navigate("/teacher/login");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);

      if (response.status === 409) {
        setError(response.response.data.message);
      }
    }

  };
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      tname: "",
      institute: "",
      phone: "",
      email: "",
      password: "",
    },

    validationSchema: regSchema,
  });

// validated states
const [lowerValidated, setLowerValidated]=useState(false);
const [upperValidated, setUpperValidated]=useState(false);
const [numberValidated, setNumberValidated]=useState(false);
const [specialValidated, setSpecialValidated]=useState(false);
const [lengthValidated, setLengthValidated]=useState(false);

const handleChangeP=(value)=>{
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


  

  return (
    <div className="container-fluid" style={{background:'linear-gradient(to right, #8539d1 30%, #fc10f2 100%)' , marginTop: '10px', 
    overflow:'hidden', padding:'10px' , display: 'flex', justifyContent: 'center'
    , alignItems: 'center', minHeight: '100vh',marginTop:'0px' }}>
     <center>
     <div className="container-fluid class" style={{background:'white', 
         padding: '2rem 4rem',margin:'0px' , minWidth:'300px',maxWidth:'700px', border:'2px solid silver', 
         borderRadius:'30px', boxShadow: '10px 10px 20px  rgba(0, 0, 0, 0.4)'}}>

      <h1 style={{ fontFamily:'Poppins',padding:'5px' , color : 'black', borderRadius: '20px', 
      marginBottom:'20px', fontWeight:'400',}}>Register as Teacher</h1>

<FormGroup >
  <FormControl
    type="text"
    value={values.tname}
    name="tname"
    onBlur={handleBlur}
    onChange={handleChange}
    placeholder="Teacher Name"
    // error={errors.email && touched.email ? 1 : undefined}
    errormessage={errors.tname}
    style={{
      maxWidth: '320px',
      minWidth: '200px',
      fontSize: '18px',
      height: '50px',
      borderRadius: '16px',
      marginBottom: '20px',
      boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)',
    }}
  />
</FormGroup>

<FormGroup >
  <FormControl
    type="text"
    value={values.email}
    name="email"
    onBlur={handleBlur}
    onChange={handleChange}
    placeholder="Email"
    // error={errors.email && touched.email ? 1 : undefined}
    errormessage={errors.email}
    style={{
      maxWidth: '320px',
      minWidth: '200px',
      fontSize: '18px',
      height: '50px',
      borderRadius: '16px',
      marginBottom: '20px',
      boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)',
    }}
  />
</FormGroup>



{/* <FormGroup>

    <FormControl
      type="password"
      name="password"
      value={values.password}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder="Password"
      errormessage={errors.password}
      style={{
        maxWidth: '320px',
        minWidth: '200px',
        fontSize: '18px',
        height: '50px',
        borderRadius: '16px',
        marginBottom: '0px',
        boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)',
      }}
    />

</FormGroup>  */}


<FormGroup>

{newPasswordFocus && (


<div style={{position:'sticky', marginTop:'-10.4rem'}}>
  <main className='tracker-box' style={{maxWidth: '320px',minWidth: '200px',fontSize:'0.9rem'}}>

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

)}

  <FormControl
    type="password"
    name="password"
    value={values.password}
    onBlur={(e) => {
      handleBlur(e);
      setNewPasswordFocus(false);
    }}
    onChange={(e) => {
      handleChange(e);
      handleChangeP(e.target.value);
    }}
    onFocus={() => setNewPasswordFocus(true)}
    placeholder="Enter your password"
    errormessage={errors.password}
    style={{
      maxWidth: '320px',
      minWidth: '200px',
      fontSize: '18px',
      height: '50px',
      borderRadius: '16px',
      marginBottom: '20px',
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.4)',
    }}
  />
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
</FormGroup>
 



<FormGroup >
  <FormControl
    type="text"
    value={values.institute}
    name="institute"
    onBlur={handleBlur}
    onChange={handleChange}
    placeholder="Institute"
    // error={errors.email && touched.email ? 1 : undefined}
    errormessage={errors.institute}
    style={{
      maxWidth: '320px',
      minWidth: '200px',
      fontSize: '18px',
      height: '50px',
      borderRadius: '16px',
      marginBottom: '20px',
      boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)',
    }}
  />
</FormGroup>

<FormGroup >
  <FormControl
    type="text"
    value={values.phone}
    name="phone"
    onBlur={handleBlur}
    onChange={handleChange}
    placeholder="Phone"
    // error={errors.email && touched.email ? 1 : undefined}
    errormessage={errors.phone}
    style={{
      maxWidth: '320px',
      minWidth: '200px',
      fontSize: '18px',
      height: '50px',
      borderRadius: '16px',
      marginBottom: '20px',
      boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)',
    }}
  />
</FormGroup>






        {/* <button className={styles.loginBut} onClick={handleReg}>Sign Up</button> */}
        <button className="custom-button"
                        onClick={handleReg}
                        style={{ fontFamily:'poppins',
                        borderRadius: '20px', fontSize: '20px', 
                        backgroundColor: '',letterSpacing:'2px',
                        fontWeight:'bold', marginBottom:'20px' }}
                      >
                        Sign Up
                      </button>
        <div>
        <span>
        {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
      </span>
        </div>
       
        <label className={styles.p} style={{fontSize:'16px', marginBottom:'10px'}}>Already having an account?</label>
        <br/>
        <label>
          {" "}
          <a href= "/teacher/login" style={{fontSize:'18px'}}>  Login here</a>
        </label>

      </div>
 

        </center>
    </div>
  )
}

export default Treg;