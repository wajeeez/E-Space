import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TeacherAssignmentUpload } from '../../../api/internal';
import { useParams } from "react-router-dom";
import styles from './Assignment.module.css'
import AssignmentList from '../AssigmentList/AssignmentList';
import { Form, Button } from 'react-bootstrap';
import { Modal, InputGroup, FormControl } from 'react-bootstrap';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
// import EditAssignment from './EditAssignment';
// import ReactTooltip from 'react-tooltip';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles



const SQuiz = () => {

  //Update Edit Modal Variables _edt 
  // formData.append('file', selectedFile);
  // formData.append('classId', _id);
  // formData.append('fileName', title);
  // formData.append('teacherID', teacherID);
  // formData.append('subjectName', subjectName);
  // formData.append('deadline', deadline); // Append the deadline value
  // formData.append('title', title);
  // formData.append('totalMarks', totalMarks);

  const [assignmentID_edit,setassignmentID_edit] = useState('')
  const [deadline_edt,setDeadline_edt] = useState('')
  const [title_edt,settitle_edt] = useState('')
  const [totalMarks_edt,setTotalMarks_edt] = useState('')
  const [selectedFile_edt,setselectedFile_edt] = useState('')


  const handleTitleChange_edt = (event) => {
    settitle_edt(event.target.value);
  };
  


const handleTotalMarks_edt = (event) => {
  setTotalMarks_edt(event.target.value);
};

const handleFileChange_edt = (event) => {
  setselectedFile_edt(event.target.files[0]);
};
const handleDeadlineChange_edt = (event) => {
  setDeadline_edt(event.target.value);
};







 

  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



  const [title, setTitle] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [deadline, setDeadline] = useState('');
  const [time, setTime] = useState('');
  const [teacherID, setteacherID] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const { _id } = useParams();

  useEffect(() => {

    axios
      .get(baseURL + `/teacher/class/${_id}`)
      .then((response) => {
        console.log(_id)
        console.log(response.data.response.teacherID)
        console.log(response.data.response.subjectName)
        setteacherID(response.data.response.teacherID)
        setSubjectName(response.data.response.subjectName)
      })
      .catch((error) => {
        console.log(error);
      });
  })



  useEffect(() => {
    axios
      .get(baseURL + `/teacher/class/${_id}`)
      .then((response) => {
        console.log(_id)
        console.log(response.data.response.teacherID)
        console.log(response.data.response.subjectName)

        setteacherID(response.data.response.teacherID)
        setSubjectName(response.data.response.subjectName)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);





  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };



  const [wmessage, setWMessage] = useState(null);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTotalMarksChange = (event) => {
    setTotalMarks(event.target.value);
  };



  const teacherAssignmentUpload = async () => {



    if (!selectedFile || !teacherID || !subjectName || !deadline || !time) {

      toast.error('Data Missing Please Select a File and Deadline ', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast after 3 seconds
      });
      // setMessage("Data Missing Please Select a File and Deadline")
    } else {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('classId', _id);
      formData.append('fileName', title);
      formData.append('teacherID', teacherID);
      formData.append('subjectName', subjectName);
      formData.append('deadline', deadline); // Append the deadline value
      formData.append('time', time)
      formData.append('title', title);
      formData.append('totalMarks', totalMarks);


      const response = await TeacherAssignmentUpload(formData);

      if (response.status === 201 || response.status === 200) {
        setMessage("Successfully Uploaded!!!")
        console.log("Successfull")

        // Reset Form controls
        setTitle('');
        setSelectedFile(null);
        setDeadline('');
        setTime('')
        setTotalMarks('');

        setTimeout(() => {
          setMessage("");
        }, 3000);
        if (fileInputRef.current) {
          fileInputRef.current.value = '  '; // Reset the input field
        }
        setRefreshData(true);
      } else if (response.code === "ERR_BAD_REQUEST") {
        // setError(response.response.mes);
        console.log("BAD REQUEST")

        if (response.response.status === 401) {
          setWMessage(response.response.data.message);
          console.log("401")
          setTimeout(() => {
            setWMessage("");
          }, 3000);
        }
      }
    }



  }
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    // Fetch assignments data when refreshData is true
    if (refreshData) {
      axios
        .get(baseURL + `/teacher/assignments/list/${_id}`)
        .then((response) => {
          if (response.data) {
            setAssignments(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // Reset the refreshData state
      setRefreshData(false);
    }
  }, [refreshData, _id]);


  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdate = async ( title, file, deadline, totalMarks ) => {

    // Validate the input fields
    if (!file || !teacherID  || !deadline) {

      toast.error('Data Missing Please Select a File and Deadline', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast after 3 seconds
      });
      return
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('classId', _id);
    formData.append('fileName', title);
    formData.append('teacherID', teacherID);
    formData.append('subjectName', subjectName);
    formData.append('deadline', deadline); // Append the deadline value
    formData.append('title', title);
    formData.append('totalMarks', totalMarks);


    console.log(assignmentID_edit)
    axios.post(baseURL + `/teacher/editAssignment/${assignmentID_edit}`, formData)
      .then(response => {
        if (response == 200) {

          toast.success("SUCCESSFULLY UPDATED")

        } else {

          toast.error("ERROR UPDATED")
        }
      })
      .catch(error => {
        // Handle the error
        toast.error("ERROR UPDATED")
      });




  };


  // Add a state variable to track the selected assignment for updating
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Function to handle the "Edit" button click
  const handleShowUpdateModal = async (assignmentId) => {
    // Find the assignment in the assignments array

    console.log(assignmentId)
    const assignmentToUpdate = assignments.find((assignment) => assignment._id === assignmentId);
    setassignmentID_edit(assignmentId)
    // Set the values for the update modal
    // setAssignmentDetails_edt({ ...assignmentDetails_edt,totalMarks:assignmentToUpdate.totalMarks  ,title:assignmentToUpdate.title})
    // setUpdateTitle(assignmentToUpdate.title || '');
    // setUpdateTotalMarks(assignmentToUpdate.totalMarks || '');
    // setUpdateDeadline(formatDate(assignmentToUpdate.deadline) || '');

   

    // Show the update modal
    setShowUpdateModal(true);
  };


  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleCloseUpdateModal = () => {
    // Reset state values to clear the input fields
    setUpdateTitle('');
    setUpdateSelectedFile(null);
    setUpdateDeadline('');
    setUpdateTotalMarks('');

    // Close the update modal
    setShowUpdateModal(false);
  };

  const handleUpdateFileChange = (event) => {
    setUpdateSelectedFile(event.target.files[0]);
  };
  const handleUpdateDeadlineChange = (event) => {
    setUpdateDeadline(event.target.value);
  };

  const handleUpdateTitleChange = (event) => {
    setUpdateTitle(event.target.value);
  };

  const handleUpdateTotalMarksChange = (event) => {
    setUpdateTotalMarks(event.target.value);
  };

  const [updateTitle, setUpdateTitle] = useState('');
  const [updateSelectedFile, setUpdateSelectedFile] = useState(null);
  const [updateDeadline, setUpdateDeadline] = useState('');
  const [updateTotalMarks, setUpdateTotalMarks] = useState('');
  const [updateMessage, setUpdateMessage] = useState(null);





  //New functions 









  // handleUpdateTitleChange,handleUpdateTotalMarksChange,
  // const UpdateAssignmentModal = ({
  //   show,
  //   handleClose,
  //   handleFileChange_edt,
  //   handleDeadlineChange_edt,
  //   handleUpdate,
  //   updateMessage,
  //   handleTitleChange_edt,
  //   handleTotalMarks_edt,
  // }) => {

  //   return (
  //     <Modal show={show} onHide={handleClose} centered>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Update Assignment</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form.Group className="mb-3">
  //           <Form.Control
  //             type="text"
  //             // placeholder="Title"
  //             // value={updateAssignmentDetails.title}
  //             value={title_edt}
  //             onChange={handleTitleChange_edt}
  //             style={{ textAlign: 'center' }}
  //           />
  //         </Form.Group>

  //         <Form.Group className="mb-3">
  //           <Form.Control
  //             type="file"
  //             onChange={handleFileChange_edt}
  //             ref={fileInputRef}
  //             className={`custom-file-input`}
  //             style={{ background: 'grey', color: 'white' }}
  //           />
  //         </Form.Group>

  //         <Form.Group className="mb-3">
  //           <Form.Control
  //             type="date"
  //             // value={updateAssignmentDetails.deadline}
  //             value={deadline_edt}
  //             onChange={handleDeadlineChange_edt}
  //             ref={fileInputRef}
  //             min={getCurrentDate}
  //             className={styles.assignmentButton}
  //             style={{ color: '' }}
  //           />
  //         </Form.Group>

  //         <Form.Group className="mb-3">
  //           <Form.Control
  //             type="number"
  //             // placeholder="Total Marks"
  //             // value={updateAssignmentDetails.totalMarks}
  //             value={totalMarks_edt}
  //             onChange={handleTotalMarks_edt}
  //             style={{ textAlign: 'center' }}
  //           />
  //         </Form.Group>
  //         <span>{updateMessage !== "" && <p className={styles.errorMessage}>{updateMessage}</p>}</span>
  //       </Modal.Body>
  //       <Modal.Footer className="justify-content-center align-items-center d-flex">
  //         <Button
  //           variant="success"
  //           onClick={handleUpdate}
  //           style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
  //         >
  //           Update
  //         </Button>
  //         <Button
  //           variant="danger"
  //           onClick={handleClose}
  //           style={{ marginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
  //         >
  //           Cancel
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // };

  const UpdateAssignmentModal = ({
    show,
    handleClose,
    

    
  }) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [deadline, setDeadline] = useState('');
    const [time, setTimeEdt] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
  
    const {_id} = useParams()
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleDeadlineChange = (e) => {
      setDeadline(e.target.value);
    };
  
    const handleTotalMarksChange = (e) => {
      setTotalMarks(e.target.value);
    };

    const handleTimeChangeEdt = (e) => {
      setTimeEdt(e.target.value);
    };



    const handleUpdate = ({ title, file, deadline, totalMarks }) =>{

      console.log(file)
      console.log(title)
      console.log(deadline)
      console.log(totalMarks)
      console.log(teacherID)
      console.log(time)
      console.log(subjectName)
      console.log(_id)

      if (!file || !teacherID  ) {

        toast.error('Assignment File is required ', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close the toast after 3 seconds
        });
        return
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('classId', _id);
      formData.append('fileName', title);
      formData.append('teacherID', teacherID);
      formData.append('subjectName', subjectName);
      formData.append('deadline', deadline); // Append the deadline value
      formData.append('title', title);
      formData.append('time', time);
      formData.append('totalMarks', totalMarks);
  
  
      console.log(assignmentID_edit)
      axios.post(baseURL + `/teacher/editAssignment/${assignmentID_edit}`, formData)
        .then(response => {
          if (response.status == 200) {
  
            toast.success("SUCCESSFULLY UPDATED")
            window.location.reload()
            handleClose()
            
          } 
        })
        .catch(error => {
          // Handle the error
          toast.error("ERROR UPDATED")
        });
  
  

    }








  
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
              style={{ textAlign: 'center' }}
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              onChange={handleFileChange}
              className={`custom-file-input`}
              style={{ background: 'grey', color: 'white' }}
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Control
              type="date"
              value={deadline}
              onChange={handleDeadlineChange}
              min={getCurrentDate()}
              className={styles.assignmentButton}
              style={{ color: '' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Control

                type="time"
                value={time}
                onChange={handleTimeChangeEdt}
                className={styles.assignmentButton}
              />
            </Form.Group>
          



  
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              value={totalMarks}
              onChange={handleTotalMarksChange}
              style={{ textAlign: 'center' }}
            />
          </Form.Group>
          
        </Modal.Body>
        <Modal.Footer className="justify-content-center align-items-center d-flex">
          <Button
            variant="success"
            onClick={() => handleUpdate({ title, file, deadline, totalMarks })}
            style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
          >
            Update
          </Button>
          <Button
            variant="danger"
            onClick={handleClose}
            style={{ marginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  




  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const [assignmentToDeleteId, setAssignmentToDeleteId] = useState(null);
  const handleDeleteClick = (assignmentId) => {
    setAssignmentToDeleteId(assignmentId);
    setShowDeleteModal(true);
  };


  const handleDeleteConfirmed = async () => {
    try {
      const response = await axios.post(baseURL + `/teacher/assignments/${assignmentToDeleteId}`);
      if (response.status === 200) {
        // Assignment deleted successfully, update the state
        setAssignments((prevAssignments) =>
          prevAssignments.filter((assignment) => assignment._id !== assignmentToDeleteId)
        );

        // Close the delete modal
        setShowDeleteModal(false);
      } else {
        console.error('Failed to delete assignment');
      }
    } catch (error) {
      console.error('Error while deleting assignment', error);
    }
  };

  const handleDeleteCancelled = () => {

    setShowDeleteModal(false);
  };

  const DeleteAssignmentModal = ({ show, handleDeleteConfirmed, handleDeleteCancelled }) => {
    return (
      <Modal show={show} onHide={handleDeleteCancelled} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to delete this assignment?</h5>
        </Modal.Body>
        <Modal.Footer className="justify-content-center align-items-center d-flex">
          <Button
            variant="danger"
            onClick={handleDeleteConfirmed}
            style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
          >
            Yes
          </Button>
          <Button
            variant="secondary"
            onClick={handleDeleteCancelled}
            style={{ marginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };





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

  const openFileInBrowser = (fileURL) => {

    console.log(fileURL)

    axios
      .get(baseURL + `/files/${fileURL}`, { responseType: 'blob' })
      .then((response) => {

        // console.log(response.data.response.name
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



  const row_color = {
    backgroundColor: 'transparent',
    color: 'black',

  }
  const head_color = {
    backgroundColor: 'transparent',
    color: 'black',
    fontWeight: '600',
    fontFamily: 'Poppins',
    fontSize: 'medium',
  }

  const [showUploadModal, setShowUploadModal] = useState(false);


  const handleOpenUploadModal = () => {
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }



  const [editAssignmentVisible, setEditAssignmentVisible] = useState(false);

  const handleEditClick = () => {
    setEditAssignmentVisible(true);
  };

  const handleEditModalHide = () => {
    setEditAssignmentVisible(false);
  };


  return (

    // 
    <>
      <ToastContainer />

      <div className="container-fluid" style={{
        textAlign: 'center', marginTop: '0px',
      }}>
        <center>


          <h1 style={{ fontFamily: 'Poppins', background: '', padding: '5px', color: 'black', borderRadius: '20px', marginBottom: '30px', letterSpacing: '3px' }}>
            ASSIGNMENT</h1>



          <div className="row justify-content-center align-items-center d-flex" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '300px' }}>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
                style={{ textAlign: 'center' }}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '400px' }}>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                className={`${styles.file} custom-file-input`}
                style={{ background: 'grey', color: 'white' }}
              />
            </Form.Group>


            <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '200px' }}>
              <Form.Control
                type="date"
                value={deadline}
                onChange={handleDeadlineChange}
                ref={fileInputRef}
                min={getCurrentDate}
                className={styles.assignmentButton}
                style={{ color: '' }}
              />


            </Form.Group>


            <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '200px' }}>
              <Form.Control

                type="time"
                value={time}
                onChange={handleTimeChange}
                className={styles.assignmentButton}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '200px' }}>
              <Form.Control
                type="number"
                placeholder="Total Marks"
                value={totalMarks}
                onChange={handleTotalMarksChange}
                style={{ textAlign: 'center' }}
              />
            </Form.Group>



            <div className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%' }}>
              <Button
                className={`${styles.assignmentButton} btn-success`}
                onClick={() => {
                  teacherAssignmentUpload();

                }}
                style={{
                  background: '', color: 'white', fontSize: 'large', width: '220px', height: '50px', borderRadius: '30px'
                  , boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.4)'
                }}
              >
                Upload Assignment
              </Button>

              <span>{message !== "" && <h5 style={{
                marginTop: '20px', color: 'green',
                fontFamily: 'Poppins', fontWeight: 'bold'
              }}>{message}</h5>}</span>

              <span>{message !== "" && <h5 style={{
                marginTop: '20px', color: 'red',
                fontFamily: 'Poppins', fontWeight: 'bold'
              }}>{wmessage}</h5>}</span>

            </div>
          </div>


          <table className="table custom-std-table" style={{
            border: '0px solid silver', verticalAlign: 'middle',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', borderRadius: '5px'
          }}>
            <thead style={{
              border: '0px solid silver', padding: '15px', verticalAlign: 'middle', textAlign: 'center',
              background: ''
            }} >
              <tr >
                <th style={{ ...head_color, width: '2%' }}>Sr#</th>
                <th style={{ ...head_color, width: '7%' }}>Title</th>
                <th style={{ ...head_color, width: '5%' }}>Assignment File</th>
                {/* <th style={{ ...head_color,width: '7%', fontSize:'large'  }}>Remarks</th> */}
                <th style={{ ...head_color, width: '5%' }}>Total Marks</th>
                <th style={{ ...head_color, width: '5%' }}>Deadline</th>
                <th style={{ ...head_color, width: '10%' }}>Action</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', verticalAlign: 'middle', padding: '15px', }}>
              {assignments.map((assignment, index) => (
                <tr key={index} >
                  <td style={{ ...row_color }}>
                    <p style={{ fontSize: 'large', fontWeight: '' }}>{index + 1}</p>
                  </td>
                  <td style={{ ...row_color }}>
                    <p style={{ fontSize: 'large', fontWeight: '' }}>{assignment.title}</p>
                  </td>
                  <td style={{ ...row_color }}>
                    <>
                      <button
                        className="btn btn-primary"
                        style={{ marginTop: '0px', fontSize: 'medium', backgroundColor: 'rgba(0, 0, 255, 0.6)' }}
                        onClick={openFileInBrowser.bind(null, assignment.fileURL)}
                      >
                        View File
                      </button>
                    </>
                  </td>
                  <td style={{ ...row_color }}>
                    <p style={{ fontSize: 'large', fontWeight: '400' }}>{assignment.totalMarks}</p>
                  </td>
                  <td style={{ ...row_color }}>
                    <p style={{ fontSize: 'large', fontWeight: 'bold', letterSpacing: '1px', color: 'green' }}>
                      {new Date(assignment.deadline).toLocaleDateString('en-GB')}
                    </p>
                  </td>
                  <td style={{ ...row_color }}>
                    <button
                      className="btn btn-primary "
                      style={{ margin: '5px', fontSize: 'medium', width: '80px', fontWeight: '400', marginTop: '-5px' }}
                      onClick={() => handleShowUpdateModal(assignment._id)}
                      // onClick={handleEditClick}

                    >
                    Edit
                    </button>

                    <button
                      className="btn btn-danger "
                      style={{ margin: '5px', fontSize: 'medium', width: '80px', fontWeight: '400', marginTop: '-5px' }}
                      onClick={() => handleDeleteClick(assignment._id)}

                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}



            </tbody>

          </table>


          {/* Update Assignment Modal */}
          <UpdateAssignmentModal
            show={showUpdateModal}
            handleClose={handleCloseUpdateModal}
          />



          {/* Delete Assignment Modal */}
          <DeleteAssignmentModal
            show={showDeleteModal}
            handleDeleteConfirmed={handleDeleteConfirmed}
            handleDeleteCancelled={handleDeleteCancelled}
          />
        </center>
      </div>

    </>
    // <AssignmentList></AssignmentList>
  );
};

export default SQuiz;
