import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const PieChart = ({
  chartData,
  angleField = 'value',
  colorField = 'type',
  width = 250

}) => {

  const config = {
    data: chartData,
    angleField: angleField,
    colorField: colorField,
    width: width,
    height: width,
    appendPadding: 10,
    radius: 1,
    innerRadius: 0.6,
    // label: {
    //   // text: angleField,
    //   // type: "inner",
    //   offset: "-50%",
    //   content: "{value}",
    //   style: {
    //     textAlign: "center",
    //     fontSize: 14
    //   }
    // },
    label: {
      text: 'value',
      style: {
        // fontWeight: 'bold',
        fontSize: 8,
        textAlign: 'center'
      },
    },

    // legend: {
    //   color: {
    //     title: true,
    //     position: 'right',
    //     rowPadding: 5,
    //   },
    // },
    legend: false,
    // annotations: [
    //   {
    //     type: 'text',
    //     style: {
    //       text: 'AntV\nCharts',
    //       x: '50%',
    //       y: '50%',
    //       textAlign: 'center',
    //       // fontSize: 40,
    //       fontStyle: 'bold',
    //     },
    //   },
    // ],
  };

  return <div style={{ width: width }} ><Pie {...config} /></div>;
};

export default PieChart