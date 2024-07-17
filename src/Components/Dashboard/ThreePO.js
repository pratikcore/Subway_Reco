import React, { useEffect, useState } from "react";
import { Row, Col, Select } from "antd";
import LineColumnBarChart from "../../Common/Charts/LineColumn";
import CustomCardWithCharts from "../../Common/ReusableComponent/CustomCardWithCharts";
import CustomWrapDropdown from "../../Common/ReusableComponent/CustomWrapDropdown";
import LiquidChart from "../../Common/Charts/LiquidChart";
import TinyLine from "../../Common/Charts/TinyLine";
import TinyChart from "../../Common/Charts/TinyChart";
import PieChart from "../../Common/Charts/PieChart";
import PieSpiderChart from "../../Common/Charts/PieSpiderChart";
import { UserOutlined, DownloadOutlined } from "@ant-design/icons";
import { dummy3poData } from "./Dummy3po";
import "./ThreePO.css";
import { useDispatch, useSelector } from "react-redux";
import { _3PO_DATA_DOWNLOAD } from "../../ApiCalls/ApiCall/apiCalls";
import { formatNumberToLakhsAndCrores } from "../../Helper/Utils";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import CustomReactCheckboxes from "../../Common/ReusableComponent/CustomMultiSelect/CustomReactCheckboxes";
import { update3POTableDataToStore } from "../../Redux/Action/DashboardStoreAction";


