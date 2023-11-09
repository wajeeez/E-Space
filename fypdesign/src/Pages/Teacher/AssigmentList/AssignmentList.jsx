// src/components/TeacherPage.js
import React, { useState, useEffect } from 'react';
import styles from '../../Student/Assignment/stdAssignment.module.css'
import axios from 'axios';
import { useParams } from 'react-router';
import Tlist from './TList'

function AssignmentList() {
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


    //loader

    const data = {
      Email: Email,
      classId: ClassId,
      submissionFileURL: suburl,
      marks: formData.marks,
      remarks: formData.remarks
    };

 

   

    console.log(suburl)

   


    axios
      .post(baseURL + `/assignment/updateStudentMarks`, data)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          setMessage("Successfull")
          console.log("Successfull")
        }else{
          setMessage("Failed to Update Marks")
          console.log("Successfull")
        }


      })
      .catch((error) => {
        setMessage("Failed to Update Marks")
        console.log(error);
      });

      setDialogVisible(false)



  }
  

  return (
   <>

   <Tlist/>

    <div classname="container-fluid" style={{ background: 'blue' }}>
      <center>
        <h1 className={styles.introt} style={{ margin: '20px' }}>Student Submissions</h1>
        <div>
          <label className={styles.label} style={{ margin: '20px' }}>Select Assignment:</label>
          <select className={styles.label} style={{ margin: '20px' }} value={selectedAssignment} onChange={handleAssignmentChange}>
            <option className={styles.label} value="" disabled>
              Select an Assignment
            </option>

            {assignments.map((assignment, index) => (
              <option className={styles.label} key={index + 1} value={assignment.fileURL}>
                Assignment {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div>
          

          {submissions.length === 0 ? ( 

            <p style={{ margin: '20px' }} >No submissions till now</p>


          ) : (
            <table>
              <thead>
                <tr>
                  <th className={styles.th}>Student Email</th>
                  <th className={styles.th}>Submission Date</th>
                  <th className={styles.th}>File</th>
                  <th className={styles.th}>Submit Marks</th>
                  

                </tr>
              </thead>
              <tbody>


                {submissions.map((submission) => (

                  <>

                    <tr className={styles.tr} key={submission._id}>
                      <td className={styles.td}>{submission.Email}</td>
                      <td className={styles.td}>{submission.submissionDate}</td>
                      <td className={styles.td}>
                        <button className={styles.assignmentButton} onClick={ViewSubmission.bind(null, submission.submissionFileURL)}>
                          View Submission
                        </button>
                      </td>
                      <td className={styles.td}>
                        <button className={styles.assignmentButton} onClick={openDialog.bind(null, submission.submissionFileURL,submission.Email,submission.classId)}>
                          Submit Marks
                        </button>
                      </td>
                     
                    </tr>


                    {dialogVisible && (
                      <div className={styles.modaloverlay}>
                        <div className={styles.modal}>
                          <h3>Submit Marks & Remarks</h3>

                          <div className={styles.inputContainer}>
                            <label className={styles.inputLabel} htmlFor="marksInput">
                              Enter Marks:
                            </label>
                            <input
                              className={styles.inputField}
                              type="number"
                               
                              id="marksInput"
                              name="marks"
                              placeholder="Enter Marks"
                              value={formData.marks}
                              onChange={handleInputChange}
                              onKeyPress={(e) => isNumberKey(e)}
                            />
                          </div>

                          <div className={styles.inputContainer}>
                            <label className={styles.inputLabel} htmlFor="remarksInput">
                              Enter Remarks:
                            </label>
                            <input
                              name="remarks"
                              className={styles.inputField}
                              type="text"
                              id="remarksInput"
                              placeholder="Enter Remarks"
                              value={formData.remarks}
                              onChange={handleInputChange}
                            />
                          </div>

                          <span>{message}</span>
                          <button className={styles.filesbtn}
                            onClick={submitMarks}>Submit</button>
                          <button className={styles.cancelbtn}
                            onClick={closeDialog}>Cancel</button>
                        </div>
                      </div>
                    )}

                  </>
                ))}


              </tbody>
            </table>
          )}
        </div>
      </center>
    </div>
    </> 
  );
}

export default AssignmentList;


{/* <tbody>
              
{submissions.map((submission) => (
  <tr key={submission._id}>
    <td>{submission.Email}</td>
    <td>{submission.submissionDate}</td>
    <td>
      <button className="btn btn-primary" onClick={() => ViewSubmission(submission.submissionFileURL)}>
        View Submission
      </button>
    </td>
    <td>
      <input
        className="form-control"
        type="number"
        placeholder="Enter Marks"
        value={marks}
        onChange={handleMarksChange}
      />
    </td>
    <td>
      <input
        className="form-control"
        type="text"
        placeholder="Enter Remarks"
        value={remarks}
        onChange={handleRemarksChange}
      />
    </td>
    <td>
      <button className="btn btn-primary" onClick={() => submitMarks(submission.submissionFileURL, submission.Email, submission.classId)}>
        Submit
      </button>
    </td>
  </tr>
))}
</tbody>  */}