// Chart1.js
import React from 'react';
import { Pie } from 'recharts';

const Chart1 = ({ data }) => {
    const chartId = `chart-${Math.random().toString(36).substr(2, 9)}`;
    console.log(chartId)
  return (
    <Pie

    key={chartId}
      data={{
        labels: ['Teacher/Presenter', 'Student'],
        datasets: [
          {
            data: [
              data.filter((peer) => peer.peer_presenter).length,
              data.filter((peer) => !peer.peer_presenter).length,
            ],
            backgroundColor: ['#b93cbe', '#f3bf4a'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
          },
        ],
      }}
      options={{
        responsive: false,
        maintainAspectRatio: false,
      }}
    />
  );
};

export default Chart1;
