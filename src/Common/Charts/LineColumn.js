import React from 'react';
import { Column } from '@ant-design/charts';
import { Empty } from 'antd';
import { formatNumberToLakhsAndCrores } from '../../Helper/Utils';

const LineColumnBarChart = ({
  width,
  height,
  dataItems = [],
  xField = "letter",
  yField = "frequency",
  labelFormatter,
  chartStyle,
  isShort=false
}) => {
  const data = dataItems || [
    { letter: "A", frequency: 0.08167 },
    { letter: "B", frequency: 0.01492 },
    { letter: "C", frequency: 0.02782 },
    { letter: "D", frequency: 0.04253 },
    { letter: "E", frequency: 0.12702 },
    { letter: "F", frequency: 0.02288 },
    { letter: "G", frequency: 0.02015 },
    { letter: "H", frequency: 0.06094 },
    { letter: "I", frequency: 0.06966 },
    { letter: "J", frequency: 0.00153 },
    { letter: "K", frequency: 0.00772 },
    { letter: "L", frequency: 0.04025 },
    { letter: "M", frequency: 0.02406 },
    { letter: "N", frequency: 0.06749 },
    { letter: "O", frequency: 0.07507 },
    { letter: "P", frequency: 0.01929 },
    { letter: "Q", frequency: 0.00095 },
    { letter: "R", frequency: 0.05987 },
    { letter: "S", frequency: 0.06327 },
    { letter: "T", frequency: 0.09056 },
    { letter: "U", frequency: 0.02758 },
    { letter: "V", frequency: 0.00978 },
    { letter: "W", frequency: 0.0236 },
    { letter: "X", frequency: 0.0015 },
    { letter: "Y", frequency: 0.01974 },
    { letter: "Z", frequency: 0.00074 },
  ];

  const chartConfig = {
    data,
    xField: xField,
    yField: yField,
    // seriesField: xField,
    label: {
      formatter: (d) => formatNumberToLakhsAndCrores(d)+"L",
      textBaseline: "bottom",
      fill: '#000000',
      position: 'top',
    },
    axis: {
      // y: {
      //   labelFormatter: "",
      // },
      // x: false,
      x: {
        labelFormatter: (d) => d.length > 5 && isShort === true ? d.substring(0, 5)+'...' : d,
      },
      // legend: {
      //   position: 'right-top',
      // }
    },
    // autoRotate: true,
    // rotate: 90,
    // height: 200,
    // autoFit: false,
    // legend: {
    //   position: "right-top",
    //   // flipPage: false
    // },
    // pattern: {
    //   type: 'dot',
    //   cfg: {
    //     size: 4,
    //     padding: 4,
    //     rotation: 0,
    //     fill: '#FFF',
    //     isStagger: true,
    //   },
    // },
    style: {
      radiusTopLeft: 10,
      radiusTopRight: 10,
      fill: ({ tenderName, bankName }) => {
        if (tenderName === 'SWIGGY') {
          return '#FC8019';
        } else if (tenderName === 'ZOMATO') {
          return '#cb202d';
        } else if (tenderName === 'MAGICPIN') {
          return '#2A1288';
        } else if (tenderName === 'UPI') {
          return '#FFC20D'
        } else if (tenderName === 'CARD') {
          return '#028940'
        } else if (bankName === 'YES') {
          return '#028940'
        } else if (bankName === 'AMEX') {
          return '#FFC20D'
        } else if (bankName === 'PHONEPE') {
          return '#028940'
        } else {
          return '#028940'
        }
      },
    },
  };

  return (
    <div style={{ width, height }} className={!(dataItems?.length > 0) && "flex justify-center items-center"}>
      {/* {dataItems?.length > 0 ? <Column {...chartConfig} /> : <Empty width={width} height={height} />} */}
      {dataItems?.length > 0 ? <Column {...chartConfig} /> : null}
    </div>
  );
};

export default LineColumnBarChart;
