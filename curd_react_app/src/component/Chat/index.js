import { Icon } from "rsuite";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
const cx = classNames.bind(styles);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: { maxTicksLimit: 10 },
    },
    y: {
      grid: {
        drawBorder: false,
        tickLength: 40,
      },

      ticks: {
        max: 2400,
        min: 0,
        stepSize: 400,
        callback: (context, index) => {
          return context + "k";
        },
      },
    },
  },
  plugins: {
    tooltip:{
        backgroundColor:"#F9FAFB",
        bodyColor:"#4B5563",
        borderColor:"#ccc",
        borderWidth:1,
        padding: 15,
        titleColor:'#4B5563',
        titleFontSize:30,
        titleFont: "bold",
        yAlign:"bottom",
        
    },
    legend: {
      display: false,
    },
  },
};
const labels = [
  "01 June",
  "02 June",
  "03 June",
  "04 June",
  "05 June",
  "06 June",
  "07 June",
];
const datapoints = [400, 1300, 800, 1500, 300, 1200, 600, 2400];
export const data = {
  labels: labels,
  datasets: [
    {
      data: datapoints,
      borderColor: "#0e9f6e",
      fill: false,
      cubicInterpolationMode: "monotone",
      tension: 0.4,
      pointStyle: "circle",
      pointRadius: 1,
    },
  ],
};

function Chat() {
  return (
    <div className={cx("chart")}>
        <div className={cx("chart_header")}>
            <h1>Doanh thu</h1>
            <Icon icon="exclamation-circle2" className={cx("chart_icon")} />
        </div>
      <Line options={options} data={data} />
    </div>
  );
}

export default Chat;
