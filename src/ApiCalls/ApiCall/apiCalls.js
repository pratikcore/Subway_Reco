import axios from "axios";
import { APIBaseURL, apiEndpoints as ApiEndpoints } from "../ApiMethods/apiEndpoints";
import HTTP from "../ApiMethods/axios";
// import AWN from "awesome-notifications";

// let globalOptions = {
//   icons: {
//     enabled: true,
//     async: "cog",
//   },
//   // options.icons = {
//   //   async: "cog",
//   //   ...
//   // }
//   position: "top-right",
// };


// const successApiMsg = {
//   common: "Get the data successfuly",
//   access_token: "Logged In Successfully",
//   refresh_token: "",
//   reset_pass: "Reset Password Successfully",
//   change_pass: "Change Password Successfully",
//   user_logout: "User Logout Successfully",
//   data_source: "Data Source Update Successfully",
//   report_tender: "Reporting Tender Get Succesfully",
//   get_profile: "Get Profile Successfully",
//   dashboard_data: "Get Dashboard Data Successfully",
//   report_fields: "Fetched Report Fields Successfully",
//   download_report: "Download Report Successfully",
//   _3po_data: "Get 3PO data Successfully",
// };

const failedApiMsg = {
  common: "Something Went Wrong!!!",
};

let timeInMinutes = 30;
const axiosConfig = {
  baseURL: APIBaseURL,
  responseType: "json",
  timeout: 1000*60*timeInMinutes,
  headers: {
    langId: 1,
    Authorization: "",
    Accept: "application/json",
  },
};
const API = axios.create(axiosConfig);


export const ACCESS_TOKEN_API = async ({ DEVICE_CODE, param }) =>
  API.post(ApiEndpoints.ACCESS_TOKEN, param, {
    headers: { deviceId: DEVICE_CODE },
  })
    .then((res) => {
      // notifier.success("My custom Message", res)
      return res;
    })
    .catch((err) => {
      return err;
    });

export const REFRESH_TOKEN_API = async (param) =>
  API.post(ApiEndpoints.REFRESH_TOKEN, param).catch((err) => {
    return err;
  });

export const RESET_PASSWORD_API = async ({ param = {} }) =>
  API.post(ApiEndpoints.RESET_PASSWORD, param).catch((err) => {
    return err;
  });

export const CHANGE_PASSWORD_API = async ({ param = {} }) =>
  API.post(ApiEndpoints.CHANGE_PASSWORD, param).catch((err) => {
    return err;
  });

export const USER_LOGOUT_API = async () =>
  API.get(ApiEndpoints.USER_LOGOUT).catch((err) => {
    return err;
  });

export const GET_DATA_SOURCE_FIELD_API = async () =>
  HTTP.get(ApiEndpoints.DATA_SOURCE_FIELD).catch((err) => {
    return err;
  });

// ?USER API's
// export const USER_LIST_API = async () =>
//   HTTP.get(
//     ApiEndpoints.USERS_LIST,
//   ).catch((err) => {
//     return err;
//   });

// export const SPECIFIC_USER_LIST_API = async () =>
//   HTTP.get(
//     ApiEndpoints.SPECIFIC_USER_LIST,
//   ).catch((err) => {
//     return err;
//   });

// export const UPDATE_SPECIFIC_USER_LIST_API = async ({ formData }) =>
//   HTTP.put(
//     ApiEndpoints.UPDATE_SPECIFIC_USER_LIST,
//     formData
//   ).catch((err) => {
//     return err;
//   });

// export const CREATE_USER_API = async ({ formData }) =>
//   HTTP.post(
//     ApiEndpoints.CREATE_USER,
//     formData
//   ).catch((err) => {
//     return err;
//   });

// export const SPECIFIC_USER_DETAILS_API = async (ID) =>
//   HTTP.get(
//     `${ApiEndpoints.SPECIFIC_USER_DETAILS}/${ID}`
//   ).catch((err) => {
//     return err;
//   });

