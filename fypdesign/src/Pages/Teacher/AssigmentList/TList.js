// src/components/TeacherPage.js
import React, { useState, useEffect } from 'react';
import styles from '../../Student/Assignment/stdAssignment.module.css'
import axios from 'axios';
import { useParams } from 'react-router';
import jwt_decode from "jwt-decode";
import { Modal, Button, Form } from 'react-bootstrap';
import { InputGroup, FormControl } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

function TList() {
  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const { _id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false)
  const [message, setMessage] = useState(null);
  const [suburl,setsuburl]=useState(null)
  const [Email,setEmail]=useState(null)
  const [ClassId,setClassId]=useState(null)
  // const [assignmentFileURL,]

  const [data, setData] = useState({
    Email: null,
    classId: null,
    submissionFileURL: null,
    marks: null,
    remarks: null
  });

  const [formData, setFormData] = useState({
    marks: '',
    remarks: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };




  function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  // Fetch assignments and submissions data from an API or mock data
  useEffect(() => {
    // Replace with your API or data fetching logic
    // For example, fetch assignments and submissions data from an API
    // and update the state using setAssignments and setSubmissions
    const fetchData = async () => {
      // Fetch assignments data
      axios
        .get(baseURL + `/teacher/assignments/list/${_id}`)
        .then((response) => {
          if (response.data) {
            //  fileURLs = response.data.reduce((accumulator, item, index) => {
            //   accumulator[index] = item.fileURL;
            //   return accumulator;
            // }, {});
            setAssignments(response.data);
            console.log(assignments)


          }
        })
        .catch((error) => {
          console.log(error);
        });


      // Fetch initial submissions data (for the default selected assignment, if any)
      if (assignments.length > 0) {

        setSelectedAssignment("Select Assignment");

      }



    };

    fetchData();
  }, []);



  const getSubmissions = (selectedAssignment) => {



    if (_id && selectedAssignment) {
      axios
        .get(baseURL + `/student/allSubmissions`, {
          params: {
            classId: _id,
            fileURL: selectedAssignment
          }
        })
        .then((response) => {
          console.log("THIS IS RESPONSE" + response)
          console.log(response.data)
          if (response.data) {
            console.log(response.data)

            setSubmissions(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("ERROR selectedAssingment is EMPTY")
    }


  }

  // Function to handle assignment selection
  const handleAssignmentChange = async (event) => {
    const selectedAssignmentId = event.target.value;
    console.log(selectedAssignmentId)
    setSelectedAssignment(selectedAssignmentId);
    getSubmissions(selectedAssignmentId)

    // Fetch submissions data based on the selected assignment
    // const submissionsResponse = await fetch(`/api/submissions/${selectedAssignmentId}`);
    // const submissionsData = await submissionsResponse.json();
    // setSubmissions(submissionsData);
  };


  const ViewSubmission = (fileURL) => {

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
  }

  const openDialog = (fileURL,stdEmail,classId,) => {

    setsuburl(fileURL)
    setEmail(stdEmail)
    setClassId(classId)
    

    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const submitMarks = () => {
    const data = {
      Email: Email,
      classId: ClassId,
      submissionFileURL: suburl,
      marks: formData.marks,
      remarks: formData.remarks,
    };
  
    axios
      .post(baseURL + `/assignment/updateStudentMarks`, data)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          setMessage("Successful");
          console.log("Successful");
  
          // Update the state with the new data
          setSubmissions((prevSubmissions) =>
            prevSubmissions.map((submission) =>
              submission.submissionFileURL === suburl
                ? { ...submission, marks: formData.marks, remarks: formData.remarks }
                : submission
            )
          );
        } else {
          setMessage("Failed to Update Marks");
          console.log("Failed to Update Marks");
        }
      })
      .catch((error) => {
        setMessage("Failed to Update Marks");
        console.log(error);
      });
  
    setDialogVisible(false);
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

    <div classname="container-fluid" style={{ background: '' }}>
      <center>
      <h1 style={{fontFamily:'Poppins',background:'' , padding:'5px' , color : 'black', borderRadius: '20px', marginBottom: '10px', fontWeight:'100', letterSpacing:'2px'}}>
           STUDENT SUBMISSIONS</h1>
            <div className="row justify-content-center align-items-center" style={{padding:'20px'}}>
  <div className="col-md-3">
    <h4 className="text-center" style={{ fontSize: '', fontWeight: '600', 
    marginTop: '3px' ,marginRight:'-20px'}}>Select Assignment : </h4>
  </div>
  <div className="col-md-3">
    <select
      className="form-select text-center"
      style={{ maxWidth: '250px' ,marginLeft:'-70px' , boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.4)',borderRadius:'20px'}}
      value={selectedAssignment}
      onChange={handleAssignmentChange}
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
</div>


  {selectedAssignment && (
    <>
      {/* <Card style={{fontFamily:'poppins', width: '20rem', marginTop: '20px', margin: '20px',padding:'0px',
        background: 'linear-gradient(to right, rgba(133, 57, 209, 0.7) 20%, rgba(252, 16, 242, 0.7) 100%)'
        , borderRadius: '20px' }}>
        <Card.Body>
          <h4 style={{ fontWeight: 'bolder', textAlign: 'center', textShadow: 'none', color: 'white' }}>
            {selectedAssignment && `Total Submissions: ${submissions.length}`}
          </h4>
        </Card.Body>
      </Card>

      <Card style={{fontFamily:'poppins', width: '20rem', marginTop: '20px', margin: '20px',
        background: 'linear-gradient(to right, rgba(252, 16, 242, 0.7)  30%, rgba(133, 57, 209, 0.7) 100%)', borderRadius: '40px' }}>
        <Card.Body>
          <h5 style={{ fontWeight: 'bolder', textAlign: 'center', textShadow: 'none', color: 'white' }}>
            {selectedAssignment && `Total Students: ${submissions.length}`}
          </h5>
        </Card.Body>
      </Card> */}
 <div>
     <Button
        style={{
          fontFamily: 'poppins',
          width: '15rem',
          marginTop: '20px',
          margin: '20px',
          background: 'linear-gradient(to right, rgba(252, 16, 242, 0.7)  30%, rgba(133, 57, 209, 0.7) 100%)',
          borderRadius: '40px',
          boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.4), inset -5px -5px 10px rgba(0, 0, 0, 0.4)', // Add box shadow
          fontWeight:'800', fontSize:'large', padding:'10px',
          border:'1px solid white',cursor:'default'

        }}
      >
          {selectedAssignment && `Total Submissions: ${submissions.length}`}

      </Button>

      <Button
        style={{
          fontFamily: 'poppins',
          width: '15rem',
          marginTop: '20px',
          margin: '20px',
          background: 'linear-gradient(to right, rgba(252, 16, 242, 0.7)  30%, rgba(133, 57, 209, 0.7) 100%)',
          borderRadius: '40px',
          boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.4), inset -5px -5px 10px rgba(0, 0, 0, 0.4)', // Add box shadow
          fontWeight:'800', fontSize:'large', padding:'10px',
          border:'1px solid white', cursor:'default'
        }}
      >
          {selectedAssignment && `Total Students: ${submissions.length}`}

      </Button>
    </div>

    </>
  )}




        <div>
          

          {submissions.length === 0 ? ( 

        <table className="table custom-std-table" style={{border:'0px solid silver', verticalAlign: 'middle' , 
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',borderRadius:'5px'}}>
            <thead style={{border:'0px solid silver' , padding: '15px', verticalAlign: 'middle', textAlign:'center', 
            background:'' }} >
            <tr >
              <th style={{ ...head_color,width: '2%' , fontSize:'large' }}>Sr #</th>
              <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>Student Email</th>
              <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>Submission Date</th>
              <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>File</th>
              
              <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>Marks</th>
              <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>Remarks</th>
              
              <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>Edit Marks / Remarks</th>
            </tr>
            </thead>
            <tbody style={{textAlign:'center'}}>

            </tbody>
            </table>


          ) : (
            <table className="table custom-std-table" style={{border:'0px solid silver', verticalAlign: 'middle' , 
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',borderRadius:'5px'}}>
              <thead style={{border:'0px solid silver' , padding: '15px', verticalAlign: 'middle', textAlign:'center', 
              background:'' }} >
                <tr >
                  <th style={{ ...head_color,width: '2%' , fontSize:'large' }}>Sr #</th>
                  <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>Student Email</th>
                  <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>Submission Date</th>
                  <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>File</th>
                  
                  <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>Marks</th>
                  <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>Remarks</th>
                  
                  <th style={{ ...head_color,width: '5%' , fontSize:'large' }}>Edit Marks / Remarks</th>
                </tr>
              </thead>
              <tbody style={{textAlign:'center',}}>


                {submissions.map((submission,index) => (

                  <>

                    <tr className={styles.tr} key={submission._id} >
                      <td style={{...row_color }}>{index+1}</td>
                      <td style={{...row_color }}>{submission.Email}</td>
                      <td style={{...row_color }}>{submission.submissionDate}</td>
                      <td style={{...row_color }}>
                        
                        <button
                          className="btn btn-primary "             
                          style={{ marginTop: '0px', fontSize: 'medium' ,backgroundColor: 'rgba(0, 0, 255, 0.6)'}}
                          onClick={ViewSubmission.bind(null, submission.submissionFileURL)}
                        >
                          View Submission
                        </button>
                      </td>
                      <td style={{...row_color }}>
                    
                          {submission.marks || 'Not Submitted'}
                      </td>

                      <td style={{...row_color }}>
                          
                        {submission.remarks || 'Not Submitted'}
                        </td>
                     

                      <td style={{...row_color }}>
                        
                        <button
                          className="btn btn-primary " style={{margin: '2px', fontSize: 'medium',fontWeight: '400'}}
                          onClick={openDialog.bind(null, submission.submissionFileURL,submission.Email,submission.classId)}
                        >
                           Update
                        </button> 
                    
                      </td>
                    </tr>


                    {/* {dialogVisible && (
  <div className="modal fade show d-flex align-items-center" style={{ display: 'block', justifyContent: 'center'
  ,position:'absolute' , top:'-40px' }} tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title text-center">Update Marks & Remarks</h3>
          
        </div>
        <div className="modal-body text-center">
          <div className="mb-3">
            <label htmlFor="marksInput" style={{ margin: '5px', fontSize: 'large',fontWeight:'bold' }} className="form-label">Enter Marks:</label>
            <input style={{marginTop:'10px'}}
              type="number"
              className="form-control"
              id="marksInput"
              name="marks"
              placeholder="---"
              value={formData.marks}
              onChange={handleInputChange}
              onKeyPress={(e) => isNumberKey(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="remarksInput" style={{ margin: '5px', fontSize: 'large' ,fontWeight:'bold' }} className="form-label">Enter Remarks:</label>
            <input style={{marginTop:'10px'}}
              type="text"
              className="form-control"
              id="remarksInput"
              name="remarks"
              placeholder="---"
              value={formData.remarks}
              onChange={handleInputChange}
            />
          </div>
          <span>{message}</span>
        </div>
        <div className="modal-footer justify-content-center">
          <button type="button" className="btn btn-primary" style={{ margin: '10px', fontSize: 'large' , width: '120px'}} onClick={submitMarks}>Submit</button>
          <button type="button" className="btn btn-secondary" style={{ margin: '10px', fontSize: 'large' , width: '120px'}}onClick={closeDialog}>Cancel</button>
        </div>
      </div>
    </div>
  </div>
)} */}



                  </>
                ))}


              </tbody>
            </table>


          )}
          
        </div>

        <Modal show={dialogVisible} onHide={closeDialog} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Marks & Remarks</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center justify-content-center align-items-center">
        <Form.Group className="mb-3">
          <Form.Label style={{ margin: '5px', fontSize: 'large', fontWeight: 'bold' }}>Enter Marks:</Form.Label>
          <Form.Control
            style={{ marginTop: '10px',textAlign:'center' }}
            type="number"
            id="marksInput"
            name="marks"
            placeholder="---"
            value={formData.marks}
            onChange={handleInputChange}
            onKeyPress={(e) => isNumberKey(e)}
          />
           </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ margin: '5px', fontSize: 'large', fontWeight: 'bold' }}>Enter Remarks:</Form.Label>
          <Form.Control
            style={{ marginTop: '10px',textAlign:'center' }}
            type="text"
            id="remarksInput"
            name="remarks"
            placeholder="---"
            value={formData.remarks}
            onChange={handleInputChange}
          />
        </Form.Group>
        <span>{message}</span>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button type="button" className="btn btn-success" style={{ margin: '10px', fontSize: 'large', width: '120px' }} onClick={submitMarks}>
          Submit
        </Button>
        <Button type="button" className="btn btn-danger" style={{ margin: '10px', fontSize: 'large', width: '120px' }} onClick={closeDialog}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>

      </center>
    </div>
    </> 
  );
}

export default TList;


