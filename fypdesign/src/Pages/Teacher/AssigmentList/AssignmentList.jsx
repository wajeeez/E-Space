import React from 'react';

const AssignmentList = ({ assignments }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Assignment Name</th>
          <th>Deadline</th>
          <th>Submissions</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment, index) => (
          <tr key={assignment.id}>
            <td>{index + 1}</td>
            <td>{assignment.name}</td>
            <td>{assignment.deadline}</td>
            <td>{assignment.submissions}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AssignmentList;
