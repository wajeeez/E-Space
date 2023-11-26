
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
// import styles from './stdAssignment.module.css'
import { StudentSubmissions } from '../../../api/internal';
import jwt_decode from "jwt-decode";
import FormattedDate from '../../../Components/DateFormate/DateFormater'
import { boolean } from 'yup';

import StdTable from '../Assignment/stdassign';


function StudentListDialog( ) {
 


    const baseURL = process.env.React_App_INTERNAL_API_PATH;

    const [getFileURL, setFileURL] = useState(null)
    const currentDate = new Date(); // Get the current date
    const [selectedFile, setSelectedFile] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [students,setStudents] = useState([])
    const [teacherName, setTeacherName] = useState([]);
    const [subjectName, setsubjectName] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const fileInputRef = useRef(null);
    const [message, setMessage] = useState(null);
    const { _id } = useParams();
    const [fileURLsByIndex, setFileURLsByIndex] = useState([]);
    const [stdEmail, setEmail] = useState()
    const [StudentName, setStudentName] = useState();
    const [Subbtn, setSubbtn] = useState(false);
  
    const [selectedStudents, setSelectedStudents] = useState([]);

  const handleCheckboxChange = (studentId) => {
    // Check if the studentId is already in the selectedStudents array
    if (selectedStudents.includes(studentId)) {
      // If it's already selected, remove it
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      // If it's not selected, add it
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };
    
  
    useEffect(() => {
      const authToken = localStorage.getItem("StdToken");
      if (authToken) {
        const decodedToken = jwt_decode(authToken);
        setEmail(decodedToken.email);
  
  
        // Fetch classes for the logged-in user from the server
        axios
          .get(baseURL + `/student/studentData/${decodedToken.email}`)
          .then((response) => {
            console.log(response.data.response);
            setStudentName(response.data.response.stdName);
  
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, []);
  
  
  
  
  
  
  
  
    const [dialogOpen, setDialogOpen] = useState(true);

    // if (open) {
    //     setDialogOpen(true)
    // }
  
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    
  
  
  
  
    //SUbmission
  
    const handleCreate = () => {
        // Check if the studentId is already in the selectedStudents array
        console.log(selectedStudents)
       setDialogOpen(false)
       window.location.reload();
      };
  
  
  
  
  
  
    useEffect(() => {
      axios
        .get(baseURL + `/students/getAllStudents/${_id}`)
        .then((response) => {
          if (response.data) {
          
            setStudents(response.data);
            console.log(response.data)
  
  
          }
        })
        .catch((error) => {
          console.log(error);
        });
  
  
    }, [_id])
    
  
  
  
  
  
  
  
  
    
  
  
  
  
  
  
  

  return (
    <Dialog open={dialogOpen}  maxWidth="md" fullWidth>
      <DialogContent>

    <div style={{background:"black",padding:"3px"}}><h4 style={{color:'white',textAlign:'center'}}>Select Students</h4></div> 
      <table className="table " style={{border:'1px solid white',marginTop:'1px'}}>
        <thead style={{border:'1px solid black' , padding: '3px'}} >
          <tr >
            <th style={{ width: '5%' , fontSize:'large' ,textAlign:'center'}}>Sr#</th>
            <th style={{ width: '5%', fontSize:'large' ,textAlign:'center' }}>Student</th>
            <th style={{ width: '5%', fontSize:'large' ,textAlign:'center' }}>Email</th>
            <th style={{ width: '5%', fontSize:'large',textAlign:'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
             <React.Fragment key={student.i}>
              
            <tr key={student.stdEmail} style={{color: 'black',textAlign:'center'}}>
              <td style={{textAlign:'center'}}>{index + 1}</td>
              <td>
              {student.stdName}
              </td>
              <td>
                <p
                style={{margin: '0px'}}
                >
                {student.stdEmail}
                </p>
                 </td>
              
              
              <td>
              <input
                    type="checkbox"
                    onClick={()=>handleCheckboxChange(student._id)}
                  />
              </td>
         

            </tr>

            {index < students.length - 1 && (
        <tr style={{padding:'1px'}}>
          <td colSpan="8" style={{height:'0px'}}>
            <hr />
          </td>
        </tr>
      )}
          

            </React.Fragment>
          ))}
        </tbody>
      </table>
      


       <div style={{textAlign: "center"}}> 
    
       
       <a className='btn btn-primary' style={{ background: 'black', margin: '0px' }} onClick={handleCreate}>
                        <i class='bx bx-edit'></i>
                        <span style={{ color: 'white' }} class="link_name"> Create a Group</span>
                    </a>


        </div>         


      </DialogContent>
    </Dialog>
  );
}

export default StudentListDialog;