// ?ROLE API's
// export const ROLE_LIST_API = async () =>
//   HTTP.get(
//     ApiEndpoints.ROLES_LIST,
//   ).catch((err) => {
//     return err;
//   });

// export const UPDATE_SPECIFIC_ROLE_LIST_API = async ({formData}) =>
//   HTTP.put(
//     ApiEndpoints.UPDATE_SPECIFIC_ROLE_LIST,
//     formData
//   ).catch((err) => {
//     return err;
//   });

// export const CREATE_ROLE_API = async ({ formData }) =>
//   HTTP.post(
//     ApiEndpoints.CREATE_ROLE,
//     formData
//   ).catch((err) => {
//     return err;
//   });

// export const SPECIFIC_ROLE_DETAILS_API = async (ID) =>
//   HTTP.get(
//     `${ApiEndpoints.SPECIFIC_ROLE_DETAILS}/${ID}`
//   ).catch((err) => {
//     return err;
//   });

// export const DELETE_SPECIFIC_ROLE_DETAILS_API = async (ID) =>
//   HTTP.delete(
//     `${ApiEndpoints.DELETE_ROLE_LIST}/${ID}`
//   ).catch((err) => {
//     return err;
//   });

// export const USER_AUTHORITY_API = async () =>
//   HTTP.get(
//     `${ApiEndpoints.USER_AUTHORITY}`
//   ).catch((err) => {
//     return err;
//   });

//? GROUP USER API
// export const GROUP_LIST_API = async () =>
//   HTTP.get(
//     ApiEndpoints.GROUPS_LIST,
//   ).catch((err) => {
//     return err;
//   });

// export const UPDATE_SPECIFIC_GROUP_LIST_API = async ({formData}) =>
//   HTTP.put(
//     ApiEndpoints.UPDATE_SPECIFIC_GROUP_LIST,
//     formData
//   ).catch((err) => {
//     return err;
//   });

// export const CREATE_GROUP_API = async ({ formData }) =>
//   HTTP.post(
//     ApiEndpoints.CREATE_GROUP,
//     formData
//   ).catch((err) => {
//     return err;
//   });

// export const SPECIFIC_GROUP_DETAILS_API = async (ID) =>
//   HTTP.get(
//     `${ApiEndpoints.SPECIFIC_GROUP_DETAILS}/${ID}`
//   ).catch((err) => {
//     return err;
//   });

// export const DELETE_SPECIFIC_GROUP_API = async (ID) =>
//   HTTP.get(
//     `${ApiEndpoints.DELETE_SPECIFIC_GROUP_DETAILS}/${ID}`
//   ).catch((err) => {
//     return err;
//   });

// ?RECONCILIATION-SERVICE

export const REPORTING_TENDERS_API = async () =>
  HTTP.get(`${ApiEndpoints.REPORTING_TENDERS}`).catch((err) => {
    return err;
  });

export const GET_PROFILE_API = async () =>
  HTTP.get(`${ApiEndpoints.PROFILE}`).catch((err) => {
    return err;
  });

export const POST_PROFILE_API = async ({ payload }) =>
  HTTP.put(`${ApiEndpoints.PROFILE}`, payload).catch((err) => {
    return err;
  });

export const REPORT_FIELD_API = async (queryString) => {
  const req = HTTP.get(`${ApiEndpoints.REPORT_FIELD}${queryString}`).catch(
    (err) => {
      return err;
    }
  );
  // notifier.async(
  //   req,
  //   successApiMsg.report_fields,
  //   failedApiMsg.common,
  //   "Getting Report Fields..."
  // );
  return req;
};

export const DASHBOARD_DATA_API = async ({ payload, isDownload = false }) => {
  const req = HTTP.post(
    isDownload
      ? `${ApiEndpoints.DASHBOARD_DATA}/download`
      : `${ApiEndpoints.DASHBOARD_DATA}`,
    payload
  )

  // !isDownload ? notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success(successApiMsg.dashboard_data,)
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Dashboard Data..."
  // ) :
  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("Download Successfully")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Downloading"
  // )
  
  console.log("asdfasdfasdfasfasdf", req);
  return req;
};

