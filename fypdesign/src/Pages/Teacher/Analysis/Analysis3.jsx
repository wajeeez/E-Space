// Install required dependencies: npm install react-chartjs-2
import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import './Analysis3.css'; // Import a CSS file for styling
import LineChart from './LineChart';

const Analysis3 = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const analyzeData = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

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
    <div>
      <h1>Peer Analysis</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={analyzeData}>Analyze</button>

      {data && (
        <div className="chart-container">
          {/* Display charts based on your analysis */}
          <div className="chart-item">
            <h2>Role Distribution</h2>
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
                  },
                ],
              }}
              options={{
                responsive: false,
                maintainAspectRatio: false,
              }}
            />
          </div>

          <div className="chart-item">
            <h2>Browser Usage</h2>
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

          <div className="chart-item">
            <h2>Audio and Video Preferences</h2>
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
          <div className="chart-item">

          <LineChart data={data}/>
            
          </div>
         
   
        </div>
      )}
    </div>
  );
};

export default Analysis3;
