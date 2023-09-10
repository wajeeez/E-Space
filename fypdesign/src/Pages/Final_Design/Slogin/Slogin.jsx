import React from "react";
import styles from "./Slogin.module.css";

import { useNavigate } from "react-router";


import TextInput from "../../../Components/TextInput/TextInput";
import loginSchema from "../../../schema/loginschema";
import { useFormik } from "formik";

import { stdLogin } from "../../../api/internal";

import { setUser } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import Loader from "../../../Components/Loader/Loader";

function Slogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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





















  return (
    <div className={styles.App}>

{loading ? (
        <Loader /> // Display the loader while loading
      ) : (
      <div className={styles.loginContainer}>
        <h2>Student Login</h2>
        <div className={styles.input_container}>
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
        <div className={styles.input_container}>
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
          
          <a href="#">Forget password?</a>
        </label>

        <button onClick={handleLogin} className={styles.loginBut}>Login</button>
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
    </div>
  );
}

export default Slogin;
