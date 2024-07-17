import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import CustomDashboardCard from '../../Common/ReusableComponent/CustomDashboardCard';

const TotalSales = ({
  TotalSales = 245000,
  mySale = {
    inStore: { title: "In-Store", value: "0.00", onClick: () => {} },
    three3PO: { title: "Aggregator", value: "0.00", onClick: () => {} }
  },
}) => {
  return (
  // <div className="w-full flex gap-4" style={{gap: 15}}>
  <div className="w-full flex gap-4" >
    <CustomDashboardCard title={"Total Sales"} value={`${TotalSales} L`} color={"#1E5162"} />
    <CustomDashboardCard title={mySale?.inStore?.title} value={`${mySale?.inStore?.value} L`} color={"#1E5162"} />
    <CustomDashboardCard title={mySale?.three3PO?.title} value={`${mySale?.three3PO?.value} L`} color={"#1E5162"} />
  </div>
)};

export default TotalSales;