import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomDropdown from "../ReusableComponent/CustomDropdown";
import { USER_LOGOUT_API } from "../../ApiCalls/ApiCall/apiCalls";
import { setAccessTokenInLocalStorage } from "../../ApplicationStorage/LocalStorageFun";
import COLORS from "../Constants/Colors";

const { Header, Sider, Content } = Layout;

const Navbar = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const items = [
    { key: 1, label: "Home", redirect: "/" },
    { key: 2, label: "About", redirect: "/about" },
    { key: 3, label: "Logout", redirect: "" },
  ];

  const closeHandlerFun = () => {
    USER_LOGOUT_API().then((res) => {
      const { data = "", code = 500 } = res?.data || {};
      if (data.length > 0 && code === 200) {
        // setLoader(false)
        setAccessTokenInLocalStorage({});
        // dispatch(updateIsLogoutModalToStore(false));
        navigate("/");
        window.location.reload();
      } else {
        setAccessTokenInLocalStorage({});
        // dispatch(updateIsLogoutModalToStore(false));
        navigate("/");
        window.location.reload();
      }
    }).catch(err => {
      console.log("----error", err);
      setAccessTokenInLocalStorage({});
      // dispatch(updateIsLogoutModalToStore(false));
      navigate("/");
      window.location.reload();
    })
  };

  const logoutHandler = () => {
    closeHandlerFun()
  }
  const profileDrop = [
    {
      label: (
        <a>
          Logout
        </a>
      ),
      key: '1',
      onClick: logoutHandler
    }
  ];

  return (
    <>
      <Header
        className="flex"
        style={{ padding: 0, background: colorBgContainer, display: "flex" }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div className="w-full" />
        <div style={{marginLeft: '6px', marginRight: '6px', paddingRight: '10px'}}>
          <CustomDropdown items={profileDrop} title={"User"}/>
        </div>
      </Header>
    </>
  );
};

export default Navbar;
