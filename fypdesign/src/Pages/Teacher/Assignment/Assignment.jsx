import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignmentPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     // Fetch assignments from the backend
//     axios.get('/api/assignments')
//       .then((response) => {
//         setAssignments(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadAssignment = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', 'Assignment Title');
    formData.append('description', 'Assignment Description');
    formData.append('deadline', '2023-06-30');

    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitAssignment = (assignmentId) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('assignmentId', assignmentId);
    formData.append('studentId', '123'); // Replace with actual student ID

    axios.post('/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Assignments</h1>

      {/* Upload Assignment */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadAssignment}>Upload Assignment</button>

      {/* List of Assignments */}
      {assignments.map((assignment) => (
        <div key={assignment.id}>
          <h3>{assignment.title}</h3>
          <p>{assignment.description}</p>
          <p>Deadline: {assignment.deadline}</p>
          <button onClick={() => submitAssignment(assignment.id)}>Submit Assignment</button>
        </div>
      ))}
    </div>
  );
};

export default AssignmentPage;
