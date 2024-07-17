import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_LOGOUT_API } from "../ApiCalls/ApiCall/apiCalls";
import { setAccessTokenInLocalStorage } from "../ApplicationStorage/LocalStorageFun";
import { updateIsLogoutModalToStore } from "../Redux/Action/AllModalReducerAction";
import CustomButton from "../ReusableComponent/CustomButton/CustomButton";
import CustomModal from "../ReusableComponent/CustomModal";

const Logout = ({ isLogout = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeHandlerFun = () => {
    USER_LOGOUT_API().then((res) => {
      const { data = "", code = 500 } = res?.data || {};
      if (data.length > 0 && code === 200) {
        // setLoader(false)
        setAccessTokenInLocalStorage({});
        // dispatch(updateIsLogoutModalToStore(false));
        navigate("/login");
        window.location.reload();
      }
    });
  };

  const closeLogoutHandler = () => {
    dispatch(updateIsLogoutModalToStore(false));
  };
  return (
    <div>
      <CustomModal
        modalSize={"lg"}
        isModalOpen={isLogout}
        title={
          <>
            <span>Logout</span>
          </>
        }
        closeHandler={closeLogoutHandler}
      >
        <div>
          {/* Description */}
          <div className="flex flex-column">
            <span>
              We have found you’re Sign-In to other devices also, would you like
              logout from here only or form all devices.
            </span>
          </div>

          <div className="mt-4">
            <div className="color-gray fs-11px flex justify-start items-center ml-2">
              <span className="">DEVICE TYPE</span>
              <span className="ml-32">OPERATING SYSTEM</span>
              <span className="ml-32">LAST LOGGED IN</span>
            </div>

            <div
              style={{ border: "1px solid #e3e3e3", borderRadius: "8px" }}
              className="px-2 py-2 flex justify-start items-center"
            >
              <span className="fs-12px d-flex align-items-center">
                <i className="ico-laptop-icon"></i>{" "}
                <span className="ml-5 font-bold">Desktop/Laptop</span>
              </span>
              <span className="fs-12px ml-10 font-bold">Windows</span>
              <span
                className="fs-12px font-bold"
                style={{ marginLeft: "184px" }}
              >
                29 June 2023 09:23:56
              </span>
              <span className="fs-12px ml-24 font-bold">
                28 June 2023 12:23:56
              </span>
            </div>
            <div
              style={{ border: "1px solid #e3e3e3", borderRadius: "8px" }}
              className="px-2 py-2 d-flex flex justify-start items-center mt-2"
            >
              <span className="fs-12px d-flex align-items-center">
                <i
                  className="ico-mobile-icon"
                  style={{ marginLeft: "10px" }}
                ></i>{" "}
                <span className="ml-9">Mobile</span>
              </span>
              <span className="fs-12px ml-24">Android</span>
              {/* <span className="fs-12px">29 june 2023</span> */}
            </div>

            <div className="flex justify-between">
              <CustomButton
                type={"button"}
                buttonBg={"bg-[#da0006]"}
                onClickButton={closeHandlerFun}
                title={"Logout From Here"}
                width={"w-fit"}
                btnClass={"border-none mt-3 px-4"}
              />
              <CustomButton
                type={"button"}
                buttonBg={"bg-[#da0006]"}
                onClickButton={closeHandlerFun}
                title={"Logout From All Device"}
                width={"w-fit"}
                btnClass={"border-none mt-3 px-4"}
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default Logout;
