import { Chart, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = ({ data, labels = [1, 2, 3, 4, 5, 6, 7] }) => {
    const min = 0
    const max = 1

    const dataset = {
      borderColor: "#452D55",
      pointRadius: 3,
      fill: false,
      lineTension: 0.1,
      data: data,
      borderWidth: 2,
    }

    const canvasData = {
      datasets: [
        dataset,
        {
          ...dataset,
          borderColor: "#001F45",
          data: [0.1, 0.8, 0.6, 0.3, 0.9, 0.1],
        }
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