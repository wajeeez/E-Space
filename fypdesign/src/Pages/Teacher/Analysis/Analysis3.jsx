// Install required dependencies: npm install react-chartjs-2
import React, { useState, useEffect } from 'react';
// import { Bar, Pie } from 'recharts';
import './Analysis3.css'; // Import a CSS file for styling
import { BarChart, Bar, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart,Cell } from 'recharts';

import { Form, Button, Row, Col } from 'react-bootstrap';
import Chart1 from './Chart1';



const Analysis3 = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const row_color = {
    backgroundColor: 'transparent',
    color: 'black',


  }
  const head_color = {
    backgroundColor: 'transparent',
    color: 'black',
    fontWeight: '500',
    fontFamily: 'Poppins',
  }

  //ndleFileChange = (event) => {
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



  const analyzeData = async () => {
    try {
      const fileContent = await readFile(file);
      const jsonData = JSON.parse(fileContent);
      setData(jsonData);
      const storedData = JSON.parse(localStorage.getItem('analysisData'));
      if (!storedData) {
        localStorage.setItem('analysisData', JSON.stringify(data));

      }

    } catch (error) {
      console.error('Error reading or parsing the file:', error);
    }
  };
  useEffect(() => {


    const storedData = JSON.parse(localStorage.getItem('analysisData'));
    if (storedData) {
      // analyzeData();
      setData(storedData)
    }
    if (file) {
      analyzeData();
    }
  }, [file]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };




  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const get = () => {
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


  // const generateChart = () => {
  //   // Process the attendance data and update the chart
  //   // You can add more processing logic as needed
  //   // For simplicity, just passing the attendanceData to the chart
  //   return <LineChart data={data} />;
  // };




  const AttendanceTable = ({ attendanceData }) => {
    return (
      <div className='container-fluid text-center' style={{ marginTop: '10px' ,overflow:'auto',}}>

        <table className="table custom-std-table" style={{
          border: '1px solid silver', verticalAlign: 'middle',
          borderRadius: '5px', width: '100%'
        }}>
          <thead style={{
            border: '0px solid silver', padding: '15px', verticalAlign: 'middle', textAlign: 'center',
            background: ''
          }} >
            <tr >
              <th style={{ ...head_color, width: '2%', fontSize: 'large' }}>#</th>
              <th style={{ ...head_color, width: '2%', fontSize: 'large' }}>Student Name</th>
              <th style={{ ...head_color, width: '2%', fontSize: 'large' }}>Audio Enabled</th>
              <th style={{ ...head_color, width: '2%', fontSize: 'large' }}>Video Enabled</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student, index) => (
              !student.peer_presenter && (
                <tr key={index}>
                  <td style={{ ...row_color, }}>{index}</td>
                  <td style={{ ...row_color, }}>{student.peer_name}</td>
                  <td style={{ ...row_color, }}>{student.peer_audio ? 'Yes' : 'No'}</td>
                  <td style={{ ...row_color, }}>{student.peer_video ? 'Yes' : 'No'}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    );
  };








  const getStudentJoinTimes = () => {
    if (!data) return { onTimeCount: 0, lateCount: 0 };

    const presenterJoinTime = new Date(
      data.find((peer) => peer.peer_presenter).join_data_time
    ).getTime();

    const result = data
      .filter((peer) => !peer.peer_presenter)
      .reduce(
        (acc, student) => {
          const joinTime = new Date(student.join_data_time).getTime();
          const timeDifference = joinTime - presenterJoinTime;

          if (timeDifference === 0) {
            acc.onTimeCount += 1;
          } else {
            acc.lateCount += 1;
          }

          return acc;
        },
        { onTimeCount: 0, lateCount: 0 }
      );

    return result;
  };

  const { onTimeCount, lateCount } = getStudentJoinTimes();




  return (
    <div className="container-fluid" style={{ marginTop: '0px', margin: '0px', background: '',overflow:'auto', }}>
      <center>

        <h1 style={{ fontFamily: 'Poppins', background: '', padding: '5px', color: 'black', borderRadius: '20px', marginBottom: '10px', letterSpacing: '3px' }}>
          ANALYSIS</h1>

        {/* <input type="file" onChange={handleFileChange} /> */}


        <div style={{ display: '', justifyContent: 'center', marginTop: '10px', marginBottom: '30px' }}>
          <Form.Group className="mb-3" >
            <Form.Control
              type="file"
              onChange={handleFileChange}
              style={{
                background: 'lightblue', color: 'black',
                maxWidth: '400px', minWidth: '250px',
              }}
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
          <div className='p-2'>
            {/* First Row */}

            <div className="row">
              <div className="col-md-12 p-3" >
                <div className="card" style={{
                  borderRadius: '16px', border: 'none',
                  boxShadow: '0px 0px 10px rgba(5, 155, 255,0.4)', padding: '10px'
                }}>
                  <div className="card-body" >
                    <h4 className="card-title" style={{
                      fontFamily: 'Poppins, sans-serif', fontWeight: '500',
                      color: 'black', marginBottom: '-10px', marginTop: '-10px'
                    }}>Attendance</h4>

                    {/* Other components or content */}
                    <AttendanceTable attendanceData={data} />


                  </div>
                </div>
              </div>




            </div>




            <div className="row mb-3 ">
              {/* Role Distribution */}
              <div className="col-md-6">
                <div className="card" style={{
                  borderRadius: '16px', border: 'none',
                  boxShadow: '0px 0px 10px rgba(5, 155, 255,0.4)', padding: '10px'
                }}>
                  <div className="card-body ">
                    <h4 className="card-title" style={{
                      fontFamily: 'Poppins, sans-serif', fontWeight: '500',
                      color: 'black', marginBottom: '-10px', marginTop: '-10px'
                    }}>Role Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Teacher/Presenter', value: data.filter((peer) => peer.peer_presenter).length },
                            { name: 'Student', value: data.filter((peer) => !peer.peer_presenter).length },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        >
                          {[
                            { name: 'Teacher/Presenter', color: '#b93cbe' },
                            { name: 'Student', color: '#f3bf4a' },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* <Chart1 data={data}></Chart1> */}
                  </div>
                </div>
              </div>

              {/* Browser Usage */}
              <div className="col-md-6">
                <div className="card" style={{
                  borderRadius: '16px', border: 'none',
                  boxShadow: '0px 0px 10px rgba(5, 155, 255,0.4)', padding: '10px'
                }}>
                  <div className="card-body">
                    <h4 className="card-title" style={{
                      fontFamily: 'Poppins, sans-serif', fontWeight: '500',
                      color: 'black', marginBottom: '-10px', marginTop: '-10px'
                    }}>Browser Usage</h4>
                    {/* <Bar
                    key={3}
                      data={{
                        labels: ['Chrome'],
                        datasets: [
                          {
                            label: 'Participants',
                            data: [
                              data.filter((peer) => peer.browser_name === 'Chrome').length,
                            ],
                            backgroundColor: ['#d089dd', '#fcf08e'],
                          },
                        ],
                      }}
                      options={{
                        responsive: false,
                        maintainAspectRatio: false,
                      }}
                    /> */}
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[{ name: 'Chrome', participants: data.filter((peer) => peer.browser_name === 'Chrome').length }]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="participants"
                          fill="#c124e1"
                          name="Participants"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="row">
              {/* Audio and Video Preferences */}
              <div className="col-md-6">
                <div className="card" style={{
                  borderRadius: '16px', border: 'none',
                  boxShadow: '0px 0px 10px rgba(5, 155, 255,0.4)', padding: '10px'
                }}>
                  <div className="card-body">
                    <h4 className="card-title" style={{
                      fontFamily: 'Poppins, sans-serif', fontWeight: '500',
                      color: 'black', marginBottom: '-10px', marginTop: '-10px'
                    }}>Audio and Video Preferences</h4>
                    {/* <Bar
                      key={4}
                      data={{
                        labels: ['Audio Enabled', 'Video Enabled'],
                        datasets: [
                          {
                            label: 'Participants',
                            data: [
                              data.filter((peer) => peer.peer_audio).length,
                              data.filter((peer) => peer.peer_video).length,
                            ],
                            backgroundColor: ['#d089dd', '#fcf08e'],
                          },
                        ],
                      }}
                      options={{
                        responsive: false,
                        maintainAspectRatio: false,
                      }}
                    /> */}

                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { name: 'Audio Enabled', participants: data.filter((peer) => peer.peer_audio).length },
                          { name: 'Video Enabled', participants: data.filter((peer) => peer.peer_video).length },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="participants"
                          fill="#c124e1"
                          name="Participants"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Line Chart */}
              <div className="col-md-6">
                <div className="card" style={{
                  borderRadius: '16px', border: 'none',
                  boxShadow: '0px 0px 10px rgba(5, 155, 255,0.4)', padding: '10px'
                }}>
                  <div className="card-body" >
                    <h4 className="card-title" style={{
                      fontFamily: 'Poppins, sans-serif', fontWeight: '500',
                      color: 'black', marginBottom: '-10px', marginTop: '-10px'
                    }}>Total Students</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { name: 'OnTime', participants: onTimeCount + 2 },
                          { name: 'Late', participants: lateCount },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="participants"
                          fill="#c124e1"
                          name="Participants"
                        />
                      </BarChart>
                    </ResponsiveContainer>
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