export const RECONCILIATION_LAST_SYNCED_API = async (queryString = "") =>
  HTTP.post(ApiEndpoints.RECONCILIATION_LAST_SYNCED + queryString)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

export const DOWNLOAD_REPORT_API = async ({ payload }) =>
  HTTP.post(`${ApiEndpoints.DOWNLOAD_REPORT}`, payload).catch((err) => {
    return err;
  });

export const _3PO_DATA_API = async ({ payload, isDownload = false }) => {
  let req = HTTP.post(
    isDownload
      ? `${ApiEndpoints._3PO_DATA_DOWNLOAD}`
      : `${ApiEndpoints._3PO_DATA}`,
    payload
  )

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success(successApiMsg._3po_data)
  //     } else {
        // notifier.alert(failedApiMsg.common)
  //     }
  //     console.log("3po res", res);
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     console.log("3po err", err);
      // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "3po data..."
  // )

  // !isDownload ? notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success(successApiMsg._3po_data)
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     console.log("3po res", res);
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     console.log("3po err", err);
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "3PO Data..."
  // ) :
  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success(successApiMsg._3po_data)
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     console.log("3po res", res);
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     console.log("3po err", err);
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Downloaded data..."
  // )
  

  return req;
};

export const MPR_VS_BANK_DATA_AND_DOWNLOAD = async ({
  payload,
  isDownload,
}) => {
  const req = HTTP.post(
    `${
      isDownload
        ? ApiEndpoints.MPR_VS_BANK_DOWNLOAD
        : ApiEndpoints.MPR_VS_BANK_DATA
    }`,
    payload
  )

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("mpr vs bank update successfully!!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "mpr vs bank data..."
  // )
  return req;
};

export const TRM_VS_MPR_DATA_AND_DOWNLOAD = async ({ payload, isDownload }) => {
  const req = HTTP.post(
    `${
      isDownload
        ? ApiEndpoints.TRM_VS_MPR_DOWNLOAD
        : ApiEndpoints.TRM_VS_MPR_DATA
    }`,
    payload
  )

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("trm vs mpr update successfully!!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "trm vs mpr data..."
  // )

  return req;
};

export const ORDER_VS_TRM_DATA_AND_DOWNLOAD = async ({
  payload,
  isDownload,
}) => {
  const req = HTTP.post(
    `${
      isDownload
        ? ApiEndpoints.ORDER_VS_TRM_DOWNLOAD
        : ApiEndpoints.ORDER_VS_TRM_DATA
    }`,
    payload
  ).catch((err) => {
    return err;
  });


  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("order vs trm update successfully!!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "order vs trm data.."
  // )

  return req;
};

export const RECEIVABLE_VS_RECEIPT_DATA_AND_DOWNLOAD = async ({
  payload,
  isDownload,
}) => {
  const req = HTTP.post(
    `${
      isDownload
        ? ApiEndpoints.RECEIVABLE_VS_RECEIPT_DOWNLOAD
        : ApiEndpoints.RECEIVABLE_VS_RECEIPT_DATA
    }`,
    payload
  )

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("Receivable vs Receipt update successfully!!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Receivable vs Receipt data.."
  // )

  return req;
};

export const POS_VS_DOTPE_DATA_AND_DOWNLOAD = async ({
  payload,
  isDownload,
}) => {
  const req = HTTP.post(
    `${
      isDownload
        ? ApiEndpoints.POS_VS_DOTPE_DATA_DOWNLOAD
        : ApiEndpoints.POS_VS_DOTPE_DATA
    }`,
    payload,
    { responseType: isDownload ? "blob" : "json" }
  )

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("Pos vs DotPe update successfully!!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Pos vs DotPe data.."
  // )

  return req;
};

export const POS_VS_3PO_DATA_AND_DOWNLOAD = async ({ payload, isDownload }) => {
  const req = HTTP.post(
    `${
      isDownload
        ? ApiEndpoints.POS_VS_3PO_DATA_DOWNLOAD
        : ApiEndpoints.POS_VS_3PO_DATA
    }`,
    payload,
    { responseType: isDownload ? "blob" : "json" }
  )

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("Pos vs 3PO update successfully!!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Pos vs 3PO data.."
  // )

  return req;
};

export const _3PO_VS_DOTPE_DATA_AND_DOWNLOAD = async ({
  payload,
  isDownload,
}) => {
  const req = HTTP.post(
    `${
      isDownload
        ? ApiEndpoints._3PO_VS_DOTPE_DATA_DOWNLOAD
        : ApiEndpoints._3PO_VS_DOTPE_DATA
    }`,
    payload,
    { responseType: isDownload ? "blob" : "json" }
  )

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("3PO vs DotPe update successfully!!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "3PO vs DotPe data.."
  // )

  return req;
};

export const UPLOAD_DATA_SOURCE_FIELD = async ({ queryString, payload }) => {
  const req = HTTP.post(ApiEndpoints.UPLOAD_SOURCE_FIELD+'?'+queryString, payload)

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("Data Uploaded Successfully!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Uploading..."
  // )  

  return req;
}

//! Download Data

export const RECONCILED_DOWNLOAD = async ({ payload }) =>
  HTTP.post(`${ApiEndpoints.RECONCILED}`, payload).catch((err) => {
    return err;
  });

export const UNRECONCILED_DOWNLOAD = async ({ payload }) =>
  HTTP.post(`${ApiEndpoints.UNRECONCILED}`, payload).catch((err) => {
    return err;
  });

export const SALE_DOWNLOAD = async ({ payload }) =>
  HTTP.post(`${ApiEndpoints.SALE}`, payload).catch((err) => {
    return err;
  });

export const ALL_DOWNLOAD = async ({ payload }) => {
  let req = HTTP.post(`${ApiEndpoints.DOWNLOAD_ASYNC_DASHBOARD_REPORT}`, payload, {responseType: "blob"}).catch((err) => {
    return err;
  })
  req.then((res) => {
    if (res.status === 200) {
      alert('Request Submitted Successfully, visit to Report Section to Download the Report');
    }
  })

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       // notifier.success("Download successfully!!")
  //       // notifier.success("Report Generation Submitted")
  //       notifier.success(" Request Submitted Successfully\nVisit to Report Section to Download the Report")

  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Downloading went wrong")
  //     return err
  //   }, // for reject
  //   "Downloading"
  // )

  return req;
}

export const _3PO_DATA_DOWNLOAD = async ({ payload }) => {
  let req = HTTP.post(`${ApiEndpoints._3PO_DATA_DOWNLOAD}`, payload, {
    responseType: "blob",
  }).catch((err) => {
    return err;
  })
  req.then((res) => {
    if (res.status === 200) {
      alert('Request Submitted Successfully, visit to Report Section to Download the Report');
    }
  })
  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     console.log("isdownload", res);
  //     if(status == 200){
  //       // notifier.success("Download successfully!!")
  //       // notifier.success("Report Generation Submitted")
  //       notifier.success(" Request Submitted Successfully\nVisit to Report Section to Download the Report")

  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Downloading went wrong")
  //     return err
  //   }, // for reject
  //   "Downloading"
  // )

  return req;
}

export const GET_ALL_ASYNC_GENERATE_REPORT = async ({ payload }) => {
  let req = HTTP.post(`${ApiEndpoints.GET_ASYNC_GENERATE_REPORT_DATA}`, payload).catch((err) => {
    return err;
  })

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     // console.log("isdownload", res);
  //     if(status == 200){
  //       // notifier.success("Get Data successfully!!")
  //       // notifier.success("Report Generation Submitted!!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Downloading went wrong")
  //     return err
  //   }, // for reject
  //   // "Downloading"
  // )

  return req;
}
export const ASYNC_GENERATE_REPORT_DOWNLOAD = async ({ params = "" }) => {
  let req = HTTP.get(`${ApiEndpoints.DOWNLOAD_ASYNC_GENERATE_REPORT_DATA}?id=${params}`, {
    responseType: "blob",
  }).catch((err) => {
    return err;
  })

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     // console.log("isdownload", res);
  //     if(status == 200){
  //       notifier.success("Download successfully!!")
  //       // notifier.success("Report Generation Submitted!!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Downloading went wrong")
  //     return err
  //   }, // for reject
  //   "Downloading"
  // )

  return req;
}

//? VOUCHER'S API CALLS
export const GET_VOUCHER_TYPE_API = async () =>
  HTTP.get(`${ApiEndpoints.GET_VOUCHER_TYPE}`).catch((err) => {
    return err;
  });

export const APPROVE_VOUCHER_API = async ({ payload = {} }) =>
  HTTP.post(`${ApiEndpoints.APPROVE_VOUCHER}`, payload).catch((err) => {
    return err;
  });

export const DOWNLOAD_VOUCHER_API = async ({params = ""}) =>
  HTTP.get(`${ApiEndpoints.DOWNLOAD_VOUCHER}?voucherId=${params}`, {
    responseType: "blob",
  }).catch((err) => {
    return err;
  });

export const EDIT_VOUCHER = async ({params = "", payload}) =>
  HTTP.post(`${ApiEndpoints.EDIT_VOUCHER}?voucherId=${params}`, payload).then(res => {
    // notifier.success("Upload file successfully!!")
    return res
  }).catch((err) => {
    return err;
  });

export const GET_ALL_VOUCHER_API = async ({ payload = {} }) => {

  const req = HTTP.post(`${ApiEndpoints.GET_ALL_VOUCHER}`, payload).catch((err) => {
    return err;
  });

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("Data fetched successfully!!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Fetching Data..."
  // )  

  return req;
}

export const GET_ALL_CREATED_VOUCHER_API = async ({ payload = {} }) => {
  const req = HTTP.post(
    `${ApiEndpoints.GET_ALL_CREATED_VOUCHER}`,
    payload
  )

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("Voucher entries fetched successfully!!")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Fetching voucher entries..."
  // )  

  return req;
};

export const SEND_VOUCHER_FOR_APPROVAL_API = async ({ payload = {} }) =>
  HTTP.post(`${ApiEndpoints.SEND_VOUCHER_FOR_APPROVAL}`, payload).catch(
    (err) => {
      return err;
    }
  );

export const UPDATE_VOUCHER_API = async ({ payload = {} }) =>
  HTTP.post(`${ApiEndpoints.UPDATE_VOUCHER}`, payload).catch((err) => {
    return err;
  });

//? VOUCHER'S API CALLS

export const CREATE_VOUCHER_API = async ({ payload = {} }) => {
  const req = HTTP.post(`${ApiEndpoints.CREATE_VOUCHER}`, payload).catch((err) => {
    return err;
  })

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("Create Voucher Successfully")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Creating..."
  // )  

  return req;
}

export const DASHBOARD_VOUCHER_API = async ({ payload = {} }) => {
  const req = HTTP.post(`${ApiEndpoints.DASHBOARD_VOUCHER}`, payload).catch(
    (err) => {
      return err;
    }
  );

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null} = res;
  //     if(status == 200){
  //       notifier.success("Fetched Voucher Table Successfully")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Voucher Table Data..."
  // )  

  return req;
};

// ? STORE API'S
// export const GET_STORE_DATA_API = async ({ state = "" }) =>
//   HTTP.get(`${ApiEndpoints.GET_STORE_LIST_DATA}?state=${state}`).catch(
//     (err) => {
//       return err;
//     }
//   );

export const GET_STORE_DATA_API = async ({ state = [], date = {} }) =>
  HTTP.post(`${ApiEndpoints.GET_STORE_LIST_DATA}`,  {
    cities: state,
    startDate: date.startDate,
    endDate: date.endDate
  }).catch(
    (err) => {
      return err;
    }
  );

export const STORE_UPLOAD_API = async ({ payload = {}, param = "" }) => {
  let req = HTTP.post(`${ApiEndpoints.GET_STORE_UPLOAD}${param}`,  payload).catch(
    (err) => {
      return err;
    }
  );

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null, data = {}} = res;
  //     if(status == 200){
  //       notifier.success( data?.data || "Mapped data successfully...")
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res
  //   }, // for resolve
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err
  //   }, // for reject
  //   "Uploading Store..."
  // )  

  return req;
}

export const UPLOAD_CONFIG_DATA_API = async ({ payload = {}, params = {}}) => {
  const queryParams = new URLSearchParams(params);

  const urlWithParams = `${ApiEndpoints.UPLOAD_CONFIG_DATA}?${queryParams}`;

  let req = HTTP.post(urlWithParams, payload).catch((err) => {
    return err;
  });

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null, data = {} } = res;
  //     if (status === 200) {
  //       notifier.success(data?.data || "Uploading data successfully...");
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res;
  //   },
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err;
  //   },
  //   "Uploading Store..."
  // );

  return req;
};

export const DOWNLOAD_STORE_TEMPLATE_API = async ({ payload = {}}) => {
  // const queryParams = new URLSearchParams(params);

  const urlWithParams = `${ApiEndpoints.DOWNLOAD_STORE_TEMPLATE_DATA}`;

  let req = HTTP.post(urlWithParams, payload, {responseType: "blob"}).catch((err) => {
    return err;
  });

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null, data = {} } = res;
  //     if (status === 200) {
  //       notifier.success(data?.data || "Download Template successfully...");
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res;
  //   },
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err;
  //   },
  //   "Downloading Template..."
  // );

  return req;
};

export const DOWNLOAD_TEMPLATE_DATA_API = async ({ params = {}}) => {
  const queryParams = new URLSearchParams(params);

  const urlWithParams = `${ApiEndpoints.DOWNLOAD_TEMPLATE_DATA}?${queryParams}`;

  let req = HTTP.get(urlWithParams, {responseType: "blob"}).catch((err) => {
    return err;
  });

  // notifier.async(
  //   req,
  //   (res) => {
  //     const { status = null, data = {} } = res;
  //     if (status === 200) {
  //       notifier.success(data?.data || "Download Template successfully...");
  //     } else {
  //       // notifier.alert(failedApiMsg.common)
  //     }
  //     return res;
  //   },
  //   (err) => {
  //     // notifier.alert("Something went wrong")
  //     return err;
  //   },
  //   "Downloading Template..."
  // );

  return req;
};


export const GET_STATE_DATA_API = async () =>
  HTTP.get(`${ApiEndpoints.GET_STATE_LIST_DATA}`).catch((err) => {
    return err;
  });

export const GET_UPLOAD_CONFIG_MAPPING = async () =>
  HTTP.get(`${ApiEndpoints.GET_UPLOAD_CONFIG_MAPPING}`).catch((err) => {
    return err;
  });

export const GET_MISSING_STORE_MAPPING = async () =>
  HTTP.get(`${ApiEndpoints.MISSING_STORE_MAPPING}`).catch((err) => {
    return err;
  });

export const GET_DOWNLOAD_MISSING_STORE_MAPPING = async ({params = ""}) =>
  HTTP.get(`${ApiEndpoints.DOWNLOAD_MISSING_STORE_MAPPING}/threepo?threepo=${params}`, {responseType: "blob"}).catch((err) => {
    return err;
  });

export const DOWNLOAD_TID_MISSING_STORE_MAPPING = async ({payload = {}}) =>
  HTTP.post(`${ApiEndpoints.DOWNLOAD_TID_MISSING_STORE_MAPPING}`, payload, {responseType: "blob"}).catch((err) => {
    return err;
  });

  //UPLOAD_CONFIG_DATA

// MPR_VS_BANK_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/mpr/vs/bank`,
// MPR_VS_BANK_DOWNLOAD: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/mpr/vs/bank/download`,
// ORDER_VS_TRM_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/order/vs/trm`,
// ORDER_VS_TRM_DOWNLOAD: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/order/vs/trm/download`,
// TRM_VS_MPR_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/trm/vs/mpr`,
// TRM_VS_MPR_DOWNLOAD: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/trm/vs/mpr/download`
