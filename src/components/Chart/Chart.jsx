import React from "react";
import { fetchDailyData } from "../../api";
import styles from "./Chart.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data, country }) => {
  const [dailyData, setDailyData] = React.useState([]);

  React.useEffect(() => {
    let apiCall = true;
    if (apiCall) {
      const fetchApi = async () => {
        const response = await fetchDailyData();
        setDailyData(response);
      };
      fetchApi();
    }
    return () => {
      apiCall = false;
    };
  }, []);

  const LineChart = (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            label: "Infected",
            data: dailyData.map(({ confirmed }) => confirmed),
            borderColor: "#3333ff",
            fill: true,
          },
          {
            label: "Deaths",
            data: dailyData.map(({ deaths }) => deaths),
            borderColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  );

  const BarChart = country ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)",
            ],
            data: [
              data.data.confirmed.value,
              data.data.recovered.value,
              data.data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        plugins: {
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>
      {country && country !== "Global" ? BarChart : LineChart}
    </div>
  );
};
export default Chart;
