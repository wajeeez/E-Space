import React, { useState } from "react";
import { useNavigate } from "react-router";

import styles from "./TSigin.module.css";
import TextInput from "../../../Components/TextInput/TextInput";
import loginSchema from "../../../schema/loginschema";
import { useFormik } from "formik";

import { login } from "../../../api/internal";

import { setUser } from "../../../store/userSlice";
import { useDispatch } from "react-redux";

function TSignin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleLogin = async () => {
    const data = {
      email: values.email,
      password: values.password,
    };
    console.log(data);

    const response = await login(data);

    if (response.status === 200) {
      const teacher = {
        _id: response.data.teacher._id,
        email: response.data.teacher.email,
        auth: response.data.teacher.auth,
      };
      localStorage.setItem("authToken", response.data.token);  
       dispatch(setUser(teacher));
      navigate("/TDashboard");
    } else if (response.code === "ERR_BAD_REQUEST") {
      // setError(response.response.mes);

      if (response.response.status === 401) {
        setError(response.response.data.message);
      }
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
      <div className={styles.loginHeader}>Log in to your account</div>
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
      <TextInput
        type="password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="password"
        // error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <span>
        {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
      </span>
      <button className={styles.logInButton} onClick={handleLogin}>
        Log In
      </button>

      <span>
        Don't have an account?
        <button
          className={styles.createAccount}
          onClick={() => navigate("/teacher/register")}
        >
          Register
        </button>
      </span>
    </div>

  
  );
}

export default TSignin;
