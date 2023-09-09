import "./App.module.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import  MeetCheck from "./Pages/MeetCheck";
// import myImage from '../public/logo192.png'
import LandingPage from "./Pages/Final_Design/Landing_Page/LandingPage";
import Footer from "./Components/Final_Design_Components/LandingPage_Components/Footer";
import Main from "./Pages/Main/Main";
import StdSign from "./Pages/Student/Login/StdSign";
import Std from "./Pages/Student/Std";
import Teacher from "./Pages/Teacher/Teacher/Teacher";
import TeacherReg from "./Pages/Teacher/Registration/TeacherReg";
import TSignin from "./Pages/Teacher/Login/TSignin";
import TDashboard from "./Pages/Final_Design/TeacherDashboard/TDashboard";
import TeacherMain from "./Pages/Final_Design/TeacherMain/TeacherMain";
// import TDashboard from "./Pages/Teacher/TDashboard/TDashboard";
import CreateClass from "./Pages/Classes/Create/CreateClass";
import Class from './Pages/Classes/Class/Class'
import StdClass from './Pages/Classes/StdClass/StdClass'
import Meeting from "./Pages/MeetingApi/Meeting";
import Assignment from "./Pages/Teacher/Assignment/Assignment"
import StdAssignment from "./Pages/Student/Assignment/stdAssignment";
import StdDashboard from "./Pages/Student/Dashboard/StdDashboard"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Room from "./Pages/MeetingApi/Room";
import CustomMeeting from "./Pages/CustomMeeting/MeetingCustom/CustomMeeting";
// import MeetFront from "./Pages/CustomMeeting/Meeting/MeetFront";

import AssignmentList from "./Pages/Teacher/AssigmentList/AssignmentList";
import Stddb from "./Pages/Final_Design/Stddbclasses/Stddb";
import Slogin from "./Pages/Final_Design/Slogin/Slogin"
import Tlogin from "./Pages/Final_Design/Tlogin/Tlogin";
import Treg from "./Pages/Final_Design/Sreg/Treg";
import Signin_Options from "./Components/Final_Design_Components/LandingPage_Components/Signin_Options";
function PrivateRoute({ component: Component }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    
    if (!isAuthenticated) {
      navigate('/teacher/login');
    }
  }, [navigate]);

  const checkAuthentication = () => {
    const token = localStorage.getItem('authToken');

    return !!token; 
  };

  return <Component />;
}

function PrivateRoute2({ component: Component }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    
    if (!isAuthenticated) {
      navigate('/std/login');
    }
  }, [navigate]);

  const checkAuthentication = () => {
    const token = localStorage.getItem('StdToken');

    return !!token; 
  };

  return <Component />;
}

function PrivateRoute3({ component: Component }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    
    if (isAuthenticated) {
      navigate('/std/dashboard');
    }
  }, [navigate]);

  const checkAuthentication = () => {
    const token = localStorage.getItem('StdToken');

    return !!token; 
  };

  return <Component />;



}

function PrivateRoute4({ component: Component }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    
    if (isAuthenticated) {
      navigate('/TDashboard');
    }
  }, [navigate]);

  const checkAuthentication = () => {
    const token = localStorage.getItem('authToken');

    return !!token; 
  };

 
 
 

  return <Component />;

}



const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/std",
    element: <Std />,
  },
  {
    path: "/std/login",
   //  element: <PrivateRoute3 component={StdSign} />,
   
   element: <PrivateRoute3 component={Slogin} />,
  },
  { 
    
    path: "/std/dashboard",
  element: <PrivateRoute2 component={Stddb} />,

  },

  {
    path: "/teacher",
    element: <Teacher />,
  },


  {
    path: "/TDashboard",
    element: <PrivateRoute component={TeacherMain} />,
  },

  {
    path: "/teacher/register",
    element: <Treg />,
  },

  {
    path: "/teacher/login",
    element: <PrivateRoute4 component={Tlogin} />,

  },

  {
    path:`/teacher/class/:_id`,
    element:<TDashboard/>
  },

  {
    path:`/student/class/:_id`,
    element:<StdClass/>
  },

  {
    path: "/teacher/createclass",
    element: <CreateClass />,
  },

  {
    path: "/:classes/assignment/:_id",
    element: <StdAssignment />,
  },
  {
    path: "/:classes/meeting/:roomID",
    element: <Room />,
  },
  {
    path:"/custom/:classes/meeting/:roomID",
    element:<CustomMeeting/>

  },
  {
    path: "/teacher/class/Assignments/:_id",
    element: <Assignment/>,
  },
  {
    path: "/signin/options",
    element: <Signin_Options/>,
  },
  
]);

