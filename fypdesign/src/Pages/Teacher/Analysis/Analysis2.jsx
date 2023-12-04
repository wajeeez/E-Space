import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

const Analysis2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      // Replace this with your actual API endpoint
      const response = await fetch('YOUR_API_ENDPOINT');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const generateCharts = () => {
    const teacherData = data.filter((peer) => peer.peer_presenter);
    const studentData = data.filter((peer) => !peer.peer_presenter);

    const teacherChart = generateChart('Teachers', teacherData);
    const studentChart = generateChart('Students', studentData);

    return (
      <div>
        <h2>Teacher Chart</h2>
        {teacherChart}
        <h2>Student Chart</h2>
        {studentChart}
      </div>
    );
  };

  const generateChart = (label, chartData) => {
    const labels = chartData.map((peer) => peer.peer_name);
    const audioData = chartData.map((peer) => (peer.peer_audio ? 1 : 0));
    const videoData = chartData.map((peer) => (peer.peer_video ? 1 : 0));

    const chartDataset = {
      labels,
      datasets: [
        {
          label: 'Audio',
          data: audioData,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
        {
          label: 'Video',
          data: videoData,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
        },
      ],
    };

    return <Bar data={chartDataset} />;
  };

  return (
    <div className="container">
      <h1>React Charts App</h1>
      {data.length > 0 ? generateCharts() : <p>Loading data...</p>}
    </div>
  );
};

export default Analysis2;       
