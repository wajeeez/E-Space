import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  const totalAudioEnabled = data.filter((peer) => peer.peer_audio).length;
  const totalVideoEnabled = data.filter((peer) => peer.peer_video).length;

  const chartData = {
    labels: ['Audio Enabled', 'Video Enabled'],
    datasets: [
      {
        label: 'Total Students',
        data: [totalAudioEnabled, totalVideoEnabled],
        borderColor: ['#FF6384', '#36A2EB'],
        borderWidth: 2,
        pointBackgroundColor: ['#FF6384', '#36A2EB'],
        pointRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Features',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Total Students',
        },
      },
    },
  };

  return (
    <div className="chart-item">
      {/* <h2>Total Students</h2> */}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;