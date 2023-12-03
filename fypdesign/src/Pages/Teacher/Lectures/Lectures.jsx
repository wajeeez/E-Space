import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TeacherAssignmentUpload, TeacherLectureUpload } from '../../../api/internal';
import { useParams } from "react-router-dom";
import styles from '../Assignment/Assignment.module.css'
import AssignmentList from '../AssigmentList/AssignmentList';
import { Form, Button } from 'react-bootstrap';
import { Modal, InputGroup, FormControl } from 'react-bootstrap';

const Lectures = () => {

  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-based
    const day = String(now.getDate()).padStart(2, '0');

  }

 
  const [lectures, setLectures] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [lectureDesc, setlectureDesc] = useState('');
  const [lectureLink, setlectureLink] = useState('');
  const [lectureName, setlectureName] = useState('');
  const [remarks, setRemarks] = useState('');
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



 



  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleDescChange = (value) => {
    setlectureDesc(value);
  };
  const handleNameChange = (value) => {
    setlectureName(value);
  };
  const handleLinkChange = (value) => {
        setlectureLink(value)
  };
  const handleRemarksChange = (value) => {
    setRemarks(value)
};



  const teacherLectureUpload = async () => {



    if (!selectedFile || !teacherID || !lectureName || !lectureLink || !lectureDesc) {
      setMessage("Data Missing Please Select a File and Deadline")
    } else {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('classId', _id);
      formData.append('lectureDesc', lectureDesc);
      formData.append('lectureLink', lectureLink);
      formData.append('teacherID', teacherID);
      formData.append('lectureName', lectureName);
       // Append the deadline value
      const response = await TeacherLectureUpload(formData);

      if (response.status === 201 || response.status === 200) {
        setMessage("Successfull")
        console.log("Successfull")
        if (fileInputRef.current) {
            resetFileInput() // Reset the input field
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

  function resetFileInput() {
    if (fileInputRef.current) {
      // Create a new file input element to replace the existing one
      const newFileInput = document.createElement('input');
      newFileInput.type = 'file';
  
      // Copy any attributes you want to retain from the old input to the new one
      newFileInput.id = fileInputRef.current.id;
      newFileInput.name = fileInputRef.current.name;
      
      // Replace the old input with the new one
      fileInputRef.current.parentNode.replaceChild(newFileInput, fileInputRef.current);
  
      // Now, fileInputRef is pointing to the new input element
    }
  }



  const row_color = {
    backgroundColor: 'transparent',
    color: 'black',
  }
  const head_color ={
    backgroundColor: 'transparent',
    color: 'black',
    fontWeight:'500',
  }






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

  const DeleteConfirmationModal = ({ onDelete, onCancel, show }) => {
    return (
      <Modal show={show} onHide={onCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Lecture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to delete this lecture?</h5>
        </Modal.Body>
        <Modal.Footer className="justify-content-center align-items-center d-flex">
          <Button variant="danger" onClick={onDelete} style={{marginRight:'20px', width:'100px', maxWidth:'150px', fontSize:'large'}}>
            Yes
          </Button>
          <Button variant="secondary" onClick={onCancel} style={{MarginLeft:'20px', width:'100px', maxWidth:'150px', fontSize:'large'}}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };


  const handleUpdateClick = () => {
    // Add your update logic here
    setShowUpdateModal(true);
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdate = () => {
    // Add your update logic here
    setShowUpdateModal(false);
  };

  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

const UpdateModal = ({ show, handleClose, handleUpdate, handleFileChange, handleDeadlineChange, getCurrentDate, fileInputRef, message }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Lecture</Modal.Title>
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

        <Form.Group className="mb-3" >
        <Form.Control
          type="text"
          placeholder="Video Link"
          onChange={(e) => handleLinkChange(e.target.value)}
          style={{ textAlign: 'center' }}
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Control
          type="text"
          placeholder="References"
          onChange={(e) => handleRemarksChange(e.target.value)}
          style={{ textAlign: 'center' }}
        />
      </Form.Group>
        <span>{message !== "" && <p className={styles.errorMessage}>{message}</p>}</span>
      </Modal.Body>
      <Modal.Footer className="justify-content-center align-items-center d-flex">
        <Button variant="success" onClick={handleUpdate} style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
          Update
        </Button>
        <Button variant="danger" onClick={handleClose} style={{ marginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};




  return (
<>
    <div className="container-fluid" style={{ textAlign: 'center', marginTop: '10px' }}>
  <center>
  <h1 style={{fontFamily:'Poppins',background:'' , padding:'5px' , color : 'black', borderRadius: '20px', marginBottom: '10px', fontWeight:'100', letterSpacing:'2px'}}>
           LECTURES</h1>

    {/* Upload Lecture */}
    <div className="row justify-content-center align-items-center d-flex" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Form.Group className="mb-3" style={{border:'1 px solid purple', margin: '0 5px 10px 0', width: '100%', maxWidth: '300px' }}>
        <Form.Control
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className={`${styles.file} custom-file-input`}
          style={{ background: 'grey', color: 'white' }}
        />
      </Form.Group>

      <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '300px' }}>
        <Form.Control
          type="text"
          placeholder="Title"
          onChange={(e) => handleNameChange(e.target.value)}
          style={{textAlign: 'center' }}
        />
      </Form.Group>

      {/* <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '400px' }}>
        <Form.Control
          type="text"
          placeholder="Description"
          onChange={(e) => handleDescChange(e.target.value)}
          style={{ textAlign: 'center' }}
        />
      </Form.Group> */}

      <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '300px' }}>
        <Form.Control
          type="text"
          placeholder="Video Link"
          onChange={(e) => handleLinkChange(e.target.value)}
          style={{ textAlign: 'center' }}
        />
      </Form.Group>

      <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '300px' }}>
        <Form.Control
          type="text"
          placeholder="References"
          onChange={(e) => handleRemarksChange(e.target.value)}
          style={{ textAlign: 'center' }}
        />
      </Form.Group>

      <div className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%' }}>
        <Button
          className={`${styles.assignmentButton} btn-success`}
          onClick={teacherLectureUpload}
          style={{ background: '', color: 'white' , fontSize:'large' , width:'220px', height:'50px', borderRadius:'30px'
                  , boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.4)'}}
          >
          Upload Lecture
        </Button>
        <span>{message !== "" && <p className={styles.errorMessage}>{message}</p>}</span>
      </div>
    </div>

           <table className="table custom-std-table" style={{border:'1px solid silver', verticalAlign: 'middle' , boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)'}}>
        <thead style={{border:'1px solid silver' , padding: '15px', verticalAlign: 'middle', textAlign:'center'}} >
          <tr >
            <th style={{ ...head_color,width: '2%', fontSize:'large'  }}>Sr No.</th>
            <th style={{ ...head_color,width: '7%', fontSize:'large'  }}>Title</th>
            <th style={{ ...head_color,width: '5%', fontSize:'large'  }}>Lecture File</th>
            {/* <th style={{ ...head_color,width: '7%', fontSize:'large'  }}>Description</th> */}
            <th style={{ ...head_color,width: '7%', fontSize:'large'  }}>Video Link</th>
            <th style={{ ...head_color,width: '7%', fontSize:'large' }}>Remark</th>
            <th style={{ ...head_color,width: '10%', fontSize:'large' }}>Action</th>
          </tr>
        </thead>

        <tbody style={{textAlign:'center', verticalAlign: 'middle',  padding: '10px'}}>
        <tr style={{border:'1px solid silver'}}>

        <td style={{...row_color }}>
        <p style={{fontSize:'large', fontWeight:''}}>
        {/* {index + 1} */} 1
          </p>
        </td>

        <td style={{...row_color }}>
        <p style={{fontSize:'large', fontWeight:''}}>
          Title
        </p>
        </td>

        <td style={{ ...row_color }}>
  <>
    <button
      className="btn btn-primary"
      style={{ marginTop: '-10px', fontSize: 'large' ,backgroundColor: 'rgba(0, 0, 255, 0.6)'}}
    >
      View Lecture
    </button>
  </>
</td>

{/* <td style={{...row_color }}>
<p style={{fontSize:'large', fontWeight:''}}>
          description
        </p>
</td> */}

<td style={{...row_color }}>
<p style={{fontSize:'large', fontWeight:''}}>
          link
        </p>
</td>

        <td style={{...row_color }}>
        <p style={{fontSize:'large', fontWeight:''}}>
          remark
        </p>

        </td>


        
        <td style={{...row_color }}>
        <button
          className="btn btn-primary " style={{margin: '5px', fontSize: 'medium',width:'100px',fontWeight:'400',marginTop:'-5px'}}
          onClick={handleUpdateClick}
        >
            Edit
        </button>

        <button
          className="btn btn-danger " style={{margin: '5px', fontSize: 'medium', width:'100px',fontWeight:'400' ,marginTop:'-5px'}}
          onClick={handleDeleteClick}
        >
            Delete
        </button>
        </td>
        



        </tr>
        </tbody>

        </table>


      {/* <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} centered >
        <Modal.Header closeButton >
          <Modal.Title className="text-center" >Update Lecture</Modal.Title>
        </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Control type="file" onChange={handleFileChange} ref={fileInputRef} className={`${styles.file} custom-file-input`} style={{ background: 'grey', color: 'white' }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Title" onChange={(e) => handleNameChange(e.target.value)} style={{ textAlign: 'center' }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Description" onChange={(e) => handleDescChange(e.target.value)} style={{ textAlign: 'center' }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Video Link" onChange={(e) => handleLinkChange(e.target.value)} style={{ textAlign: 'center' }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="References" onChange={(e) => handleRemarksChange(e.target.value)} style={{ textAlign: 'center' }} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="justify-content-center align-items-center d-flex">
            <Button variant="success" onClick={handleUpdateModal} 
            style={{marginRight:'20px', width:'100px', maxWidth:'150px', fontSize:'large'}}>
              Upload
            </Button>
              <Button variant="danger" onClick={handleCloseUpdateModal}
              style={{marginleft:'20px', width:'100px', maxWidth:'150px', fontSize:'large'}}>
                Close
              </Button>
              
            </Modal.Footer>
          </Modal> */}

           {/* Update Assignment Modal */}
      <UpdateModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        handleUpdate={handleUpdate}
        handleFileChange={handleFileChange}
        handleDeadlineChange={handleDeadlineChange}
        getCurrentDate={getCurrentDate}
        fileInputRef={fileInputRef}
        message={message}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onDelete={handleDeleteConfirmed}
        onCancel={handleDeleteCancelled}
      />

  </center>
</div>

    


      {/* <center> 
        <br/>
        <br/> 
        <h1 className={styles.header} >Lecture</h1>
        <br/>
        <br/>
        <br/>


       
        <input type="file" onChange={handleFileChange} ref={fileInputRef} className={styles.file} />
        <br></br>
        <label  style={{color:"#000"}}>Lecture Name </label>
        <input type="text" onChange={(e) => handleNameChange(e.target.value)} />
        <br></br>
        <label  style={{color:"#000"}}>Lecture Description </label>
        <input t    ype="text" onChange={(e) => handleDescChange(e.target.value)} />
        <br></br>
        <label style={{color:"#000"}}>Lecture Link </label>
        <input type="text"onChange={(e) => handleLinkChange(e.target.value)} />
        <br></br>
        <label style={{color:"#000"}}>Lecture Remarks </label>
        <input type="text"onChange={(e) => handleRemarksChange(e.target.value)} />
        <br></br>
      
        <button className={styles.assignmentButton} onClick={teacherLectureUpload}>Upload Assignment</button>
        <span>
          {message != "" ? <p className={styles.errorMessage}>{message}</p> : ""}
        </span>





      </center> */}


    </>


    // <AssignmentList></AssignmentList>
  );
};

export default Lectures;
