import moment from "moment";
import {
  updateAlertDataModalToStore,
  updateAlertModalToStore,
} from "../Redux/Action/AllModalReducerAction";
import { format } from "date-fns";

export const generateDeviceCode = () => {
  // Generate a random string or use a library to create a unique device code
  const randomCode = Math.random().toString(36).substring(1, 10);
  return randomCode;
};

export const showCustomAlert = ({
  imgSrc = "",
  title = "Add title",
  underTitle = "11 mins ago",
  bodyMsg = "body msg",
  dispatch,
}) => {
  dispatch(
    updateAlertDataModalToStore({
      imgSrc: imgSrc,
      title: title,
      underTitle: underTitle,
      bodyMsg: bodyMsg,
    })
  );
  dispatch(updateAlertModalToStore(true));
};

export const dateFormatChanger = (dat) => {
  // return format(dat, "yyyy-MM-dd HH:mm:ss");
  return format(dat, "yyyy-MM-dd ");
};
export const dateFormatChangerView = (dat) => {
  // return format(dat, "yyyy-MM-dd HH:mm:ss");
  return format(dat, "dd/MM/yyyy ");
};

export const downloadReportsFun = (
  data,
  fileName,
  type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
) => {
  console.log("download report fun", data, fileName, type);
  const blob = new Blob([data], { type: type });
  const downloadLink = document.createElement("a");
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.download = fileName;
  downloadLink.click();
    // Decode the base64 string to binary data
    // const binaryData = atob(data);

    // // Create an array buffer from the binary data
    // const arrayBuffer = new ArrayBuffer(binaryData.length);
    // const view = new Uint8Array(arrayBuffer);
    // for (let i = 0; i < binaryData.length; i++) {
    //   view[i] = binaryData.charCodeAt(i);
    // }
  
    // // Create a Blob from the array buffer
    // const blob = new Blob([arrayBuffer], { type: type });
  
    // // Create a download link and trigger the download
    // const downloadLink = document.createElement("a");
    // downloadLink.href = window.URL.createObjectURL(blob);
    // downloadLink.download = fileName;
    // downloadLink.click();
};

function convertObjectToCSV(obj) {
  const array = [Object.keys(obj)];
  array.push(Object.values(obj));
  return array.join("\n");
}

export function downloadCSVFile(data, filename) {
  const csv = convertObjectToCSV(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename + ".csv";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadCSV(csvData, filename) {
  // Create a Blob object
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

  // Check if the browser supports the HTML5 download attribute
  if (navigator.msSaveBlob) {
    // For IE and Edge
    navigator.msSaveBlob(blob, filename);
  } else {
    // Create a temporary anchor element
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // Set the href attribute of the anchor element
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);

      // Append the anchor element to the body
      document.body.appendChild(link);

      // Trigger the click event to download the CSV file
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      console.error('Your browser does not support downloading files.');
    }
  }
}

export const getChangeVsUsingRowId = (id) => {
  if (id === "0" || id === "posVsTrm") {
    return "POS vs TRM";
  } else if (id === "1" || id === "trmVsMpr") {
    return "TRM vs MPR";
  } else {
    return "MPR vs BANK";
  }
};

export function downloadCSVForNestedObjectAndArray(data, fileName) {
  // format {sales: 0, salesCount: 0, bankWiseDataList: [{}, {}]}

  let csv =
    "Tender Name, Bank Name, Sales, Sales Count, Receipts, Receipts Count, Reconciled, Reconciled Count, Difference, Difference Count, Charges, Booked, POS vs TRM, TRM vs MPR, MPR vs Bank\n";
  csv += `,,${data.sales}, ${data.salesCount}, ${data.receipts}, ${data.receiptsCount}, ${data.reconciled}, ${data.reconciledCount}, ${data.difference}, ${data.differenceCount}, ${data.charges}, ${data.booked}, ${data.posVsTrm}, ${data.trmVsMpr}, ${data.mprVsBank}\n\n`;
  // Append data from the tenderName object
  csv += `${data.tenderName}\n`;

  // Append data from bankWiseDataList
  data.bankWiseDataList.forEach((bankData) => {
    csv += `"${data.tenderName}", "${bankData.bankName}", ${bankData.sales}, ${bankData.salesCount}, ${bankData.receipts}, ${bankData.receiptsCount}, ${bankData.reconciled}, ${bankData.reconciledCount}, ${bankData.difference}, ${bankData.differenceCount}, ${bankData.charges}, ${bankData.booked}, ${bankData.posVsTrm}, ${bankData.trmVsMpr}, ${bankData.mprVsBank}\n`;
  });

  // Create a Blob containing the CSV data
  const blob = new Blob([csv], { type: "text/csv" });

  // Create a download link and trigger the download
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = fileName + ".csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function capitalizeFun(str) {
  // Check if the input string is in all caps
  if (str === str.toUpperCase()) {
    // Convert the first character to uppercase and the rest to lowercase
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  } else {
    // If the string is not in all caps, return it as is
    return str;
  }
}

export const dropDownOptionMaker = (arr) => {
  return arr.map((i) => ({ displayName: i, technicalName: i }));
};

export function divideByTen(totalCount) {
  if (typeof totalCount !== "number" || totalCount < 0) {
    return [];
  }

  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Generate an array of page numbers starting from 10 and incrementing by 10

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

  return pageNumbers;

  // let arr = []
  // for(let i = 0; i < totalPages; i++){
  //   arr.push(i*10)
  // }
}
export const changeToTechnicalAndDisplay = (arr = []) =>
  arr.map((i) => ({ technicalName: i, displayName: i }));

