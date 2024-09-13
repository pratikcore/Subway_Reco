import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeToTechnicalAndDisplay,
  convertTo3POOnlyTreeData,
  convertToInStoreCheckTreeData,
  convertToTenderOnlyTreeData,
  dateFormatChanger,
  downloadReportsFun,
  formatNumberToLakhsAndCrores,
} from "../../Helper/Utils";
import { Row, Spin, Col, Skeleton } from "antd";
import { updateIsDownloadProgressbarToStore } from "../../Redux/Action/AllModalReducerAction";
import {
  DASHBOARD_DATA_API,
  _3PO_DATA_API,
} from "../../ApiCalls/ApiCall/apiCalls";
import {
  update3POTableDataToStore,
  updateDashboardTableDataToStore,
  updateDateRangeSelectDataToStore,
} from "../../Redux/Action/DashboardStoreAction";
import LineChart from "../../Common/Charts/LineChart";
import CustomWrapDropdown from "../../Common/ReusableComponent/CustomWrapDropdown";
import { message } from "antd";
import { BarChartOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons";
import MainStoreComponent from "../../Common/ReusableComponent/MainStoreComponent";
import CustomButton from "../../Common/ReusableComponent/CustomButton/CustomButton";
import CustomDatePicker from "../../Common/ReusableComponent/CustomDatePicker/CustomDatePicker";
import LiquidChart from "../../Common/Charts/LiquidChart";
import CustomCardWithCharts from "../../Common/ReusableComponent/CustomCardWithCharts";
import TinyLine from "../../Common/Charts/TinyLine";
import TinyChart from "../../Common/Charts/TinyChart";
import PieChart from "../../Common/Charts/PieChart";
import PieSpiderChart from "../../Common/Charts/PieSpiderChart";
import VarLineChart from "../../Common/Charts/VarLineChart";
import DUMMY_VAR_LINE from "../../Common/Charts/VarLineChartDummy.json";
import CustomCheckboxDropdown from "../../Common/ReusableComponent/CustomCheckboxDropdown/CustomCheckboxDropdown";
import { GET_STATE_DATA_API } from "../../ApiCalls/ApiCall/apiCalls";

import { getAccessTokenLocalStorage } from "../../ApplicationStorage/LocalStorageFun";
import { updateStateListAction } from "../../Redux/Action/ReconciliationServiceAction";
import ThreePO from "./ThreePO";
import { useLocation } from "react-router-dom";
import { updateErrorStateOfStateAndStoreAction } from "../../Redux/Action/ReconciliationServiceAction";
import LineColumnBarChart from "../../Common/Charts/LineColumn";
import { dummy3poData, dummyInStoreData } from "./Dummy3po";
import InStore from "./InStore";
import TotalSales from "../TotalSales/TotalSales";



const Dashboard = () => {
  const dispatch = useDispatch();
  const userDetails = getAccessTokenLocalStorage();
  const { access_token = "" } = userDetails || {};
  const isUserLoggedIn = access_token.length > 0;
  const parm = useLocation();

  const {
    currentSelectState = [],
    currentSelectStore = [],
    selectStateAndStoreError = {},
  } = useSelector(
    (state) => state.ReconciliationService.ReconciliationStore || {}
  );
  const {
    DashboardTableData = {},
    _3poTableData = {},
    dateRangeSelect = [],
    mappingStoreData = [],
  } = useSelector((state) => state.DashboardStore.DashboardStore || {});

  const { storeCode = [] } = useSelector(
    (state) => state.ReconciliationService.ReconciliationStore || {}
  );

  const {
    stateList = [],
    storeList = [],
  } = useSelector(
    (state) => state.ReconciliationService.ReconciliationStore || {}
  );

  const [inStoreCheckData, setInStoreCheckData] = useState(
    DashboardTableData?.tenderWiseDataList || []
  );
  const [inThreePOCheckData, setInThreePOCheckData] = useState(
    _3poTableData?.threePOData || []
  );

  useEffect(() => {
    setInStoreCheckData(DashboardTableData?.tenderWiseDataList);
    setInThreePOCheckData(_3poTableData?.threePOData);

  }, [DashboardTableData, _3poTableData]);

  useEffect(() => {
    console.log('=====stateList=====',stateList, currentSelectState);
    isUserLoggedIn && currentSelectState.length === 0 &&
      GET_STATE_DATA_API().then((res) => {
        const { data = [] } = res.data || {};
        console.log("GET STATE Data===============", res);
        if (data) {
          // console.log(data, "DATA");
          dispatch(updateStateListAction(changeToTechnicalAndDisplay(data)));
        }
      });
  }, []);

  const [downloadReports, setDownloadReports] = useState({
    bank: null, // HDFC/ICICI we don't have data now for it
    endDate: `${dateFormatChanger(dateRangeSelect[1] || new Date())}23:59:59`,
    startDate: `${dateFormatChanger(dateRangeSelect[0] || new Date())}00:00:00`,
    tender: null,
  });

  const DashboardToggleDownloadAndApi = (isDown) => {
    setIsLoadingData(true);
    isDown && dispatch(updateIsDownloadProgressbarToStore(true));
    DASHBOARD_DATA_API({
      payload: isDown
        ? downloadReports
        : { ...downloadReports, stores: storeCode || null },
      isDownload: isDown,
    })
      .then((res) => {
        if (isDown) {
          const { data = "" } = res || {};
          dispatch(updateIsDownloadProgressbarToStore(false));
          data.length > 0 && downloadReportsFun(data, "Dashboard Full Report");
        } else {
          const { data = {} } = res?.data || {};
          if (Object.keys(data).length > 0) {
            // showCustomAlert({
            //   title: "Dashboard Table",
            //   bodyMsg: isDown
            //     ? " Download Successfully "
            //     : "Table Update Successfully!",
            //   dispatch: dispatch,
            // });

            dispatch(updateDashboardTableDataToStore(data));
            // setSpinnerState((prev) => ({ ...prev, search: false }));
          }
        }
      })
      .catch((err) => {
        alert("error==");
        // setSpinnerState((prev) => ({ ...prev, search: false }));
      })
      .finally((fin) => {
        // setSpinnerState((prev) => ({ ...prev, search: false }));
        // showCustomAlert({
        //   title: "Dashboard Table",
        //   bodyMsg: " Something Went Wrong ",
        //   dispatch: dispatch,
        // });
        setIsLoadingData(false);
      });
  };

  const items = [
    {
      label: "CARD",
      key: "CARD",
      icon: <UserOutlined />,
    },
    {
      label: "UPI",
      key: "UPI",
      icon: <UserOutlined />,
    },
  ];

  const dashboardItems = [
    {
      label: "Store Sales",
      key: "Store Sales",
      icon: <UserOutlined />,
    },
    {
      label: "Aggregator",
      key: "Aggregator",
      icon: <UserOutlined />,
    },
  ];

  const trmPosItems = [
    {
      label: "Trm",
      key: "Trm",
      icon: <UserOutlined />,
    },
    {
      label: "Pos",
      key: "Pos",
      icon: <UserOutlined />,
    },
  ];

  const posVsTrmVsMprItems = [
    {
      label: "POS VS TRM",
      key: "POS VS TRM",
      icon: <UserOutlined />,
    },
    {
      label: "TRM VS MPR",
      key: "TRM VS MPR",
      icon: <UserOutlined />,
    },
    {
      label: "MPR VS BANK",
      key: "MPR VS BANK",
      icon: <UserOutlined />,
    },
  ];

  const storeSalesItems = [
    {
      label: "POS Sales",
      key: "POS Sales",
      icon: <UserOutlined />,
    },
    {
      label: "TRM Sales",
      key: "TRM Sales",
      icon: <UserOutlined />,
    },
  ];

  const threePoAGregatorItems = [
    {
      label: "3PO Sales",
      key: "3PO Sales",
      icon: <UserOutlined />,
    },
    {
      label: "POS Sales",
      key: "POS Sales",
      icon: <UserOutlined />,
    },
  ];

  const [dashboardType, setDashboardType] = useState(dashboardItems[0] || {});
  const [tenderType, setTenderType] = useState(items[0] || {});
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [trmPos, setTrmPosClick] = useState(trmPosItems[0] || {});
  const [posVsTrmVsMpr, setPosVsTrmVsMprClick] = useState(
    posVsTrmVsMprItems[0] || {}
  );
  const [storeSales, setstoreSalesClick] = useState(storeSalesItems[0] || {});
  const [threePoAGregator, setthreePoAGregatorClick] = useState(
    threePoAGregatorItems[0] || {}
  );

  const handleStoreSalesClick = (e) => {
    //   message.info('Click on menu item.');
    console.log("click", e);
    setstoreSalesClick(e);
  };

  const storeSalesDropdown = {
    items: storeSalesItems,
    onClick: (e) =>
      handleStoreSalesClick({ key: e.key, value: e.key, label: e.key }),
    value: storeSales,
  };
  const handlethreePoAGregatorClick = (e) => {
    //   message.info('Click on menu item.');
    setthreePoAGregatorClick(e);
  };

  const threePoAGregatorDropdown = {
    items: threePoAGregatorItems,
    onClick: (e) =>
      handlethreePoAGregatorClick({ key: e.key, value: e.key, label: e.key }),
    value: threePoAGregator,
  };

  const handleMenuClick = (e) => {
    //   message.info('Click on menu item.');
    console.log("click", e);
    setTenderType(e);
  };

  const tenderTypeDropdown = {
    items: items,
    onClick: (e) => handleMenuClick({ key: e.key, value: e.key, label: e.key }),
    value: tenderType,
  };

  const handleDashClick = (e) => {
    //   message.info('Click on menu item.');
    setDashboardType(e);
    setthreePoAGregatorClick({label: "POS Sales",key: "POS Sales", value: 'POS Sales', icon: <UserOutlined />});
    setstoreSalesClick({label: "POS Sales",key: "POS Sales", value: 'POS Sales', icon: <UserOutlined />});
  };

  const dashboardTypeDropdown = {
    items: dashboardItems,
    onClick: (e) => handleDashClick({ key: e.key, value: e.key, label: e.key }),
    value: dashboardType,
  };

  const handleTrmPosClick = (e) => {
    //   message.info('Click on menu item.');
    console.log("click", e);
    setTrmPosClick(e);
  };

  const trmPosTypeDropdown = {
    items: trmPosItems,
    onClick: (e) =>
      handleTrmPosClick({ key: e.key, value: e.key, label: e.key }),
    value: trmPos,
  };

  const handlePosVsTrmVsMprTypeDropdownClick = (e) => {
    //   message.info('Click on menu item.');
    console.log("click", e);
    setPosVsTrmVsMprClick(e);
  };

  const posVsTrmVsMprTypeDropdown = {
    items: posVsTrmVsMprItems,
    onClick: (e) =>
      handlePosVsTrmVsMprTypeDropdownClick({
        key: e.key,
        value: e.key,
        label: e.key,
      }),
    value: posVsTrmVsMpr,
  };

  const datePickerHandler = (date) => {
    console.log("date picker", date);
    // setDateRange(update);
    // dateHandler({ startDate: update[0], endDate: update[1] });
    if (date[0] && date[1]) {
      dispatch(updateDateRangeSelectDataToStore([date[0], date[1]]));
      setDownloadReports((prev) => ({
        ...prev,
        endDate: `${dateFormatChanger(date[1] || new Date())}23:59:59`,
        startDate: `${dateFormatChanger(date[0] || new Date())}00:00:00`,
      }));
    }
  };

  const _3poToggleDownloadAndApi = (isDown) => {
    // !isDown && setSpinnerState((prev) => ({ ...prev, search: true }));
    isDown && dispatch(updateIsDownloadProgressbarToStore(true));
    _3PO_DATA_API({
      payload: isDown
        ? downloadReports
        : { ...downloadReports, stores: storeCode || null },
      isDownload: isDown,
    })
      .then((res) => {
        if (isDown) {
          // const { data = "" } = res || {};
          // dispatch(updateIsDownloadProgressbarToStore(false));
          // data.length > 0 && downloadReportsFun(data, "3PO Full Report");
        } else {
          const { data = {} } = res?.data || {};
          if (Object.keys(data).length > 0) {
            // showCustomAlert({
            //   title: "3PO Table",
            //   bodyMsg: isDown
            //     ? "Downloaded Successfully"
            //     : "3PO Table Update Successfully!",
            //   dispatch: dispatch,
            // });
            if (data?.threePOData) {
              let updatedData = null;
              let poData = data?.threePOData.map((threePO) => {
                return {...threePO, selectedDelta: 'posVsThreePO'}
              })
              updatedData = {...data, threePOData: poData};
              dispatch(update3POTableDataToStore(updatedData));
              // setSpinnerState((prev) => ({ ...prev, search: false }));
            }
          }
        }
      })
      .catch((err) => {
        alert(err)
        dispatch(update3POTableDataToStore(null))
      })
  };

  const totalSalesData = () => {
    let totalS = 0;
    if (DashboardTableData?.sales > 0 || DashboardTableData?.trmSalesData?.sales) {
      totalS = DashboardTableData?.sales
      if (storeSales.key === 'POS Sales') {
        totalS = DashboardTableData?.sales
      } else if (storeSales.key === 'TRM Sales') {
        totalS = DashboardTableData?.trmSalesData?.sales
      }
    }
    if (_3poTableData?.posSales > 0 || _3poTableData?.threePOSales > 0) {
      if (threePoAGregator?.key === "3PO Sales") {
        totalS += _3poTableData?.threePOSales;
      } else if (threePoAGregator?.key === "POS Sales") {
        totalS += _3poTableData?.posSales
      }
    }

    return (
      {
        actual: formatNumberToLakhsAndCrores(totalS),
        tooltip: formatNumberToLakhsAndCrores(totalS),
        totalSales: totalS
      } || {}
    );
  };

  const findSalesValue = (type) => {
    let totalS = 0;

    if (type === "Store Sales") {
      if (storeSales.key === 'POS Sales') {
        totalS = DashboardTableData?.sales
      } else if (storeSales.key === 'TRM Sales') {
        totalS = DashboardTableData?.trmSalesData?.sales
      }
    } else {
      if (threePoAGregator?.key === "3PO Sales") {
        totalS += _3poTableData?.threePOSales;
      } else if (threePoAGregator?.key === "POS Sales") {
        totalS += _3poTableData?.posSales
      }
    }
    return totalS;
  };


  const handleBarGarphCheckbox = (e) => {
    if (dashboardType.key == "Store Sales") {
      if (e.info.checkedNodes) {
        setInStoreCheckData(
          e.info.checkedNodes.flatMap((item) => {
            if (item.key !== "0") {
              return item.value;
            }
          })
        );
      }
    } else {
      console.log("handleBarGarphCheckbox", e);
      if (e.info.checkedNodes) {
        setInThreePOCheckData(
          e.info.checkedNodes.flatMap((item) => {
            if (item.key !== "0") {
              return item.value;
            }
          })
        );
      }
    }
  };

  const checkTreeData = (dashboardTy) => {
    let data = [];
    if (dashboardTy.key == "Store Sales") {
      if (storeSales?.key !== "POS Sales") {
        data = convertToInStoreCheckTreeData(DashboardTableData || []);
      } else {
        data = convertToTenderOnlyTreeData(DashboardTableData || []);
      }
    } else {
      data = convertTo3POOnlyTreeData(_3poTableData || []);
    }
    return data;
  };

  return (
    <div>
      {/* <Row>
        <Col></Col>
      </Row> */}
      <div className="filter-row flex">
            <div >
              {/* <CustomWrapDropdown disabled={!_3poTableData?.threePOData} menuProps={dashboardTypeDropdown} /> */}
              <CustomWrapDropdown menuProps={dashboardTypeDropdown} />
            </div>
            <div>
            <CustomDatePicker datePickerHandler={datePickerHandler} />
            </div>
            <div>
            {dashboardType?.key !== "Aggregator" ? (
              <CustomWrapDropdown
                mainCss="ml-2 mr-2"
                menuProps={storeSalesDropdown}
              />
            ) : (
              <CustomWrapDropdown
                mainCss="ml-2 mr-2"
                menuProps={threePoAGregatorDropdown}
              />
            )}
            </div>
            <MainStoreComponent isLoading={isLoadingData}/>
        {/* <Row>
          <Col>
          </Col>
          <Col>
          </Col>
          <Col>
          </Col>
          <Col>
          </Col>
        </Row> */}
            <div className="flex">
              <CustomButton
                type={"button"}
                buttonBg={"bg-[#1E5162] hover:bg-[#1E5162] text-black"}
                onClick={() => {
                  if (currentSelectStore.length > 0) {
                    DashboardToggleDownloadAndApi(false);
                    _3poToggleDownloadAndApi(false);
                  } else {
                    if (!currentSelectState.length > 0) {
                      dispatch(
                        updateErrorStateOfStateAndStoreAction({
                          ...selectStateAndStoreError,
                          stateError: true,
                        })
                      );
                    } else {
                      dispatch(
                        updateErrorStateOfStateAndStoreAction({
                          ...selectStateAndStoreError,
                          storeError: true,
                        })
                      );
                    }
                  }
                }}
                title={"Search.."}
                btnClass={"border-none"}
                width={"w-full mt-3"}
                isLoading={isLoadingData}
              />
            </div>
        {/* <Row>
          <Col >
          </Col>
        </Row> */}
      </div>
      {/* It is important  */}
      {/* <CustomCheckboxDropdown
        treeData={checkTreeData(dashboardType)}
        defaultSelectedKeys={["0"]}
        onCheck={handleBarGarphCheckbox}
        defaultCheckedKeys={["0"]}
      /> */}

      <div>
        <div className="w-full flex flex-col">
          <div className="">
              <TotalSales
                TotalSales={totalSalesData()?.actual || "0"}
                mySale={{
                  inStore: {
                    title: "In-Store",
                    value:
                      formatNumberToLakhsAndCrores(findSalesValue('Store Sales')) ||
                      "0",
                    onClick: () => {
                      console.log("In store data");
                      handleDashClick({
                        key: "Store Sales",
                        value: "Store Sales",
                        label: "Store Sales",
                      });
                    },
                  },
                  three3PO: {
                    title: "Aggregator",
                    value:
                      formatNumberToLakhsAndCrores(findSalesValue('Aggregator')) ||
                      "0",
                    onClick: () => {
                      console.log("Aggregator");
                      handleDashClick({
                        key: "Aggregator",
                        value: "Aggregator",
                        label: "Aggregator",
                      });
                    },
                  },
                }}
              />
            {/* <div>
            </div> */}
          </div>
          {isLoadingData ? (
            <div>
              <div
                className="flex justify-center"
                style={{ gap: "10px" }}
              >
                <div
                  style={{
                    width: "50%",
                    height: 430,
                    padding: 20,
                    backgroundColor: "white",
                    borderRadius: 5,
                  }}
                >
                  <Skeleton.Node
                    active={true}
                    style={{ height: 390}}
                  >
                    <BarChartOutlined
                      style={{
                        fontSize: 100,
                        color: "#bfbfbf",
                      }}
                    />
                  </Skeleton.Node>
                </div>
                <div
                  style={{
                    width: "50%",
                    height: 420,
                    // display: "inline-grid",
                    gap: "10px",
                  }}
                >
                  <div style={{display: 'flex', gap: "10px",}}>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 5,
                        padding: 20,
                        backgroundColor: 'white',
                      }}
                    >
                      <Skeleton.Node
                        active={true}
                        style={{ height: 170}}
                      >
                        <PieChartOutlined
                          style={{
                            fontSize: 50,
                            color: "#bfbfbf",
                          }}
                        />
                      </Skeleton.Node>
                    </div>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 5,
                        padding: 20,
                        backgroundColor: 'white',
                      }}
                    >
                      <Skeleton.Node
                        active={true}
                        style={{ height: 170,}}
                      >
                        <PieChartOutlined
                          style={{
                            fontSize: 50,
                            color: "#bfbfbf",
                          }}
                        />
                      </Skeleton.Node>
                    </div>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 5,
                        padding: 20,
                        backgroundColor: 'white',
                      }}
                    >
                      <Skeleton.Node
                        active={true}
                        style={{ height: 170}}
                      >
                        <PieChartOutlined
                          style={{
                            fontSize: 50,
                            color: "#bfbfbf",
                          }}
                        />
                      </Skeleton.Node>
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: "10px", marginTop: 10}}>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 5,
                        padding: 20,
                        backgroundColor: 'white'
                      }}
                    >
                      <Skeleton.Node
                        active={true}
                        style={{ height: 170}}
                      >
                        <PieChartOutlined
                          style={{
                            fontSize: 50,
                            color: "#bfbfbf",
                          }}
                        />
                      </Skeleton.Node>
                    </div>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 5,
                        padding: 20,
                        backgroundColor: 'white'
                      }}
                    >
                      <Skeleton.Node
                        active={true}
                        style={{ height: 170}}
                      >
                        <PieChartOutlined
                          style={{
                            fontSize: 50,
                            color: "#bfbfbf",
                          }}
                        />
                      </Skeleton.Node>
                    </div>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 5,
                        padding: 20,
                        backgroundColor: 'white'
                      }}
                    >
                      <Skeleton.Node
                        active={true}
                        style={{ height: 170 }}
                      >
                        <PieChartOutlined
                          style={{
                            fontSize: 50,
                            color: "#bfbfbf",
                          }}
                        />
                      </Skeleton.Node>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex justify-center"
                style={{ gap: "10px", margin: 5, marginTop: 10}}
              >
                <div
                  style={{
                    width: "50%",
                    height: 230,
                    padding: 20,
                    backgroundColor: "white",
                    borderRadius: 5,
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 5,
                    }}
                  >
                    <Skeleton.Node
                      active={true}
                      style={{ height: 190}}
                    >
                      <PieChartOutlined
                        style={{
                          fontSize: 50,
                          color: "#bfbfbf",
                        }}
                      />
                    </Skeleton.Node>
                  </div>
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 5,
                    }}
                  >
                    <Skeleton.Node
                      active={true}
                      style={{ height: 190}}
                    >
                      <PieChartOutlined
                        style={{
                          fontSize: 50,
                          color: "#bfbfbf",
                        }}
                      />
                    </Skeleton.Node>
                  </div>
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 5,
                    }}
                  >
                    <Skeleton.Node
                      active={true}
                      style={{ height: 190, }}
                    >
                      <PieChartOutlined
                        style={{
                          fontSize: 50,
                          color: "#bfbfbf",
                        }}
                      />
                    </Skeleton.Node>
                  </div>
                </div>
                <div
                  style={{
                    width: "50%",
                    height: 230,
                    padding: 20,
                    backgroundColor: "white",
                    borderRadius: 5,
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 5,
                    }}
                  >
                    <Skeleton.Node
                      active={true}
                      style={{ height: 190 }}
                    >
                      <PieChartOutlined
                        style={{
                          fontSize: 50,
                          color: "#bfbfbf",
                        }}
                      />
                    </Skeleton.Node>
                  </div>
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 5,
                    }}
                  >
                    <Skeleton.Node
                      active={true}
                      style={{ height: 190,}}
                    >
                      <PieChartOutlined
                        style={{
                          fontSize: 50,
                          color: "#bfbfbf",
                        }}
                      />
                    </Skeleton.Node>
                  </div>
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 5,
                    }}
                  >
                    <Skeleton.Node
                      active={true}
                      style={{ height: 190}}
                    >
                      <PieChartOutlined
                        style={{
                          fontSize: 50,
                          color: "#bfbfbf",
                        }}
                      />
                    </Skeleton.Node>
                  </div>
                </div>
              </div>
            </div>
          ) : DashboardTableData?.tenderWiseDataList || _3poTableData?.threePOData ? dashboardType.key !== "Aggregator" ? (
            <InStore
              checkedRawData={inStoreCheckData}
              fieldToggleKey={
                storeSales?.key === "POS Sales" ? "POS Sales" : "TRM Sales"
              }
              downloadReports={downloadReports}
              allStoreData={DashboardTableData?.tenderWiseDataList || []}
              totalSale={totalSalesData()?.tooltip}
              // totalSaleNumber={totalSalesData()?.totalSales}
              DashboardTableData={DashboardTableData}
              threePODATA={inThreePOCheckData}
            />
          ) : (
            <ThreePO checkedRawData={inThreePOCheckData} downloadReports={downloadReports} fieldToggleKey={
              threePoAGregator?.key === "3PO Sales" ? "3PO Sales" : "POS Sales"
            }/>
          ) : null}
        </div>
      </div>
      {/* {isLoadingData ? (
        <div
          style={{
            position: "absolute",
            height: "100vh",
            zIndex: "999999",
            width: "100vw",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" fullscreen={true} />
        </div>
      ) : null} */}
    </div>
  );
};

export default Dashboard;
