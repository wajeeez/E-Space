import React from "react";
import styles from "./Slogin.module.css";

import { useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button component

import TextInput from "../../../Components/TextInput/TextInput";
import loginSchema from "../../../schema/loginschema";
import { useFormik } from "formik";

import { stdLogin } from "../../../api/internal";

import { setUser } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import Loader from "../../../Components/Loader/Loader";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
function Slogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const baseURL = process.env.React_App_INTERNAL_API_PATH;



  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true)
    const data = {
      email: values.email,
      password: values.password
    };


    const response = await stdLogin(data);


    if (response.status === 200) {
      setLoading(false)
      console.log(response.data.auth);
      if (response.data.auth) {
        console.log(response.data.auth);
        const Student = {
          _id: response.data.response._id,
        };
        localStorage.setItem("StdToken", response.data.token);
        dispatch(setUser(Student));
        navigate("/std/dashboard");


      } else {
        setError(response.response.data.message);
      }


    } else {
      setLoading(false)
      setError(response.response.data.message);

    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,
  });


  const handleForgetPassword = () =>{

    if(values.email!=""){

      const requestData = {
        email: values.email, // Replace with the user's email
      };

      axios.post(baseURL+`/forgetpassword`, requestData)
      .then(response => {

        if(response.status == 200){
          toast.success("You will recieve an Email with Password to login")
        }else{
          toast.error("Something Went Wrong")
        }

      // Handle the response data
      })
      .catch(error => {
        toast.error("Something Went Wrong") // Handle the error response
      });

   

    }else{
      toast.error("Please Enter Email Address")
    }


  }


















  return (
    <div className={styles.App} style={{background:'linear-gradient(to right, #8539d1 30%, #fc10f2 100%)'}}>

{loading ? (
        <Loader /> // Display the loader while loading
      ) : (
      <div className={styles.loginContainer}>
        <h2 style={{color:"#000", fontFamily:'poppins', marginBottom:'20px', textAlign:'center'}}>Student Login</h2>
        <div className={styles.input_container} style={{marginBottom:'20px', width:'270px'}}>
          {/* <label>Email </label> */}
            <input
              type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Email"

              // error={errors.password && touched.password ? 1 : undefined}
              errormessage={errors.email}

            />

          {/* {renderErrorMessage("uname")} */}
        </div>
        <div className={styles.input_container} style={{marginBottom:'20px', width:'270px'}}>
          {/* <label>Password </label> */}
          <input
            type="password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Password"

            // error={errors.password && touched.password ? 1 : undefined}
            errormessage={errors.password}

          />

          {/* {renderErrorMessage("pass")} */}
        </div>

        <label>
          
          <Link onClick={handleForgetPassword} style={{fontSize:'18px', marginBottom:'20px'}}>Forget password?</Link>
        </label>

        <Button  onClick={handleLogin} variant='primary' 
          style={{fontSize:'22px', letterSpacing:'3px',
          fontFamily:'Poppins', padding:'10px', width:'150px', margin:'20px'
          ,backgroundColor:'#8539d1'
          }}>Login</Button>
        <div>
          <span>
            {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
          </span>
        </div>
        {/* <p className={styles.p}>Don't have an account?<span><a href="#">Register here</a></span></p> */}
        {/* <p className={styles.p}></p> */}


        {/* <button className={styles.siG}>
          <img
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
            alt="Trees"
            height="30"
          />
          <p>Sign in with Google</p>
        </button> */}
      </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Slogin;
