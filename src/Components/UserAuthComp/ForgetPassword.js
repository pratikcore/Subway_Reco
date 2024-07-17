import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import BG_IMAGE from "../Images/bg-image2.jpeg";
import BRAND_LOGO from "../Images/corepeelersLogo.png";
// import "../CSS/icons.css";
import CustomButton from "../ReusableComponent/CustomButton/CustomButton";
import {
  ACCESS_TOKEN_API,
  RESET_PASSWORD_API,
} from "../ApiCalls/ApiCall/apiCalls";
import { useNavigate } from "react-router-dom";
import { generateDeviceCode, showCustomAlert } from "../Helper/Utils";
import {
  getAccessTokenLocalStorage,
  logInUserCredentialsLocalStorage,
} from "../ApplicationStorage/LocalStorageFun";
import { useDispatch } from "react-redux";
import { updateSquareLoaderModalToStore } from "../Redux/Action/AllModalReducerAction";
import SquareLoader from "../ReusableComponent/CustomLoader/SquareLoader";
import CustomAlertModal from "../ReusableComponent/CustomAlert/CustomAlertModal";
import AWN from "awesome-notifications";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const deviceCode = generateDeviceCode();
  const [hidePass, setHidePass] = useState(true);

  let globalOptions = {
    position: "top-right",
  };

  let notifier = new AWN(globalOptions);

  const formDataHandler = (e) => {
    const { name, value } = e.target || {};
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div
        className="w-full overflow-auto"
        style={{
          background: `url(${BG_IMAGE}) no-repeat center center/cover`,
          height: "100vh",
        }}
      >
        <div
          className="login-card  container"
          style={{
            // paddingTop: "30px",
            // paddingLeft: "30px",
            // paddingRight: "30px",
            // paddingBottom: "30px",
            // right: "92px",
            // bottom: "67px",
            // maxWidth: "420px",
            padding: "30px",
            right: 0,
            bottom: 0,
            maxWidth: "420px",
            overflow: "auto",
            left: "324px",
            top: "290px",
            position: "relative",
          }}
        >
          <div>
            <img
              alt="brandLogo"
              src={BRAND_LOGO}
              width="95"
              height="95"
              className="d-inline-block align-top"
            />{" "}
          </div>
          <div style={{ marginTop: "33px" }} className="text-dark">
            <span className="mcd-font-medium">Enter your registered email</span>
          </div>
          <div style={{ marginTop: "23px" }}>
            <Form>
              <Form.Group
                className="mb-3 position-relative"
                controlId="formBasicEmail"
              >
                <span
                  className="position-absolute"
                  style={{ top: "12px", left: "12px" }}
                >
                  <i className="user-icon"></i>
                </span>
                <Form.Control
                  type="email"
                  placeholder={"Enter your username"}
                  name="email"
                  value={formData.email}
                  onChange={formDataHandler}
                  style={{
                    background: "#EFEFEF",
                    border: "none",
                    fontSize: "18px",
                    height: "50px",
                    color: "#818181",
                    paddingLeft: "50px",
                  }}
                  required
                />
                {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
              </Form.Group>

              {/* <Form.Group
                    className="mb-3 position-relative"
                    controlId="formBasicPassword"
                  >
                    <span
                      className="position-absolute"
                      style={{ top: "12px", left: "12px" }}
                    >
                      <i className="password-icon"></i>
                    </span>
                    <Form.Control
                      type={hidePass ? "password" : "text"}
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={formDataHandler}
                      style={{
                        background: "#EFEFEF",
                        border: "none",
                        fontSize: "18px",
                        height: "50px",
                        color: "#818181",
                        paddingLeft: "50px",
                      }}
                      required
                    />
                    <i
                      onClick={() => {
                        setHidePass((prev) => !prev);
                      }}
                      className={
                        !hidePass
                          ? "eye-open-icon absolute"
                          : "eye-close-icon absolute"
                      }
                      style={{ top: "14px", right: "13px", cursor: "pointer" }}
                    ></i>
                  </Form.Group> */}
              {/* <Form.Group
                    className="mb-3 d-flex justify-content-end cursor-pointer disabled "
                    controlId="formBasicCheckbox"
                  >
                    <Form.Text
                      className="disabled"
                      style={{ color: "#DB0106" }}
                      onClick={forgetPasswordHandler}
                    >
                      <span className="disabled">Reset Password?</span>
                    </Form.Text>
                  </Form.Group> */}
              <CustomButton
                disabled={!formData.email > 0 ? 'mcd-disabled' : ''}
                type={"submit"}
                buttonBg={"bg-mcd-gray text-white"}
                onClickButton={() => {
                  navigate("/otp-verify");
                }}
                title={"Send OTP"}
                btnClass={"py-2.5 border-none"}
              />
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
        </div>
      </div>
      {loader && <SquareLoader />}
    </div>
  );
};

export default ForgetPassword;