function formatToFixed(value) {
  // Round to 1 decimal place and remove trailing zeros
  const roundedValue = Number(value.toFixed(2));
  return roundedValue.toString();
}

export function formatNumberToLakhsAndCrores(number) {

  // if ((Number(number) !== NaN) && (number !== undefined) && (number !== NaN)) {

  //   const absNumber = Math.abs(number);

  //   if (absNumber >= 1e7) {
  //     const crores = absNumber / 1e7;
  //     return formatToFixed(crores) + " Cr";
  //   } else if (absNumber >= 1e5) {
  //     const lakhs = absNumber / 1e5;
  //     return formatToFixed(lakhs) + " L";
  //   } else {
  //     return number.toString();
  //   }
  // } else {
  //   return number;
  // }

    const absNumber = Math.abs(number);
  
    if (isNaN(number) || number === undefined) {
      return number; // Return original value if it's not a valid number
    }
  
    // Format numbers in Lakhs, including values less than 1 Lakh
    const lakhs = absNumber / 1e5;
    //\u20B90 adding rupees sign
    return `${formatToFixed(lakhs)}`;
  }

export const customThreePOdataList = (arr, mappedStore) => {
  let data = arr; 
  if(arr?.threePOData?.length > 0){
    data.threePOData = arr?.threePOData?.map( i => {
      if(i.tenderName === "ZOMATO"){
        //sa
        const { missing = "", totalStores = ""} = mappedStore?.find(item => item?.threePO == "ZOMATO") || {}
        i = {...i, tenderName : `ZOMATO`, storeStatus: `(${missing}/${totalStores})`, downloadPayload: {key: true, value: "zomato"}}
        
      } else if(i.tenderName === "SWIGGY") {
        //ASD
        const { missing = "", totalStores = ""} = mappedStore?.find(item => item?.threePO == "SWIGGY") || {}
        i = {...i, tenderName : `SWIGGY`, storeStatus: `(${missing}/${totalStores})`, downloadPayload: {key: true, value: "swiggy"}};

      } else if(i.tenderName === "MAGICPIN"){
        const { missing = "", totalStores = ""} = mappedStore?.find(item => item?.threePO == "MAGICPIN") || {}
        i = {...i, tenderName : `MAGICPIN`, storeStatus: `(${missing}/${totalStores})`, downloadPayload: {key: true, value: "magicpin"}};
  
      }
      return i;
    })
  }

  console.log("arr customThreePOdataLis",arr, mappedStore);

  return data || [];
}

export const roundFigureForCommon = (v) => {
  if(typeof v.props.value == 'string' ){
    return v.props.value
  } else if(typeof v.props.value == 'number') {
    if(v.props.value < 1000) {
      return v.props.value.toFixed(2);
    } else {
      return formatNumberToLakhsAndCrores((v.props.value).toFixed(1))
    }
  } else {
    return v.props.value
  }
  // return formatNumberToLakhsAndCrores(Math.round(v.props.value) !== NaN ? Math.round(v.props.value) : v.props.value);
};


export const convertToInStoreCheckTreeData = (data) => {
  const tenderWiseDataList = data?.tenderWiseDataList || [];

  const treeData = tenderWiseDataList?.map((tender, tenderIndex) => {
    const tenderKey = `0-${tenderIndex}`;

    const bankChildren = tender.bankWiseDataList?.map((bank, bankIndex) => ({
      title: bank.bankName,
      key: `${tenderKey}-${bankIndex}`,
      disabled: true,
      color: "#1890ff",
      value: bank
    }));

    return {
      title: tender.tenderName,
      key: tenderKey,
      value: tender,
      children: bankChildren,
    };
  });

  return [
    {
      title: 'All',
      key: '0',
      children: treeData,
    },
  ];
};

export const convertToTenderOnlyTreeData = (data) => {
  const tenderWiseDataList = data.tenderWiseDataList || [];

  const treeData = tenderWiseDataList.map((tender, tenderIndex) => {
    const tenderKey = `0-${tenderIndex}`;
    
    return {
      title: tender.tenderName,
      key: tenderKey,
      value: tender
    };
  });

  return [
    {
      title: 'All',
      key: '0',
      children: treeData,
    },
  ];
};

export const convertTo3POOnlyTreeData = (data) => {
  const threePODataList = data.threePOData || [];

  const treeData = threePODataList.map((threePOData, threePODataIndex) => {
    const threePODataKey = `0-${threePODataIndex}`;
    
    return {
      title: threePOData.tenderName,
      key: threePODataKey,
      value: threePOData
    };
  });

  return [
    {
      title: 'All',
      key: '0',
      children: treeData,
    },
  ];
};


export const calculatePercentage = ({part, total}) => {
  if (Number(total) === 0) {
    return 0;
  }
let result = (100 * Number(part)) / Number(total);

  return isNaN(result) ? 0 : result;
};

export const convertPercentage = (val1, max, min) => { 
  let val = 100000


  var delta = max - min;
    // return function (val) {
      let result = (val - min) / delta;
      console.log('===result=====',result);
        return result;
    // };


  if(max - min === 0) return 0;
  // let result= Math.max(0, Math.min(1, val-min / max-min));
  
  return result;
  // // Shift to positive to avoid issues when crossing the 0 line
  // if(min < 0){
  //   max += 0 - min;
  //   val += 0 - min;
  //   min = 0;
  // }
  // // Shift values from 0 - max
  // val = val - min;
  // max = max - min;
  // return Math.max(0, Math.min(1, val / max));
  // if(max - min === 0) return 0;
  // const delta = max - min;
  //  return val => ( (val < min? min: (val > max? max : val)) - min ) / delta;
  // return (val - min) / (max - min); 
}