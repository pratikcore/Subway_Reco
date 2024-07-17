import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];
const PieSpiderChart = ({data=[]}) => {
  const onReady = (e) => {
    console.log("on Ready", e)
  }
  const onEvent = (e) => {
    console.log("on Event", e)
  }
  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    appendPadding: 10,
    // innerRadius: 0.6,
    height: 200,
    width: 200,
    label: {
      text: (d) => `${d.type}\n ${d.value}`,
      position: 'spider',
    },
    legend: {
      color: {
        title: true,
        position: 'right',
        rowPadding: 5,
      },
    },
    
  };


  return <Pie onEvent={onEvent} onReady={onReady} {...config} />;
};

export default PieSpiderChart