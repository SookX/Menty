import { Chart, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = ({ data }) => {
    const canvasData = {
      datasets: [
        {
          borderColor: "red",
          pointRadius: 3,
          fill: false,
          lineTension: 0.1,
          data: data,
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          grid: {
            display: true,
          },
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
          min: Math.min(data) - 1,
          max: Math.max(data) + 1,
          ticks: {
            stepSize: 1,
            color: "green",
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