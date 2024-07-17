export const UDPATE_VOUCHER_TYPES_DATA = "UDPATE_VOUCHER_TYPES_DATA";
export const UDPATE_CREATE_VOUCHER_TABLE_DATA = "UDPATE_CREATE_VOUCHER_TABLE_DATA";
export const UDPATE_APPROVED_VOUCHER_TABLE_DATA = "UDPATE_APPROVED_VOUCHER_TABLE_DATA";
export const UDPATE_PENDING_VOUCHER_TABLE_DATA = "UDPATE_PENDING_VOUCHER_TABLE_DATA";
export const UDPATE_REJECTED_VOUCHER_TABLE_DATA = "UDPATE_REJECTED_VOUCHER_TABLE_DATA";
export const UDPATE_GET_ALL_VOUCHER_PAYLOAD_DATA = "UDPATE_GET_ALL_VOUCHER_PAYLOAD_DATA";
export const UDPATE_VOUCHER_DATE_TABLE_DATA = "UDPATE_VOUCHER_DATE_TABLE_DATA";
export const UDPATE_COUNT_VOUCHER_PAYLOAD_DATA = "UDPATE_COUNT_VOUCHER_PAYLOAD_DATA";
export const ADD_MAIN_VOUCHER_DASHBOARD_TABLE_DATA = "ADD_MAIN_VOUCHER_DASHBOARD_TABLE_DATA";

export const updateVoucherTypeDataAction = (STATE) => ({
  type: UDPATE_VOUCHER_TYPES_DATA,
  payload: { value: STATE },
});

export const updateCreateVoucherTableDataAction = (STATE) => ({
  type: UDPATE_CREATE_VOUCHER_TABLE_DATA,
  payload: { value: STATE },
});

export const updateApprovedVoucherTableDataAction = (STATE) => ({
  type: UDPATE_APPROVED_VOUCHER_TABLE_DATA,
  payload: { value: STATE },
});

export const updatePendingVoucherTableDataAction = (STATE) => ({
  type: UDPATE_PENDING_VOUCHER_TABLE_DATA,
  payload: { value: STATE },
});

export const updateRejectedVoucherTableDataAction = (STATE) => ({
  type: UDPATE_REJECTED_VOUCHER_TABLE_DATA,
  payload: { value: STATE },
});

export const updateGetAllVoucherPayloadDataAction = (STATE) => ({
  type: UDPATE_GET_ALL_VOUCHER_PAYLOAD_DATA,
  payload: { value: STATE },
});

export const updateVoucherDatePayloadDataAction = (STATE) => ({
  type: UDPATE_VOUCHER_DATE_TABLE_DATA,
  payload: { value: STATE },
});

export const updateCountsPayloadDataAction = (STATE) => ({
  type: UDPATE_COUNT_VOUCHER_PAYLOAD_DATA,
  payload: { value: STATE },
});

export const updateAddMainVoucherDashboardDataAction = (STATE) => ({
  type: ADD_MAIN_VOUCHER_DASHBOARD_TABLE_DATA,
  payload: { value: STATE },
});