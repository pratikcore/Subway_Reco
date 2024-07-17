import React, { useEffect, useState } from "react";
import LineColumnBarChart from "../../Common/Charts/LineColumn";
import CustomCardWithCharts from "../../Common/ReusableComponent/CustomCardWithCharts";
import CustomWrapDropdown from "../../Common/ReusableComponent/CustomWrapDropdown";
import LiquidChart from "../../Common/Charts/LiquidChart";
import TinyLine from "../../Common/Charts/TinyLine";
import TinyChart from "../../Common/Charts/TinyChart";
import PieChart from "../../Common/Charts/PieChart";
import PieSpiderChart from "../../Common/Charts/PieSpiderChart";
import { UserOutlined, DownloadOutlined } from "@ant-design/icons";
import { dummy3poData, dummyInStoreData } from "./Dummy3po";
import { calculatePercentage, formatNumberToLakhsAndCrores } from "../../Helper/Utils";
import { ALL_DOWNLOAD } from "../../ApiCalls/ApiCall/apiCalls";
import { useSelector } from "react-redux";
import { Select } from "antd";

const InStore = ({ checkedRawData = [], fieldToggleKey = "POS Sales", allStoreData = [], totalSale = 0, downloadReports = null, DashboardTableData = null}) => {


  const [selectedOptions, setSelectedOptions] = useState({});

  const { storeCode = [] } = useSelector(
    (state) => state.ReconciliationService.ReconciliationStore || {}
  );

  const [storeSalesData, setStoreSalesData] = useState([]);

  const inStoreTenderGraphData = checkedRawData?.filter((i) => i !== undefined);

  const cardTrmBankData =  allStoreData?.filter(
    (item) => item.tenderName === "CARD"
  ) || [];

  const upiTrmBankData = allStoreData?.filter(
    (item) => item.tenderName === "UPI"
  ) || [];

  const trmCardDropDown = cardTrmBankData?.[0]?.bankWiseDataList?.map((item) => {
    return {
      label: item?.bankName,
      value: item?.bankName,
      key: item?.bankName,
      icon: "",
    };
  });

  const trmUPICardDropDown = upiTrmBankData?.[0]?.bankWiseDataList?.map((item) => {
    return {
      label: item?.bankName,
      value: item?.bankName,
      key: item?.bankName,
      icon: "",
    };
  });

  const [cardDeltaDropDown, setCardDeltaDropDown] = useState([
    {
      label: 'POS vs TRM',
      value: 'posVsTrm',
      key: 'posVsTrm',
      isSelected: true
    },
    {
      label: 'TRM vs MPR',
      value: 'trmVsMpr',
      key: 'trmVsMpr',
      isSelected: false
    },
    {
      label: 'MPR vs BANK',
      value: 'mprVsBank',
      key: 'mprVsBank',
      isSelected: false
    }
  ])
  const [UPIDeltaDropDown, setUPIDeltaDropDown] = useState([
    {
      label: 'POS vs TRM',
      value: 'posVsTrm',
      key: 'posVsTrm',
      isSelected: true
    },
    {
      label: 'TRM vs MPR',
      value: 'trmVsMpr',
      key: 'trmVsMpr',
      isSelected: false
    },
    {
      label: 'MPR vs BANK',
      value: 'mprVsBank',
      key: 'mprVsBank',
      isSelected: false
    }
  ])
  const [deltaDropDown, setDeltaDropDown] = useState([
    {
      label: 'POS vs TRM',
      value: 'posVsTrm',
      key: 'posVsTrm',
      isSelected: true
    },
    {
      label: 'TRM vs MPR',
      value: 'trmVsMpr',
      key: 'trmVsMpr',
      isSelected: false
    },
    {
      label: 'MPR vs BANK',
      value: 'mprVsBank',
      key: 'mprVsBank',
      isSelected: false
    }
  ])


  useEffect(() => {
    let data = allStoreData.map((item) => {
      let bankList = item.bankWiseDataList.map((bank, index) => {
        return {...bank, isSelected: index === 0 ? true : false}
      })
      return {...item, bankWiseDataList: bankList}
    })
    // console.log('===allStoreData====',allStoreData);
    // console.log('===data====',data);
    setStoreSalesData(data);
  },[])

  const handleCardDropdownChange = (cardName, selectedOption) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [cardName]: selectedOption
    }));
  };



  const tenderAndBankData = (key) => {
    let fields = [];
    switch (key) {
      case "TRM Sales":
        fields =
          inStoreTenderGraphData.flatMap((i) => i.bankWiseDataList) || [];
        break;

      default:
        fields = inStoreTenderGraphData || [];
        break;
    }
    return fields;
  };

  const xFieldYField = (key) => {
    let fields = {};
    switch (key) {
      case "TRM Sales":
        fields = { xField: "bankName", yField: "sales" };
        break;

      default:
        fields = { xField: "tenderName", yField: "sales" };
        break;
    }
    return fields;
  };

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


  const [trmPos, setTrmPosClick] = useState(trmPosItems?.[0] || {});

  const [trmCard, setTrmCard] = useState(trmCardDropDown?.[0] || {});
  const [trmUPI, setTrmUPI] = useState(trmUPICardDropDown?.[0] || {});
  const [posVsTrmVsMpr, setPosVsTrmVsMprClick] = useState(
    posVsTrmVsMprItems?.[0] || {}
  );


  const salesPercentage = ({ totalSales = 2000, sales = 500 }) => {
    if (totalSales === "0") {
      return 0
    }

    const percentage = (sales / totalSales) * 100;
    const result = Math.round(percentage.toFixed(2)) / 100;
    return isNaN(result) ? 0 : result;
  };

  // for (let letter of Object.values(tenderNameToLetter)) {
  //   const found = rawData.find(item => item.tenderName === letter);
  //   if (found) {
  //     completeData.push(found);
  //   } else {
  //     completeData.push({ letter, frequency: 0 }); // fill missing with zero frequency
  //   }
  // }
  // let completeData = rawData.flatMap(item => )

  // Calculate maximum value for the y-axis
  // const maxPosSales = Math.max(...rawData.map(item => item.sales));
  // const maxThreePOSales = Math.max(...rawData.map(item => item.sales));
  // const maxYValue = Math.max(maxPosSales, maxThreePOSales);

  // // Transforming data for chart
  // const data2 = rawData.map(item => {
  //   const letter = tenderNameToLetter[item.tenderName];
  //   const frequency = item.posSales / 100000; // dividing by 100000 to show in lakhs
  //   return { letter, frequency };
  // });

  // // Sort data based on the order of tender names (A, B, C)
  // data2.sort((a, b) => tenderNameToLetter[a.letter]?.localeCompare(tenderNameToLetter[b.letter]));

  // // Ensure data has all letters from A to C
  // const completeData = [];
  // for (let letter of Object.values(tenderNameToLetter)) {
  //   const found = data2.find(item => item.letter === letter);
  //   if (found) {
  //     completeData.push(found);
  //   } else {
  //     completeData.push({ letter, frequency: 0 }); // fill missing with zero frequency
  //   }
  // }

  const handleTrmPosClick = (e) => {
    //   message.info('Click on menu item.');
    console.log("click", e);
    setTrmPosClick(e);
  };

  const handleTrmCardClick = (e, cardType) => {
    setTrmCard(e);

  };

  const handleTrmUPIClick = (e) => {
    setTrmUPI(e);
  };

  const trmPosTypeDropdown = {
    items: trmPosItems,
    onClick: (e) =>
      handleTrmPosClick({ key: e.key, value: e.key, label: e.key }),
    value: trmPos,
  };

  const trmCardTypeDropDown = {
    items: trmCardDropDown,
    // onClick: (e) =>
    //   handleTrmCardClick(e),
    value: trmCard,
  };

  const trmUPITypeDropDown = {
    items: trmUPICardDropDown,
    onClick: (e) =>
      handleTrmUPIClick({ key: e.key, value: e.key, label: e.key }),
    value: trmUPI,
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

  const ChartField = [
    { type: "Data 1", value: 27 },
    { type: "Data 2", value: 25 },
    { type: "Data 3", value: 18 },
    { type: "Data 4", value: 15 },
    { type: "Data 5", value: 10 },
    { type: "Data 6", value: 5 },
  ];

  const allDownloadReport = (tender = null, bank = null, cat = '') => {
    let payload = {
      tender: tender,
      startDate: downloadReports.startDate,
      endDate: downloadReports.endDate,
      bank: bank
    }
    ALL_DOWNLOAD({
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

  const handleChange = (bankName, tenderName, isDelta) => {
    
    if (isDelta) {
      console.log('=====d=a==a=a=a=a=a=a=', bankName, tenderName, isDelta);
      if (tenderName === 'CARD') {
        let data = cardDeltaDropDown.map((item) => {
          return {...item, isSelected: item.value === bankName ? true : false}
        })
        setCardDeltaDropDown(data);
      } else  if (tenderName === 'UPI') {
        let data = UPIDeltaDropDown.map((item) => {
          return {...item, isSelected: item.value === bankName ? true : false}
        })
        setUPIDeltaDropDown(data);
      }
    } else {
      let data = storeSalesData.map((item) => {
        if (item.tenderName === tenderName) {
          let bankList = item.bankWiseDataList.map((bank) => {
            if (bank.bankName === bankName) {
              return {...bank, isSelected: true};
            } else return {...bank, isSelected: false};
          })
          return {...item, bankWiseDataList: bankList};
        } else return item;
      })
      setStoreSalesData(data);
    }
    

  }

  const renderDD = (item, tenderName, type1) => {
    let type = 'dedn'
    if (fieldToggleKey === "TRM Sales" || type === 'delta') {
      let cardData =  [{}]
      if (type === 'delta' && tenderName === 'UPI') {
        let val = 0
        let opt = UPIDeltaDropDown.filter((item) => item.isSelected === true)
        if (opt[0]) {
          val = item[opt[0].value]
        }
        cardData = [{...UPIDeltaDropDown[0], bankName: UPIDeltaDropDown[0].value, delta: val}]
      } else if (type === 'delta' && tenderName === 'CARD') {
        let val = 0
        let opt = cardDeltaDropDown.filter((item) => item.isSelected === true)
        if (opt[0]) {
          val = item[opt[0].value]
        }
        cardData = [{...cardDeltaDropDown[0], bankName: cardDeltaDropDown[0].value, delta: val}]
      } else {
        cardData = item?.bankWiseDataList.filter((item) => item.isSelected === true)
      }
      let options = []
      if (type === 'delta' && tenderName === 'UPI') {
        options = UPIDeltaDropDown
      } else if (type === 'delta' && tenderName === 'CARD') {
        options = cardDeltaDropDown
      } else if (item.tenderName === "CARD") {
        options = trmCardDropDown
      } else {
        options = trmUPICardDropDown
      }

      return (
        <div className="ddClass">
          <Select
            defaultValue={
              cardData[0]?.bankName
            }
            popupMatchSelectWidth={false}
            onChange={(a)=>handleChange(a, tenderName, type === 'delta')}
            options={options}
          />
          <p style={{ marginRight: 10}}>{formatNumberToLakhsAndCrores(cardData[0]?.[type])+"L"}</p>
          {/* <div><p style={{ marginRight: 10}}>({formatNumberToLakhsAndCrores(DashboardTableData?.[cardData[0]?.bankName])+"L"})</p></div> */}
          {/* bottomTitleValue={formatNumberToLakhsAndCrores(fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.receipts : item?.receipts) + "L"} */}
          <div><DownloadOutlined
                  style={{ fontSize: 18}}
                  onClick={() => {
                    let category = "TRMSales";
                    switch (type) {
                      case 'sales':
                        category = "TRMSales"
                        break;
                      case 'reconciled':
                        category = "Reconciled"
                        break;
                      case 'receipts':
                        category = "Receipts"
                        break;
                      case 'unreconciled':
                        category = "Unreconciled"
                        break;
                      case 'charges':
                        category = "Charges"
                        break;
                      case 'delta':
                        category = "Delta"
                        break;
                      
                      default:
                        break;
                    }
                    allDownloadReport(tenderName, cardData[0]?.bankName, category);
                  }}
                /></div>
        </div>
      );
    }
    return null;
  };

  const onDeltaDDChange = (val, tenderName) => {
    
    console.log('==onDeltaDDChange==', val, tenderName);

    let data = UPIDeltaDropDown.map((item) => {
      return {...item, isSelected: item.value === val ? true : false}
    });
    setDeltaDropDown(data);

    // return
    // if (isDelta) {
    //   if (tenderName === 'CARD') {
    //     let data = cardDeltaDropDown.map((item) => {
    //       return {...item, isSelected: item.value === bankName ? true : false}
    //     })
    //     setCardDeltaDropDown(data);
    //   } else  if (tenderName === 'UPI') {
    //     let data = UPIDeltaDropDown.map((item) => {
    //       return {...item, isSelected: item.value === bankName ? true : false}
    //     })
    //     setUPIDeltaDropDown(data);
    //   }
    // } else {
    //   let data = storeSalesData.map((item) => {
    //     if (item.tenderName === tenderName) {
    //       let bankList = item.bankWiseDataList.map((bank) => {
    //         if (bank.bankName === bankName) {
    //           return {...bank, isSelected: true};
    //         } else return {...bank, isSelected: false};
    //       })
    //       return {...item, bankWiseDataList: bankList};
    //     } else return item;
    //   })
    //   setStoreSalesData(data);
    // }
    

  }

  const renderDeltaDD = (item, tenderName, type) => {
    let selectedValue = deltaDropDown.filter((item) => item.isSelected === true)
    return (
      <div className="ddClass">
        <Select
          defaultValue={
            selectedValue[0]?.value
          }
          popupMatchSelectWidth={false}
          onChange={(a)=>onDeltaDDChange(a, tenderName)}
          options={deltaDropDown}
        />
      </div>
    )
  }

  return (
    <>
      <div>
        <div className="w-full" style={{ gap: "15px" }}>
          <div className="w-full flex gap-3.5">
            <div
              className="w-full make-box"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 5,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              }}
            >
              <div className="box-title-view">
                <strong className="text-sm" style={{padding: 3}}>Sales Data</strong>
              </div>
              <LineColumnBarChart
                height={fieldToggleKey === 'TRM Sales' ? "230px" : "195px"}
                width={"320px"}
                dataItems={tenderAndBankData(fieldToggleKey)}
                xField={xFieldYField(fieldToggleKey).xField}
                yField={xFieldYField(fieldToggleKey).yField}
                isShort={true}
              />
            </div>
            <div className="w-full make-box">
              <div className={`box-title-view gap-1`}>
                <div><strong className="text-sm">Total Sales</strong></div>
                <div><strong className="text-sm">({formatNumberToLakhsAndCrores(DashboardTableData?.sales)+"L"})</strong></div>
                <div><DownloadOutlined
                    style={{ fontSize: 18, marginTop: 5}}
                    // onClick={() => allDownloadReport(fieldToggleKey === "TRM Sales" ? "TRMSales" : "POSSales")}
                    onClick={() => allDownloadReport(null, null, fieldToggleKey === "TRM Sales" ? "TRMSales" : "POSSales")}
                  /></div>
              </div>
              <div className="flex gap-1.5">
                {storeSalesData?.map((item, ind) => {
                  return (
                  <div className="w-full" key={`${ind}-${item.tenderName}`}>
                    <CustomCardWithCharts
                      // title={<strong>{item.tenderName}</strong>}
                      cardType="vertical"
                      cardHeight={"300px"}
                      cardWidth={"300px"}
                      chartContentWidth={"auto"}
                      chartContentHeight={"auto"}
                      cardContentHeight={"55%"}
                      cardContentWidth={"auto"}
                      // verticalCardBottom={
                      //   fieldToggleKey === "TRM Sales" && (
                      //     <CustomWrapDropdown
                      //       menuProps={
                      //         item.tenderName === "CARD"
                      //           ? trmCardTypeDropDown
                      //           : trmUPITypeDropDown
                      //       }
                      //     />
                      //   )
                      // }
                      renderDD={renderDD(item,item.tenderName, 'sales')}
                      bottomTitle={item.tenderName}
                      bottomTitleValue={
                        formatNumberToLakhsAndCrores(item.sales) + "L"
                      }
                      CustomIcon={
                        <DownloadOutlined
                          style={{ cursor: "pointer", fontSize: "25px" }}
                          onClick={() => allDownloadReport(item.tenderName, null, fieldToggleKey === "TRM Sales" ? "TRMSales" : "POSSales")}
                        />
                      }
                      // chart={<LiquidChart width="170px" />}
                      chart={
                        // <LiquidChart
                        //   width="120px"
                        //   // style={{ height: 185, width: 160 }}
                        //   percentage={calculatePercentage({
                        //     total: totalSaleNumber,
                        //     part: item.sales,
                        //   }).toFixed(2)}
                        // />
                        <TinyChart
                            percent={calculatePercentage({
                                  total: DashboardTableData?.sales,
                                  part: item.sales,
                                })/100}
                            width={120}
                          />
                      }
                    />
                  </div>
                )})}
              </div>
            </div>
            <div className="w-full make-box" style={{display: 'flex', flexDirection: 'column'}}>
              <div className={`box-title-view gap-1`}>
                <div><strong className="text-sm">Reconciled</strong></div>
                <div><strong className="text-sm">({formatNumberToLakhsAndCrores(DashboardTableData?.reconciled)+"L"})</strong></div>
                <div><DownloadOutlined
                    style={{ fontSize: 18, marginTop: 5}}
                    onClick={() => allDownloadReport(null, null, fieldToggleKey === "TRM Sales" ? "TRMSales" : "Reconciled")}
                  /></div>
              </div>
              <div className="flex gap-1.5 h-full" style={{flex: 1}}>
                {storeSalesData?.map((item, index) => (
                  <div
                    className="w-full h-full"
                    style={{height: '100%' }}
                  >
                    <CustomCardWithCharts
                    // leftCardComponent={
                    //     fieldToggleKey === "TRM Sales" && (
                    //       <CustomWrapDropdown
                    //         menuProps={
                    //           item.tenderName === "CARD"
                    //             ? trmCardTypeDropDown
                    //             : trmUPITypeDropDown
                    //         }
                    //       />
                    //     )
                    //   }
                      chart={
                        <TinyChart
                            percent={salesPercentage({
                              sales: fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.reconciled : item?.reconciled,
                              totalSales: fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.sales : item?.sales,
                            })}
                            width={120}
                          />
                      }
                      renderDD={renderDD(item, item.tenderName, 'reconciled')}
                      bottomTitle={item.tenderName}
                      bottomTitleValue={formatNumberToLakhsAndCrores(fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.reconciled : item?.reconciled) + "L"}
                      CustomIcon={
                        <DownloadOutlined
                          style={{ cursor: "pointer", fontSize: "25px" }}
                          onClick={() => allDownloadReport(item.tenderName, null, "Reconciled")}
                        />
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="w-full flex gap-3.5">
            <div className="w-full make-box" style={{display: 'flex', flexDirection: 'column'}}>
              <div className={`box-title-view gap-1`}>
                <div><strong className="text-sm">Bank Receipts</strong></div>
                <div><strong className="text-sm">({formatNumberToLakhsAndCrores(DashboardTableData?.receipts)+"L"})</strong></div>
                <div><DownloadOutlined
                    style={{ fontSize: 18, marginTop: 5}}
                    onClick={() => allDownloadReport(null, null, fieldToggleKey === "TRM Sales" ? "TRMSales" : "Receipts")}
                  /></div>
              </div>
              <div className="flex gap-1.5 h-full" style={{flex: 1}}>
                {storeSalesData?.map((item, index) => (
                  <div className="w-full flex">
                    <CustomCardWithCharts
                      // title={<strong>{item.tenderName}</strong>}
                      cardWidth={"300px"}
                      rightCardSideCss="mt-4"
                      // leftCardComponent={
                      //   fieldToggleKey === "TRM Sales" && (
                      //     <CustomWrapDropdown
                      //       menuProps={
                      //         item.tenderName === "CARD"
                      //           ? trmCardTypeDropDown
                      //           : trmUPITypeDropDown
                      //       }
                      //     />
                      //   )
                      // }
                      chart={
                        <TinyChart
                          percent={salesPercentage({
                            sales: fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.receipts : item?.receipts,
                            totalSales: fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.sales : item?.sales,
                          })}
                        />
                      }
                      renderDD={renderDD(item, item.tenderName, 'receipts')}
                      bottomTitle={item.tenderName}
                      bottomTitleValue={formatNumberToLakhsAndCrores(fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.receipts : item?.receipts) + "L"}
                      CustomIcon={
                        <DownloadOutlined
                          style={{ cursor: "pointer", fontSize: "25px" }}
                          onClick={() => allDownloadReport(item.tenderName, null, "Receipts")}
                        />
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full make-box" style={{display: 'flex', flexDirection: 'column'}}>
              <div className={`box-title-view gap-1`}>
                <div><strong className="text-sm">Unreconciled</strong></div>
                <div><strong className="text-sm">({formatNumberToLakhsAndCrores(DashboardTableData?.unreconciled)+"L"})</strong></div>
                <div><DownloadOutlined
                    style={{ fontSize: 18, marginTop: 5}}
                    onClick={() => allDownloadReport(null, null, fieldToggleKey === "TRM Sales" ? "TRMSales" : "UnReconciled")}
                  /></div>
              </div>
              <div className="flex gap-1.5 h-full" style={{flex: 1}}>
                {storeSalesData?.map((item, index) => (
                  <div className="w-full">
                    <CustomCardWithCharts
                      // title={<strong>{item.tenderName}</strong>}
                      cardWidth={"500px"}
                      rightCardSideCss="mt-4"
                      // leftCardComponent={
                      //   fieldToggleKey === "TRM Sales" && (
                      //     <CustomWrapDropdown
                      //       menuProps={
                      //         item.tenderName === "CARD"
                      //           ? trmCardTypeDropDown
                      //           : trmUPITypeDropDown
                      //       }
                      //     />
                      //   )
                      // }
                      chart={
                        <TinyChart
                          percent={salesPercentage({
                            sales: fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.unreconciled : item?.unreconciled,
                            totalSales: fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.sales : item?.sales,
                          })}
                        />
                      }
                      renderDD={renderDD(item, item.tenderName , 'unreconciled')}
                      bottomTitle={item.tenderName}
                      bottomTitleValue={formatNumberToLakhsAndCrores(fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.unreconciled : item?.unreconciled) + "L"}
                      CustomIcon={
                        <DownloadOutlined
                          style={{ cursor: "pointer", fontSize: "25px" }}
                          onClick={() => allDownloadReport(item.tenderName, null, "UnReconciled")}
                        />
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full make-box" style={{display: 'flex', flexDirection: 'column'}}>
              <div className={`box-title-view gap-1`}>
                <div><strong className="text-sm">All Charges</strong></div>
                <div><strong className="text-sm">({formatNumberToLakhsAndCrores(DashboardTableData?.charges)+"L"})</strong></div>
                <div><DownloadOutlined
                    style={{ fontSize: 18, marginTop: 5}}
                    onClick={() => allDownloadReport(null, null, fieldToggleKey === "TRM Sales" ? "TRMSales" : "Charges")}
                  /></div>
              </div>
              <div className="flex gap-1.5 h-full" style={{flex: 1}}>
                {storeSalesData?.map((item, index) => (
                  <div className="w-full flex">
                    <CustomCardWithCharts
                      // title={<strong>{item.tenderName}</strong>}
                      cardWidth={"300px"}
                      rightCardSideCss="mt-4"
                      // leftCardComponent={
                      //   fieldToggleKey === "TRM Sales" && (
                      //     <CustomWrapDropdown
                      //       menuProps={
                      //         item.tenderName === "CARD"
                      //           ? trmCardTypeDropDown
                      //           : trmUPITypeDropDown
                      //       }
                      //     />
                      //   )
                      // }
                      chart={
                        <TinyChart
                          percent={salesPercentage({
                            sales: fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.charges : item?.charges,
                            totalSales: fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.sales : item?.sales,
                          })}
                        />
                      }
                      renderDD={renderDD(item, item.tenderName, 'charges')}
                      bottomTitle={item.tenderName}
                      bottomTitleValue={formatNumberToLakhsAndCrores(fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.charges : item?.charges) + "L"}
                      CustomIcon={
                        <DownloadOutlined
                          style={{ cursor: "pointer", fontSize: "25px" }}
                          onClick={() => allDownloadReport(item.tenderName, null, "Charges")}
                        />
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{width: '32.7%'}}>
            <div className="make-box">
              <div className={`box-title-view gap-1`}>
                <div>
                  <div className="w-full flex gap-1">
                  <div><strong className="text-sm">Delta</strong></div>
                  <div><strong className="text-sm">({formatNumberToLakhsAndCrores(fieldToggleKey === "TRM Sales" ? Number(DashboardTableData?.trmSalesData?.posVsTrm)+Number(DashboardTableData?.trmSalesData?.mprVsBank)+Number(DashboardTableData?.trmSalesData?.trmVsMpr) : Number(DashboardTableData?.posVsTrm)+Number(DashboardTableData?.mprVsBank)+Number(DashboardTableData?.trmVsMpr))+"L"})</strong></div>
                  <div><DownloadOutlined
                      style={{ fontSize: 18, marginTop: 2}}
                      onClick={() => allDownloadReport(null, null, fieldToggleKey === "TRM Sales" ? "TRMSales" : "Receipts")}
                    /></div>
                  </div>
                  {renderDeltaDD({},'','')}
                </div>
              </div>
              <div className="flex gap-1.5 h-full" style={{flex: 1}}>
                {storeSalesData?.map((item, index) => (
                  <div className="w-full flex">
                    <CustomCardWithCharts
                      // title={<strong>{item.tenderName}</strong>}
                      cardWidth={"300px"}
                      rightCardSideCss="mt-4"
                      chart={
                        <TinyChart
                          percent={salesPercentage({
                            sales: fieldToggleKey === "TRM Sales" ? Number(item?.trmSalesData?.posVsTrm)+Number(item?.trmSalesData?.mprVsBank)+Number(item?.trmSalesData?.trmVsMpr) : Number(item?.posVsTrm)+Number(item?.mprVsBank)+Number(item?.trmVsMpr),
                            totalSales: fieldToggleKey === "TRM Sales" ? item?.trmSalesData?.sales : item?.sales,
                          })}
                        />
                      }
                      renderDD={renderDD(item, item.tenderName, 'delta')}
                      bottomTitle={item.tenderName}
                      bottomTitleValue={formatNumberToLakhsAndCrores(fieldToggleKey === "TRM Sales" ? Number(item?.trmSalesData?.posVsTrm)+Number(item?.trmSalesData?.mprVsBank)+Number(item?.trmSalesData?.trmVsMpr) : Number(item?.posVsTrm)+Number(item?.mprVsBank)+Number(item?.trmVsMpr)) + "L"}
                      CustomIcon={
                        <DownloadOutlined
                          style={{ cursor: "pointer", fontSize: "25px" }}
                          onClick={() => allDownloadReport(item.tenderName, null, "Receipts")}
                        />
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <div>
  //       <div className="w-full flex" style={{ gap: "10px" }}>
  //         <div className="w-full filter-row">
  //           <LineColumnBarChart
  //             height={"610px"}
  //             width={"320px"}
  //             dataItems={tenderAndBankData(fieldToggleKey)}
  //             xField={xFieldYField(fieldToggleKey).xField}
  //             yField={xFieldYField(fieldToggleKey).yField}
  //             // xField={"tenderName"}
  //             // yField={"sales"}
  //           />
  //         </div>
  //         <div className="w-full filter-row">
  //         <div
  //         className={`title-box`}
  //       > <strong className="text-sm">Total Sales</strong>
  //         </div>
  //           <div className="flex gap-1.5">
  //             {allStoreData?.map((item, ind) => (
  //               <div className="w-full" key={`${ind}-${item.tenderName}`}>
  //                 <CustomCardWithCharts
  //                   // title={<strong>{item.tenderName}</strong>}
  //                   cardType="vertical"
  //                   cardHeight={"300px"}
  //                   cardWidth={"300px"}
  //                   chartContentWidth={"auto"}
  //                   chartContentHeight={"auto"}
  //                   cardContentHeight={"55%"}
  //                   cardContentWidth={"auto"}
  //                   verticalCardBottom={
  //                     fieldToggleKey === "TRM Sales" && (
  //                       <CustomWrapDropdown
  //                         menuProps={
  //                           item.tenderName === "CARD"
  //                             ? trmCardTypeDropDown
  //                             : trmUPITypeDropDown
  //                         }
  //                       />
  //                     )
  //                   }
  //                   bottomTitle={item.tenderName}
  //                   // bottomTitleValue={
  //                   //   formatNumberToLakhsAndCrores(item.sales) + "L"
  //                   // }
  //                   CustomIcon={
  //                     <DownloadOutlined
  //                       style={{ cursor: "pointer", fontSize: "25px" }}
  //                     />
  //                   }
  //                   // chart={<LiquidChart width="170px" />}
  //                   chart={
  //                     <LiquidChart
  //                       width="185px"
  //                       style={{height: 185, width: 125}}
  //                       percentage={calculatePercentage({
  //                         total: totalSale,
  //                         part: item.sales
  //                       }).toFixed(2)}
  //                     />
  //                   }
  //                 />
  //               </div>
  //             ))}
  //           </div>

  //           <div className="flex mt-1.5 gap-1.5">
  //             {allStoreData?.map((item, index) => (
  //               <div className="w-full">
  //               <CustomCardWithCharts
  //                 title={<strong>{item.tenderName}</strong>}
  //                 cardWidth={"300px"}
  //                 rightCardSideCss="mt-4"
  //                 leftCardComponent={
  //                   fieldToggleKey === "TRM Sales" && (
  //                     <CustomWrapDropdown
  //                       menuProps={
  //                         item.tenderName === "CARD"
  //                           ? trmCardTypeDropDown
  //                           : trmUPITypeDropDown
  //                       }
  //                     />
  //                   )
  //                 }
  //                 chart={
  //                   <TinyChart
  //                     percent={salesPercentage({
  //                       sales: item?.reconciled,
  //                       totalSales: item?.sales,
  //                     })}
  //                     width={120}
  //                     style={{height: 185, width: 125}}
  //                   />
  //                 }
  //                 bottomTitle="Reconciled"
  //                 // bottomTitleValue={
  //                 //   formatNumberToLakhsAndCrores(item.sales) + "L"
  //                 // }
  //                 CustomIcon={
  //                   <DownloadOutlined
  //                     style={{ cursor: "pointer", fontSize: "25px" }}
  //                   />
  //                 }
  //               />
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //         <div className="w-full filter-row">
  //           <div className="flex gap-1.5 flex-wrap" style={{justifyContent:'center'}}>
  //             <div className="w-full flex gap-1.5">
  //               {allStoreData?.map((item, index) => (
  //                 <div className="w-full flex">
  //                    <CustomCardWithCharts
  //                   title={<strong>{item.tenderName}</strong>}
  //                   cardWidth={"500px"}
  //                   rightCardSideCss="mt-4"
  //                   leftCardComponent={
  //                     fieldToggleKey === "TRM Sales" && (
  //                       <CustomWrapDropdown
  //                         menuProps={
  //                           item.tenderName === "CARD"
  //                             ? trmCardTypeDropDown
  //                             : trmUPITypeDropDown
  //                         }
  //                       />
  //                     )
  //                   }
  //                   chart={
  //                     <TinyChart
  //                       percent={salesPercentage({
  //                         sales: item?.unreconciled,
  //                         totalSales: item?.sales,
  //                       })}
  //                     />
  //                   }
  //                   bottomTitle="Unreconciled"
  //                 />
  //                 </div>
  //               ))}
  //             </div>

  //             <div className="w-full flex gap-1.5">
  //               {allStoreData?.map((item, index) => (
  //                 <div className="w-full flex">
  //                 <CustomCardWithCharts
  //                   title={<strong>{item.tenderName}</strong>}
  //                   cardWidth={"300px"}
  //                   rightCardSideCss="mt-4"
  //                   leftCardComponent={
  //                     fieldToggleKey === "TRM Sales" && (
  //                       <CustomWrapDropdown
  //                         menuProps={
  //                           item.tenderName === "CARD"
  //                             ? trmCardTypeDropDown
  //                             : trmUPITypeDropDown
  //                         }
  //                       />
  //                     )
  //                   }
  //                   chart={
  //                     <TinyChart
  //                       percent={salesPercentage({
  //                         sales: item?.receipts,
  //                         totalSales: item?.sales,
  //                       })}
  //                     />
  //                   }
  //                   bottomTitle="Vouchers Approved"
  //                 />
  //                 </div>
  //               ))}
  //             </div>

  //             <div className="w-full flex gap-1.5">
  //               {allStoreData?.map((item, index) => (
  //                 <div className="w-full flex">
  //                 <CustomCardWithCharts
  //                   title={<strong>{item.tenderName}</strong>}
  //                   cardWidth={"300px"}
  //                   rightCardSideCss="mt-4"
  //                   leftCardComponent={
  //                     fieldToggleKey === "TRM Sales" && (
  //                       <CustomWrapDropdown
  //                         menuProps={
  //                           item.tenderName === "CARD"
  //                             ? trmCardTypeDropDown
  //                             : trmUPITypeDropDown
  //                         }
  //                       />
  //                     )
  //                   }
  //                   chart={
  //                     <TinyChart
  //                       percent={salesPercentage({
  //                         sales: item?.receipts,
  //                         totalSales: item?.sales,
  //                       })}
  //                     />
  //                   }
  //                   bottomTitle="Bank Receipts"
  //                 />
  //                 </div>
  //               ))}
  //             </div>

  //             {/* <CustomCardWithCharts
  //           title={<strong>Pie Chart</strong>}
  //           cardContentHeight="auto"
  //           cardWidth={"300px"}
  //           rightCardSideCss="mt-4 mr-2"
  //           leftCardComponent={<div>Unreconcilied</div>}
  //           chart={
  //             <PieChart
  //               angleField={"value"}
  //               colorField={"type"}
  //               chartData={ChartField}
  //             />
  //           }
  //         />

  //         <CustomCardWithCharts
  //           title={<strong>Tiny Line</strong>}
  //           cardWidth={"300px"}
  //           rightCardSideCss="overflow-auto"
  //           // leftCardSideCss="border h-full rounded px-2"
  //           leftCardComponent={<div>Vouchers</div>}
  //           chart={<TinyLine />}
  //         />

  //         <CustomCardWithCharts
  //           title={<strong>Tiny Chart</strong>}
  //           cardWidth={"300px"}
  //           rightCardSideCss="mt-4"
  //           leftCardComponent={<div>Tiny Charts</div>}
  //           chart={<TinyChart />}
  //         />

  //         <CustomCardWithCharts
  //           title={<strong>Pie Spider Chart</strong>}
  //           cardWidth={"300px"}
  //           cardContentWidth="20%"
  //           chartContentWidth="80%"
  //           rightCardSideCss="mt-4"
  //           leftCardComponent={<div>Pie Spider Chart</div>}
  //           chart={<PieSpiderChart />}
  //         /> */}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default InStore;