function App() {
  return (
    <>

   
      <RouterProvider router={router} />
      {/* <MeetFront></MeetFront> */}
     
      {/* <img src="/logo192.png" alt="Description of the image" />
    */}

    </>
  );
}






export default App;




//NEW APP TRYING

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

// const App = () => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStreams, setRemoteStreams] = useState([]);
//   const [roomId, setRoomId] = useState('');
//   const [peerConnections, setPeerConnections] = useState({});

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setLocalStream(stream);
//       })
//       .catch((error) => {
//         console.error('Error accessing media devices:', error);
//       });

//     socket.on('userJoined', (userId) => {
//       console.log('User joined:', userId);
//       createPeerConnection(userId, true);
//     });

//     socket.on('userLeft', (userId) => {
//       console.log('User left:', userId);
//       removeRemoteStream(userId);
//     });

//     socket.on('offer', (offer, userId) => {
//       console.log('Received offer from:', userId);
//       createPeerConnection(userId, false);
//       const peerConnection = peerConnections[userId];
//       peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//       peerConnection.createAnswer()
//         .then((answer) => {
//           peerConnection.setLocalDescription(answer);
//           socket.emit('answer', { answer, room: roomId });
//         })
//         .catch((error) => {
//           console.error('Error creating answer:', error);
//         });
//     });

//     socket.on('answer', (answer, userId) => {
//       console.log('Received answer from:', userId);
//       const peerConnection = peerConnections[userId];
//       peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//     });

//     socket.on('candidate', (candidate, userId) => {
//       console.log('Received ICE candidate from:', userId);
//       const peerConnection = peerConnections[userId];
//       peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const createPeerConnection = (userId, isOfferer) => {
//     const peerConnection = new RTCPeerConnection();

//     if (localStream) {
//       localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream);
//       });
//     }

//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit('candidate', { candidate: event.candidate, room: roomId });
//       }
//     };

//     peerConnection.ontrack = (event) => {
//       const stream = event.streams[0];
//       setRemoteStreams((prevStreams) => [...prevStreams, { userId, stream }]);
//     };

//     if (isOfferer) {
//       peerConnection.createOffer()
//         .then((offer) => {
//           peerConnection.setLocalDescription(offer);
//           socket.emit('offer', { offer, room: roomId });
//         })
//         .catch((error) => {
//           console.error('Error creating offer:', error);
//         });
//     }

//     setPeerConnections((prevConnections) => ({
//       ...prevConnections,
//       [userId]: peerConnection,
//     }));
//   };

//   const removeRemoteStream = (userId) => {
//     setRemoteStreams((prevStreams) =>
//       prevStreams.filter((stream) => stream.userId !== userId)
//     );

//     setPeerConnections((prevConnections) => {
//       const updatedConnections = { ...prevConnections };
//       delete updatedConnections[userId];
//       return updatedConnections;
//     });
//   };

//   const handleJoinRoom = () => {
//     socket.emit('join', roomId);
//   };

//   return (
//     <div>
//  <h2>Video Meeting App</h2>
//       <div>
//         <input
//           type="text"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//           placeholder="Enter room ID"
//         />
//         <button onClick={handleJoinRoom}>Join Room</button>
//       </div>
//       <div>
//         <h3>Local Stream</h3>
//         {localStream && <video srcObject={localStream} autoPlay />}
//       </div>
//       <div>
//         <h3>Remote Streams</h3>
//         {remoteStreams.map((stream) => (
//           <video key={stream.userId} srcObject={stream.stream} autoPlay />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;










