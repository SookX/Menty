import { Chart, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "./Dashboard";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = () => {
    const { score, anxiety, depression, bipolar, personalityDisorder, suicidal, stress, dates } = useContext(DashboardContext)

    const dataset = {
      borderColor: "#3e9e3c",
      pointRadius: 3,
      fill: false,
      lineTension: 0.1,
      data: score,
      borderWidth: 2,
      label: 'Normal'
    }

    const canvasData = {
      datasets: [
        dataset,
        {
          ...dataset,
          borderColor: "#e67a27",
          data: anxiety,
          label: "Anxiety"
        },
        {
          ...dataset,
          borderColor: "#1e2121",
          data: depression,
          label: "Depression"
        },
        {
          ...dataset,
          borderColor: "#a11f91",
          data: bipolar,
          label: "Bipolar"
        },
        {
          ...dataset,
          borderColor: "#51d6c2",
          data: personalityDisorder,
          label: "Personality Disorder"
        },
        {
          ...dataset,
          borderColor: "#6b0000",
          data: suicidal,
          label: "Suicidal"
        },
        {
          ...dataset,
          borderColor: "#dbca46",
          data: stress,
          label: "Stress"
        },
      ],
    };

    const options = {
      scales: {
        x: {
          grid: {
            display: true,
          },
          labels: dates,
          ticks: {
            color: "#463813",
            font: {
              family: "Nunito",
              size: 12,
            },
          },
        },
        y: {
          grid: {
            display: true,
          },
          min: 0,
          max: 1,
          ticks: {
            stepSize: 0.1,
            color: "#452D55",
            font: {
              family: "Nunito",
              size: 12,
            },
          },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom"
        },
        title: {
          display: false,
        },
      },
    };

    return (
        <div className="chart-container">
            <Line id="home" options={options} data={canvasData} />
        </div>
    )
}

export default LineChart