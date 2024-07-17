import React from "react";
import { Line } from "@ant-design/plots";

const VarLineChart = ({
  chartData = [],
  xField = "value",
  yField = "type",
  height = "auto",
  width = '100%'
}) => {
  const config = {
    data: chartData,
    xField: (d) => new Date(d.year),
    yField: "value",
    sizeField: "value",
    shapeField: "trail",
    legend: { size: false },
    colorField: "category",
  };
  return <div style={{ width: width, height: height }} ><Line {...config} /></div>;
};

export default VarLineChart;
