import React, { useState, useEffect, useMemo } from "react";
import { Chart } from "primereact/chart";

interface DoughnutChartProps {
  correctAnswers: number;
  wrongAnswers: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  correctAnswers,
  wrongAnswers,
}) => {
  const documentStyle = useMemo(
    () => getComputedStyle(document.documentElement),
    []
  );

  const chartData = useMemo(() => {
    return {
      labels: ["Correct Answers", "Wrong Answers"],
      datasets: [
        {
          data: [correctAnswers, wrongAnswers],
          backgroundColor: [
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-300"),
          ],
          borderColor: "transparent",
          borderWidth: 0,
        },
      ],
    };
  }, [correctAnswers, wrongAnswers, documentStyle]);

  const chartOptions = useMemo(() => {
    return {
      cutout: "60%",
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
        title: {
          display: false,
          text: "Progress Chart",
        },
      },
    };
  }, []);

  return (
    <div
      className="card flex justify-content-center"
      style={{ border: "none" }}
    >
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-full" // Adjust width as needed
        style={{ width: "310px", height: "300px" }} // Adjust height and max width as needed
      />
    </div>
  );
};

export default DoughnutChart;
