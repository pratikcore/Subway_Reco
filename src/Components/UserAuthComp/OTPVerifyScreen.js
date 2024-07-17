import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import BG_IMAGE from "../Images/bg-image2.jpeg";
import BRAND_LOGO from "../Images/corepeelersLogo.png";
// import "../CSS/icons.css";
import CustomButton from "../ReusableComponent/CustomButton/CustomButton";
import {
  ACCESS_TOKEN_API,
  RESET_otpValue_API,
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

const OTPVerifyScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otpValue: "",
  });
  const deviceCode = generateDeviceCode();
  const [hidePass, setHidePass] = useState(true);
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [otpValue, setOtpValue] = useState(""); // OTP value
  const [resendDisabled, setResendDisabled] = useState(true); // Flag to disable resend button

  let globalOptions = {
    position: "top-right",
  };

  let notifier = new AWN(globalOptions);

  // Function to start the timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(countdown);
          setResendDisabled(false); // Enable resend button when timer reaches 0
          return prevTimer;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup on unmount
  }, [resendDisabled]);

  // Function to handle OTP resend
  const handleResendOTP = () => {
    // Generate new OTP
    const newOtp = generateNewOTP();
    setOtpValue(newOtp);

    // Reset timer
    setTimer(60);
    setResendDisabled(true); // Disable resend button until timer reaches 0
  };

  // Function to generate new OTP
  const generateNewOTP = () => {
    // Implement your logic to generate a new OTP here
    return "123456"; // Example OTP
  };

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
            <span className="mcd-font-medium">Enter Verification Code</span>
          </div>
          <div style={{ marginTop: "23px" }}>
            <Form>
              <Form.Group
                className="mb-3 position-relative"
                controlId="formBasicotpValue"
              >
                <span
                  className="position-absolute"
                  style={{ top: "12px", left: "12px" }}
                >
                  <i className="password-icon"></i>
                </span>
                <Form.Control
                  type={hidePass ? "password" : "text"}
                  placeholder="Enter OTP"
                  name="otpValue"
                  value={formData.otpValue}
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
              </Form.Group>
              {/* Display timer */}
              {resendDisabled && <div className="text-center">Time remaining: {timer} seconds</div>}
              {/* Resend OTP button */}
              {/* <Button
                variant="primary"
                disabled={resendDisabled}
                onClick={handleResendOTP}
                className="mt-3"
              >
                Resend OTP
              </Button> */}
              <div className="flex justify-between mt-4">
                <CustomButton
                  disabled={resendDisabled}
                  buttonBg={"bg-mcd-gray text-white"}
                  onClickButton={handleResendOTP}
                  title={"Resend OTP"}
                  btnClass={"py-2.5 border-none"}
                />
                <CustomButton
                  disabled={!formData.otpValue > 0 ? 'mcd-disabled' : ''}
                  type={"submit"}
                  buttonBg={"bg-mcd-gray text-white"}
                  onClickButton={() => {
                    navigate("/set-new-password");
                  }}
                  title={"Verify OTP"}
                  btnClass={"py-2.5 border-none"}
                />
              </div>
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

export default OTPVerifyScreen;