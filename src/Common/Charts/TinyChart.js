import { Tiny } from '@ant-design/plots';
import React from 'react';

const TinyChart = ({percent=0.2, width = 120, style={}}) => {
  // const percent = 0.7;
  const config = {
    percent,
    width: width,
    // height: width,
    height: style?.height ? style?.height : width,
    color: ['#cccccc', '#028940'],
    // autoFit: true,
    innerRadius: 0.85,
    radius: 0.98,
    annotations: [
      {
        type: 'text',
        style: {
          text: `${parseFloat((percent * 100).toFixed(2))}%`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
  };

  return <Tiny.Ring {...config} />;
};

export default TinyChart