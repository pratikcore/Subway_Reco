import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Layout, Spin, message } from "antd";
import Navbar from "./Common/Navbar/Navbar";
import Sidebar from "./Common/Sidebar/Sidebar";
import DashboardPage from "./Components/Dashboard/Dashboard";
// import NotFoundPage from "./ReusableComponent/NotFoundPage";
// import ForgetPassword from "./UserAuthComp/ForgetPassword";
// import OTPVerifyScreen from "./UserAuthComp/OTPVerifyScreen";
// import SetNewPassword from "./UserAuthComp/SetNewPassword";
import { useDispatch, useSelector } from "react-redux";
import { getAccessTokenLocalStorage } from "./ApplicationStorage/LocalStorageFun";
import Login from "./Components/UserAuthComp/Login";
import PageNotFound from "./Common/ReusableComponent/PageNotFound/PageNotFound";
import Reconciliation from "./Components/Reconciliation/Reconciliation";
import Uploads from "./Components/Uploads/Uploads";
import "./App.css";
import Reports from "./Components/Reports/Reports";
import Vouchers from "./Components/Vouchers/Vouchers";

const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Action in progress..',
        duration: 2.5,
      })
      .then(() => message.success('Loading finished', 2.5))
      .then(() => message.info('Loading finished', 2.5));
  };

  const storeData = useSelector((state) => state.DashboardModal.Modals) || {};
  const { squareLoader = false } = storeData || {};

  const userDetails = getAccessTokenLocalStorage();
  const { access_token = "" } = userDetails || {};
  const isUserLoggedIn = access_token.length > 0;
  console.log("access token", access_token.length > 0);
  const pathname = window?.location?.pathname || "";
  const changePagePath = window?.location?.pathname == "/changepassword";
  const loginPagePath = window?.location?.pathname == "/login";

  // useEffect(() => {
  //   const userDetails = getAccessTokenLocalStorage();
  //   const { access_token = "" } = userDetails || {};

  //   // Perform any initial data fetching or user-related actions here based on login status
  //   if (access_token) {
  //     // Example: dispatch actions or fetch user data
  //   }
  // }, []);
  // access_token
  let customContentStyle = { margin: "24px 16px", padding: 24, minHeight: 280 };
  const [spinning, setSpinning] = React.useState(false);

  return (
    <>
      <Router>
        <Layout style={{ minHeight: "100vh", background:"#f5f5f5" }}>
          {/* Sidebar Section */}
          {access_token && <Sidebar collapsedSidebar={collapsed} />}

          <Layout className="site-layout" style={{background:"#f5f5f5"}}>
            {/* Header Section */}
            {access_token && (
              <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            )}

            {/* Main Content Section */}
            <Content style={access_token ? customContentStyle : {}}>
              {/* Define Routes */}
              <Routes>
                {access_token && <Route path="/" element={<DashboardPage />} />}
                {access_token && (
                  <Route
                    path="/reconciliation/*"
                    element={<Reconciliation />}
                  />
                )}
                {/* Add more routes as needed */}
                {!access_token && <Route path="/" element={<Login />} />}
                {!access_token && <Route path="/login" element={<Login />} />}
                {access_token && <Route path="/upload" element={<Uploads />} />}
                {access_token && <Route path="/report" element={<Reports />} />}
                {access_token && <Route path="/voucher" element={<Vouchers />} />}
                {/* <Route path="/uploadspage" element={<Uploads />} /> */}
                {/* <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/otp-verify" element={<OTPVerifyScreen />} />
              <Route path="/set-new-password" element={<SetNewPassword />} /> */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
      <Spin spinning={spinning} style={{ zIndex: 9999 }} fullscreen />
      {contextHolder}
    </>
  );
};

export default App;
