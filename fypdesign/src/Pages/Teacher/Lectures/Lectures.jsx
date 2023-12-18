import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TeacherAssignmentUpload, TeacherLectureUpload } from '../../../api/internal';
import { useParams } from "react-router-dom";
import styles from '../Assignment/Assignment.module.css'
import AssignmentList from '../AssigmentList/AssignmentList';
import { Form, Button } from 'react-bootstrap';
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Lectures = () => {

  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-based
    const day = String(now.getDate()).padStart(2, '0');

  }


  const [dialogVisible, setDialogVisible] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [lectureDesc, setlectureDesc] = useState('');
  const [lectureLink, setlectureLink] = useState('');
  const [lectureName, setlectureName] = useState('');
  const [Remarks, setRemarks] = useState('');
  const [message, setMessage] = useState(null);
  const [deadline, setDeadline] = useState('');
  const [teacherID, setteacherID] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const { _id } = useParams();

  useEffect(() => {

    axios
      .get(baseURL + `/teacher/class/${_id}`)
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
    }, []); 







  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile)
  };
  const handleDescChange = (value) => {
    setlectureDesc(value);
  };
  const handleNameChange = (value) => {
    setlectureName(value);
  };
  const handleLinkChange = (value) => {
    setlectureLink(value)
  };
  const handleRemarksChange = (value) => {
    setRemarks(value)
  };



  const teacherLectureUpload = async () => {

    console.log(selectedFile)
    console.log(teacherID)
    console.log(lectureName)
    console.log(lectureLink)
    console.log(Remarks)

    // if (!selectedFile || !teacherID || !lectureName || !lectureLink || !Remarks) {
      const sanitizedLectureLink = lectureLink.trim() || '-';
      const sanitizedRemarks = Remarks.trim() || '-';
    
      if (!selectedFile || !teacherID || !lectureName) {
      toast.error("Data Missing Please Select a File and Deadline", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      })
    } else {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('classId', _id);
      // formData.append('lectureDesc', Remarks);
      // formData.append('lectureLink', lectureLink);
      formData.append('lectureDesc', sanitizedRemarks);
      formData.append('lectureLink', sanitizedLectureLink)
      formData.append('teacherID', teacherID);
      formData.append('lectureName', lectureName);
      // Append the deadline value
      const response = await TeacherLectureUpload(formData);

      if (response.status === 201 || response.status === 200) {

        toast.success("Uploaded Lecture successfully ", {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        })
        console.log("Successfull")
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        if (fileInputRef.current) {
          resetFileInput() // Reset the input field
        }
      } else if (response.code === "ERR_BAD_REQUEST") {
        // setError(response.response.mes);
        console.log("BAD REQUES")

        if (response.response.status === 401) {
          toast.error("Error Uploading Lecture ", {
            autoClose: 1000,
            position: toast.POSITION.TOP_RIGHT,
          })
          console.log("401")

        }
      }
    }



  }

  function resetFileInput() {
    if (fileInputRef.current) {
      // Create a new file input element to replace the existing one
      const newFileInput = document.createElement('input');
      newFileInput.type = 'file';

      // Copy any attributes you want to retain from the old input to the new one
      newFileInput.id = fileInputRef.current.id;
      newFileInput.name = fileInputRef.current.name;

      // Replace the old input with the new one
      fileInputRef.current.parentNode.replaceChild(newFileInput, fileInputRef.current);

      // Now, fileInputRef is pointing to the new input element
    }
  }










  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [lectureURL, setLectureURL] = useState("")
  const handleDeleteClick = (lectureURL) => {

    setLectureURL(lectureURL)
    setShowDeleteModal(true);
    // You may also perform additional actions before showing the modal
  };

  const handleDeleteConfirmed = () => {

      axios.post(baseURL + `/teacher/deleteLectures/${lectureURL}`)
        .then(response => {

          if (response.status == 200) {
            toast.success("Successfully deleted Lecture ", {
              autoClose: 1000,
              position: toast.POSITION.TOP_RIGHT,
            })
            setShowDeleteModal(false);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error("Failed to deleted Lecture ", {
              autoClose: 1000,
              position: toast.POSITION.TOP_RIGHT,
            })
          }
        })
        .catch(error => {
          toast.error("Failed to deleted Lecture ", {
            autoClose: 1000,
            position: toast.POSITION.TOP_RIGHT,
          })
        });

   

  };

  const handleDeleteCancelled = () => {
    // Handle cancel action
    setShowDeleteModal(false);
  };

  const DeleteConfirmationModal = ({ onDelete, onCancel, show }) => {
    return (
      <Modal show={show} onHide={onCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Lecture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to delete this lecture?</h5>
        </Modal.Body>
        <Modal.Footer className="justify-content-center align-items-center d-flex">
          <Button variant="danger" onClick={onDelete} style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
            Yes
          </Button>
          <Button variant="secondary" onClick={onCancel} style={{ MarginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };


  const handleUpdateClick = (lectureURL) => {
    // Add your update logic here
    setLectureURL(lectureURL)
    setShowUpdateModal(true);
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // const handleUpdate = () => {


  //     updateLecture()



   
  // };



//   const updateLecture = () =>{

// const formData = new FormData();


// formData.append('file', selectedFile);
// formData.append('classId', _id);
// formData.append('lectureDesc', Remarks);
// formData.append('lectureLink', lectureLink);
// formData.append('teacherID', teacherID);
// formData.append('lectureName', lectureName);



//     axios.post(`/teacher/editLectures/${lectureURL}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//       .then(response => {

//         if(response.status == 200){
//           console.log(response.data.message);
//           toast.success("Successfully Updated Lecture ", {
//             autoClose: 1000,
//             position: toast.POSITION.TOP_RIGHT,
//           })
//           setShowUpdateModal(false);

//         }else{
//           toast.error("Error Updating Lecture ", {
//             autoClose: 1000,
//             position: toast.POSITION.TOP_RIGHT,
//           })
//         }
      
//         // Handle success
//       })
//       .catch(error => {
//         console.error(error);
//         toast.error("Error Updating Lecture ", {
//           autoClose: 1000,
//           position: toast.POSITION.TOP_RIGHT,
//         })
//         // Handle error
//       });
//   }



  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const UpdateModal = ({ show, handleClose }) => {
   
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [link, setLink] = useState(null);
    const [remarks, setRemarks] = useState(null);
   
    const fileInputRef = useRef(null)


    const handleLink = (event) => {
      setLink(event)
    };

   
    const handleRemark = (event) => {
      setRemarks(event)
    };
   
    const handleTitle = (event) => {
      setTitle(event)
    };
   
   
    const handleFile = (event) => {
      setSelectedFile(event.target.files[0]);
      console.log(selectedFile)
    };
   


    const updateLecture = () => {
      const formData = new FormData();
    
      // Check if lectureLink or Remarks are empty and set default values
      formData.append('file', selectedFile);
      formData.append('classId', _id);
      
      // Check if remarks is empty, insert dash ('-') if true, otherwise insert the provided value
      formData.append('lectureDesc', remarks || '-');
    
      // Check if link is empty, insert dash ('-') if true, otherwise insert the provided value
      formData.append('lectureLink', link || '-');
    
      formData.append('teacherID', teacherID);
      formData.append('lectureName', title);
    
      // Check if any required field is empty
      if (!selectedFile || !teacherID || !title) {
        toast.error("Data Missing Please Select a File and Title", {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        axios.post(baseURL+`/teacher/editLectures/${lectureURL}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response.status === 200) {
            console.log(response.data.message);
            toast.success("Successfully Updated Lecture ", {
              autoClose: 1000,
              position: toast.POSITION.TOP_RIGHT,
            });
            setShowUpdateModal(false);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error("Error Updating Lecture ", {
              autoClose: 1000,
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch(error => {
          console.error(error);
          toast.error("Error Updating Lecture ", {
            autoClose: 1000,
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      }
    };
    
   
   
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Lecture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e) =>handleTitle(e.target.value)}
              style={{ textAlign: 'center' }}
              value={title} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              onChange={handleFile}
              ref={fileInputRef}
              className={`${styles.file} custom-file-input`}
              style={{ background: 'grey', color: 'white' }}
            />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control
              type="text"
              placeholder="Video Link"
              onChange={(e) =>handleLink(e.target.value)}
              style={{ textAlign: 'center' }}
              value={link} 
            />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control
              type="text"
              placeholder="References"
              onChange={(e) => handleRemark(e.target.value)}
              style={{ textAlign: 'center' }}
              value={remarks}
            />
          </Form.Group>
          <span>{message !== "" && <p className={styles.errorMessage}>{message}</p>}</span>
        </Modal.Body>
        <Modal.Footer className="justify-content-center align-items-center d-flex">
          <Button variant="success" onClick={updateLecture} style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
            Update
          </Button>
          <Button variant="danger" onClick={handleClose} style={{ marginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };



  //Pasting Code

  const [desc, setdesc] = useState();
  const [link, setlink] = useState();
  const [remark, setremark] = useState();


  let fileURLs = {};

  useEffect(() => {
  axios
    .get(baseURL + `/students/getLecture/${_id}`)
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

  }, []);





  useEffect(() => {
    axios
      .get(baseURL + `/students/getLecture/${_id}`)
      .then((response) => {
        if (response.data) {
          //  fileURLs = response.data.reduce((accumulator, item, index) => {
          //   accumulator[index] = item.fileURL;
          //   return accumulator;
          // }, {});
          setLectures(response.data)
          //   setAssignments(response.data);


        }
      })
      .catch((error) => {
        console.log(error);
      });


  }, [])
  console.log(fileURLs)


  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };








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


  const row_color = {
    backgroundColor: 'transparent',
    color: 'black',
    borderRadius:'16px',
    
  }
  const head_color = {
    backgroundColor: 'transparent',
    color: 'black',
    fontWeight: '600',
    fontFamily:'Poppins',
    fontSize:'medium' ,
  }






  return (
    <>
      <div className="container-fluid" style={{ textAlign: 'center', marginTop: '0px' ,overflow:'auto',}}>
        <center>
        <h1 style={{fontFamily:'Poppins',background:'' , padding:'5px' , color : 'black', borderRadius: '20px', marginBottom: '20px', letterSpacing:'3px'}}>
           LECTURES</h1>
          


          {/* Upload Lecture */}
          <div className="row justify-content-center align-items-center d-flex" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '300px' }}>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                className={`${styles.file} custom-file-input`}
                style={{ background: 'grey', color: 'white' }}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '300px' }}>
              <Form.Control
                type="text"
                placeholder="Title"
                onChange={(e) => handleNameChange(e.target.value)}
                style={{ textAlign: 'center' }}
              />
            </Form.Group>

         
            <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '300px' }}>
              <Form.Control
                type="text"
                placeholder="Video Link"
                onChange={(e) => handleLinkChange(e.target.value)}
                style={{ textAlign: 'center' }}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%', maxWidth: '300px' }}>
              <Form.Control
                type="text"
                placeholder="Remark/References"
                onChange={(e) => handleRemarksChange(e.target.value)}
                style={{ textAlign: 'center' }}
              />
            </Form.Group>

            <div className="mb-3" style={{ margin: '0 5px 10px 0', width: '100%' }}>
              <Button
                className={`${styles.assignmentButton} btn-success`}
                onClick={teacherLectureUpload}
                style={{ background: '', color: 'white' , fontSize:'large' , width:'220px', height:'50px', borderRadius:'30px'
                  , boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.4)', marginTop:'10px'}}
                >
                Upload Lecture
              </Button>
              <span>{message !== "" && <p className={styles.errorMessage}>{message}</p>}</span>
            </div>
          </div>


          <table className="table custom-std-table" style={{border:'0px solid silver', verticalAlign: 'middle' , 
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',borderRadius:'5px'}}>
            <thead style={{border:'0px solid silver' , padding: '15px', verticalAlign: 'middle', textAlign:'center', 
            background:'' }} >
              <tr >
                <th style={{ ...head_color, width: '2%' }}>Sr No.</th>
                <th style={{ ...head_color, width: '5%' }}>Title</th>
                <th style={{ ...head_color, width: '5%' }}>Lecture File</th>
                {/* <th style={{ ...head_color,width: '7%', fontSize:'large'  }}>Description</th> */}
                <th style={{ ...head_color, width: '5%' }}>Video Link</th>
                <th style={{ ...head_color, width: '5%' }}>Remark/References</th>
                <th style={{ ...head_color, width: '7%' }}>Action</th>
              </tr>
            </thead>

            {lectures.map((lecture, index) =>


            (
              <tbody style={{ textAlign: 'center', verticalAlign: 'middle', padding: '15px',borderRadius:'16px' ,}}>
                <tr key={lecture.fileURL} >

                  <td style={{ ...row_color, marginTop: '5px' }}>
                    <p style={{ fontSize: 'large', fontWeight: '' }}>
                      {index + 1}
                    </p>
                  </td>

                  <td style={{ ...row_color }}>
                    <p style={{ fontSize: 'large', fontWeight: '' }}>
                      {lecture.lectureName}
                    </p>
                  </td>



            
                  <td style={{ ...row_color }}>

                    <button
                      className="btn btn-primary"
                      style={{ marginTop: '-5px', fontSize: 'medium' ,backgroundColor: 'rgba(0, 0, 255, 0.6)'}}
                      onClick={openFileInBrowser.bind(null, lecture.fileURL)}
                    >
                      View Lecture
                    </button>

                  </td>

                  <td style={{ ...row_color }}>
                    <p style={{ fontSize: 'large', fontWeight: '' }}>
                      <a href={lecture.lectureLink} target="_blank" rel="noopener noreferrer">
                        {lecture.lectureLink}
                      </a>
                    </p>
                  </td>

                  <td style={{ ...row_color }}>
                    <p style={{ fontSize: 'large', fontWeight: '' }}>
                      {lecture.lectureDesc}
                    </p>
                  </td>
                  <td style={{ ...row_color , borderRadius:'20px'}}>
                    <button
                      className="btn btn-primary " style={{ margin: '5px', fontSize: 'medium', width: '100px', fontWeight: 'bold' }}
                      onClick={handleUpdateClick.bind(null, lecture._id)}
                    >
                      Edit
                    </button>
                    
                    <button
                      className="btn btn-danger " style={{ margin: '5px', fontSize: 'medium', width: '100px', fontWeight: 'bold' }}
                      onClick={handleDeleteClick.bind(null, lecture.fileURL)}
                    >
                      Delete
                    </button>
                  </td>


                </tr>
              </tbody>
            ))}
          </table>



          <UpdateModal
            show={showUpdateModal}
            handleClose={handleCloseUpdateModal}
           
          
           
          />

          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            show={showDeleteModal}
            onDelete={handleDeleteConfirmed}
            onCancel={handleDeleteCancelled}
          />

        </center>
      </div >




      <ToastContainer></ToastContainer>
    </>


    // <AssignmentList></AssignmentList>
  );
};

export default Lectures;
