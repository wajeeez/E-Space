// Install required dependencies: npm install react-chartjs-2
import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import './Analysis3.css'; // Import a CSS file for styling
import LineChart from './LineChart';

import { Form, Button, Row, Col } from 'react-bootstrap';



const Analysis3 = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setFile(file);
    
  // };

  // const analyzeData = async () => {
  //   if (!file) {
  //     alert('Please select a file first.');
      
  //     return;
      
  //   }

  //   try {
  //     const fileContent = await readFile(file);
  //     const jsonData = JSON.parse(fileContent);
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error('Error reading or parsing the file:', error);
  //   }
  // };


  // const readFile = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (event) => resolve(event.target.result);
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsText(file);
  //   });
  // };

  useEffect(() => {
    if (file) {
      analyzeData();
    }
  }, [file]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const analyzeData = async () => {
    try {
      const fileContent = await readFile(file);
      const jsonData = JSON.parse(fileContent);
      setData(jsonData);
    } catch (error) {
      console.error('Error reading or parsing the file:', error);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const getStudentJoinTimes = () => {
    if (!data) return [];

    const presenterJoinTime = new Date(data.find((peer) => peer.peer_presenter).join_data_time).getTime();

    return data
      .filter((peer) => !peer.peer_presenter)
      .map((student) => {
        const joinTime = new Date(student.join_data_time).getTime();
        const timeDifference = joinTime - presenterJoinTime;
        return { student: student.peer_name, joinTime: timeDifference };
      });
  };

//   const getStudentJoinTimes = () => {
//     if (!data) return { onTimeCount: 0, lateCount: 0 };

//     const presenterJoinTime = new Date(data.find((peer) => peer.peer_presenter).join_data_time).getTime();

//     const result = data
//       .filter((peer) => !peer.peer_presenter)
//       .reduce((acc, student) => {
//         const joinTime = new Date(student.join_data_time).getTime();
//         const timeDifference = joinTime - presenterJoinTime;

//         if (timeDifference === 0) {
//           acc.onTimeCount += 1;
//         } else {
//           acc.lateCount += 1;
//         }

//         return acc;
//       }, { onTimeCount: 0, lateCount: 0 });

//     return result;
//   };7


const generateChart = () => {
    // Process the attendance data and update the chart
    // You can add more processing logic as needed
    // For simplicity, just passing the attendanceData to the chart
    return <LineChart data={data} />;
  };

  return (
    <div className="container-fluid" style={{ marginTop: '0px', margin:'0px' ,background:''}}>
      <center>
       
              <h1 style={{fontFamily:'Poppins',background:'' , padding:'5px' , color : 'black', borderRadius: '20px', marginBottom: '10px', letterSpacing:'3px'}}>
           ANALYSIS</h1>

      {/* <input type="file" onChange={handleFileChange} /> */}


      <div style={{ display: '',justifyContent:'center',marginTop:'10px', marginBottom:'30px' }}>
      <Form.Group className="mb-3" >
        <Form.Control
          type="file"
          onChange={handleFileChange}
          style={{ background: 'lightblue', color: 'black', 
          maxWidth: '400px', minWidth: '250px',  }}
        />
      </Form.Group>

      {/* <Button
        className={`btn-primary`}
        onClick={analyzeData}
        style={{
          background: '',
          color: 'white',
          fontSize: 'large',
          width: '150px',
          height: '40px',
          borderRadius: '30px',
          boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.4)',
          marginRight:'40px',marginLeft:'40px',
        }}
      >
        Analyze
      </Button> */}
    </div>



      {/* <button onClick={analyzeData}>Analyze</button> */}




      {data && (
  // <div className="chart-container">
  <div>
    {/* First Row */}
    <div className="row mb-3 ">
      {/* Role Distribution */}
      <div className="col-md-6">
        <div className="card" style={{borderRadius: '16px' , border:'none', 
        boxShadow: '0px 0px 10px rgba(5, 155, 255,0.4)', padding:'10px'}}>
          <div className="card-body ">
            <h4 className="card-title" style={{fontFamily: 'Poppins, sans-serif', fontWeight: '500',
            color:'black', marginBottom:'-10px', marginTop:'-10px' }}>Role Distribution</h4>
            <Pie
              data={{
                labels: ['Teacher/Presenter', 'Student'],
                datasets: [
                  {
                    data: [
                      data.filter((peer) => peer.peer_presenter).length,
                      data.filter((peer) => !peer.peer_presenter).length,
                    ],
                    backgroundColor: ['#FF6384', '#36A2EB'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                    // backgroundColor: ['#ae236d', '#f6cf46'],
                    // hoverBackgroundColor: ['#ae236d', '#f6cf46'],
                  },
                ],
              }}
              options={{
                responsive: false,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>

      {/* Browser Usage */}
      <div className="col-md-6">
        <div className="card" style={{borderRadius: '16px' , border:'none', 
        boxShadow: '0px 0px 10px rgba(5, 155, 255,0.4)', padding:'10px'}}>
          <div className="card-body">
            <h4 className="card-title" style={{fontFamily: 'Poppins, sans-serif', fontWeight: '500',
            color:'black', marginBottom:'-10px', marginTop:'-10px' }}>Browser Usage</h4>
            <Bar
              data={{
                labels: ['Chrome'],
                datasets: [
                  {
                    label: 'Participants',
                    data: [
                      data.filter((peer) => peer.browser_name === 'Chrome').length,
                    ],
                    backgroundColor: '#36A2EB',
                  },
                ],
              }}
              options={{
                responsive: false,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Second Row */}
    <div className="row">
      {/* Audio and Video Preferences */}
      <div className="col-md-6">
        <div className="card" style={{borderRadius: '16px' , border:'none', 
        boxShadow: '0px 0px 10px rgba(5, 155, 255,0.4)', padding:'10px'}}>          
        <div className="card-body">
            <h4 className="card-title" style={{fontFamily: 'Poppins, sans-serif', fontWeight: '500',
            color:'black', marginBottom:'-10px', marginTop:'-10px' }}>Audio and Video Preferences</h4>
            <Bar
              data={{
                labels: ['Audio Enabled', 'Video Enabled'],
                datasets: [
                  {
                    label: 'Participants',
                    data: [
                      data.filter((peer) => peer.peer_audio).length,
                      data.filter((peer) => peer.peer_video).length,
                    ],
                    backgroundColor: ['#FF6384', '#36A2EB'],
                  },
                ],
              }}
              options={{
                responsive: false,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="col-md-6">
        <div className="card" style={{borderRadius: '16px' , border:'none', 
        boxShadow: '0px 0px 10px rgba(5, 155, 255,0.4)', padding:'10px'}}>
          <div className="card-body" >
            <h4 className="card-title" style={{fontFamily: 'Poppins, sans-serif', fontWeight: '500',
            color:'black', marginBottom:'-10px', marginTop:'-10px' }}>Total Students</h4>
            <LineChart data={data} />
          </div>
        </div>
      </div>
    </div>
  </div>
)}


    </center>
    </div>
  );
};

export default Analysis3;