const ThreePO = ({
  checkedRawData = [],
  fieldToggleKey = "3PO Sales",
  allThreePoData = [],
  downloadReports = null,
}) => {
  const inThreePOTenderGraphData = checkedRawData?.filter(
    (i) => i !== undefined
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

  const dispatch = useDispatch();

  const allChargesItems = [
    {
      label: "All Charges",
      key: "All Charges",
      icon: "",
    },
    {
      label: "Charges",
      key: "Charges",
      icon: "",
    },
    {
      label: "Promo",
      key: "Promo",
      icon: "",
    },
    {
      label: "Discounts",
      key: "Discounts",
      icon: "",
    },
    {
      label: "Freebies",
      key: "Freebies",
      icon: "",
    },
    {
      label: "Commission",
      key: "Commission",
      icon: "",
    },
  ];

  // const tenderAndBankData = (key) => {
  //   let fields = []
  //   switch (key) {
  //     case "POS Sales":
  //       fields = inThreePOTenderGraphData.flatMap(i => i.bankWiseDataList) || []
  //       break;

  //     default:
  //       fields = inThreePOTenderGraphData || []
  //       break;
  //   }
  //   return fields
  // }

  const xFieldYField = (key) => {
    let fields = {};
    switch (key) {
      case "POS Sales":
        fields = { xField: "tenderName", yField: "posSales" };
        break;

      default:
        fields = { xField: "tenderName", yField: "threePOSales" };
        break;
    }
    return fields;
  };

  const {
    stateList = [],
    storeList = [],
    selectStateAndStoreError = {},
  } = useSelector(
    (state) => state.ReconciliationService.ReconciliationStore || {}
  );
  const customStateList = stateList?.map((i) => ({
    ...i,
    label: i.displayName,
    value: i.technicalName,
  }));
  const [currentState, setCurrentState] = useState([]);

  const [zomatoThreePOSales, setZomatoThreePOSales] = useState(0);
  const [swiggyThreePOSales, setSwiggyThreePOSales] = useState(0);
  const [magicPinThreePOSales, setMagicPinThreePOSales] = useState(0);
  const [allChargesData, setAllChargesData] = useState(allChargesItems[0]);

  useEffect(() => {
    const zomatoData = dummy3poData.threePOData.find(
      (item) => item.tenderName === "ZOMATO"
    );
    const swiggyData = dummy3poData.threePOData.find(
      (item) => item.tenderName === "SWIGGY"
    );
    const MAGICPINData = dummy3poData.threePOData.find(
      (item) => item.tenderName === "MAGICPIN"
    );
    const zomatoSales = zomatoData ? zomatoData.threePOSales : 0;
    const swiggySales = swiggyData ? swiggyData.threePOSales : 0;
    const MagicPinSales = MAGICPINData ? MAGICPINData.threePOSales : 0;

    setZomatoThreePOSales(zomatoSales);
    setSwiggyThreePOSales(swiggySales);
    setMagicPinThreePOSales(MagicPinSales);
  }, []);

  const salesPercentage = ({ totalSales = 2000, threePoSales = 500 }) => {
    if (totalSales === "0" || totalSales === 0) {
      return 0
    }
    const percentage = (threePoSales / totalSales) * 100;
    const result = Math.round(percentage.toFixed(2)) / 100;
    return isNaN(result) ? 0 : result;

  };

  const totalSalesPercentage = ({ totalSales = 2000, threePoSales = 500 }) => {
    if (totalSales === "0" || totalSales === 0) {
      return 0
    }
    const percentage = (threePoSales / totalSales) * 100;
    let result = Math.round(percentage.toFixed(2));
    return isNaN(result) ? 0 : result;
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
  const [trmPos, setTrmPosClick] = useState(trmPosItems[0] || {});
  const [posVsTrmVsMpr, setPosVsTrmVsMprClick] = useState(
    posVsTrmVsMprItems[0] || {}
  );

  const [storeSales, setstoreSalesClick] = useState(storeSalesItems[0] || {});
  const [threePoAGregator, setthreePoAGregatorClick] = useState(
    threePoAGregatorItems[0] || {}
  );
  const data = [
    { letter: "A", frequency: 0.08167 },
    { letter: "B", frequency: 0.01492 },
    { letter: "C", frequency: 0.02782 },
    { letter: "D", frequency: 0.04253 },
    { letter: "E", frequency: 0.12702 },
    { letter: "F", frequency: 0.02288 },
    { letter: "G", frequency: 0.02015 },
    { letter: "H", frequency: 0.06094 },
    { letter: "I", frequency: 0.06966 },
    { letter: "J", frequency: 0.00153 },
    { letter: "K", frequency: 0.00772 },
    { letter: "L", frequency: 0.04025 },
    { letter: "M", frequency: 0.02406 },
    { letter: "N", frequency: 0.06749 },
    { letter: "O", frequency: 0.07507 },
    { letter: "P", frequency: 0.01929 },
    { letter: "Q", frequency: 0.00095 },
    { letter: "R", frequency: 0.05987 },
    { letter: "S", frequency: 0.06327 },
    { letter: "T", frequency: 0.09056 },
    { letter: "U", frequency: 0.02758 },
    { letter: "V", frequency: 0.00978 },
    { letter: "W", frequency: 0.0236 },
    { letter: "X", frequency: 0.0015 },
    { letter: "Y", frequency: 0.01974 },
    { letter: "Z", frequency: 0.00074 },
  ];

  // Mapping tender names to letters for x-axis labels
  const tenderNameToLetter = {
    ZOMATO: "ZOMATO",
    SWIGGY: "SWIGGY",
    MAGICPIN: "MAGICPIN",
  };

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
    if (_3poTableData?.threePOData !== undefined && _3poTableData?.threePOData !== null ) {
      let data = _3poTableData?.threePOData.map((threePO) => {
        return {name: threePO?.tenderName, value: 'allCharges'}
      })
      setChargeSelection(data);
    }
  },[])

  //posSales
  //threePOSales

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

  const handleTrmPosClick = (e) => {
    //   message.info('Click on menu item.');
    console.log("click", e);
    setTrmPosClick(e);
  };

  const handleClickOnCharges = (e) => {
    setAllChargesData(e);
  };

  const trmPosTypeDropdown = {
    items: trmPosItems,
    onClick: (e) =>
      handleTrmPosClick({ key: e.key, value: e.key, label: e.key }),
    value: trmPos,
  };

  const allChargesTypeDropDown = {
    items: allChargesItems,
    onClick: (e) =>
      handleClickOnCharges({ key: e.key, value: e.key, label: e.label }),
    value: allChargesData,
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

  const allCharges = ["Promo", "Freebies", "Commission", "Discounts"];

  const ChartField = [
    { type: "Promo", value: dummy3poData?.promo },
    { type: "Freebies", value: dummy3poData?.threePOFreebies },
    { type: "Commission", value: dummy3poData?.threePOCommission },
    { type: "Discounts", value: dummy3poData?.threePODiscounts },
    { type: "Charges", value: dummy3poData?.threePOCharges },
  ];

  const chartFieldsValues = (item) => {
    return [
      { type: "Promo", value: Number(item?.promo.toFixed(0)) },
      { type: "Freebies", value: Number(item?.threePOFreebies.toFixed(0)) },
      { type: "Commission", value: Number(item?.threePOCommission.toFixed(0)) },
      { type: "Discounts", value: Number(item?.threePODiscounts.toFixed(0)) },
      { type: "Charges", value: Number(item?.threePOCharges.toFixed(0)) },
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

  const allDownloadReport = (tender = null, bank = null, cat = '') => {
    let payload = {
      tender: tender,
      startDate: downloadReports.startDate,
      endDate: downloadReports.endDate,
      bank: bank
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

  const handleChange = (opt, tenderName, type, item) => {
    
    if (type === 'Delta') {
      // let data = deltaDropDown.map((delta) => {
      //   return {...delta, isSelected: delta.value === opt};
      // })
      // setDeltaDropDown(data);
      let newData = _3poTableData?.threePOData.map((poData) => {
        if (poData?.tenderName === tenderName) {
          return {...poData, selectedDelta: opt};
        } else {
          return poData;
        }
      })
      dispatch(update3POTableDataToStore({..._3poTableData, threePOData: newData}));
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


  const renderDD = (item, tenderName, type) => {

    let cardData =  [{}];
      if (type === 'Delta') {
        // cardData = deltaDropDown.filter((item) => item.isSelected === true)
        cardData = [{value: item?.selectedDelta}];
      } else {
        cardData = chargeSelection.filter((charge) => charge.name === item?.tenderName)
      }
      
      let temp = cardData[0]?.value;
      let value = 0;
      
      if (type === 'Delta') {
        // let selectedValue = deltaDropDown.filter((item) => item.isSelected === true);
        // value = Number(item?.[selectedValue[0]?.value]);
        value = Number(item?.[cardData[0]?.value]);
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
                handleChange(a, tenderName, type, item)
              }}
              options={type === 'Delta' ? deltaDropDown : chargesDropDown}
              // labelRender={({label, value, key, disabled, title})=>{return (<strong style={{overflow:'hidden', textOverflow:'ellipsis'}}>{value}</strong>)}}
              // style={{maxWidth: '70%'}}
            />
          <p style={{ marginRight: 10}}>{formatNumberToLakhsAndCrores(value)+"L"}</p>
        </div>
      );
    }

    const countValue = (item) => {

      let cardData =  chargeSelection.filter((charge) => charge.name === item?.tenderName)
      let val = cardData[0]?.value
      let value = 0
      
      switch (val) {
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

      let all = fieldToggleKey === "3PO Sales" ?
      Number(_3poTableData?.threePOCharges) + Number(_3poTableData?.promo) +  Number(_3poTableData?.threePODiscounts) + Number(_3poTableData?.threePOFreebies) + Number(_3poTableData?.threePOCommission)
    : 
      Number(_3poTableData?.posCharges) + Number(_3poTableData?.promo) +  Number(_3poTableData?.posDiscounts) + Number(_3poTableData?.posFreebies) + Number(_3poTableData?.posCommission)

      return salesPercentage({
        totalSales: all,
        threePoSales: value,
      })
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

      allDownloadReport(item.tenderName, null, value)
    }

    const findDeltaValue = (tenderData = null) => {
      if (tenderData) {
        let value = 0;
        // let selectedValue = deltaDropDown.filter((item) => item.isSelected === true)
        // if (fieldToggleKey === "3PO Sales") {
          value = Number(tenderData?.[tenderData?.selectedDelta]);
        // } else {
        //   value = Number(tenderData?.[selectedValue[0]?.value])
        // }
        // console.log('====delta value======',value, tenderData?.threePOSales, salesPercentage({
        //   totalSales: tenderData?.threePOSales,
        //   threePoSales: value
        // }));
        return salesPercentage({
            totalSales: tenderData?.threePOSales,
            threePoSales: value
          })
      }
  
    }

    return (
      (_3poTableData?.threePOData !== undefined && _3poTableData?.threePOData !== null ) ? 
      <div className="w-full flex gap-4">
        <div className="w-full">
          <div className="filter-row w-full flex">
            <LineColumnBarChart
              // width={"100%"}
              dataItems={inThreePOTenderGraphData}
              xField={xFieldYField(fieldToggleKey).xField}
              yField={xFieldYField(fieldToggleKey).yField}
            />
          </div>
          <div className="filter-row w-full">
            <div className="flex gap-3.5">
              {_3poTableData?.threePOData.map((item, index) => (
                <div key={index} style={{flex: 1}}>
                <CustomCardWithCharts
                  key={index}
                  title={<strong className="text-lg">{item.tenderName}</strong>}
                  // cardWidth={"300px"}
                  // cardContentWidth="20%"
                  // chartContentWidth="80%"
                  chartContentWidth={"auto"}
                  chartContentHeight={"auto"}
                  cardContentWidth={"auto"}

                  cardContentHeight="auto"
                  cardHeight={"344px"}
                  cardWidth={"200px"}

                  rightCardSideCss="mt-4"
                  chart={
                      // <PieChart
                      //   angleField={"value"}
                      //   colorField={"type"}
                      //   chartData={DeltaFieldsValues(item)}
                      //   width={100}
                      // />
                      <TinyChart
                          percent={findDeltaValue(item)}
                        />
                    }
                  // bottomTitle="Delta"
                  renderSelection={renderDD(item, item.tenderName, 'Delta')}
                  CustomIcon={
                    <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      onClick={() => {allDownloadReport(item?.tenderName, null, item.selectedDelta)}}
                    />
                  }
                />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="filter-row">
            <div className="flex gap-3.5">
              {_3poTableData?.threePOData.map((item, index) => (
                <div key={index} style={{flex: 1}}>
                  <CustomCardWithCharts
                    title={<strong className="text-lg">{item.tenderName}</strong>}
                    cardType="vertical"
                    chartContentWidth={"auto"}
                    chartContentHeight={"auto"}
                    cardContentWidth={"auto"}
                    chart={
                      <LiquidChart
                        width="170px"
                        percentage={totalSalesPercentage({
                          totalSales: fieldToggleKey === '3PO Sales' ? _3poTableData?.threePOSales : _3poTableData?.posSales,
                          threePoSales: fieldToggleKey === '3PO Sales' ? item?.threePOSales : item?.posSales,
                        })}
                      />
                    }
                    bottomTitle="Total Sales"
                    // bottomTitleValue={item.posSales.toFixed(2)}
                    bottomTitleValue={
                      formatNumberToLakhsAndCrores(fieldToggleKey === '3PO Sales' ? item?.threePOSales : item?.posSales) + "L"
                    }
                    CustomIcon={
                      <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "25px" }}
                        onClick={() => allDownloadReport(item.tenderName, null, fieldToggleKey === "3PO Sales" ? "ThreePOSales" : "POSSales")}
                      />
                    }
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3.5 mt-4 flex-wrap">
              {_3poTableData?.threePOData.map((item, index) => (
                <div key={index} style={{flex: 1}}>
                <CustomCardWithCharts
                  title={<strong className="text-lg">{item.tenderName}</strong>}
                  rightCardSideCss="overflow-auto"
                  chart={
                    <TinyChart
                      // width={50}
                      percent={salesPercentage({
                        totalSales: fieldToggleKey === '3PO Sales' ? _3poTableData?.threePOReceivables : _3poTableData?.posReceivables,
                        threePoSales: fieldToggleKey === '3PO Sales' ? item?.threePOReceivables : item?.posReceivables,
                      })}
                    />
                  }
                  bottomTitle="Receivables"
                  // bottomTitleValue={item.posSales.toFixed(2)}
                  bottomTitleValue={
                    formatNumberToLakhsAndCrores(fieldToggleKey === '3PO Sales' ? item?.threePOReceivables : item?.posReceivables) + "L"
                  }
                  CustomIcon={
                    <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      onClick={() => allDownloadReport(item.tenderName, null, fieldToggleKey === "3PO Sales" ? "ThreePOReceivables" : "PosReceivables")}
                    />
                  }
                />
                </div>
              ))}
            </div>
            <div className="flex gap-3.5 mt-4 flex-wrap">
              {_3poTableData?.threePOData.map((item, index) => (
                <CustomCardWithCharts
                  key={index}
                  title={<strong className="text-lg">{item.tenderName}</strong>}
                  rightCardSideCss="mt-4"
                  chart={
                    <TinyChart
                      percent={salesPercentage({
                        totalSales: _3poTableData?.reconciled,
                        threePoSales: item?.reconciled,
                      })}
                    />
                  }
                  bottomTitle="Reconciled"
                  bottomTitleValue={
                    formatNumberToLakhsAndCrores(item.reconciled) + "L"
                  }
                  CustomIcon={
                    <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      // onClick={() => allDownloadReport("Reconciled")}
                      onClick={() => allDownloadReport(item.tenderName, null, "Reconciled")}
                    />
                  }
                />
              ))}
            </div>  
            {/* <div className="flex gap-3.5 mt-4 flex-wrap">
              {_3poTableData?.threePOData.map((item, index) => (
                <CustomCardWithCharts
                  key={index}
                  title={<strong className="text-lg">{item.tenderName}</strong>}
                  rightCardSideCss="mt-4"
                  chart={
                    <TinyChart
                      percent={salesPercentage({
                        totalSales: _3poTableData?.reconciled,
                        threePoSales: item?.reconciled,
                      })}
                    />
                  }
                  bottomTitle="Unreconciled"
                  bottomTitleValue={
                    formatNumberToLakhsAndCrores(item.reconciled) + "L"
                  }
                  CustomIcon={
                    <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      // onClick={() => allDownloadReport("Booked")}
                      onClick={() => allDownloadReport(item.tenderName, null, "Booked")}
                    />
                  }
                />
              ))}
            </div> */}
            {chargeSelection[0] ? <div className="flex gap-3.5 mt-4 flex-wrap">
              {_3poTableData?.threePOData.map((item, index) => {
                return (
                <CustomCardWithCharts
                  key={index}
                  cardType="vertical"
                  title={<strong className="text-lg">{item.tenderName}</strong>}
                  // cardContentHeight="auto"
                  // cardHeight={"344px"}
                  cardWidth={"200px"}
                  rightCardSideCss="mt-4"
                  chart={
                    // <div className="">
                    //   <PieChart
                    //     angleField={"value"}
                    //     colorField={"type"}
                    //     chartData={chartFieldsValues(item)}
                    //     width={180}
                    //   />
                    // </div>
                    <TinyChart
                      percent={countValue(item)}
                    />
                  }
                  renderSelection={renderDD(item, item.tenderName, 'Charges')}
                  // bottomTitle="All Charges"
                  // bottomTitleValue={'abc'}
                  CustomIcon={
                    <DownloadOutlined
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      // onClick={() => allDownloadReport("Booked")}
                      onClick={() => {
                        onChargeDownload(item);
                      }}
                    />
                  }
                />
              )})}
            </div> : null}
        </div>
      </div> : null 
    )
};

export default ThreePO;
