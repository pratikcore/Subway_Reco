import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CHANGE_PASSWORD_API } from "../ApiCalls/ApiCall/apiCalls";
import { showCustomAlert } from "../Helper/Utils";
import BG_IMAGE from "../Images/bg-image2.jpeg";
import BRAND_LOGO from "../Images/corepeelersLogo.png";
import CustomButton from "../ReusableComponent/CustomButton/CustomButton";
import SquareLoader from "../ReusableComponent/CustomLoader/SquareLoader";
import AWN from "awesome-notifications";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    confirmPassword: "",
    // currentPassword: "",
    newPassword: "",
  });

  let globalOptions = {
    icons: {
      enabled: true,
      async: "cog",
    },
    // options.icons = {
    //   async: "cog",
    //   ...
    // }
    position: "top-right",
  };

  let notifier = new AWN(globalOptions);

  const [PASSWORD_FIELDS, SET_PASSWORD_FIELDS] = useState([
    // {
    //   title: "Enter Current Password",
    //   value: "currentPassword",
    //   isPassShow: false,
    // },
    {
      title: "Enter New Password",
      value: "confirmPassword",
      isPassShow: false,
    },
    { title: "Confirm New Password", value: "newPassword", isPassShow: false },
  ]);

  const loginHandler = (e) => {
    e.preventDefault();
    // const deviceCode = generateDeviceCode();
    const userDetail = {
      confirmPassword: formData.confirmPassword,
      //   currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };
    if (
      formData?.confirmPassword?.length > 0 &&
      //   formData?.currentPassword?.length > 0 &&
      formData?.newPassword?.length > 0
    ) {
      setLoader(true);
      // if(String(deviceCode).length > 0){
      CHANGE_PASSWORD_API({
        // DEVICE_CODE: deviceCode,
        param: userDetail,
      })
        .then((res) => {
          console.log("res of access token", res);
          // debugger
          const { data = "", code = 500 } = res?.data || {};
          if (data.length > 0 && code === 200) {
            // Reset the form after handling submission
            setFormData({
              confirmPassword: "",
              //   currentPassword: "",
              newPassword: "",
            });
            setLoader(false);
            notifier.success("You have successfully changed your Password!!");
            navigate("/");
          } else {
            const { message = "", timestamp = "" } = res?.response?.data || {};
            // message &&
            //   showCustomAlert({
            //     title: "Error",
            //     bodyMsg: message,
            //     underTitle: timestamp,
            //     dispatch: dispatch,
            //   });
            setLoader(false);
            // Reset the form after handling submission
            setFormData({
              confirmPassword: "",
              //   currentPassword: "",
              newPassword: "",
            });
          }
        })
        .catch((err) => {
          setLoader(false);
          // Reset the form after handling submission
          setFormData({
            confirmPassword: "",
            // currentPassword: "",
            newPassword: "",
          });
        });
      // }
    } else {
      console.log("");
      // showCustomAlert({
      //   title: "Error",
      //   bodyMsg: "Something Went Wrong",
      //   // underTitle: timestamp,
      //   dispatch: dispatch
      // })
    }
  };
  const formDataHandler = (e) => {
    // debugger
    const { name, value } = e.target || {};
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const returnToDash = () => {
    navigate("/");
  };

  const toggleIsPassShowHandler = (v) => {
    SET_PASSWORD_FIELDS((prev) => {
      return prev.map((field) => {
        if (field.value === v) {
          return { ...field, isPassShow: !field.isPassShow };
        }
        return field;
      });
    });
  };

  console.log("login Credentails", formData);
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
            <span className="mcd-font-medium">Change your password</span>
          </div>
          <div style={{ marginTop: "23px" }}>
            <Form>
              {PASSWORD_FIELDS.map((item, ind) => {
                return (
                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="formBasicPassword"
                    key={`${item.value}-${ind}`}
                  >
                    <span
                      className="position-absolute"
                      style={{ top: "12px", left: "12px" }}
                    >
                      <i className="password-icon"></i>
                    </span>
                    <Form.Control
                      type={item.isPassShow ? "text" : "password"}
                      placeholder={item.title}
                      name={item.value}
                      value={formData[item.value]}
                      onChange={formDataHandler}
                      className="bg-[#EFEFEF] focus:bg-[#EFEFEF]"
                      style={{
                        border: "none",
                        fontSize: "18px",
                        height: "50px",
                        color: "#818181",
                        paddingLeft: "50px",
                      }}
                      required
                    />
                  </Form.Group>
                );
              })}
              <CustomButton
                type={"submit"}
                buttonBg={"bg-mcd-gray text-white"}
                onClickButton={() => {
                  navigate("/login")
                }}
                title={"Change Password"}
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

export default SetNewPassword;
