import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

interface DoughnutChartProps {
  correctAnswers: number;
  wrongAnswers: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  correctAnswers,
  wrongAnswers,
}) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Correct Answers", "Wrong Answers"],
      datasets: [
        {
          data: [correctAnswers, wrongAnswers],
          backgroundColor: [
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--purple-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--purple-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "60%",
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: "Results Summary",
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [correctAnswers, wrongAnswers]);

  return (
    <div className="card flex justify-content-center">
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
};

export default DoughnutChart;
