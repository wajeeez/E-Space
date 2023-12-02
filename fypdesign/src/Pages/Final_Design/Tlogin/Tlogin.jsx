
import styles from "./Tlogin.module.css";

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button component
import React, { useState } from "react";
import { useNavigate } from "react-router";

import loginSchema from "../../../schema/loginschema";
import { useFormik } from "formik";
import { login } from "../../../api/internal";

import { setUser } from "../../../store/userSlice";
import { useDispatch } from "react-redux";

import Loader from "../../../Components/Loader/Loader";

import Form from 'react-bootstrap/Form';

function  Tlogin() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true)

    const data = {
      email: values.email,
      password: values.password,
    };
    console.log(data);


    const response = await login(data);

    if (response.status === 200) {
      setLoading(false)

      const teacher = {
        _id: response.data.teacher._id,
        email: response.data.teacher.email,
        auth: response.data.teacher.auth,
      };
      localStorage.setItem("authToken", response.data.token);  
      dispatch(setUser(teacher));
      navigate("/TDashboard");
    }
    else if (response.code === "ERR_BAD_REQUEST") {
      setLoading(false)
      if(response.response.status === 500 ){
        setError( "ERROR" + response.response.data.message);
      }
      

      if (response.response.status === 401) {
        setError(response.response.data.message);
      }
    }else{
      setLoading(false)
      setError(response.response.status);
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
    <>
            <div className="container-fluid" style={{background:'linear-gradient(to right, #8539d1 30%, #fc10f2 100%)' , marginTop: '10px', 
        overflow:'hidden', padding:'20px' , display: 'flex', justifyContent: 'center'
        , alignItems: 'center', minHeight: '100vh',marginTop:'0px' }}>
         <center>
         {loading ? (
        <Loader /> // Display the loader while loading
      ) : (
    <div className="container-fluid class" style={{background:'white', 
         padding: '2rem 3rem',margin:'0px' , minWidth:'300px',maxWidth:'600px', border:'2px solid black', 
         borderRadius:'30px', boxShadow: '20px 20px 5px  rgba(0, 0, 0, 0.4)'}}>
      <h1 style={{ fontFamily:'Poppins',padding:'5px' , color : 'black', borderRadius: '20px', 
      marginBottom:'40px', fontWeight:'bold',}}>Teacher Login</h1>
      <Form.Group >
        <Form.Control
          type="email"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Email"
          isInvalid={touched.email && errors.email}
          style={{maxWidth:'400px', minWidth:'200px'  ,
          fontSize:'18px', height:'50px' , borderRadius:'16px', marginBottom:'30px'
         ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group >
        <Form.Control
          type="password"
          name="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Password"
          isInvalid={touched.password && errors.password}
          style={{maxWidth:'400px', minWidth:'200px' ,
          fontSize:'18px', height:'50px' , borderRadius:'16px', marginBottom:'30px'
         ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>

      <label>
        <a href="#" style={{fontSize:'18px', marginBottom:'20px'}}>Forgot password?</a>
      </label>
      <br/>

      <Button  onClick={handleLogin} variant='primary' 
      style={{fontSize:'22px', letterSpacing:'3px',
      fontFamily:'Poppins', padding:'10px', width:'150px', margin:'20px'
      ,backgroundColor:'#8539d1', borderRadius:'16px'
      }}>Login</Button>
      <div>
      <span>
          {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
        </span>
      </div>
      
      <label className={styles.p} style={{fontSize:'18px', marginTop:'10px', marginBottom:'20px'}}>Don't have an account?</label>
      <br/>
      <label>
        <a href="/teacher/register" style={{fontSize:'18px', marginTop:'10px'}}>Register here</a>
      </label>

    </div>
    )}
    </center>
    </div>




{/* <div className={styles.App} style={{background:'linear-gradient(to right, #8539d1 30%, #fc10f2 100%)'}}>
{loading ? (
    <Loader /> // Display the loader while loading
  ) : (<div className={styles.loginContainer}>
  <h2 style={{color:"#000", fontFamily:'poppins', marginBottom:'20px', textAlign:'center'}}>Teacher Login</h2>
  <div className={styles.input_container} style={{marginBottom:'20px', width:'270px'}}>

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


  </div>
  <div className={styles.input_container} style={{marginBottom:'20px', width:'270px'}}>

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

  </div>

  <label>
    {" "}
    <a href="#" style={{fontSize:'18px', marginBottom:'20px'}}>Forgot password?</a>
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
 
  <label className={styles.p} style={{fontSize:'18px', marginTop:'10px', marginBottom:'20px'}}>Don't have an account?</label>
  <label>
    {" "}
    <a href="/teacher/register" style={{fontSize:'18px', marginTop:'10px'}}>Register here</a>
  </label>

</div>)}
</div> */}
</>
  );
}

export default Tlogin;
