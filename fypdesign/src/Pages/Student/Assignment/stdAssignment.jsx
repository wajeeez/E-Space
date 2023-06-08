import React, { useState } from 'react';

const StdAssignment = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Assignment 1', remarks: '', submission: '', marks: '', comments: '', deadline: '2023-06-30' },
    { id: 2, title: 'Assignment 2', remarks: '', submission: '', marks: '', comments: '', deadline: '2023-07-15' },
    { id: 3, title: 'Assignment 3', remarks: '', submission: '', marks: '', comments: '', deadline: '2023-08-05' },
  ]);

  const handleInputChange = (event, assignmentId, field) => {
    const updatedAssignments = [...assignments];
    const assignmentIndex = updatedAssignments.findIndex(assignment => assignment.id === assignmentId);
    updatedAssignments[assignmentIndex][field] = event.target.value;
    setAssignments(updatedAssignments);
  };

  return (
    <div style={{backgroundColor:'transparent'}}>
      <table>
        <thead>
          <tr>
            <th>Assign. No.</th>
            <th>Title</th>
            <th>Remarks</th>
            <th>Added Submission</th>
            <th>Marks Obtained</th>
            <th>Comments</th>
            <th>Action</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment => (
            <tr key={assignment.id}>
              <td>{assignment.id}</td>
              <td>{assignment.title}</td>
              <td>
                <input
                  type="text"
                  value={assignment.remarks}
                  onChange={event => handleInputChange(event, assignment.id, 'remarks')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={assignment.submission}
                  onChange={event => handleInputChange(event, assignment.id, 'submission')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={assignment.marks}
                  onChange={event => handleInputChange(event, assignment.id, 'marks')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={assignment.comments}
                  onChange={event => handleInputChange(event, assignment.id, 'comments')}
                />
              </td>
              <td>
                <button>Submit</button> {/* You can add the submit logic */}
              </td>
              <td>{assignment.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StdAssignment;
