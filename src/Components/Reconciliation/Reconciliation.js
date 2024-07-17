import React from "react";
import CustomCardWithCharts from "../../Common/ReusableComponent/CustomCardWithCharts";
import PieChart from "../../Common/Charts/PieChart";
import LineChart from "../../Common/Charts/LineChart";
import TinyChart from "../../Common/Charts/TinyChart";
import LiquidChart from "../../Common/Charts/LiquidChart";
import TinyLine from "../../Common/Charts/TinyLine";
import PieSpiderChart from "../../Common/Charts/PieSpiderChart";
import { PieChartOutlined, UserOutlined, DownloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateFormatChanger, downloadReportsFun, formatNumberToLakhsAndCrores } from "../../Helper/Utils";
import { updateIsDownloadProgressbarToStore } from "../../Redux/Action/AllModalReducerAction";
import { ALL_DOWNLOAD, DASHBOARD_DATA_API, RECONCILIATION_LAST_SYNCED_API, _3PO_DATA_API, _3PO_DATA_DOWNLOAD } from "../../ApiCalls/ApiCall/apiCalls";
import { updateDashboardTableDataToStore, updateDateRangeSelectDataToStore } from "../../Redux/Action/DashboardStoreAction";
import CustomWrapDropdown from "../../Common/ReusableComponent/CustomWrapDropdown";
import CustomDatePicker from "../../Common/ReusableComponent/CustomDatePicker/CustomDatePicker";
import MainStoreComponent from "../../Common/ReusableComponent/MainStoreComponent";
import CustomButton from "../../Common/ReusableComponent/CustomButton/CustomButton";
import DonutChart from "../../Common/Charts/DonutChart";
import PinLiquidChart from "../../Common/Charts/PinLiquidChart";
import { updateErrorStateOfStateAndStoreAction } from "../../Redux/Action/ReconciliationServiceAction";
import moment from "moment";
import {Select, Skeleton} from "antd";
const { Option } = Select;


