import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
// import styles from './stdAssignment.module.css'
import { StudentSubmissions } from '../../../api/internal';
import jwt_decode from "jwt-decode";
import FormattedDate from '../../../Components/DateFormate/DateFormater'
import { boolean } from 'yup';
// import StdTable from '../Assignment/stdassign';
// import StudentListDialog from './StudentListDialog';

import styles from '../Assignment/Assignment.module.css'
import { Form, Button } from 'react-bootstrap';
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const GroupAssignmentTeacher = () => {

    const baseURL = process.env.React_App_INTERNAL_API_PATH;
    const [students, setStudents] = useState([])
    const [getFileURL, setFileURL] = useState(null)
    const currentDate = new Date(); // Get the current date
    const [selectedFile, setSelectedFile] = useState(null);
    const [groups, setGroups] = useState(null);
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
    const [GroupId, setGroupId] = useState("")
    const [deadline, setDeadline] = useState('');


    const [groupId , setgroupId] = useState();
    const [ groupDialog,setGroupDialog] =useState();
    const [classId , setClassId] = useState();
    const [updateMarks, setUpdateMarks] = useState({
        marks: '',
        remarks: '',
      });

      const handleUpdateInput = (e) => {
        const { name, value } = e.target;
        setUpdateMarks({
          ...updateMarks,
          [name]: value,
        });
      };


    const openGroupDialog = (_id) => {
        console.log(_id)
        setgroupId(_id)
      
        setGroupDialog(true);
      };
    
      const closeGroupDialog = () => {
        setGroupDialog(false);
      };

      const submitMarks = () => {
        const data = {
       
          _id: groupId,
          marks: updateMarks.marks,
          remarks: updateMarks.remarks,
        };
      
        axios
          .post(baseURL + `/assignment/group/updateStudentMarks`, data)
          .then((response) => {
            if (response.status === 201 || response.status === 200) {
              setMessage("Successful");
              console.log("Successful");
              setTimeout(() => {
                window.location.reload();
              }, 700);
              toast.success("Successfully UPDATED Assignment")
              setStudents((prevSubmissions) =>
              prevSubmissions.map((studnet) =>
              studnet._id === groupId
                  ? { ...studnet, marks: updateMarks.marks, remarks: updateMarks.remarks }
                  : studnet
              )
            );
              
            } else {
              setMessage("Failed to Update Marks");
              console.log("Failed to Update Marks");
              toast.success("Failed to UPDATED Assignment")
            }
          })
          .catch((error) => {
            setMessage("Failed to Update Marks");
            console.log(error);
            toast.success("Something Went Assignment")
          });
      
        setDialogVisible(false);
      };


      function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
          return false;
        return true;
      }


    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-based
        const day = String(now.getDate()).padStart(2, '0');

    }

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




    useEffect(() => {

        axios
            .get(baseURL + `/students/getAllGroups/${_id}`)
            .then((response) => {
                if (response.data) {
                    //  fileURLs = response.data.reduce((accumulator, item, index) => {
                    //   accumulator[index] = item.fileURL;
                    //   return accumulator;
                    // }, {});
                    setStudents(response.data);


                }
            })
            .catch((error) => {
                console.log(error);
            });

    }, [_id])




    //SUbmission
    const [dialogMessage, setDialogMessage] = useState();






    useEffect(() => {
        axios
            .get(baseURL + `/students/getAllStudents/${_id}`)
            .then((response) => {
                if (response.data) {

                    // setStudents(response.data);
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
                }, 700); // Adjust the delay (in milliseconds) as needed
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
                                console.log(marks,remarks)
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

    }
        ;

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const row_color = {
        backgroundColor: 'transparent',
        color: 'black',

    }
    const head_color = {
        backgroundColor: 'transparent',
        color: 'black',
        fontWeight: '600',
        fontFamily:'Poppins',
        fontSize:'medium' ,
    }

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const handleTeacherUpload = (GroupId) => {
        console.log(`Clicked on assignment: ${GroupId}`);
        setGroupId(GroupId);
        openModal();
    };

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };


    const submitTeacherAssignment = async () => {
        setShowModal(false); // Close the modal

        if (selectedFile) {

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('groupId', GroupId);
            formData.append('classId', _id);
            formData.append('deadline', deadline);

            console.log(selectedFile, GroupId, deadline)

            axios.post(baseURL + '/teacher/groupAssignment/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {

                    if (response.status == 200) {
                        toast.success("Successfully Uploaded Assignment")
                        setTimeout(() => {
                            window.location.reload();
                          }, 700);
                        if (fileInputRef.current) {
                            fileInputRef.current.value = ''; // Reset the input field
                        }
                    } else {
                        toast.error("Failed to Upload Assignment")
                    }
                    // Handle the success response
                })
                .catch(error => {
                    console.error('Error uploading group assignment:', error);
                    // Handle the error
                });

            //   if (response.status === 201 || response.status === 200) {
            //     setMessage("Successful");
            //     console.log("Successful");

            //     if (fileInputRef.current) {
            //       fileInputRef.current.value = ''; // Reset the input field
            //     }  


            //   } else if (response.code === "ERR_BAD_REQUEST") {
            //     console.log("BAD REQUEST");

            //     if (response.response.status === 500) {
            //       console.log("500 BAD REQUEST ");
            //     }

            //     if (response.response.status === 401) {
            //       setMessage(response.response.data.message);
            //       console.log("401");
            //     }
            //   }
        } else {
            console.log(selectedFile + " ERROR");
        }
    }


    return (


        <>





            <div style={{ textAlign: "start", padding: '5px' }}>
                <div className="container-fluid" style={{
                    textAlign: 'center', marginTop: '0px',
                }}>
                    <center>

                        <h1 style={{ fontFamily: 'Poppins', background: '', padding: '5px', color: 'black', borderRadius: '20px', marginBottom: '10px', fontWeight: '100', letterSpacing: '2px' }}>
                            GROUP ASSIGNMENT</h1>


                        <div style={{ textAlign: "start", padding: '5px' }}>


                            {/* <a className='btn btn-primary' style={{ background: 'black', margin: '0px' }} onClick={handleOpenDialog}>
                        <i class='bx bx-edit'></i>
                        <span style={{ color: 'white' }} class="link_name"> Create a Group</span>
                    </a> */}

                            {/* {dialogOpen === true ? (
                        // <StudentListDialog></StudentListDialog>

                        <Dialog open={dialogOpen} maxWidth="md" fullWidth>
                            <DialogContent>

                                <div style={{ background: "black", padding: "3px" }}><h4 style={{ color: 'white', textAlign: 'center' }}>Select Students</h4></div>
                                <table className="table " style={{ border: '1px solid white', marginTop: '1px' }}>
                                    <thead style={{ border: '1px solid black', padding: '3px' }} >
                                        <tr >
                                            <th style={{ width: '5%', fontSize: 'large', textAlign: 'center' }}>Sr#</th>
                                            <th style={{ width: '5%', fontSize: 'large', textAlign: 'center' }}>Student</th>
                                            <th style={{ width: '5%', fontSize: 'large', textAlign: 'center' }}>Email</th>
                                            <th style={{ width: '5%', fontSize: 'large', textAlign: 'center' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, index) => (
                                            <React.Fragment key={student.i}>

                                                <tr key={student.stdEmail} style={{ color: 'black', textAlign: 'center' }}>
                                                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                    <td>
                                                        {student.stdName}
                                                    </td>
                                                    <td>
                                                        <p
                                                            style={{ margin: '0px' }}
                                                        >
                                                            {student.stdEmail}
                                                        </p>
                                                    </td>


                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            onClick={() => handleCheckboxChange(student._id)}
                                                        />
                                                    </td>


                                                </tr>

                                                {index < students.length - 1 && (
                                                    <tr style={{ padding: '1px' }}>
                                                        <td colSpan="8" style={{ height: '0px' }}>
                                                            <hr />
                                                        </td>
                                                    </tr>
                                                )}


                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>







                                <div style={{ textAlign: "center" }}>


                                    <a disabled={true} className='btn btn-primary' style={{ background: 'black', margin: '0px' }} onClick={handleCreate}>
                                        <i class='bx bx-edit'></i>
                                        <span style={{ color: 'white' }} class="link_name"> Create a Group</span>
                                    </a>
                                    <div className="text-center">
                                        {dialogMessage !== '' && <p className="text-danger">{dialogMessage}</p>}
                                    </div>

                                </div>


                            </DialogContent>
                        </Dialog>

                    ) : ("")} */}


                        </div>



                    </center>

                    {/* <table className="table " style={{ border: '1px solid white' }}>
                                <thead style={{ border: '1px solid black', padding: '3px' }} >
                                    <tr >
                                        <th style={{ width: '5%', fontSize: 'large' }}>Sr#</th>
                                        <th style={{ width: '5%', fontSize: 'large' }}>Title</th>
                                        <th style={{ width: '5%', fontSize: 'large' }}>Assignment File</th>
                                        <th style={{ width: '5%', fontSize: 'large' }}>Remarks</th>
                                        <th style={{ width: '5%', fontSize: 'large' }}>Marks Obtained</th>
                                        <th style={{ width: '5%', fontSize: 'large' }}>Submission</th>
                                        <th style={{ width: '5%', fontSize: 'large' }}>Deadline</th>
                                        <th style={{ width: '5%', fontSize: 'large' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => ( */}
                    {/* <React.Fragment key={index}> */}
                    <table className="table custom-std-table" style={{border:'0px solid silver', verticalAlign: 'middle' , 
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',borderRadius:'5px'}}>
                        <thead style={{border:'0px solid silver' , padding: '15px', verticalAlign: 'middle', textAlign:'center', 
                        background:'' }} >
                            <tr >
                                <th style={{ ...head_color, width: '1%' }}>Sr#</th>
                                <th style={{ ...head_color, width: '5%' }}>Title</th>
                                <th style={{ ...head_color, width: '3%' }}>Assignment</th>
                                <th style={{ ...head_color, width: '3%' }}>Remarks</th>
                                <th style={{ ...head_color, width: '3%' }}>Marks</th>
                                <th style={{ ...head_color, width: '4%' }}>Submission</th>
                                <th style={{ ...head_color, width: '4%' }}>Deadline</th>
                                <th style={{ ...head_color, width: '2%' }}>Action</th>
                                <th style={{ ...head_color, width: '3%' }}> Assessment</th>

                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center', verticalAlign: 'middle', padding: '15px', }}>
                            {students.map((student, index) => (
                                <React.Fragment key={index}>

                                    <tr key={student.fileURL} style={{ color: 'black', textAlign: 'center' }}>
                                        <td style={{ ...row_color, textAlign: 'center' }}>{index + 1}</td>
                                        <td style={{ ...row_color, textAlign: 'center' }}>
                                            Group {index + 1}
                                        </td>
                                        <td style={{ ...row_color, }}>
                                            {student.fileURL != "" ? <Button
                                                className="btn btn-primary "
                                                style={{ marginTop: '0px', fontSize: 'medium', backgroundColor: 'rgba(0, 0, 255, 0.6)' }}
                                                onClick={openFileInBrowser.bind(null, student.fileURL)}
                                            >
                                                Uploaded File
                                            </Button>
                                                :
                                                <button
                                                    className="btn btn-primary "
                                                    style={{ marginTop: '0px', fontSize: 'medium' }}
                                                    onClick={handleTeacherUpload.bind(null, student._id)}
                                                >
                                                    Upload File
                                                </button>

                                            }

                                        </td>
                                        <td style={{ ...row_color, textAlign: 'center' }}>
                                        {student.remarks !== "" ? student.remarks : "--"}

                                        </td>
                                        <td style={{ ...row_color, textAlign: 'center' , margin:'0'}}>
                                            
                                            
                                        {student.marks != "" ? student.marks : "Not marked yet"}
                                        
                                        </td>
                                        <td style={{ ...row_color, textAlign: 'center' }}>
                                            {student.submissionURL != "" ? (
                                                <button
                                                    className="btn btn-dark"
                                                    onClick={openFileInBrowser.bind(null, student.submissionURL)}
                                                >
                                                    Submitted File
                                                </button>
                                            ) : (
                                                'No Submission'
                                            )}
                                        </td>
                                        <td style={{ ...row_color, textAlign: 'center' }}>
                                            {student.deadline != null ?
                                                <FormattedDate rawDate={student.deadline} />
                                                : "Not Available"
                                            }
                                        </td>
                                        <td style={{ ...row_color, textAlign: 'center' }}>
                                            {currentDate <= new Date(student.deadline) ? (
                                                <button className="btn btn-primary" onClick={handleTeacherUpload.bind(null, student._id)}>
                                                    Edit
                                                </button>
                                            ) : (
                                                <button className="btn" disabled>
                                                    Not Available
                                                </button>
                                            )}
                                        </td>

                                        
                                        <td style={{ ...row_color, textAlign: 'center' }}>
                                            {currentDate <= new Date(student.deadline) ? (
                                                <button className="btn btn-success" onClick={openGroupDialog.bind(null, student._id)}>
                                                    Grade
                                                </button>
                                            ) : (
                                                <button className="btn" disabled>
                                                    Not Available
                                                </button>
                                            )}
                                        </td>
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


                    <div className="text-center">
                        {message !== '' && <p className="text-danger">{message}</p>}
                    </div>

                </div>
            </div>
            <Modal show={showModal} onHide={closeModal} centered
                style={{ background: 'transparent', }}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Max 15mb File</h5>
                    <h6 style={{ color: 'red', marginBottom: '20px', marginTop: '10px' }}>only (.zip , .pdf , .docx )files</h6>
                    {/* <input
            className="form-control"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />  */}
                    <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '' }}>
                        <Form.Control
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className={`custom-file-input`}
                            style={{ background: 'grey', color: 'white' }}
                        />
                    </Form.Group>

                    <h5>Deadline</h5>
                    <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '200px' }}>
                        <Form.Control
                            type="date"
                            value={deadline}
                            onChange={handleDeadlineChange}
                            ref={fileInputRef}
                            min={getCurrentDate}
                            className={styles.assignmentButton}
                            style={{ color: '' }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="justify-content-center align-items-center d-flex">
                    <Button type="button" className="btn btn-primary" onClick={submitTeacherAssignment}
                        style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
                        Submit
                    </Button>
                    <Button type="button" variant="secondary" onClick={closeModal}
                        style={{ marginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal show={groupDialog} onHide={closeGroupDialog} centered>
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
            value={updateMarks.marks}
            onChange={handleUpdateInput}
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
            value={updateMarks.remarks}
            onChange={handleUpdateInput}
          />
        </Form.Group>
        <span>{message}</span>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button type="button" className="btn btn-success" style={{ margin: '10px', fontSize: 'large', width: '120px' }} onClick={submitMarks}>
          Submit
        </Button>
        <Button type="button" className="btn btn-danger" style={{ margin: '10px', fontSize: 'large', width: '120px' }} onClick={closeGroupDialog}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>

        </>
    );

};

export default GroupAssignmentTeacher;
