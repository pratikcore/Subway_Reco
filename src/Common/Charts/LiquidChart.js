import { Liquid } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';
import {convertPercentage} from '../../Helper/Utils';
import COLORS from '../Constants/Colors';

const LiquidChart = ({percentage=0.3,width = "200px", style = {}}) => {
  const config = {
    percent: percentage / 100,
    
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
      textFill: '#000000',
      fill: COLORS.themeGreen,
      stroke: COLORS.themeGreen
      // color: COLORS.themeGreen,
      // outlineColor: COLORS.themeGreen,
      // outlineBorderColor: COLORS.themeGreen,

    },
  };
  return <div style={{ width: width, height: width, ...style}} ><Liquid {...config} /></div>;
};

export default LiquidChart