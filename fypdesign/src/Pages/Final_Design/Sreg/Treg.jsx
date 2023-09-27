import React, { useState } from 'react'
import styles from './Treg.module.css'
import TextInput from "../../../Components/TextInput/TextInput";
import regSchema from "../../../schema/regschema";
import { useFormik } from "formik";

import { Reg } from "../../../api/internal";

import { setUser } from "../../../store/userSlice";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
function Treg() {



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



  return (
    <div className={styles.App}>
      <div className={styles.loginContainer}>
        <h2 style={{color:"black"}}>Register</h2>
        <div className={styles.input_container}>
          <input

            type="text"
            value={values.tname}
            name="tname"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Teacher Name"
            // error={errors.email && touched.email ? 1 : undefined}
            errormessage={errors.tname}
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
            errormessage={errors.password} />
        </div>

        {/* <div className={styles.input_container}>
        <label>Password </label>
        <input type="password" name="pass" required />
      </div> */}

        {/* <label>
        {" "}
        <a href="#">Forget password?</a>
      </label> */}

        <button className={styles.loginBut} onClick={handleReg}>Register</button>
        <div>
        <span>
        {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
      </span>
        </div>
        {/* <p className={styles.p}>Don't have an account?<span><a href="#">Register here</a></span></p> */}
        <label className={styles.p}>Already having an account?</label>
        <label>
          {" "}
          <a href= "/teacher/login" >  Login here</a>
        </label>

      </div>
    </div>

  )
}

export default Treg