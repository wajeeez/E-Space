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
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal } from 'react-bootstrap';

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


  // background:'linear-gradient(to right, #8539d1 30%, #fc10f2 100%)' ,
  return (
   
    <>

{   loading ? (
        <Loader /> // Display the loader while loading
      ) : (

        <div className="container-fluid" style={{background:'linear-gradient(to right, #8539d1 30%, #fc10f2 100%)' , marginTop: '10px', 
        overflow:'hidden', padding:'20px' , display: 'flex', justifyContent: 'center'
        , alignItems: 'center', minHeight: '100vh',marginTop:'0px' }}>
         <center>

         <div className="container-fluid classc" style={{background:'white', 
         padding: '5rem 3rem' , minWidth:'350px',maxWidth:'600px', border:'2px solid silver', 
         borderRadius:'30px', boxShadow: '10px 10px 20px  rgba(0, 0, 0, 0.4)'}}>

         <h1 style={{ fontFamily:'Poppins',padding:'5px' , color : 'black', borderRadius: '20px', marginBottom:'40px', fontWeight:'400',}}>
            Create A New Class</h1>
                <Form.Group controlId="subjectName" >
                  
                  <Form.Control
                    type="text"
                    value={values.subjectName}
                    name="subjectName"
                    onChange={handleChange}
                    placeholder="Class Name"
                    style={{maxWidth:'350px', textAlign:'center',
                     fontSize:'22px', height:'50px' , borderRadius:'16px', marginBottom:'30px'
                    ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
                  />
                  
                  <Form.Text className="text-danger">{errors.subjectName}</Form.Text>
                </Form.Group>
 
                <Form.Group>
                  <Form.Control
                    type="file"
                    name="file"
                    onChange={changeHandler}
                    accept=".csv"
                    label="Choose CSV file"
                    style={{maxWidth:'350px', textAlign:'center',
                     fontSize:'16px',padding:'10px' , borderRadius:'16px',boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
                  />
                </Form.Group>

                <h6 style={{marginTop:'30px',color:'red'}}>
                  "Only CSV File is accepted!!!
                 <br/> First column contains only Student Emails
                </h6>

                <Form.Group>
                  {error !== "" && <p className={styles.errorMessage}>{error}</p>}
                </Form.Group>

                <Button variant="success" onClick={handleReg}
                  style={{ marginTop:'20px', color: 'white' , fontSize:'22px' , width:'180px', height:'50px', borderRadius:'30px'
                  , boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.4)'}} 
                  >
                  Create
                </Button>
                <br/>
                {/* <Button variant="danger" onClick={() => navigate('/TDashboard')}
                 style={{ fontSize:'18px'}}>
                Cancel
                </Button> */}
              


            </div>



         </center>

                   {/* <div className={styles.loginWrapper}>
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
          </div> */}

        </div>
      )}
    </>
  )
}
   


export default CreateClass;
