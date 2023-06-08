import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";

import styles from "./StdSign.module.css";
import TextInput from "../../../Components/TextInput/TextInput";
import loginSchema from "../../../schema/loginschema";
import { useFormik } from "formik";

import { stdLogin } from "../../../api/internal";

import { setUser } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import { useState } from 'react';

function StdSign() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleLogin = async () => {
    const data = {
      email: values.email,

    };
 

    const response = await stdLogin(data);
    

    if (response.status === 200) {
      console.log(response.data.auth);
      if ( response.data.auth){
        console.log(response.data.auth);
        const Student = {
          _id: response.data.response._id,
        };
        localStorage.setItem("StdToken", response.data.token);  
         dispatch(setUser(Student));
        navigate("/std/dashboard");


      }else{
        setError("Email is not Registered by any teacher");
      }

   
    }else{
     
        setError("Network Error 404");
      
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,
  });










  return (

    <div className={styles.loginWrapper}>

        

      <div className={styles.loginHeader}>Log in to Student account</div>
      <TextInput
        type="text"
        value={values.email}
        name="email"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="email"
        // error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />
      {/* <TextInput
        type="password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="password"
        // error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      /> */}
      <span>
        {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
      </span>
      <button className={styles.logInButton} onClick={handleLogin}>
        Log In
      </button>

    </div>
  )
}

export default StdSign
