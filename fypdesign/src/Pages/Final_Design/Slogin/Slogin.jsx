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
import Form from 'react-bootstrap/Form';
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

    <div className="container-fluid" style={{background:'linear-gradient(to right, #8539d1 30%, #fc10f2 100%)' , marginTop: '10px', 
    overflow:'hidden', padding:'20px' , display: 'flex', justifyContent: 'center'
    , alignItems: 'center', minHeight: '100vh',marginTop:'0px' }}>
     <center>
     {loading ? (
        <Loader /> // Display the loader while loading
      ) : (
       <div className="container-fluid class" style={{background:'white', 
     padding: '2rem 3rem',margin:'' ,minWidth:'300px',maxWidth:'600px', border:'2px solid black', 
     borderRadius:'30px', boxShadow: '20px 20px 5px  rgba(0, 0, 0, 0.4)'}}>
       <h1 style={{ fontFamily:'Poppins',padding:'5px' , color : 'black', borderRadius: '20px', 
      marginBottom:'30px', fontWeight:'bold',}}>Student Login</h1>

      <Form.Group >
        <Form.Control
          type="email"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Email"
          isInvalid={touched.email && errors.email}
          style={{maxWidth:'400px', minWidth:'200px' ,
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
          
          <Link onClick={handleForgetPassword} style={{fontSize:'18px', marginBottom:'20px'}}>Forget password?</Link>
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

      </div>
       )}
      </center>
      
    </div>

  );





//   return (
//     <div className={styles.App} style={{background:'linear-gradient(to right, #8539d1 30%, #fc10f2 100%)'}}>

// {loading ? (
//         <Loader /> // Display the loader while loading
//       ) : (
//       <div className={styles.loginContainer}>
//         <h2 style={{color:"#000", fontFamily:'poppins', marginBottom:'20px', textAlign:'center'}}>Student Login</h2>
//         <div className={styles.input_container} style={{marginBottom:'20px', width:'270px'}}>
//           {/* <label>Email </label> */}
//             <input
//               type="email"
//               name="email"
//               value={values.email}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               placeholder="Email"

//               // error={errors.password && touched.password ? 1 : undefined}
//               errormessage={errors.email}

//             />

//           {/* {renderErrorMessage("uname")} */}
//         </div>
//         <div className={styles.input_container} style={{marginBottom:'20px', width:'270px'}}>
//           {/* <label>Password </label> */}
//           <input
//             type="password"
//             name="password"
//             value={values.password}
//             onBlur={handleBlur}
//             onChange={handleChange}
//             placeholder="Password"

//             // error={errors.password && touched.password ? 1 : undefined}
//             errormessage={errors.password}

//           />


//         </div>

//         <label>
          
//           <Link onClick={handleForgetPassword} style={{fontSize:'18px', marginBottom:'20px'}}>Forget password?</Link>
//         </label>

//         <Button  onClick={handleLogin} variant='primary' 
//           style={{fontSize:'22px', letterSpacing:'3px',
//           fontFamily:'Poppins', padding:'10px', width:'150px', margin:'20px'
//           ,backgroundColor:'#8539d1'
//           }}>Login</Button>
//         <div>
//           <span>
//             {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
//           </span>
//         </div>

//       </div>
//       )}
//       <ToastContainer></ToastContainer>
//     </div>
//   );

}

export default Slogin;
