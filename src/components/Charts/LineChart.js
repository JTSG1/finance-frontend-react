// src/components/PieChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {ArcElement} from 'chart.js'
import Chart from 'chart.js/auto'

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <Line
         data={chartData}
         options={{
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 0 // Removes the points from the line
              },
            },
           plugins: {
             title: {
               display: true,
               text: ""
             },
             legend: {
               display: false
             }
           },
           scales: {
            x: {
              grid: {
                display: false, // Disable x-axis gridlines
              },
              display: false, // Hide x-axis
            },
            y: {
              grid: {
                display: false, // Disable y-axis gridlines
              },
              display: false, // Hide
            },
          },
          animation: {
            duration: 0, // Disable animations by setting duration to 0
          }
          }}
      />
    </div>
  );
}
export default LineChart;