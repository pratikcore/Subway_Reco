import { Liquid } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

const PinLiquidChart = ({ width = "200px", background = "white" }) => {
  const config = {
    percent: 0.7,
    style: {
      shape: 'pin',
      textFill: '#fff',
      outlineBorder: 4,
      outlineDistance: 3,
      waveLength: 128,
      backgroundFill: background,
    },
  };
  return <div style={{ width: width, height: width}}  ><Liquid {...config} /></div>;
};

export default PinLiquidChart