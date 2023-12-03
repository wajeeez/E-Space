import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from "papaparse";


function Management() {
    const baseURL = process.env.React_App_INTERNAL_API_PATH;
    const navigate = useNavigate();
    const { _id } = useParams();
    const [students, setStudents] = useState([]);
    const [check, setCheck] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [emails, setEmails] = useState([]);




    useEffect(() => {
        let isMounted = true;
        axios
            .get(baseURL + `/students/getAllStudents/${_id}`)
            .then((response) => {
                if (isMounted && check === false && response.data.length === 0) {
                    toast.info('No students found.', { position: 'bottom-right' });
                    setCheck(true);
                } else {
                    console.log("Requesting");
                    // Set the non-empty array to the state
                    setStudents(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {
            isMounted = false;
        };
    }, [check, _id]);

    const handleAddStudents = () => {
        setShowModal(true);
    };

   

    const handleFileUpload = (event) => {
        // Implement your file upload logic here
        console.log("File uploaded:", event.target.files[0]);
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const valuesArray = results.data.map((d) =>
                  Object.values(d).toString()
                );
                setEmails(valuesArray);

                // const emailsArray = results.data.map((d) => d.email);
                // setEmails(emailsArray);
            },
        });
        // Close the modal after handling the file upload
        // setShowModal(false);
    };

    console.log("EMAILS => " , emails);

    const handleReg = async () => {
          setShowModal(false);
        if (emails == null || emails.length === 0) {
            toast.error("Please provide valid emails");
        } else {
            axios.post(baseURL + `/teacher/addstudents/${_id}`, { students: emails })
                .then(response => {
                    console.log(response.data);

                    if (response.data.message === 'Students added to the class successfully') {
                        toast.success("Students Added Successfully");
                    } else {
                        toast.success("Already Exits");
                    }
                })
                .catch(error => {
                    console.error(error);
                    if (error.response && error.response.status === 404) {
                        toast.error("Class not found");
                    } else {
                        toast.error("Error adding students");
                    }
                });
        }
    };

    const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [selectedStudentEmail, setSelectedStudentEmail] = useState(null);
  
    const handleRemove = (studentId, studentEmail) => {
      setSelectedStudentId(studentId);
      setSelectedStudentEmail(studentEmail);
      setShowRemoveConfirmation(true);
    };
  
    const confirmRemove = async () => {
      setShowRemoveConfirmation(false);
  
      // Make API request to remove student
      try {
        const response = await axios.post(baseURL + `/delete/student/${_id}`, {
          studentId: selectedStudentId,
          studentEmail: selectedStudentEmail,
        });
  
        if (response.data.message === 'Student removed from the class successfully') {
          toast.success('Student removed from the class successfully');
          // Optionally, update the state or fetch the updated list of students
        } else {
          toast.error('Error removing student from the class');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error removing student from the class');
      }
    };
    const row_color = {
        backgroundColor: 'transparent',
        color: 'black',
    
      }
      const head_color ={
        backgroundColor: 'transparent',
        color: 'black',
        fontWeight:'500',
      }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid" style={{  
      textAlign: 'center', marginTop: '10px', }}>
      <center> 
            <h1 style={{fontFamily:'Poppins',background:'' , padding:'5px' , color : 'black', borderRadius: '20px', marginBottom: '10px', fontWeight:'100', letterSpacing:'2px'}}>
           CLASS MANAGEMENT</h1>

            {/* <div style={{ padding: "3px", margin: '2px' }}>
                <a onClick={handleAddStudents} className='btn btn-primary' style={{ background: 'black', margin: '0px' }}>
                    <i className='bx bx-edit'></i>
                    <span style={{ color: 'white' }} className="link_name"> Add Students</span>
                </a>
            </div> */}
            <Button
            className={`btn-success`}
            onClick={handleAddStudents}
            style={{ background: '', color: 'white' , fontSize:'large' , width:'220px', height:'50px', borderRadius:'30px'
                    ,  boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.4)'}}
            >
            <i className='bx bx-edit' style={{fontSize:'22px', marginRight:'5px', marginTop:'0px'}}> </i> 
            Add Students
            </Button>

            <table className="table custom-std-table" style={{border:'1px solid silver', verticalAlign: 'middle' , boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', marginTop:'20px'}}>
                <thead style={{border:'1px solid silver', padding: '15px', verticalAlign: 'middle', textAlign:'center', background:''}} >
                        <tr >
                        <th style={{ ...head_color,width: '3%', fontSize: 'large', textAlign: 'center' }}>Sr#</th>
                        <th style={{ ...head_color,width: '7%', fontSize: 'large', textAlign: 'center' }}>Student Name</th>
                        <th style={{ ...head_color,width: '7%', fontSize: 'large', textAlign: 'center' }}>Student Email</th>
                        <th style={{ ...head_color,width: '3%', fontSize: 'large', textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center', verticalAlign: 'middle', padding: '15px', }}>
                    {students.map((student, index) => (
                        <React.Fragment key={student.i}>

                            <tr key={student.stdEmail} style={{ color: 'black', textAlign: 'center' , border:'1px solid silver'}}>
                                <td style={{...row_color , textAlign: 'center' }}>{index + 1}</td>
                                <td style={{...row_color , textAlign: 'center' }}>
                                    {student.stdName}
                                </td>
                                <td style={{...row_color , textAlign: 'center' }}>
                                    <p
                                        style={{ margin: '0px' }}
                                    >
                                        {student.stdEmail}
                                    </p>
                                </td>


                                <td style={{...row_color , textAlign: 'center' }}>
                                    <Button
                                        className="btn btn-danger "
                                        onClick={() => handleRemove(student._id,student.stdEmail)}
                                        style={{ margin: '5px', fontSize: 'medium', width: '100px', fontWeight: '400',marginTop:'0px' }}
                                    > Remove
                                    </Button>
                                </td>


                            </tr>

                            {index < students.length - 1 && (
                                <tr style={{ padding: '1px' }}>
                                    {/* <td colSpan="8" style={{ height: '0px' }}>
                                        <hr />
                                    </td> */}
                                </tr>
                            )}


                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            {/* Modal for file upload */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Students</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* File input for selecting a file */}
                    <input type="file" onChange={handleFileUpload} />
                </Modal.Body>
                <Modal.Footer>
                    {/* Button to trigger the file upload */}
                    <Button variant="primary" onClick={handleReg}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>




             {/* Modal for remove confirmation */}
      <Modal show={showRemoveConfirmation} onHide={() => setShowRemoveConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this student from the class?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRemoveConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      </center>
      </div>
        </>
    );
}

export default Management;
