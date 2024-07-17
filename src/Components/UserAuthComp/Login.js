import React, { useState } from "react";
import { Form, Input, Button, Image } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
// import BG_IMAGE from "../Images/bg-image2.jpeg";
import BG_IMAGE from "../../Assets/Images/bg-image2.jpeg"
import BRAND_LOGO from "../../Assets/Images/corepeelersLogo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUserCredentialsLocalStorage } from "../../ApplicationStorage/LocalStorageFun";
import { updateSquareLoaderModalToStore } from "../../Redux/Action/AllModalReducerAction";
import { generateDeviceCode } from "../../Helper/Utils";
import { ACCESS_TOKEN_API } from "../../ApiCalls/ApiCall/apiCalls";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const deviceCode = generateDeviceCode();

  const onFinish = (values) => {
    const { email, password } = values;
    setLoader(true);
    dispatch(updateSquareLoaderModalToStore(true));

    ACCESS_TOKEN_API({
      DEVICE_CODE: deviceCode,
      param: { username: email, password },
    })
      .then((res) => {
        if (res?.response?.data?.code === 406) {
          alert(res?.response?.data?.message)
        } else {
          const { access_token, roles, roleName } = res?.data?.data || {};
          if (access_token) {
            logInUserCredentialsLocalStorage(res?.data?.data || {});
            navigate("/");
          } else {
            // Handle error case here
            dispatch(updateSquareLoaderModalToStore(false));
          }
        }
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        dispatch(updateSquareLoaderModalToStore(false));
      })
      .finally(()=> {
        setLoader(false);
      })
  };

  const forgetPasswordHandler = () => {
    navigate("/forget-password");
    // Implement password reset functionality here
  };

  let loginCSs = {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 26px #00000029",
    borderRadius: "20px",
    opacity: 1,
    paddingRight: '16px',
    paddingLeft: '16px',
    paddingTop: '30px',
    paddingBottom: '12px',
    width: '30%'
  }

  return (
    <div
      style={{
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="login-card" style={loginCSs}>
        <Image src={BRAND_LOGO} preview={false} height={50} width={120}/>

        <div
          className="text-dark mcd-font-medium"
          style={{ marginTop: "33px" }}
        >
          Please login to your account
        </div>

        <Form
          name="loginForm"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="loginButton"
              loading={loader}
            >
              Log in
            </Button>
          </Form.Item>

          {/* <Form.Item>
            <span className="forgot-password" onClick={forgetPasswordHandler}>
              Forgot password?
            </span>
          </Form.Item> */}
        </Form>

        <div
          className="mcd-font-regular"
          style={{
            marginTop: "35px",
            color: "#A0A0A0",
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          Powered by CorePeelers
        </div>
      </div>

      {loader && <div>||...||...||...</div>}
    </div>
  );
};

export default Login;
