export const UPDATE_DASHBOARD_TABLE_LIST = "UPDATE_DASHBOARD_TABLE_LIST";
export const UPDATE_SELECTED_ROW_IN_TABLE = "UPDATE_SELECTED_ROW_IN_TABLE";
export const UPDATE_3PO_TABLE_LIST = "UPDATE_3PO_TABLE_LIST";
export const UPDATE_3PO_ROW_IN_TABLE = "UPDATE_3PO_ROW_IN_TABLE";
export const UPDATE_DASHBOARD_TABLE_DATA = "UPDATE_DASHBOARD_TABLE_DATA";
export const UPDATE_3PO_TABLE_DATA = "UPDATE_3PO_TABLE_DATA";
export const UPDATE_RECO_3PO_TABLE_DATA = "UPDATE_RECO_3PO_TABLE_DATA";
export const UPDATE_USER_CREDENTIALS_DATA = "UPDATE_USER_CREDENTIALS_DATA";
export const UPDATE_DATE_RANGE_SELECT_DATA = "UPDATE_DATE_RANGE_SELECT_DATA";
export const MAPPED_THREEPO_LIST_DATA = "MAPPED_THREEPO_LIST_DATA";
export const RECO_CARD_UPI_DATA = "RECO_CARD_UPI_DATA";

export const updateDashboardTableListToStore = (STATE) => ({
  type: UPDATE_DASHBOARD_TABLE_LIST,
  payload: { value: STATE },
});

export const updateSelectedRowInTableToStore = (STATE) => ({
  type: UPDATE_SELECTED_ROW_IN_TABLE,
  payload: { value: STATE },
});

export const update3poTableListToStore = (STATE) => ({
  type: UPDATE_3PO_TABLE_LIST,
  payload: { value: STATE },
});

export const update3poSelectedRowInTableToStore = (STATE) => ({
  type: UPDATE_3PO_ROW_IN_TABLE,
  payload: { value: STATE },
});

export const updateDashboardTableDataToStore = (STATE) => ({
  type: UPDATE_DASHBOARD_TABLE_DATA,
  payload: { value: STATE },
});

export const update3POTableDataToStore = (STATE) => ({
  type: UPDATE_3PO_TABLE_DATA,
  payload: { value: STATE },
});

export const updateReco3POTableDataToStore = (STATE) => ({
  type: UPDATE_RECO_3PO_TABLE_DATA,
  payload: { value: STATE },
});

export const updateRecoCardUpiDataToStore = (STATE) => ({
  type: RECO_CARD_UPI_DATA,
  payload: { value: STATE },
});

export const updateUserCredentialsDataToStore = (STATE) => ({
  type: UPDATE_USER_CREDENTIALS_DATA,
  payload: { value: STATE },
});

export const updateDateRangeSelectDataToStore = (STATE) => ({
  type: UPDATE_DATE_RANGE_SELECT_DATA,
  payload: { value: STATE },
});

export const updateMappedThreePoList = (STATE) => ({
  type: MAPPED_THREEPO_LIST_DATA,
  payload: { value: STATE },
});
