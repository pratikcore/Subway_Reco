import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import {
  CloudUploadOutlined,
  DashboardOutlined,
  ReconciliationOutlined,
  ContainerOutlined,
  GiftOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import COLORS from "../Constants/Colors";

const Sidebar = ({ setCollapsedSidebar, collapsedSidebar = true }) => {
  const navigate = useNavigate()

  const onClick = (key) => {
    // Handle navigation based on the sidebar item key
    switch (key.key) {
      case "dashboard":
        navigate("/"); // Navigate to the dashboard
        break;
      case "reconciliation":
        navigate("/reconciliation"); // Navigate to the reconciliation page
        break;
      // case "reports":
      //   navigate("/reports"); // Navigate to the reports page
      //   break
      case "upload":
        navigate("/upload");
        break
      case "report":
        navigate("/report");
        break
      case "voucher":
        navigate("/voucher");
        break
      default:
        navigate("/"); // Default to the dashboard
        break
    }
    
  };

  return (
    <>
      <Sider style={{background: '#ffffff'}} trigger={null} collapsible collapsed={collapsedSidebar}>
        <div style={{backgroundColor:"#ffffff", paddingInline: 10, paddingBlock: collapsedSidebar ? 25.5 : 13.5}}><img
          src={require('../../Assets/Images/subway_logo.png')}
          alt="logo"
        /></div>
        <Menu
        itemSelectedBg={'red'}
          // theme="dark"
          mode="inline"
          className="text-white px-2"
          // rootClassName="text-white"
          defaultSelectedKeys={["dashboard"]}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined/>,
              label: "Dashboard",
              link: '/'
            },
            {
              key: "reconciliation",
              icon: <ReconciliationOutlined/>,
              label: "Reconciliation",
              link: '/reconciliation'
            },
            // {
            //   key: "voucher",
            //   icon: <GiftOutlined />,
            //   label: "Vouchers",
            //   link: '/voucher'
            // },
            {
              key: "report",
              icon: <ContainerOutlined/>,
              label: "Reports",
              link: '/report'
            },
            {
              key: "upload",
              icon: <CloudUploadOutlined/>,
              label: "Upload",
              link: '/upload'
            }
          ]}
          onClick={onClick}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
