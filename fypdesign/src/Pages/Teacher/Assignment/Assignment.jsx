import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TeacherAssignmentUpload } from '../../../api/internal';
import { useParams } from "react-router-dom";
import styles from './Assignment.module.css'
import AssignmentList from '../AssigmentList/AssignmentList';
import { Form, Button } from 'react-bootstrap';
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
// import ReactTooltip from 'react-tooltip';

const AssignmentPage = () => {

  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-based
    const day = String(now.getDate()).padStart(2, '0');

  }

  const assigList = [
    {
      id: 1,
      name: 'Assignment 1',
      deadline: '2023-08-31',
      submissions: 10,
    },
    {
      id: 2,
      name: 'Assignment 2',
      deadline: '2023-09-15',
      submissions: 15,
    },
    // ... other assignments
  ];

  const [assignments, setAssignments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [deadline, setDeadline] = useState('');
  const [teacherID, setteacherID] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const { _id } = useParams();

  useEffect(() => {

    axios
      .get(baseURL+`/teacher/class/${_id}`)
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
      .get(baseURL+`/teacher/class/${_id}`)
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


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };




  const teacherAssignmentUpload = async () => {



    if (!selectedFile || !teacherID || !subjectName || !deadline) {
      setMessage("Data Missing Please Select a File and Deadline")
    } else {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('classId', _id);
      formData.append('teacherID', teacherID);
      formData.append('subjectName', subjectName);
      formData.append('deadline', deadline); // Append the deadline value



      const response = await TeacherAssignmentUpload(formData);

      if (response.status === 201 || response.status === 200) {
        setMessage("Successfull")
        console.log("Successfull")
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '  '; // Reset the input field
        }
      } else if (response.code === "ERR_BAD_REQUEST") {
        // setError(response.response.mes);
        console.log("BAD REQUES")

        if (response.response.status === 401) {
          setMessage(response.response.data.message);
          console.log("401")

        }
      }
    }



  }


  const row_color = {
    backgroundColor: 'transparent',
    color: 'black',
  }
  const head_color ={
    backgroundColor: 'transparent',
    color: 'black',
  }

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdate = () => {
    // Add your update logic here
    setShowUpdateModal(false);
  };
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const UpdateAssignmentModal = ({ show, handleClose }) => {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              style={{ textAlign: 'center' }}
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              className={`${styles.file} custom-file-input`}
              style={{ background: 'grey', color: 'white' }}
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Control
              type="date"
              onChange={handleDeadlineChange}
              ref={fileInputRef}
              min={getCurrentDate}
              className={styles.assignmentButton}
              style={{ color: '' }}
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Total Marks"
              style={{ textAlign: 'center' }}
            />
          </Form.Group>
          <span>{message !== "" && <p className={styles.errorMessage}>{message}</p>}</span>
        </Modal.Body>
        <Modal.Footer className="justify-content-center align-items-center d-flex">
          <Button variant="success" onClick={handleUpdate}
          style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
            Update
          </Button>
          <Button variant="danger" onClick={handleClose}
          style={{ marginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  


  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    // You may also perform additional actions before showing the modal
  };

  const handleDeleteConfirmed = () => {
    // Perform the deletion logic
    // ...

    // Close the modal
    setShowDeleteModal(false);
  };

  const handleDeleteCancelled = () => {
    // Handle cancel action
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





  const [uploadedAssignments, setUploadedAssignments] = useState([]);
 
  useEffect(() => {
    axios
      .get(baseURL + `/teacher/class/${_id}`)
      .then((response) => {
        console.log(response.data);
        setUploadedAssignments(response.data.assignments);
        setteacherID(response.data.response.teacherID);
        setSubjectName(response.data.response.subjectName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [_id]);
  
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    // Increment the refresh key to force a re-render of the container
    setRefreshKey((prevKey) => prevKey + 1);
  };

  
  return (
    <div className="container-fluid" style={{  
      textAlign: 'center', marginTop: '10px', }}>
      <center> 
      <button
          className="btn btn-primary"
          style={{ position: 'absolute', top: '10px', right: '10px', fontSize: 'large' }}
          onClick={handleRefresh}
          title='Refresh Page'
          
        >
          <FontAwesomeIcon icon={faSync} />
          
        </button>
        

        <h1 style={{background:'' , padding:'5px' , color : 'black', borderRadius: '20px', marginBottom: '40px'}}>
           Upload Assignment</h1>
        
        {/* <input type="file" style={{background:'grey', color:'white' , marginRight:'40px'}} 
        onChange={handleFileChange} ref={fileInputRef} className={styles.file} /> */}
<div className="row justify-content-center align-items-center d-flex" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '300px' }}>
    <Form.Control
      type="text"
      placeholder="Title"
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
      onChange={handleDeadlineChange}
      ref={fileInputRef}
      min={getCurrentDate}
      className={styles.assignmentButton}
      style={{ color: '' }}
    />
  </Form.Group>

  <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '200px' }}>
    <Form.Control
      type="number"
      placeholder="Total Marks"
      style={{ textAlign: 'center' }}
    />
  </Form.Group>

  <div className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%' }}>
    <Button
      className={`${styles.assignmentButton} btn-success`}
      onClick={() => {
        teacherAssignmentUpload();
        
      }}
      style={{ background: '', color: 'white' , fontSize:'large' , width:'220px', height:'50px'}}
    >
      Upload Assignment
    </Button>
    <span>{message !== "" && <h3 style={{marginTop:'20px',color:'blue',
  fontFamily:'Poppins', fontWeight:'bold'}}>{message}</h3>}</span>
  </div>
</div>




<div style={{ background: 'black', height: '10px', width: '2000px' }}></div>




        <h1 style={{background:'' , padding:'5px' , color : 'black', borderRadius: '20px', marginBottom: '20px'
      , marginTop: '10px'}}>
           Uploaded Assignments</h1>

           {/* <div className="row justify-content-center align-items-center" style={{padding:'20px'}}>
              <div className="col-md-3">
                <label className="text-center" style={{ fontSize: 'large', fontWeight: 'bold', 
                marginTop: '0px' ,marginRight:'-60px'}}>Select Assignment : </label>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select text-center"
                  style={{ maxWidth: '200px' ,marginLeft:'-60px'}}
                  // value={selectedAssignment}
                  // onChange={handleAssignmentChange}
                >
                  <option value="" disabled>
                    Select an Assignment
                  </option>
                  {assignments.map((assignment, index) => (
                    <option key={index + 1} value={assignment.fileURL}>
                      Assignment {index + 1}
                    </option>
                  ))}
                </select>
              </div>

            </div> */}


           <table className="table custom-std-table" style={{border:'1px solid white', verticalAlign: 'middle'}}>
        <thead style={{border:'3px solid black' , padding: '15px', verticalAlign: 'middle', textAlign:'center'}} >
          <tr >
            <th style={{ ...head_color,width: '2%', fontSize:'large'  }}>Sr#</th>
            <th style={{ ...head_color,width: '7%', fontSize:'large'  }}>Title</th>
            <th style={{ ...head_color,width: '10%', fontSize:'large'  }}>Assignment File</th>
            {/* <th style={{ ...head_color,width: '7%', fontSize:'large'  }}>Remarks</th> */}
            <th style={{ ...head_color,width: '5%', fontSize:'large'  }}>Total Marks</th>
            <th style={{ ...head_color,width: '10%', fontSize:'large'  }}>Deadline</th>
            <th style={{ ...head_color,width: '5%', fontSize:'large' }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: 'center', verticalAlign: 'middle', padding: '15px' }}>
  {uploadedAssignments?.map((assignment, index) => (
    <tr key={index}>
      <td style={{ ...row_color }}>
        <p style={{ fontSize: 'large', fontWeight: '' }}>{index + 1}</p>
      </td>
      <td style={{ ...row_color }}>
        <p style={{ fontSize: 'large', fontWeight: '' }}>{assignment.name}</p>
      </td>
      <td style={{ ...row_color }}>
        <>
          <button
            className="btn btn-primary"
            style={{ marginTop: '-10px', fontSize: 'large' }}
          >
            View Assignment
          </button>
        </>
      </td>
      <td style={{ ...row_color }}>
        <p style={{ fontSize: 'large', fontWeight: 'bold' }}>{assignment.submissions}</p>
      </td>
      <td style={{ ...row_color }}>
        <p style={{ fontSize: 'large', fontWeight: 'bold', letterSpacing: '1px', color: 'green' }}>
          {assignment.deadline}
        </p>
      </td>
      <td style={{ ...row_color }}>
        <button
          className="btn btn-primary "
          style={{ margin: '5px', fontSize: 'medium', width: '100px', fontWeight: 'bold' }}
          onClick={handleShowUpdateModal}
        >
          Edit
        </button>
        <br />
        <button
          className="btn btn-danger "
          style={{ margin: '5px', fontSize: 'medium', width: '100px', fontWeight: 'bold' }}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>

      {/* Update Assignment Modal */}
      <UpdateAssignmentModal show={showUpdateModal} handleClose={handleCloseUpdateModal} />

      {/* Delete Assignment Modal */}
      <DeleteAssignmentModal
        show={showDeleteModal}
        handleDeleteConfirmed={handleDeleteConfirmed}
        handleDeleteCancelled={handleDeleteCancelled}
      />
      </center>
    </div>


    // <AssignmentList></AssignmentList>
  );
};

export default AssignmentPage;
