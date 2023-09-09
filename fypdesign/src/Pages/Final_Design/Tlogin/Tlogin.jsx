
import styles from "./Tlogin.module.css";


import React, { useState } from "react";
import { useNavigate } from "react-router";

import loginSchema from "../../../schema/loginschema";
import { useFormik } from "formik";
import { login } from "../../../api/internal";

import { setUser } from "../../../store/userSlice";
import { useDispatch } from "react-redux";

import Loader from "../../../Components/Loader/Loader";

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
    <div className={styles.App}>
    {loading ? (
        <Loader /> // Display the loader while loading
      ) : (<div className={styles.loginContainer}>
      <h2>Teacher Login</h2>
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
        {" "}
        <a href="#">Forget password?</a>
      </label>

      <button  onClick={handleLogin} className={styles.loginBut}>Login</button>
      <div>
      <span>
          {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
        </span>
      </div>
      {/* <p className={styles.p}>Don't have an account?<span><a href="#">Register here</a></span></p> */}
      <label className={styles.p}>Don't have an account?</label>
      <label>
        {" "}
        <a href="/teacher/register">Register here</a>
      </label>

    </div>)}
    </div>
  );
}

export default Tlogin;
