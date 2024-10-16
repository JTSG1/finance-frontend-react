// src/components/PieChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {ArcElement} from 'chart.js'
import Chart from 'chart.js/auto'



function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <Doughnut
         data={chartData}
         options={{
            maintainAspectRatio: true,
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
               display: true
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
          }
          }}
      />
    </div>
  );
}
export default LineChart;