import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import styles from './stdAssignment.module.css'
import { StudentSubmissions } from '../../../api/internal'
import jwt_decode from "jwt-decode";
import FormattedDate from '../../../Components/DateFormate/DateFormater'
import { boolean } from 'yup';
import { Form, Button } from 'react-bootstrap';
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StdTable = () => {

  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  const [getFileURL, setFileURL] = useState(null)
  const currentDate = new Date(); // Get the current date
  const [selectedFile, setSelectedFile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [teacherName, setTeacherName] = useState([]);
  const [subjectName, setsubjectName] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(null);
  const { _id } = useParams();
  const [fileURLsByIndex, setFileURLsByIndex] = useState([]);
  const [stdEmail, setEmail] = useState()
  const [StudentName, setStudentName] = useState();
  const [Subbtn, setSubbtn] = useState(false);


  //SubmisionBTn 

  //getting submission files 
  const [submissionMapping, setSubmissionMapping] = useState({});
  const [marksMapping, setmarksMapping] = useState({});
  const [remarksMapping, setremarksMapping] = useState({});
  // Function to update the submission mapping






  const updateSubmissionMapping = (assignmentFileURL, submissionFileURL) => {
    setSubmissionMapping((prevMapping) => ({
      ...prevMapping,
      [assignmentFileURL]: submissionFileURL,
    }));
  };


  const updateMarksMapping = (submissionFileURL, marks) => {
    setmarksMapping((prevMapping) => ({
      ...prevMapping,
      [submissionFileURL]: marks,
    }));
  };

  const updateReMarksMapping = (submissionFileURL, remarks) => {
    setremarksMapping((prevMapping) => ({
      ...prevMapping,
      [submissionFileURL]: remarks,
    }));
  };

  useEffect(() => {
    const authToken = localStorage.getItem("StdToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setEmail(decodedToken.email);


      // Fetch classes for the logged-in user from the server
      axios
        .get(baseURL + `/student/studentData/${decodedToken.email}`)
        .then((response) => {
          // console.log(response.data.response);
          setStudentName(response.data.response.stdName);

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);








  let fileURLs = {};
  axios
    .get(baseURL + `/teacher/assignments/list/${_id}`)
    .then((response) => {
      if (response.data) {
        fileURLs = response.data.reduce((accumulator, item, index) => {
          accumulator[index] = item.fileURL;
          return accumulator;
        }, {});
        // console.log(fileURLs); // Log the updated value of fileURLs
      }
    })
    .catch((error) => {
      console.log(error);
    });




  //SUbmission

  const getSubmission = (fileURL) => {

    const authToken = localStorage.getItem("StdToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setEmail(decodedToken.email);




      axios
        .get(baseURL + `/student/submitted`, {
          params: {
            fileURL: fileURL,
          }
        }, { responseType: 'blob' })
        .then((response) => {
          // console.log(response);



          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          const blobURL = URL.createObjectURL(blob);
          window.open(blobURL, '_blank');
          URL.revokeObjectURL(blobURL);


        })
        .catch((error) => {
          console.log(error);
        });
    }


  }

  //Submission









  useEffect(() => {
    axios
      .get(baseURL + `/teacher/class/${_id}`)
      .then((response) => {

        setTeacherName(response.data.response.teacherName);
        setsubjectName(response.data.response.subjectName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    axios
      .get(baseURL + `/teacher/assignments/list/${_id}`)
      .then((response) => {
        if (response.data) {
          //  fileURLs = response.data.reduce((accumulator, item, index) => {
          //   accumulator[index] = item.fileURL;
          //   return accumulator;
          // }, {});
          setAssignments(response.data);


        }
      })
      .catch((error) => {
        console.log(error);
      });


  }, [_id])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  console.log(selectedFile)

  const submit_assignments = async () => {

    setDialogVisible(false)

    console.log(selectedFile)

    //Problem is this code is runing before file change and imedialty after file broweser opens
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('Email', stdEmail)
      formData.append('classId', _id);
      formData.append('assignmentFileURL', getFileURL)
      formData.append('deadline', currentDate); // Append the deadline value
      for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
      }


      const response = await StudentSubmissions(formData);

      if (response.status === 201 || response.status === 200) {
        setMessage("Successfull")
        console.log("Successfull")
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset the input field
        }

        setTimeout(() => {
          window.location.reload(); // Reload the page after a delay (e.g., 2 seconds)
        }, 2000); // Adjust the delay (in milliseconds) as needed
      } else if (response.code === "ERR_BAD_REQUEST") {
        // setError(response.response.mes);
        console.log("BAD REQUES")
        if (response.response.status === 500) {
          console.log("500 BAD REQUEST ")
        }


        if (response.response.status === 401) {
          setMessage(response.response.data.message);
          console.log("401")

        }
      }






    } else {

      console.log(selectedFile + "ERROR")
    }








  }


  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  //Submisision Btn






  const openFileInBrowser = (fileURL) => {

    console.log(fileURL)

    axios
      .get(baseURL + `/files/${fileURL}`, { responseType: 'blob' })
      .then((response) => {




        // console.log(response.data.response.name)




        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const blobURL = URL.createObjectURL(blob);
        console.log(blobURL)
        console.log(response.name)

        window.open(blobURL, '_blank');
        URL.revokeObjectURL(blobURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const openFile = (fileURL) => {

    console.log(fileURL)

    axios
      .get(baseURL + `/submission/${fileURL}`, { responseType: 'blob' })
      .then((response) => {



        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL, '_blank');
        URL.revokeObjectURL(blobURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };





  //CHECKING IF ANY ASSIGNMENT WAS UPLOADED BY STUDENT
  useEffect(() => {
    const authToken = localStorage.getItem('StdToken');
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      const Email = decodedToken.email;
      const classId = _id;


      if (Email && classId) { // Check if both userEmail and _id are truthy
        const data = {
          classId,
          Email
        };

        axios
          .get(baseURL + '/student/getSubmitedFileURL', {
            params: {
              classId,
              Email,
            },
          })
          .then((response) => {
            if (response.data && response.data.response) {

              const responses = response.data.response; // Assuming response.data.response is an array

              responses.forEach((assignment) => {
                const assignmentFileURL = assignment.assignmentFileURL;
                const submissionFileURL = assignment.submissionFileURL;
                const marks = assignment.marks;
                const remarks = assignment.remarks;
                // Call updateSubmissionMapping for each assignment

                console.log(assignmentFileURL,submissionFileURL)
                updateSubmissionMapping(assignmentFileURL, submissionFileURL);
                updateMarksMapping(submissionFileURL, marks)
                updateReMarksMapping(submissionFileURL, remarks)
              });


              // console.log(response.data.response.assignmentFileURL)
              // const submissionFileURL = response.data.response.submissionFileURL;
              // console.log(response.data)
              // updateSubmissionMapping(response.data.response.assignmentFileURL, submissionFileURL);
              console.log(submissionMapping);




            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("EMAIL OR CLASSID is not AVAILABLE")
      }
    }




  }, []);






  const row_color = {
    backgroundColor: 'transparent',
    color: 'black',
  }
  const head_color = {
    backgroundColor: 'transparent',
    color: 'black',
    fontWeight:'500',
  }


  const handleSubmissionClicks = (assignmentFileURL) => {
    // Handle the submission for the specific assignment
    console.log(`Clicked on assignment: ${assignmentFileURL}`);
    setFileURL(assignmentFileURL)
    openDialog()

  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleSubmissionClick = (assignmentFileURL) => {
    console.log(`Clicked on assignment: ${assignmentFileURL}`);
    setFileURL(assignmentFileURL);
    openModal();
  };



  const fetchData = () => {
    // Fetch the updated data
    axios
      .get(baseURL + `/teacher/assignments/list/${_id}`)
      .then((response) => {
        if (response.data) {
          const updatedAssignments = response.data;
  
          // Update the state with the new data
          setAssignments(updatedAssignments);
  
          // Update submissionMapping, marksMapping, remarksMapping, etc.
          const updatedSubmissionMapping = {};
          const updatedMarksMapping = {};
          const updatedRemarksMapping = {};
  
          updatedAssignments.forEach((assignment, index) => {
            const assignmentFileURL = assignment.fileURL;
            const submissionFileURL = assignment.submissionURL;
            const marks = assignment.marks;
            const remarks = assignment.remarks;
  
            updatedSubmissionMapping[assignmentFileURL] = submissionFileURL;
            updatedMarksMapping[submissionFileURL] = marks;
            updatedRemarksMapping[submissionFileURL] = remarks;
          });
  
          setSubmissionMapping(updatedSubmissionMapping);
          setmarksMapping(updatedMarksMapping);
          setremarksMapping(updatedRemarksMapping);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const submit_assignment = async () => {
    setShowModal(false); // Close the modal

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('Email', stdEmail);
      formData.append('classId', _id);
      formData.append('assignmentFileURL', getFileURL);
      formData.append('deadline', currentDate);
      try {
        const response = await StudentSubmissions(formData);
  
        if (response.status === 201 || response.status === 200) {
          setMessage("Successful");
  
          // Update the state only for the specific assignment
          setSubmissionMapping((prevMapping) => ({
            ...prevMapping,
            [getFileURL]: response.data.submissionURL,
          }));
  
          // You can similarly update marksMapping and remarksMapping if needed
  
          // Reset the input field
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
  
          // Fetch the updated data after a successful submission
          fetchData();
        } else if (response.code === "ERR_BAD_REQUEST") {
          // Handle other cases
        }
      } catch (error) {
        console.error('Error submitting assignment:', error);
      }
    } else {
      console.log(selectedFile + " ERROR");
    }
  };

  const deleteSubmission = async (submissionURL, assignURL) => {
    try {
      // Make the axios request to delete the submission
      const response = await axios.post(baseURL + `/student/delete/submission/${submissionURL}`, { assignURL });
  
      if (response.status === 200) {
        toast.success("Assignment Deleted successfully ");
  
        // Update the state only for the specific assignment
        setSubmissionMapping((prevMapping) => ({
          ...prevMapping,
          [assignURL]: undefined, // Set to undefined or null based on your logic
        }));
  
        // You can similarly update marksMapping and remarksMapping if needed
  
        // Fetch the updated data after a successful deletion
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
      toast.error("Assignment Deleted successfully ");
    }
  };

  // const modalContent = ({ show, submit_assignment, closeModal }) => {
  //   return(
  //   <Modal show={show} onHide={closeModal} centered style={{ backgroundColor: 'transparent' }}>
  //     <Modal.Header closeButton>
  //       <Modal.Title>Submit Assignment</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>
  //       <h5>Max 15mb File</h5>
  //       <h5 style={{ color: 'red', marginBottom: '10px', marginTop: '10px' }}>
  //         only (.zip , .pdf , .docx )files
  //       </h5>
  //       <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '' }}>
  //         <Form.Control
  //           type="file"
  //           ref={fileInputRef}
  //           onChange={handleFileChange}
  //           className={`custom-file-input`}
  //           style={{ background: 'grey', color: 'white' }}
  //         />
  //       </Form.Group>
  //       </Modal.Body>
  //     <Modal.Footer className="justify-content-center align-items-center d-flex">
  //       <Button
  //         type="button"
  //         className="btn btn-primary"
  //         onClick={submit_assignment}
  //         style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
  //       >
  //         Submit
  //       </Button>
  //       <Button
  //         type="button"
  //         variant="secondary"
  //         onClick={closeModal}
  //         style={{ marginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
  //       >
  //         Cancel
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>
  // );
  //   }



  // const [showEModal, setShowEModal] = useState(false);
  // const openEModal = () => {
  //   setShowEModal(true);
  // };

  // const closeEModal = () => {
  //   setShowEModal(false);
  // };
  // const handleEditClick = (assignmentFileURL) => {
  //   setFileURL(assignmentFileURL);
  //   openEModal();
  // };
  // const esubmit_assignment = async () => {
  //   setShowEModal(false); // Close the modal

  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);
  //     formData.append('Email', stdEmail);
  //     formData.append('classId', _id);
  //     formData.append('assignmentFileURL', getFileURL);
  //     formData.append('deadline', currentDate);

  //     const response = await StudentSubmissions(formData);

  //     if (response.status === 201 || response.status === 200) {
  //       setMessage("Successful");
  //       console.log("Successful");

  //       // Fetch and update the list of submitted assignments without reloading the page
  //       axios
  //         .get(baseURL + `/teacher/class/${_id}`)
  //         .then((response) => {
  //           console.log(response.data);
  //           // setUploadedAssignments(response.data.assignments);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });

  //       if (fileInputRef.current) {
  //         fileInputRef.current.value = ''; // Reset the input field
  //       }
  //     } else if (response.code === "ERR_BAD_REQUEST") {
  //       console.log("BAD REQUEST");

  //       if (response.response.status === 500) {
  //         console.log("500 BAD REQUEST ");
  //       }

  //       if (response.response.status === 401) {
  //         setMessage(response.response.data.message);
  //         console.log("401");
  //       }
  //     }
  //   } else {
  //     console.log(selectedFile + " ERROR");
  //   }
  // }





  return (
    <div className="container-fluid" style={{
      textAlign: 'center', marginTop: '0px',
    }}>
      <center>

      {/* <button
          className="btn btn-primary"
          style={{ position: 'absolute', top: '10px', right: '10px', fontSize: 'large' }}
          // onClick={handleRefresh}
          title='Refresh Page'

        >
          <FontAwesomeIcon icon={faSync} />
          
        </button> */}
  <h1 style={{fontFamily:'Poppins',background:'' , padding:'5px' , color : 'black', borderRadius: '20px', marginBottom: '10px', fontWeight:'100', letterSpacing:'2px'}}>
           ASSIGNMENTS</h1>
        {/* <p>
          Student Name: {StudentName} | Email: {stdEmail}
    </p> */}

      <table className="table custom-std-table" style={{border:'0px solid silver', verticalAlign: 'middle' , 
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',borderRadius:'5px'}}>
        <thead style={{border:'0px solid silver' , padding: '15px', verticalAlign: 'middle', textAlign:'center', 
        background:'' }} >
          <tr >
            <th style={{ ...head_color,width: '2%' , fontSize:'large' }}>Sr#</th>
            <th style={{ ...head_color,width: '7%', fontSize:'large'  }}>Title</th>
            <th style={{ ...head_color,width: '10%', fontSize:'large'  }}>Assignment</th>
            <th style={{ ...head_color,width: '10%', fontSize:'large'  }}>Remarks</th>
            <th style={{ ...head_color,width: '9%', fontSize:'large'  }}>Marks Obtained</th>
            <th style={{ ...head_color,width: '10%', fontSize:'large'  }}>Submission</th>
            <th style={{ ...head_color,width: '10%', fontSize:'large'  }}>Deadline</th>
            <th style={{ ...head_color,width: '10%', fontSize:'large' }}>Action</th>
          </tr>
        </thead>
        <tbody style={{}}>
          {assignments.map((assignment, index) => (
            <tr key={index} style={{textAlign:'center'}}>
              <td style={{...row_color }}>{index + 1}</td>
              <td style={{...row_color }}>
                {/* Content */}
              </td>

              <td  style={{...row_color }}>
               <>
                <button
                  className="btn btn-primary " style={{margin: '2px', fontSize: 'small',backgroundColor: 'rgba(0, 0, 255, 0.6)'}}
                  onClick={openFileInBrowser.bind(null, assignment.fileURL)}
                >
                  Assignment
                </button>
                
                {/* <button
                  className="btn btn-secondary" style={{margin: '2px', fontSize: 'small'}}
                  onClick={openFileInBrowser.bind(null, assignment.fileURL)}
                >
                  Solution
                </button> */}
                  </>
                </td>
                {/* <td  style={{...row_color }}>
               <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button
                  className="btn btn-primary " style={{margin: '2px', fontSize: 'small'}}
                  onClick={openFileInBrowser.bind(null, assignment.fileURL)}
                >
                  Assignment
                </button>
              
                <button
                  className="btn btn-secondary" style={{margin: '2px', fontSize: 'small'}}
                  onClick={openFileInBrowser.bind(null, assignment.fileURL)}
                >
                  Solution
                </button>
                </div>
              </td> */}


                <td style={{ ...row_color }}>
                  {remarksMapping[submissionMapping[assignment.fileURL]]
                    ? remarksMapping[submissionMapping[assignment.fileURL]]
                    : ' --- '}
                </td>
                <td style={{ ...row_color }}>
                  {marksMapping[submissionMapping[assignment.fileURL]]
                    ? marksMapping[submissionMapping[assignment.fileURL]]
                    : 'Not marked yet'}
                </td>
               
                <td style={row_color}>


                 

                  <div style={{ alignItems: 'center' }}>
                    {assignment.submissionURL != "" ? (
                      <div >
                        <button
                          className="btn btn-success"
                          style={{ margin: '2px', fontSize: 'small' }}
                          onClick={() => {
                            openFile(assignment.submissionURL);
                          }}
                        >
                          View Submission
                        </button >
                        {currentDate <= new Date(assignment.deadline) && (
                          <button
                            className="btn btn-danger"
                            style={{ margin: '2px', fontSize: 'small' }}
                          onClick={() => deleteSubmission(assignment.submissionURL,assignment.fileURL)}
                          >
                            Delete
                          </button>
                        )}
                        
                      </div>
                    ) : (
                      <span>
                        {currentDate > new Date(assignment.deadline) ? (
                          <h6 style={{ fontSize: '', color: 'red', textAlign: 'center' }}>No Submission</h6>
                        ) : (
                          <button
                            className="btn btn-primary"
                            style={{ margin: '2px', fontSize: 'small' }}
                            onClick={() => handleSubmissionClick(assignment.fileURL)}
                            disabled={currentDate > new Date(assignment.deadline)} // Disable if deadline has exceeded
                          >
                            Submission
                          </button>
                        )}
                      </span>
                    )}
                  </div>


                </td>



                <td style={{ ...row_color }}>
                  <FormattedDate rawDate={assignment.deadline} />
                </td>

                <td style={{ ...row_color }}>
                    {submissionMapping[assignment.fileURL] ? (
                      // Submission has been made
                      currentDate <= new Date(assignment.deadline) ? (
                        <></>
                      ) : (
                        // Submission made, but after the deadline
                        <button
                          className="btn btn-danger"
                          disabled
                          style={{
                            margin: '2px',
                            fontSize: 'small',
                            cursor: 'default',
                            boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.4)',
                            background: '#cc3035',
                          }}
                        >
                          Deadline Exceeded
                        </button>
                      )
                    ) : (
                      // No submission made
                      currentDate > new Date(assignment.deadline) ? (
                        // Deadline has exceeded, and no submission made
                        <button
                          className="btn btn-danger"
                          style={{
                            margin: '2px',
                            fontSize: 'small',
                            cursor: 'default',
                            boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.4)',
                            background: '#cc3035',
                          }}
                        >
                          Deadline Exceeded
                        </button>
                      ) : (
                        <></>
                      )
                    )}

                      {submissionMapping[assignment.fileURL] ? (
                        // Both conditions are true (submission has been made for both assignment.id and assignment.fileURL)
                        currentDate <= new Date(assignment.deadline) ? (
                          <button
                            className="btn btn-success"
                            style={{
                              margin: '2px',
                              fontSize: 'medium',
                              cursor: 'default',
                              boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.4)',
                              background: 'green',
                              border: 'none',
                            }}
                          >
                            Submitted
                          </button>
                        ) : (
                          <></>
                        )
                      ) : (
                        // One or both conditions are false
                        currentDate > new Date(assignment.deadline) ? (
                          <></>
                        ) : (
                          <button
                            className="btn"
                            style={{
                              margin: '2px',
                              backgroundColor: 'yellow',
                              color: 'black',
                              fontSize: 'small',
                              cursor: 'default',
                              border: 'none',
                              boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.4)',
                            }}
                          >
                            Not Submitted
                          </button>
                        )
                      )}

                  </td>


              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={showModal} onHide={closeModal} centered
          style={{ background: 'transparent', }}>
          <Modal.Header closeButton>
            <Modal.Title>Submit Assignment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Max 15mb File</h5>
            <h6 style={{ color: 'red', marginBottom: '20px', marginTop: '10px' }}>only (.zip , .pdf , .docx )files</h6>
            
            <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '' }}>
              <Form.Control
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className={`custom-file-input`}
                style={{ background: 'grey', color: 'white' }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="justify-content-center align-items-center d-flex">
            <Button type="button" className="btn btn-primary" onClick={submit_assignment}
              style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={closeModal}
              style={{ marginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="text-center">
          {message !== '' && <p className="text-danger">{message}</p>}
        </div>

      </center>

    </div>
  );




};

export default StdTable;
