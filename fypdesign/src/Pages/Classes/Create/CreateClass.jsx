import React, { useState } from "react";
import { useFormik } from "formik";
import Papa from "papaparse";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { createclass } from "../../../api/internal";
import styles from "./CreateClass.module.css";
import TextInput from "../../../Components/TextInput/TextInput";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import Loader from "../../../Components/Loader/Loader";


function CreateClass() {
  // State to store parsed data
  const [loading, setLoading] = useState(false);
  //State to store the values
  const [emails, setEmails] = useState([]);


  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const valuesArray = results.data.map((d) =>
          Object.values(d).toString()
        );

        // Update the state with the string array
        setEmails(valuesArray);
      },
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("EMAILS => " + emails);

  //TEACHER ID AND NAME FROM AUTHTOKEN

  const [tid, setTid] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setTid(decodedToken.id);
      setEmail(decodedToken.email);
      setName(decodedToken.name);
    }

  }, [tid]);

  const handleReg = async () => {
    setLoading(true)
    if (values.students == null || values.subjectName == null) {

      setError("Please Provide Details")
    } else {
      const data = {
        teacherName: name,
        teacherID: tid,
        teacherEmail: email,
        subjectName: values.subjectName,
        students: values.students,
      };
      const response = await createclass(data);


      if (response.status === 409) {
        setError(response.response.data.message);
        setLoading(false)
      }
      if (response.status === 201) {
        const teacher = {
          _id: response.data.createclassDto._id,
          email: response.data.createclassDto.teacherEmail,
          auth: response.data.createclassDto.auth,
        };

        // dispatch(setUser(teacher));
        navigate("/TDashboard");
        setLoading(false)
      } else if (response.code === "ERR_BAD_REQUEST") {
        setError(response.response.data.message);
        setLoading(false)
        if (response.status === 409) {
          setError(response.response.data.message);
        }
      }
    }






  };

  const [error, setError] = useState("");

  const { values, handleChange, errors } = useFormik({
    initialValues: {
      subjectName: "",
      students: [],
    },
  });

  values.students = [...emails];

  console.log(values.students);

  return (
   
    <>

{   loading ? (
        <Loader /> // Display the loader while loading
      ) : (

        <>
                   <div className={styles.loginWrapper}>
            <div className={styles.Intro}>
              <p>
                Teacher Name : {name} | Teacher Email : {email}
              </p>
            </div>

            <div className={styles.loginHeader}>Create Class</div>

            <TextInput
              type="text"
              value={values.subjectName}
              name="subjectName"
              onChange={handleChange}
              placeholder="subjectName"
              // error={errors.email && touched.email ? 1 : undefined}
              errormessage={errors.institute}
            />
            <input
              type="file"
              name="file"
              onChange={changeHandler}
              accept=".csv"
              style={{ display: "block", margin: "10px auto" }}
            />

            <span>
              {error !== "" ? <p className={styles.errorMessage}>{error}</p> : ""}
            </span>
            <button className={styles.logInButton} onClick={handleReg}>
              Create Class
            </button>
          </div>

        </>
      )}
    </>
  )
}
   


export default CreateClass;
