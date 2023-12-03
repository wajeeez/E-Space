import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
// import styles from './stdAssignment.module.css'
import { StudentSubmissions } from '../../../api/internal';
import jwt_decode from "jwt-decode";
import FormattedDate from '../../../Components/DateFormate/DateFormater'
import { boolean } from 'yup';

import StdTable from '../Assignment/stdassign';
import StudentListDialog from './StudentListDialog';
import { Form, Button } from 'react-bootstrap';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const GroupAssignment = () => {

    const baseURL = process.env.React_App_INTERNAL_API_PATH;
    const [students, setStudents] = useState([])
    const [getFileURL, setFileURL] = useState(null)
    const currentDate = new Date(); // Get the current date
    const [selectedFile, setSelectedFile] = useState(null);
    const [assignments, setAssignments] = useState([]);
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

        console.log(selectedStudents)
    };





    // const [dialogOpen, setDialogOpen] = useState(true);

    // if (open) {
    //     setDialogOpen(true)
    // }

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };




    const recheck = () => {

        axios
            .get(baseURL + `/students/getAllGroups/${_id}`)
            .then((response) => {
                if (response.data) {
                    //  fileURLs = response.data.reduce((accumulator, item, index) => {
                    //   accumulator[index] = item.fileURL;
                    //   return accumulator;
                    // }, {});
                    setAssignments(response.data);


                }
            })
            .catch((error) => {
                console.log(error);
            });

    };



    //SUbmission
    const [dialogMessage, setDialogMessage] = useState();
    const handleCreate = () => {
        // Check if the studentId is already in the selectedStudents array
        console.log(selectedStudents)

        if (selectedStudents && selectedStudents.length > 0) {
            axios
                .post(baseURL + `/students/createGroup/${_id}`, { stdIds: selectedStudents })
                .then((response) => {
                    if (response.data) {


                        console.log(response.data)
                        setDialogMessage("Success")
                        recheck()

                    }
                })
                .catch((error) => {
                    console.log(error);
                });


            setDialogOpen(false)

        } else {
            setDialogMessage("Please Select Students")
        }



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


    //SubmisionBTn 

    //getting submission files 
    const [submissionMapping, setSubmissionMapping] = useState({});
    const [marksMapping, setmarksMapping] = useState({});
    const [remarksMapping, setremarksMapping] = useState({});
    // Function to update the submission mapping



    const updateSubmissionMapping = (assignmentFileURL, submissionFileURL) => {
        setSubmissionMapping((prevMapping) => ({
            ...prevMapping,
            [assignmentFileURL]: submissionFileURL,
        }));
    };


    const updateMarksMapping = (submissionFileURL, marks) => {
        setmarksMapping((prevMapping) => ({
            ...prevMapping,
            [submissionFileURL]: marks,
        }));
    };

    const updateReMarksMapping = (submissionFileURL, remarks) => {
        setremarksMapping((prevMapping) => ({
            ...prevMapping,
            [submissionFileURL]: remarks,
        }));
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








    let fileURLs = {};
    axios
        .get(baseURL + `/teacher/assignments/list/${_id}`)
        .then((response) => {
            if (response.data) {
                fileURLs = response.data.reduce((accumulator, item, index) => {
                    accumulator[index] = item.fileURL;
                    return accumulator;
                }, {});
                console.log(fileURLs); // Log the updated value of fileURLs
            }
        })
        .catch((error) => {
            console.log(error);
        });




    //SUbmission

    const getSubmission = (fileURL) => {

        const authToken = localStorage.getItem("StdToken");
        if (authToken) {
            const decodedToken = jwt_decode(authToken);
            setEmail(decodedToken.email);




            axios
                .get(baseURL + `/student/submitted`, {
                    params: {
                        fileURL: fileURL,
                    }
                }, { responseType: 'blob' })
                .then((response) => {
                    console.log(response);



                    const blob = new Blob([response.data], { type: response.headers['content-type'] });
                    const blobURL = URL.createObjectURL(blob);
                    window.open(blobURL, '_blank');
                    URL.revokeObjectURL(blobURL);


                })
                .catch((error) => {
                    console.log(error);
                });
        }


    }

    //Submission









    useEffect(() => {
        axios
            .get(baseURL + `/teacher/class/${_id}`)
            .then((response) => {

                setTeacherName(response.data.response.teacherName);
                setsubjectName(response.data.response.subjectName);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    useEffect(() => {
        axios
            .get(baseURL + `/students/getAllGroups/${_id}`)
            .then((response) => {
                if (response.data) {
                    //  fileURLs = response.data.reduce((accumulator, item, index) => {
                    //   accumulator[index] = item.fileURL;
                    //   return accumulator;
                    // }, {});
                    setAssignments(response.data);


                }
            })
            .catch((error) => {
                console.log(error);
            });


    }, [_id])
    console.log(fileURLs)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    console.log(selectedFile)

    const submit_assignment = async () => {

        setDialogVisible(false)

        console.log(selectedFile)

        //Problem is this code is runing before file change and imedialty after file broweser opens
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('Email', stdEmail)
            formData.append('classId', _id);
            formData.append('assignmentFileURL', getFileURL)
            formData.append('deadline', currentDate); // Append the deadline value
            for (const entry of formData.entries()) {
                console.log(entry[0], entry[1]);
            }


            const response = await StudentSubmissions(formData);

            if (response.status === 201 || response.status === 200) {
                setMessage("Successfull")
                console.log("Successfull")
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Reset the input field
                }

                setTimeout(() => {
                    window.location.reload(); // Reload the page after a delay (e.g., 2 seconds)
                }, 2000); // Adjust the delay (in milliseconds) as needed
            } else if (response.code === "ERR_BAD_REQUEST") {
                // setError(response.response.mes);
                console.log("BAD REQUES")
                if (response.response.status === 500) {
                    console.log("500 BAD REQUEST ")
                }


                if (response.response.status === 401) {
                    setMessage(response.response.data.message);
                    console.log("401")

                }
            }






        } else {

            console.log(selectedFile + "ERROR")
        }








    }


    const openDialog = () => {
        setDialogVisible(true);
    };

    const closeDialog = () => {
        setDialogVisible(false);
    };

    //Submisision Btn






    const openFileInBrowser = (fileURL) => {

        console.log(fileURL)

        axios
            .get(baseURL + `/files/${fileURL}`, { responseType: 'blob' })
            .then((response) => {




                // console.log(response.data.response.name)




                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const blobURL = URL.createObjectURL(blob);
                console.log(blobURL)
                console.log(response.name)

                window.open(blobURL, '_blank');
                URL.revokeObjectURL(blobURL);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const openFile = (fileURL) => {

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
    };



    //CHECKING IF ANY ASSIGNMENT WAS UPLOADED BY STUDENT
    useEffect(() => {
        const authToken = localStorage.getItem('StdToken');
        if (authToken) {
            const decodedToken = jwt_decode(authToken);
            const Email = decodedToken.email;
            const classId = _id;


            if (Email && classId) { // Check if both userEmail and _id are truthy
                const data = {
                    classId,
                    Email
                };

                axios
                    .get(baseURL + '/student/getSubmitedFileURL', {
                        params: {
                            classId,
                            Email,
                        },
                    })
                    .then((response) => {
                        if (response.data && response.data.response) {

                            const responses = response.data.response; // Assuming response.data.response is an array

                            responses.forEach((assignment) => {
                                const assignmentFileURL = assignment.assignmentFileURL;
                                const submissionFileURL = assignment.submissionFileURL;
                                const marks = assignment.marks;
                                const remarks = assignment.remarks;
                                // Call updateSubmissionMapping for each assignment
                                updateSubmissionMapping(assignmentFileURL, submissionFileURL);
                                updateMarksMapping(submissionFileURL, marks)
                                updateReMarksMapping(submissionFileURL, remarks)
                            });


                            // console.log(response.data.response.assignmentFileURL)
                            // const submissionFileURL = response.data.response.submissionFileURL;
                            // console.log(response.data)
                            // updateSubmissionMapping(response.data.response.assignmentFileURL, submissionFileURL);
                            console.log(submissionMapping);




                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                console.log("EMAIL OR CLASSID is not AVAILABLE")
            }
        }




    }, []);


    const handleSubmissionClick = (assignmentFileURL) => {
        // Handle the submission for the specific assignment
        console.log(`Clicked on assignment: ${assignmentFileURL}`);
        setFileURL(assignmentFileURL)
        openDialog()

    };

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
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
        <div className="container-fluid" style={{  
            textAlign: 'center', marginTop: '10px', }}> 
            
            <center>

            <h1 style={{fontFamily:'Poppins',background:'' , padding:'5px' , color : 'black', borderRadius: '20px', marginBottom: '10px', fontWeight:'100', letterSpacing:'2px'}}>
           GROUP ASSIGNMENT</h1>
  
                <>

                    {/* <a className='btn btn-primary' style={{ background: 'black', margin: '0px' }} onClick={handleOpenDialog}>
                        <i class='bx bx-edit'></i>
                        <span style={{ color: 'white' }} class="link_name"> Create a Group</span>
                    </a> */}

                    <Button
                    className={`btn-success`}
                    onClick={handleOpenDialog}
                    style={{ background: '', color: 'white' , fontSize:'large' , width:'220px', 
                    height:'50px', borderRadius:'30px', boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.4)'}}
                    >
                    <i className='bx bx-edit' style={{fontSize:'22px', marginRight:'5px', marginTop:'0px'}}> </i> 
                    Create A Group
                    </Button>

                    {dialogOpen === true ? (
                        // <StudentListDialog></StudentListDialog>

                        <Dialog open={dialogOpen} maxWidth="md" fullWidth>
                            <DialogContent>
                                <center>

                            <h3 style={{fontFamily:'Poppins',background:'' , padding:'5px' , color : 'black', borderRadius: '20px', marginBottom: '10px', fontWeight:'100', letterSpacing:'2px'}}>
                                 Select Students</h3>
                                 <table className="table custom-std-table" style={{border:'1px solid silver', verticalAlign: 'middle' , boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)'}}>
                                    <thead style={{border:'0px solid black' , padding: '15px', verticalAlign: 'middle', textAlign:'center', background:''}} >
                                        <tr >
                                            <th style={{...head_color, width: '2%', fontSize: 'large', textAlign: 'center' }}>Sr#</th>
                                            <th style={{...head_color, width: '5%', fontSize: 'large', textAlign: 'center' }}>Student</th>
                                            <th style={{...head_color, width: '5%', fontSize: 'large', textAlign: 'center' }}>Email</th>
                                            <th style={{...head_color, width: '2%', fontSize: 'large', textAlign: 'center' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ textAlign: 'center', verticalAlign: 'middle', padding: '15px', }}>
                                        {students.map((student, index) => (
                                            <React.Fragment key={student.i}>

                                                <tr key={student.stdEmail} style={{boder:'1px solid silver', color: 'black', textAlign: 'center' }}>
                                                    <td style={{...row_color, textAlign: 'center' }}>{index + 1}</td>
                                                    <td>
                                                        {student.stdName}
                                                    </td>
                                                    <td style={{...row_color, textAlign: 'center' }}>
                                                        <p
                                                            style={{ margin: '0px' }}
                                                        >
                                                            {student.stdEmail}
                                                        </p>
                                                    </td>


                                                    <td style={{...row_color, textAlign: 'center' }}>
                                                        <input
                                                            type="checkbox"
                                                            onClick={() => handleCheckboxChange(student._id)}
                                                            size="large"
                                                        />
                                                    </td> 
{/* 
                                                    <td style={{ ...row_color, textAlign: 'center' }}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        onChange={() => handleCheckboxChange(student._id)}
                                                        style={{ fontSize: 'medium' ,backgroundColor: 'rgba(0, 0, 0, 0)'}}
                                                        size="lg"
                                                    />
                                                    </td> */}


                                                </tr>

                                                {index < students.length - 1 && (
                                                    <tr style={{ padding: '1px' }}>
                                                        {/* <td colSpan="8" style={{ height: '0px' }}>
                                                            <hr />
                                                        </td> */}
                                                    </tr>
                                                )}


                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>







                                <div style={{ textAlign: "center" }}>


                                    {/* <a disabled={true} className='btn btn-primary' style={{ background: 'black', margin: '0px' }} onClick={handleCreate}>
                                        <i class='bx bx-edit'></i>
                                        <span style={{ color: 'white' }} class="link_name"> Create a Group</span>
                                    </a> */}
                                    <Button
                                        className={`btn-success`}
                                        onClick={handleOpenDialog}
                                        style={{ background: '', color: 'white' , fontSize:'large' , width:'220px', height:'50px', borderRadius:'30px'}}
                                        >
                                        <i className='bx bx-edit' style={{fontSize:'22px', marginRight:'5px', marginTop:'0px'}}> </i> 
                                        Create A Group
                                        </Button>
                                    <div className="text-center">
                                        {dialogMessage !== '' && <p className="text-danger">{dialogMessage}</p>}
                                    </div>

                                </div>

                                </center>
                            </DialogContent>
                        </Dialog>

                    ) : ("")}


                </>



            </center>

            <table className="table custom-std-table" style={{border:'1px solid silver', verticalAlign: 'middle' , boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', marginTop:'20px'}}>
                <thead style={{border:'0px solid silver' , padding: '15px', verticalAlign: 'middle', textAlign:'center', background:''}} >
                    <tr >
                        <th style={{ ...head_color, width: '2%', fontSize: 'large' }}>Sr#</th>
                        <th style={{ ...head_color, width: '5%', fontSize: 'large' }}>Title</th>
                        <th style={{ ...head_color, width: '5%', fontSize: 'large' }}>Assignment File</th>
                        <th style={{ ...head_color, width: '5%', fontSize: 'large' }}>Remarks</th>
                        <th style={{ ...head_color, width: '5%', fontSize: 'large' }}>Marks Obtained</th>
                        <th style={{ ...head_color, width: '5%', fontSize: 'large' }}>Submission</th>
                        <th style={{ ...head_color, width: '5%', fontSize: 'large' }}>Deadline</th>
                        <th style={{ ...head_color, width: '3%', fontSize: 'large' }}>Action</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center', verticalAlign: 'middle', padding: '15px', }}>
                    {assignments.map((assignment, index) => (
                        <React.Fragment key={assignment.fileURL}>

                            <tr key={assignment.fileURL} style={{boder:'1px solid silver', color: 'black', textAlign: 'center' }}>
                                <td style={{...row_color, textAlign: 'center' }}>{index + 1}</td>
                                <td>
                                    Group {index + 1}
                                </td>
                                <td style={{...row_color, textAlign: 'center' }}>
                                    {assignment.fileURL != "" ? <button
                                        className="btn btn-primary " 
                                        style={{ marginTop: '0px', fontSize: 'medium' ,backgroundColor: 'rgba(0, 0, 255, 0.6)'}}
                                        onClick={openFileInBrowser.bind(null, assignment.fileURL)}
                                    >
                                        Assignment
                                    </button>
                                        :
                                        <button
                                            className="btn btn-secondary " style={{ marginTop: '0px', fontSize: 'medium' }}
                                            onClick={openFileInBrowser.bind(null, assignment.fileURL)}
                                        >
                                            No file Uploaded yet
                                        </button>

                                    }

                                </td >
                                <td style={{...row_color, textAlign: 'center' }}>
                                    {remarksMapping[submissionMapping[assignment.fileURL]]
                                        ? remarksMapping[submissionMapping[assignment.fileURL]]
                                        : ' --- '}
                                </td>
                                <td style={{...row_color, textAlign: 'center' }}>
                                    {marksMapping[submissionMapping[assignment.fileURL]]
                                        ? marksMapping[submissionMapping[assignment.fileURL]]
                                        : 'Not marked yet'}
                                </td>
                                <td style={{...row_color, textAlign: 'center' }}>
                                    {submissionMapping[assignment.fileURL] ? (
                                        <button
                                            className="btn btn-secondary"
                                            onClick={openFile.bind(null, assignment.submissionURL)}
                                        >
                                            Submission File
                                        </button>
                                    ) : (
                                        'No Submission'
                                    )}
                                </td>
                                <td style={{...row_color, textAlign: 'center' }}>
                                    {assignment.deadline != null ?
                                        <FormattedDate rawDate={assignment.deadline} />
                                        : "Not Available"
                                    }
                                </td>
                                <td style={{...row_color, textAlign: 'center' }}>
                                    {currentDate <= new Date(assignment.deadline) ? (
                                        <button className="btn btn-success" onClick={() => handleSubmissionClick(assignment.fileURL)}>
                                            SUBMIT
                                        </button>
                                    ) : (
                                        <button className="btn btn-danger" disabled>
                                            Time's up
                                        </button>
                                    )}
                                </td>


                            </tr>

                            {index < assignments.length - 1 && (
                                <tr style={{ padding: '1px' }}>
                                    {/* <td colSpan="8" style={{ height: '0px' }}>
                                        <hr />
                                    </td> */}
                                </tr>
                            )}


                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div className="text-center">
                {message !== '' && <p className="text-danger">{message}</p>}
            </div>
        </div>
    );

};

export default GroupAssignment;
