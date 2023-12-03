import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TChart = ({ value1, value2 }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      // Create a chart instance
      const ctx = chartRef.current.getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line', // Change chart type to 'line'
        data: {
          labels: ['Value 1', 'Value 2'],
          datasets: [
            {
              label: 'Values',
              data: [value1, value2],
              fill: false, // Set to falsGe for a line chart
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  
      // Cleanup when the component is unmounted
      return () => myChart.destroy();
    }, [value1, value2]);
  
    return <canvas ref={chartRef} width={300} height={80}></canvas>;
  };


export default TChart;
