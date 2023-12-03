import React, { useState } from 'react'
import styles from './Treg.module.css'
import TextInput from "../../../Components/TextInput/TextInput";
import regSchema from "../../../schema/regschema";
import { useFormik } from "formik";

import { Reg } from "../../../api/internal";

import { setUser } from "../../../store/userSlice";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { OverlayTrigger, Popover, FormGroup, FormControl } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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

  const renderPasswordCriteriaPopover = () => (
    <Popover id="password-criteria-popover">
      <Popover.Content>
        <div>
          <p>At least one digit </p>
          <p>At least one lowercase letter</p>
          <p>At least one uppercase letter </p>
          <p>At least one special character </p>
          <p>Minimum length of 8 characters</p>
        </div>
      </Popover.Content>
    </Popover>
  );
  

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



<FormGroup>

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

</FormGroup> 


{/* <FormGroup>
  <OverlayTrigger
    trigger="click"
    placement="bottom"
    overlay={renderPasswordCriteriaPopover()}
  >
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
  </OverlayTrigger>
</FormGroup> */}



        {/* <div className={styles.input_container}>
          <input

            type="text"
            value={values.tname}
            name="tname"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Teacher Name"
            // error={errors.email && touched.email ? 1 : undefined}
            errormessage={errors.tname}
            style={{maxWidth:'320px', minWidth:'200px'  ,
            fontSize:'18px', height:'50px' , borderRadius:'16px', marginBottom:'10px'
           ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
          />



        </div>

        <div className={styles.input_container}>
          <input
            type="text"
            value={values.institute}
            name="institute"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Institute"
            // error={errors.email && touched.email ? 1 : undefined}
            errormessage={errors.institute}
            style={{maxWidth:'320px', minWidth:'200px'  ,
            fontSize:'18px', height:'50px' , borderRadius:'16px', marginBottom:'10px'
           ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
          />
        </div>

        <div className={styles.input_container}>
          <input

            type="text"
            value={values.phone}
            name="phone"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Phone"
            // error={errors.email && touched.email ? 1 : undefined}
            errormessage={errors.phone}
            style={{maxWidth:'320px', minWidth:'200px'  ,
            fontSize:'18px', height:'50px' , borderRadius:'16px', marginBottom:'10px'
           ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
          />
        </div>

        <div className={styles.input_container}>
          <input
            type="text"
            value={values.email}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Email"
            // error={errors.email && touched.email ? 1 : undefined}
            errormessage={errors.email}
            style={{maxWidth:'320px', minWidth:'200px'  ,
            fontSize:'18px', height:'50px' , borderRadius:'16px', marginBottom:'10px'
           ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
          />
        </div>

        <div className={styles.input_container}>
          <input type="password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Password"
            // error={errors.password && touched.password ? 1 : undefined}
            errormessage={errors.password} 
            style={{maxWidth:'320px', minWidth:'200px'  ,
            fontSize:'18px', height:'50px' , borderRadius:'16px', marginBottom:'10px'
           ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}/>

        </div> */}



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