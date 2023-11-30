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


    return (
        <>
            <ToastContainer />
            <div style={{ background: "white", padding: "3px" }}>
                <h1 style={{ color: 'black', textAlign: 'center' }}>Class Management</h1>
            </div>
            <div style={{ padding: "3px", margin: '2px' }}>
                <a onClick={handleAddStudents} className='btn btn-primary' style={{ background: 'black', margin: '0px' }}>
                    <i className='bx bx-edit'></i>
                    <span style={{ color: 'white' }} className="link_name"> Add Students</span>
                </a>
            </div>

            <table className="table " style={{ border: '1px solid white', marginTop: '1px' }}>
                <thead style={{ border: '1px solid black', padding: '3px' }} >
                    <tr >
                        <th style={{ width: '5%', fontSize: 'large', textAlign: 'center' }}>Sr#</th>
                        <th style={{ width: '5%', fontSize: 'large', textAlign: 'center' }}>Student</th>
                        <th style={{ width: '5%', fontSize: 'large', textAlign: 'center' }}>Email</th>
                        <th style={{ width: '5%', fontSize: 'large', textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <React.Fragment key={student.i}>

                            <tr key={student.stdEmail} style={{ color: 'black', textAlign: 'center' }}>
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td>
                                    {student.stdName}
                                </td>
                                <td>
                                    <p
                                        style={{ margin: '0px' }}
                                    >
                                        {student.stdEmail}
                                    </p>
                                </td>


                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(student._id,student.stdEmail)}
                                    >Remove</button>
                                </td>


                            </tr>

                            {index < students.length - 1 && (
                                <tr style={{ padding: '1px' }}>
                                    <td colSpan="8" style={{ height: '0px' }}>
                                        <hr />
                                    </td>
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
        </>
    );
}

export default Management;
