import React from 'react';
import { Empty } from 'antd';
const EmptyComp = ({ width, height, text = "No Data" }) => (
  <div
    style={{
      width: width,
      height: height,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Empty description={text}/>
  </div>
);
export default EmptyComp;