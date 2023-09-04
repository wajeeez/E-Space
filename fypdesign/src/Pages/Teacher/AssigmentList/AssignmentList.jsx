// src/components/TeacherPage.js
import React, { useState, useEffect } from 'react';
import styles from '../../Student/Assignment/stdAssignment.module.css'
import axios from 'axios';
import { useParams } from 'react-router';
function AssignmentList() {
  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const { _id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [submissions, setSubmissions] = useState([]);

  // Fetch assignments and submissions data from an API or mock data
  useEffect(() => {
    // Replace with your API or data fetching logic
    // For example, fetch assignments and submissions data from an API
    // and update the state using setAssignments and setSubmissions
    const fetchData = async () => {
      // Fetch assignments data
      axios
        .get(baseURL+`/teacher/assignments/list/${_id}`)
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
        .get(baseURL+`/student/allSubmissions`, {
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


  const ViewSubmission =(fileURL) => {

    console.log(fileURL)

    axios
      .get(baseURL+`/submission/${fileURL}`, { responseType: 'blob' })
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

  return (
    <div>
      <center>
        <h1 style={{ margin: '20px' }}>Teacher Submissions</h1>
        <div>
          <label style={{ margin: '20px' }}>Select Assignment:</label>
          <select style={{ margin: '20px' }} value={selectedAssignment} onChange={handleAssignmentChange}>
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
        <div>
          <h2>Submissions </h2>

          {submissions.length === 0 ? ( // Check if submissions array is empty

            <p style={{ margin: '20px' }} >No submissions till now</p>


          ) : (
            <table>
              <thead>
                <tr>
                  <th className={styles.th}>Student Email</th>
                  <th className={styles.th}>Submission Date</th>
                  <th className={styles.th}>File</th>
                </tr>
              </thead>
              <tbody>


                {submissions.map((submission) => (
                  <tr className={styles.tr} key={submission._id}>
                    <td className={styles.td}>{submission.Email}</td>
                    <td className={styles.td}>{submission.submissionDate}</td>
                    <td className={styles.td}>
                      <button  className={styles.assignmentButton} onClick={ViewSubmission.bind(null,submission.submissionFileURL)}>
                        View Submission
                      </button>
                    </td>
                  </tr>
                ))

                }







              </tbody>
            </table>
          )}
        </div>
      </center>
    </div>
  );
}

export default AssignmentList;