const Reconciliation = () => {
  const dispatch = useDispatch();
  const {
    DashboardTableData = {},
    _3poTableData = {},
    dateRangeSelect = [],
    mappingStoreData = [],
  } = useSelector((state) => state.DashboardStore.DashboardStore || {});

  const {
    currentSelectState = [],
    currentSelectStore = [],
    selectStateAndStoreError = {},
  } = useSelector(
    (state) => state.ReconciliationService.ReconciliationStore || {}
  );

  const { storeCode = [] } = useSelector(
    (state) => state.ReconciliationService.ReconciliationStore || {}
  );

  const [inThreePOCheckData, setInThreePOCheckData] = useState(
    _3poTableData?.threePOData || []
  );
  const [inStoreCheckData, setInStoreCheckData] = useState(
    DashboardTableData?.tenderWiseDataList || []
  );

  const [dashboardData, setDashboardData] = useState({
    "posSales": 0,
    "posReceivables": 0,
    "posCommission": 0,
    "posCharges": 0,
    "posFreebies": 0,
    "posDiscounts": 0,
    "threePOSales": 0,
    "threePOReceivables": 0,
    "threePOCommission": 0,
    "threePOCharges": 0,
    "threePOFreebies": 0,
    "threePODiscounts": 0,
    "reconciled": 0,
    "posVsThreePO": 0,
    "receivablesVsReceipts": 0,
    "booked": 0,
    "promo": 0,
    "deltaPromo": 0,
    "dotPeSales": 0,
    "threePOData": [
        {
            "posSales": 0,
            "posReceivables": 0,
            "posCommission": 0,
            "posCharges": 0,
            "posFreebies": 0,
            "posDiscounts": 0,
            "threePOSales": 0,
            "threePOReceivables": 0,
            "threePOCommission": 0,
            "threePOCharges": 0,
            "threePOFreebies": 0,
            "threePODiscounts": 0,
            "reconciled": 0,
            "posVsThreePO": 0,
            "receivablesVsReceipts": 0,
            "booked": 0,
            "promo": 0,
            "deltaPromo": 0,
            "dotPeSales": 0,
            "tenderName": "SWIGGY",
            "allThreePOCharges": 0,
            "allPOSCharges": 0
        }
    ],
    "allThreePOCharges": 0,
    "allPOSCharges": 0
});
  
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
  const [storeSales, setstoreSalesClick] = useState(storeSalesItems[0] || {});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // getLastSync(dashboardType.children[0].key);
    getLastSync(dashboardType.key);
  }, []);

  useEffect(() => {
    setInStoreCheckData(DashboardTableData?.tenderWiseDataList);
    setInThreePOCheckData(_3poTableData?.threePOData);
  }, [_3poTableData]);


  const [downloadReports, setDownloadReports] = useState({
    bank: null, // HDFC/ICICI we don't have data now for it
    endDate: `${dateFormatChanger(dateRangeSelect[1] || new Date())}23:59:59`,
    startDate: `${dateFormatChanger(dateRangeSelect[0] || new Date())}00:00:00`,
    tender: null,
  });

  const DashboardToggleDownloadAndApi = (isDown) => {
    isDown && dispatch(updateIsDownloadProgressbarToStore(true));
    DASHBOARD_DATA_API({
      payload: isDown
        ? downloadReports
        : { ...downloadReports, stores: storeCode || null },
      isDownload: isDown,
    })
      .then((res) => {
        console.log("dashboard table", res);
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
        // setSpinnerState((prev) => ({ ...prev, search: false }));
      })
      .finally((fin) => {
        // setSpinnerState((prev) => ({ ...prev, search: false }));
        // showCustomAlert({
        //   title: "Dashboard Table",
        //   bodyMsg: " Something Went Wrong ",
        //   dispatch: dispatch,
        // });
      });
  };

  const _3poToggleDownloadAndApi = (isDown) => {
    // !isDown && setSpinnerState((prev) => ({ ...prev, search: true }));
    setIsLoading(true);
    isDown && dispatch(updateIsDownloadProgressbarToStore(true));
    _3PO_DATA_API({
      payload: isDown
        ? downloadReports
        : { ...downloadReports, stores: storeCode || null, tender: dashboardType.key.toUpperCase() },
      isDownload: isDown,
    })
      .then((response) => {
        if (response.status === 200) {
          setDashboardData(response.data?.data);
          let data = response.data?.data?.threePOData.map((threePO) => {
            return {name: threePO?.tenderName, value: 'allCharges'}
          })
          setChargeSelection(data);
          }
        // if (isDown) {
        // } else {
        //   const { data = {} } = res?.data || {};
        //   if (Object.keys(data).length > 0) {
        //     console.log(data, "3poDataInsidePage");
        //     dispatch(update3POTableDataToStore(data));
        //   }
        // }
      })
      .catch((err) => {
      }).finally(()=>{
        setIsLoading(false);
      })
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
      key: '1',
      type: 'group',
      label: '3PO',
      children: [
        {
          key: 'Swiggy',
          label: 'Swiggy',
        },
        {
          key: 'Zomato',
          label: 'Zomato',
        },
      ],
    },
    {
      key: '2',
      type: 'group',
      label: 'In-Store',
      children: [
        {
          key: 'Card',
          label: 'Card',
        },
        {
          key: 'UPI',
          label: 'UPI',
        },
      ],
    },
  ]

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

  const [dashboardType, setDashboardType] = useState(dashboardItems[0].children[0] || {});
  const [tenderType, setTenderType] = useState(items[0] || {});
  const [trmPos, setTrmPosClick] = useState(trmPosItems[0] || {});
  const [posVsTrmVsMpr, setPosVsTrmVsMprClick] = useState(
    posVsTrmVsMprItems[0] || {}
  );

  const [lastSyncData, setLastSyncData] = useState(null);

  let fieldToggleKey = '3PO Sales'

  const [chargesDropDown, setChargesDropDown] = useState([
    {
      label: 'All Charges',
      value: 'allCharges',
      key: 'allCharges',
    },
    {
      label: 'Charges',
      value: 'charges',
      key: 'charges',
    },
    {
      label: 'Promo',
      value: 'promo',
      key: 'promo',
    },
    {
      label: 'Discounts',
      value: 'discounts',
      key: 'discounts',
    },
    {
      label: 'Freebies',
      value: 'freebies',
      key: 'freebies',
    },
    {
      label: 'Commission',
      value: 'commission',
      key: 'commission',
    },
  ])

  const [chargeSelection, setChargeSelection] = useState([]);

  useEffect(() => {
    let data = dashboardData?.threePOData.map((threePO) => {
      return {name: threePO?.tenderName, value: 'allCharges'}
    })
    setChargeSelection(data);
  },[])

  const handleMenuClick = (e) => {
    setTenderType(e);
  };

  const tenderTypeDropdown = {
    items: items,
    onClick: (e) => handleMenuClick({ key: e.key, value: e.key, label: e.key }),
    value: tenderType,
  };

  const handleDashClick = (e) => {
    setDashboardType(e);
    getLastSync(e.key)
  };

  function getLastSync(val) {
    RECONCILIATION_LAST_SYNCED_API(val).then((response) => {
      if (response?.status === 200) {
        setLastSyncData(response?.data?.data)
      }
    }).catch((e) => {
      console.log('==last sync error==',e);
    })
  }

  const dashboardTypeDropdown = {
    items: dashboardItems,
    onClick: (e) => handleDashClick({ key: e.key, value: e.key, label: e.key }),
    // value: dashboardType.children ? dashboardType.children[0].key : dashboardType.key
    value: {key: dashboardType.key}
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

    if (date[0] && date[1]) {
      dispatch(updateDateRangeSelectDataToStore([date[0], date[1]]));
      setDownloadReports((prev) => ({
        ...prev,
        endDate: `${dateFormatChanger(date[1] || new Date())}23:59:59`,
        startDate: `${dateFormatChanger(date[0] || new Date())}00:00:00`,
      }));
    }
  };

  const totalSalesData = () => {
    let totalS = "";
    if (DashboardTableData?.sales > 0 && _3poTableData?.posSales > 0) {
      totalS = formatNumberToLakhsAndCrores(
        DashboardTableData?.sales + _3poTableData?.posSales
      );
    }
    return (
      {
        actual: totalS || "",
        tooltip: DashboardTableData?.sales + _3poTableData?.posSales,
      } || {}
    );
  };

  const salesPercentage = ({ totalSales = 2000, sales = 500 }) => {
    if (totalSales === "0") {
      return 0
    }
    const percentage = (sales / totalSales) * 100;
    let result = Math.round(percentage.toFixed(2)) / 100
    return isNaN(result) ? 0 : result;
  };

  const chartFieldsValues = (item, type = 1) => {
    // if (type === 1) 
    // return [
    //   { type: "3PO Sales", value: Number(item?.threePOSales.toFixed(0)) },
    //   { type: "POS Sales", value: Number(item?.posSales.toFixed(0)) }
    // ];

    return [
      { type: "All Charges", value: Number(item?.allThreePOCharges.toFixed(0)) },
      { type: "Charges", value: Number(item?.threePOCharges.toFixed(0)) },
      { type: "Promo", value: Number(item?.promo.toFixed(0)) }
    ];
  };

  const DeltaFieldsValues = (item) => {
    return [
      { type: "POS v 3PO", value: Number(item?.posVsThreePO.toFixed(0)) },
      {
        type: "Receivables V Receipts",
        value: Number(item?.receivablesVsReceipts.toFixed(0)),
      },
      { type: "Promo", value: Number(item?.promo.toFixed(0)) },
    ];
  };

  const [deltaDropDown, setDeltaDropDown] = useState([
    {
      label: 'POS vs 3PO',
      value: 'posVsThreePO',
      key: 'posVsThreePO',
      isSelected: true
    },
    {
      label: 'Receivable vs Receipts',
      value: 'receivablesVsReceipts',
      key: 'receivablesVsReceipts',
      isSelected: false
    },
    {
      label: 'Promo',
      value: 'promo',
      key: 'promo',
      isSelected: false
    }
  ])


  const allDownloadReport = (cat) => {
    let payload = {
      tender: null,
      // bank: bankName,
      startDate: downloadReports.startDate,
      endDate: downloadReports.endDate,
    }
    _3PO_DATA_DOWNLOAD({
      payload: { ...payload, reportType: cat, stores: storeCode?.length ? storeCode : null, },
    })
      .then((res) => {
        // console.log(res?.headers, "res?.headers");
        // const contentType = res?.headers?.["content-type"];
        // const contentDisposition =
        //   res?.headers?.["content-disposition"] ||
        //   res?.headers?.["Content-Disposition"] ||
        //   "";
        // const filename = contentDisposition?.split("=")?.[1]?.includes(".csv")
        //   ? contentDisposition?.split("=")?.[1]?.replace(".csv", "")
        //   : contentDisposition?.split("=")?.[1]?.includes(".xlsx")
        //   ? contentDisposition?.split("=")?.[1]?.replace(".xlsx", "")
        //   : contentDisposition?.split("=")?.[1];
        // const { data = "" } = res || {};
        // dispatch(updateIsDownloadProgressbarToStore(false));
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        // dispatch(updateIsDownloadProgressbarToStore(false));
      });
  };

  const handleChange = (opt, tenderName, type) => {
    if (type === 'Delta') {
      let data = deltaDropDown.map((delta) => {
        return {...delta, isSelected: delta.value === opt};
      })
      setDeltaDropDown(data);
    } else {
      let data = chargeSelection.map((charge) => {
        if (charge.name === tenderName) {
          return {...charge, value: opt};
        } 
        return charge;
      })
      setChargeSelection(data);
    }
  }

  const countValue = (item) => {

    let cardData =  chargeSelection.filter((charge) => charge.name === item?.tenderName)
    let val = cardData[0]?.value
    let value = 0
    
    switch (val) {
      case 'allCharges':
        value = fieldToggleKey === "3PO Sales" ?
          // Number(item?.threePOCharges) + Number(item?.promo) +  Number(item?.threePODiscounts) + Number(item?.threePOFreebies) + Number(item?.threePOCommission)
          Number(item?.allThreePOCharges)
        : 
          // Number(item?.posCharges) + Number(item?.promo) +  Number(item?.posDiscounts) + Number(item?.posFreebies) + Number(item?.posCommission)
          Number(item?.allPOSCharges)
        break;
      case 'charges':
        value = fieldToggleKey === "3PO Sales" ? item?.threePOCharges : item?.posCharges
        break;
      case 'promo':
        value = fieldToggleKey === item?.promo
        break;
      case 'discounts':
        value = fieldToggleKey === "3PO Sales" ? item?.threePODiscounts : item?.posDiscounts
        break;
      case 'freebies':
        value = fieldToggleKey === "3PO Sales" ? item?.threePOFreebies : item?.posFreebies
        break;
      case 'commission':
        value = fieldToggleKey === "3PO Sales" ? item?.threePOCommission : item?.posCommission
        break;
      default:
        break;
    }

    let all = fieldToggleKey === "3PO Sales" ?
    Number(dashboardData?.threePOCharges) + Number(dashboardData?.promo) +  Number(dashboardData?.threePODiscounts) + Number(dashboardData?.threePOFreebies) + Number(dashboardData?.threePOCommission)
  : 
    Number(dashboardData?.posCharges) + Number(dashboardData?.promo) +  Number(dashboardData?.posDiscounts) + Number(dashboardData?.posFreebies) + Number(dashboardData?.posCommission)

    return salesPercentage({
      totalSales: all,
      sales: value,
    })
  }

  const renderDD = (item, tenderName, type) => {

      let cardData =  [{}];
      if (type === 'Delta') {
        cardData = deltaDropDown.filter((item) => item.isSelected === true)
      } else {
        cardData = chargeSelection.filter((charge) => charge.name === item?.tenderName)
      }
      
      let temp = cardData[0]?.value;
      let value = 0;

      if (type === 'Delta') {
        let selectedValue = deltaDropDown.filter((item) => item.isSelected === true)
        value = Number(item?.[selectedValue[0]?.value])
      } else {
        switch (temp) {
          case 'allCharges':
            value = fieldToggleKey === "3PO Sales" ?
              Number(item?.threePOCharges) + Number(item?.promo) +  Number(item?.threePODiscounts) + Number(item?.threePOFreebies) + Number(item?.threePOCommission)
            : 
              Number(item?.posCharges) + Number(item?.promo) +  Number(item?.posDiscounts) + Number(item?.posFreebies) + Number(item?.posCommission)
            break;
          case 'charges':
            value = fieldToggleKey === "3PO Sales" ? item?.threePOCharges : item?.posCharges
            break;
          case 'promo':
            value = fieldToggleKey === item?.promo
            break;
          case 'discounts':
            value = fieldToggleKey === "3PO Sales" ? item?.threePODiscounts : item?.posDiscounts
            break;
          case 'freebies':
            value = fieldToggleKey === "3PO Sales" ? item?.threePOFreebies : item?.posFreebies
            break;
          case 'commission':
            value = fieldToggleKey === "3PO Sales" ? item?.threePOCommission : item?.posCommission
            break;
          default:
            break;
        }
      }
      
      return (
        <div className="ddClass">
          <Select
            defaultValue={temp}
            value={temp}
            popupMatchSelectWidth={false}
            onChange={(a)=>{
              handleChange(a, tenderName, type)
            }}
            options={type === 'Delta' ? deltaDropDown : chargesDropDown}
          />
          <strong style={{ marginRight: 10}}>{formatNumberToLakhsAndCrores(value)+"L"}</strong>
        </div>
      );
    }

  const downloadDelta = () => {
    let selectedValue = deltaDropDown.filter((item) => item.isSelected === true)

    switch (selectedValue[0]?.value) {
      case 'posVsThreePO':
        allDownloadReport("POSVsThreePO");
        break;
      case 'receivablesVsReceipts':
        allDownloadReport("ReceivablesVsReceipts");
        break;
      case 'promo':
        allDownloadReport("Promo");
        break;
    
      default:
        break;
    }
  }

  const findDeltaValue = (tenderData = null) => {
    if (tenderData) {
      let value = 0;
      let selectedValue = deltaDropDown.filter((item) => item.isSelected === true)
      if (fieldToggleKey === "3PO Sales") {
        value = Number(tenderData?.[selectedValue[0]?.value]);
      } else {
        value = Number(tenderData?.trmSalesData?.[selectedValue[0]?.value])
      }
      return salesPercentage({
          totalSales: tenderData?.threePOSales,
          sales: value
        })
    }

  }

  const onChargeDownload = (item) => {

    let cardData =  chargeSelection.filter((charge) => charge.name === item?.tenderName)
    let val = cardData[0]?.value
    let value = 0
    
    switch (val) {
      case 'allCharges':
        value = fieldToggleKey === "3PO Sales" ? 'AllThreePoCharges' : 'AllPOSCharges';
        break;
      case 'charges':
        value = fieldToggleKey === "3PO Sales" ? 'ThreePOCharges' : 'PosCharges';
        break;
      case 'promo':
        value = 'Promo';
        break;
      case 'discounts':
        value = fieldToggleKey === "3PO Sales" ? 'ThreePODiscounts' : 'PosDiscounts';
        break;
      case 'freebies':
        value = fieldToggleKey === "3PO Sales" ? 'ThreePOFreebies' : 'PosFreebies';
        break;
      case 'commission':
        value = fieldToggleKey === "3PO Sales" ? 'ThreePOCommission' : 'PosCommission';
        break;
      default:
        break;
    }

    allDownloadReport(value)
  }

  return (
    <>
      <div>
        {/* <div className="w-full flex" style={{ gap: "10px" }}> */}
        <div className="filter-row flex">
          {/* <div className="flex w-full"> */}
          {/* <strong className="text-lg">Reconciliation</strong> */}
          <div>
            <CustomWrapDropdown menuProps={dashboardTypeDropdown} />
          </div>
          <div className="mr-2">
            <CustomDatePicker datePickerHandler={datePickerHandler} />
          </div>
          {/* </div> */}
          <MainStoreComponent />
          {/* <div className="w-full">
              <div>
              </div>
            </div> */}
          {/* <div className="flex">
            <div>
              <CustomWrapDropdown
                menuProps={tenderTypeDropdown}
                mainCss="ml-2 mr-2"
              />
            </div>
          </div> */}
          <div className="flex">
            <CustomButton
              type={"button"}
              buttonBg={"bg-[#1E5162] hover:bg-[#1E5162] text-black"}
              onClick={() => {
                if (currentSelectStore.length > 0) {
                  // DashboardToggleDownloadAndApi(false);
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
              isLoading={isLoading}
            />
          </div>
          {/* <div className="w-full flex justify-between">
            </div> */}
        </div>
        {/* </div> */}
        {/* {_3poTableData?.threePOData ? ( */}
        {isLoading ? 
          <div
          className="filter-row"
          // style={{ gap: "10px", marginTop: 10}}
        >
          <div
            style={{
              width: "100%",
              // height: 230,
              // padding: 20,
              // backgroundColor: "white",
              // borderRadius: 5,
              display: "flex",
              gap: "20px",
            }}
          >
            <div
              // style={{
                // height: 150,
                // width: "100%",
                // borderRadius: 5,
              // }}
              className="w-full"
            >
              <Skeleton.Node
                active={true}
                style={{ height: 220,}}
                className="w-full"
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
              // style={{
              //   height: "100%",
              //   // width: "100%",
              //   borderRadius: 5,
              // }}
              className="w-full"
            >
              <Skeleton.Node
                active={true}
                style={{ height: 220,}}
                className="w-full"
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
              // style={{
                // height: 150,
                // width: "100%",
                // borderRadius: 5,
              // }}
              className="w-full"
            >
              <Skeleton.Node
                active={true}
                style={{ height: 220,}}
                className="w-full"
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
              // style={{
              //   height: "100%",
              //   // width: "100%",
              //   borderRadius: 5,
              // }}
              className="w-full"
            >
              <Skeleton.Node
                active={true}
                style={{ height: 220,}}
                className="w-full"
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
              // style={{
                // height: 150,
                // width: "100%",
                // borderRadius: 5,
              // }}
              className="w-full"
            >
              <Skeleton.Node
                active={true}
                style={{ height: 220,}}
                className="w-full"
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
              // style={{
              //   height: "100%",
              //   // width: "100%",
              //   borderRadius: 5,
              // }}
              className="w-full"
            >
              <Skeleton.Node
                active={true}
                style={{ height: 220,}}
                className="w-full"
              >
                <PieChartOutlined
                  style={{
                    fontSize: 50,
                    color: "#bfbfbf",
                  }}
                />
              </Skeleton.Node>
            </div>
            {/* <div
              style={{
                height: "100%",
                // width: "100%",
                borderRadius: 5,
              }}
            >
              <Skeleton.Node
                active={true}
                style={{ height: 190, width: 190 }}
              >
                <PieChartOutlined
                  style={{
                    fontSize: 50,
                    color: "#bfbfbf",
                  }}
                />
              </Skeleton.Node>
            </div> */}
          </div>
        </div>
        : dashboardData ? <div className="filter-row flex" style={{gap: 10, display: 'flex'}}>
          <div className="w-full">
            {dashboardData?.threePOData.map((item, index) => (
                  <div className="" style={{height: '100%' }}>
                    <CustomCardWithCharts
                    // chatBoxHeight={'300px'}
                      title={<strong className="text-lg">{item.tenderName}</strong>}
                      rightCardSideCss="mt-4"
                      chart={
                        <TinyChart
                          percent={salesPercentage({
                            totalSales: dashboardData.threePOSales,
                            sales: item.threePOSales,
                          })}
                        />
                      }
                      bottomTitle="Total Sales"
                      bottomTitleValue={formatNumberToLakhsAndCrores(item?.threePOSales) + "L"}
                      CustomIcon={
                        <DownloadOutlined
                          style={{ cursor: "pointer", fontSize: "25px" }}
                          onClick={()=>{allDownloadReport('ThreePOSales')}}
                        />
                      }
                    />
                  </div>
                ))}
            </div>
            <div className="w-full">
            {dashboardData?.threePOData.map((item, index) => (
                <div className="" key={index} style={{height: '100%' }}>
                <CustomCardWithCharts
                  title={<strong className="text-lg">{item.tenderName}</strong>}
                  rightCardSideCss="overflow-auto"
                  chart={
                    <TinyChart
                      // width={50}
                      percent={salesPercentage({
                        totalSales: dashboardData?.threePOReceivables,
                        sales: item?.threePOReceivables,
                      })}
                    />
                  }
                  bottomTitle="Receivables"
                  bottomTitleValue={formatNumberToLakhsAndCrores(item?.threePOReceivables) + "L"}
                  CustomIcon={
                    <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      onClick={()=>allDownloadReport("ThreePOReceivables")}
                    />
                  }
                />
                </div>
              ))}
            </div>
            <div className="w-full">
            {dashboardData?.threePOData.map((item, index) => {
              return (
              <div className="" style={{height: '100%' }}>
                <CustomCardWithCharts
                  key={index}
                  cardType="vertical"
                  title={<strong className="text-lg">{item.tenderName}</strong>}
                  cardContentHeight="auto"
                  cardHeight={"344px"}
                  cardWidth={"200px"}
                  rightCardSideCss="mt-4"
                  chart={
                    <TinyChart
                      percent={countValue(item)}
                    />
                    // <div className="">
                    //   <PieChart
                    //     angleField={"value"}
                    //     colorField={"type"}
                    //     chartData={chartFieldsValues(item)}
                    //     width={120}
                    //   />
                    // </div>
                  }
                  // bottomTitle="All Charges"
                  // renderSelection={renderDD(item, item.tenderName, 'Charges')}
                  renderSelection={renderDD(item, item.tenderName, 'Charges')}
                  CustomIcon={
                    <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      onClick={()=>{onChargeDownload(item);}}
                    />
                  }
                />
              </div>)})}
            </div>
            <div className="w-full">
            {dashboardData?.threePOData.map((item, index) => (
              <div className="" style={{height: '100%' }}>
                <CustomCardWithCharts
                  key={index}
                  title={<strong className="text-lg">{item.tenderName}</strong>}
                  rightCardSideCss="mt-4"
                  chart={
                    <TinyChart
                      percent={salesPercentage({
                        totalSales: dashboardData?.reconciled,
                        sales: item?.reconciled,
                      })}
                    />
                  }
                  bottomTitle="Reconciled"
                  bottomTitleValue={formatNumberToLakhsAndCrores(item?.reconciled) + "L"}
                  CustomIcon={
                    <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      onClick={()=>allDownloadReport("Reconciled")}
                    />
                  }
                />
                </div>
              ))}
            </div>
            {/* <div className="w-full">
            {dashboardData?.threePOData.map((item, index) => (
              <div className="">
                <CustomCardWithCharts
                  key={index}
                  title={<strong className="text-lg">{item.tenderName}</strong>}
                  rightCardSideCss="mt-4"
                  chart={
                    <TinyChart
                      percent={salesPercentage({
                        totalSales: dashboardData?.threePOSales,
                        sales: item?.threePOSales,
                      })}
                    />
                  }
                  bottomTitle="Vouchers Approved"
                  CustomIcon={
                    <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      onClick={()=>allDownloadReport("Booked")}
                    />
                  }
                />
              </div>
              ))}
            </div> */}
            <div className="w-full">
            {dashboardData?.threePOData.map((item, index) => (
                <div className="" key={index} style={{height: '100%' }}>
                {/* <CustomCardWithCharts
                  key={index}
                  title={<strong>{item.tenderName}</strong>}
                  chartContentWidth={"auto"}
                    chartContentHeight={"auto"}
                    cardContentWidth={"auto"}

                    cardContentHeight="auto"
                  cardHeight={"344px"}
                  cardWidth={"200px"}

                  rightCardSideCss="mt-4"
                  chart={<PieChart
                        angleField={"value"}
                        colorField={"type"}
                        chartData={DeltaFieldsValues(item)}
                        width={100}
                      />}
                  bottomTitle="Delta"
                  CustomIcon={
                    <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "20px" }}
                    />
                  }
                /> */}
                <CustomCardWithCharts
                  key={index}
                  cardType="vertical"
                  title={<strong className="text-lg">{item.tenderName}</strong>}
                  cardContentHeight="auto"
                  cardHeight={"344px"}
                  cardWidth={"200px"}
                  rightCardSideCss="mt-4"
                  chart={
                    <TinyChart
                          percent={findDeltaValue(item)}
                          // percent={salesPercentage({
                          //   sales: fieldToggleKey === "3PO Sales" ? Number(item?.trmSalesData?.[deltaDropDown.filter((item) => item.isSelected === true)[0]?.value]) : Number(item?.[deltaDropDown.filter((item) => item.isSelected === true)[0]?.value]),
                          //   totalSales: fieldToggleKey === "3PO Sales" ? item?.trmSalesData?.sales : item?.sales,
                          // })}
                        />
                  }
                  // bottomTitle="Delta"
                  renderSelection={renderDD(item, item.tenderName, 'Delta')}
                  CustomIcon={
                    <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      onClick={() => {downloadDelta()}}
                    />
                  }
                />
                </div>
              ))}
            </div>
        </div> : null }
        {/* {DashboardTableData?.tenderWiseDataList ? (
            // <ThreePO checkedRawData={inThreePOCheckData} />
            <InStore
              checkedRawData={inStoreCheckData}
              fieldToggleKey={
                storeSales?.key === "POS Sales" ? "POS Sales" : "TRM Sales"
              }
              allStoreData={DashboardTableData?.tenderWiseDataList || []}
              totalSale={totalSalesData()?.tooltip}
            />
          ) : null} */}
        {/* <div
          className="w-full flex flex-col"
          style={{ gap: "10px", backgroundColor: "red" }}
        >
          <div className="flex">
            <div className="filter-row flex">
              <DonutChart />
            </div>
            <div className="filter-row flex">
              <div className="flex gap-1.5 mt-4">
                <CustomCardWithCharts
                  title={<strong>Tiny Chart</strong>}
                  cardWidth={"300px"}
                  rightCardSideCss="mt-4"
                  leftCardComponent={<div>Tiny Charts</div>}
                  chart={<TinyChart />}
                />
                <CustomCardWithCharts
                  title={<strong>Pie Spider Chart</strong>}
                  cardWidth={"300px"}
                  cardContentWidth="20%"
                  chartContentWidth="80%"
                  rightCardSideCss="mt-4"
                  leftCardComponent={<div>Pie Spider Chart</div>}
                  chart={<PieSpiderChart />}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "50%", height: "50%" }}>
          <div className="flex gap-1.5">
            <CustomCardWithCharts
              title={<strong>Pie Chart</strong>}
              cardContentHeight="auto"
              cardWidth={"300px"}
              rightCardSideCss="mt-4 mr-2"
              leftCardComponent={<div>Unreconcilied</div>}
              chart={
                <PieChart
                  angleField={"value"}
                  colorField={"type"}
                  chartData={ChartField}
                />
              }
            />
            <CustomCardWithCharts
              title={<strong>Tiny Line</strong>}
              cardWidth={"300px"}
              rightCardSideCss="overflow-auto"
              // leftCardSideCss="border h-full rounded px-2"
              leftCardComponent={<div>Vouchers</div>}
              chart={<TinyLine />}
            />
          </div>
          <div className="flex gap-1.5">
            <div className="flex flex-col">
              <div>
                <CustomCardWithCharts
                  title={<strong>Liquid Chart</strong>}
                  cardType="vertical"
                  cardHeight={"300px"}
                  cardWidth={"300px"}
                  chartContentWidth={"auto"}
                  chartContentHeight={"auto"}
                  cardContentHeight={"55%"}
                  cardContentWidth={"auto"}
                  verticalCardBottom={
                    <CustomWrapDropdown menuProps={trmPosTypeDropdown} />
                  }
                  chart={
                    // <LiquidChart width="170px" />
                    <PinLiquidChart width="170px" background="pink" />
                  }
                />
              </div>
              <div>
                <CustomCardWithCharts
                  title={<strong>Tiny Line</strong>}
                  cardWidth={"300px"}
                  rightCardSideCss="overflow-auto"
                  // leftCardSideCss="border h-full rounded px-2"
                  leftCardComponent={<div>Bank Statment</div>}
                  chart={<TinyLine />}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <CustomCardWithCharts
                  title={<strong>Liquid Chart</strong>}
                  cardType="vertical"
                  cardHeight={"300px"}
                  cardWidth={"300px"}
                  chartContentWidth={"auto"}
                  chartContentHeight={"auto"}
                  cardContentHeight={"55%"}
                  cardContentWidth={"auto"}
                  verticalCardBottom={
                    <CustomWrapDropdown menuProps={posVsTrmVsMprTypeDropdown} />
                  }
                  chart={<PinLiquidChart width="170px" />}
                />
              </div>
              <div>
                <CustomCardWithCharts
                  title={<strong>Tiny Chart</strong>}
                  cardWidth={"300px"}
                  rightCardSideCss="mt-4"
                  leftCardComponent={<div>Reconciled</div>}
                  chart={<TinyChart />}
                />
              </div>
            </div>
          </div>
        </div> */}
        {lastSyncData ? (
          <div className="filter-row flex" style={{gap: 7}}>
            <div style={{ width: "30%" }}>
              <strong>Last Reconciliation Done On :</strong>
              <div className="filter-row flex mt-1">
                {moment(lastSyncData?.lastReconciled, "DD-MM-YYYY").format("Do MMMM YYYY")}
              </div>
            </div>
            <div style={{ width: "70%" }}>
              <strong>Last Data Received :</strong>
              {lastSyncData?.lastSyncList.map((item, index) => {
                return (
                  <div className="filter-row flex mt-1" style={{marginBottom: index === lastSyncData?.lastSyncList.length - 1 ? 0 : 7,flexDirection: "column",}}>
                    <div>{item?.tender}({item?.type})</div>
                    <div>{moment(item?.lastSynced, "DD-MM-YYYY").format("Do MMMM YYYY")}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default Reconciliation;
