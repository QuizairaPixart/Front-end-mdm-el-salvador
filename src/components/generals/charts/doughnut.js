import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import "../../../css/generals/charts/doughnut.css";
import { sumarDias } from "./utils/DatesFormats";
export default function Doughnuts({ data, maxWidth }) {
  const [devices, setDevices] = useState({
    connected: null,
    desconnected: null,
  });
  useEffect(() => {
    setDevices({
      connected: data.connected,
      desconnected: data.total - data.connected,
    });
  }, [data]);

  let chartData = {
    labels: ["No conectados", "Conectados"],
    datasets: [
      {
        data: [devices.desconnected, devices.connected],
        backgroundColor: ["#003686", "#3F9BFF"],
        hoverBackgroundColor: ["#003686", "#3F9BFF"],
      },
    ],
  };

  const lightOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  };

  return (
    <>
      <Chart
        type="doughnut"
        data={chartData}
        options={lightOptions}
        style={{
          position: "relative",
          maxWidth: maxWidth,
        }}
      />
    </>
  );
}
