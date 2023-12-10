import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router';
const EditAssignment = ({ assignmentId }) => {
    const baseURL = process.env.React_App_INTERNAL_API_PATH;
    const [teacherID, setteacherID] = useState('')
    const [subjectName, setSubjectName] = useState('')

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
    

    const { _id } = useParams(); 
    const fileInputRef = useRef(null);
    const [assignmentDetails, setAssignmentDetails] = useState({

        title: '',
        deadline: '',
        totalMarks: 0,
    });

    const [fileSelected,setFileSelected] = useState("");

    const handleFileChange = (event) => {
        setFileSelected(event.target.files[0]);
      };
    

    const handleUpdateAssignment2 = () => {
        // Implement your logic for updating the assignment here
        // You might want to use a state management library or API calls
        // For now, just log the updated values
        console.log('Updated Title:', assignmentDetails.title);
        console.log('Updated Deadline:', assignmentDetails.deadline);
        console.log('Updated Total Marks:', assignmentDetails.totalMarks);
    };

    const handleUpdateAssignment = async () => {
    
      
        const formData = new FormData();
          formData.append('file', fileSelected);
          formData.append('classId', _id);
          formData.append('fileName', assignmentDetails.title);
          formData.append('teacherID', teacherID);
          formData.append('subjectName', subjectName);
          formData.append('deadline',  assignmentDetails.deadline); // Append the deadline value
          formData.append('title', assignmentDetails.title); 
          formData.append('totalMarks', assignmentDetails.totalMarks); 
      
    
        axios.post(baseURL+`/teacher/editAssignment/${assignmentId}`, formData)
      .then(response => {
        if(response == 200){
    
        }else{
    
        }
      })
      .catch(error => {
        // Handle the error
      });
    
    
     
      };
      









    return (

        <>
            <Modal show={true} centered>
                {/* Rest of your modal code */}
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        value={assignmentDetails.title}
                        onChange={(e) => setAssignmentDetails({ ...assignmentDetails, title: e.target.value })}
                        style={{ textAlign: 'center' }}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                        <Form.Control
                            type="file"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className={`custom-file-input`}
                            style={{ background: 'grey', color: 'white' }}
                        />
                    </Form.Group>

                <Modal.Footer className="justify-content-center align-items-center d-flex">
                    <Button
                        variant="success"
                        onClick={handleUpdateAssignment}
                        style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
                    >
                        Update
                    </Button>
                    <Button
                        variant="danger"
                        style={{ marginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <Modal show={true}  centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            // placeholder="Title"
                            // value={updateAssignmentDetails.title}
                            value={updateTitle}
                            onChange={handleUpdateTitleChange}
                            style={{ textAlign: 'center' }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="file"
                            onChange={handleUpdateFileChange}
                            ref={fileInputRef}
                            className={`custom-file-input`}
                            style={{ background: 'grey', color: 'white' }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="date"
                            // value={updateAssignmentDetails.deadline}
                            value={updateDeadline}
                            onChange={handleUpdateDeadlineChange}
                            ref={fileInputRef}
                            min={getCurrentDate}
                            className={styles.assignmentButton}
                            style={{ color: '' }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="number"
                            // placeholder="Total Marks"
                            // value={updateAssignmentDetails.totalMarks}
                            value={updateTotalMarks}
                            onChange={handleUpdateTotalMarksChange}
                            style={{ textAlign: 'center' }}
                        />
                    </Form.Group>
                    <span>{updateMessage !== "" && <p className={styles.errorMessage}>{updateMessage}</p>}</span>
                </Modal.Body>
                <Modal.Footer className="justify-content-center align-items-center d-flex">
                    <Button
                        variant="success"
                        onClick={handleUpdate}
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
            </Modal> */}





        </>

    );
};

export default EditAssignment;
