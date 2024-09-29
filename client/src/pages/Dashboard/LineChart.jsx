import { Chart, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = ({ data, labels = [1, 2, 3, 4, 5, 6, 7] }) => {
    const min = Math.round(Math.min(data) / 10) * 10
    const max = Math.ceil(Math.max(data) / 10) * 10

    const canvasData = {
      datasets: [
        {
          borderColor: "#452D55",
          pointRadius: 3,
          fill: false,
          lineTension: 0.1,
          data: data,
          borderWidth: 2,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          grid: {
            display: true,
          },
          labels: labels,
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
          min: min,
          max: max,
          ticks: {
            stepSize: (max - min) / 6,
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
          display: false,
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