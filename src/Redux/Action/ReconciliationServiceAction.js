export const UDPATE_REPORT_TENDER_DATA = "UDPATE_REPORT_TENDER_DATA";
export const UDPATE_REPORT_FIELDS_DATA = "UDPATE_REPORT_FIELDS_DATA";
export const UDPATE_SOURCE_DATA_FOR_UPLOAD_FILES =
  "UDPATE_SOURCE_DATA_FOR_UPLOAD_FILES";
export const UDPATE_STORE_LIST = "UDPATE_STORE_LIST";
export const UDPATE_STATE_LIST = "UDPATE_STATE_LIST";
export const UDPATE_STORE_CODE = "UDPATE_STORE_CODE";
export const UDPATE_LAST_SYNCED_LOGS = "UDPATE_LAST_SYNCED_LOGS";
export const UDPATE_ERROR_STATE_OF_STORE_AND_STATE_LIST = "UDPATE_ERROR_STATE_OF_STORE_AND_STATE_LIST";
export const UPDATE_CURRENT_SELECT_STATE_LIST = "UPDATE_CURRENT_SELECT_STATE_LIST";
export const UPDATE_CURRENT_SELECT_STORE_LIST = "UPDATE_CURRENT_SELECT_STORE_LIST";

export const updateReportTendersAction = (STATE) => ({
  type: UDPATE_REPORT_TENDER_DATA,
  payload: { value: STATE },
});

export const updateLastSyncedLogsAction = (STATE) => ({
  type: UDPATE_LAST_SYNCED_LOGS,
  payload: { value: STATE },
});

export const updateReportFieldAction = (STATE) => ({
  type: UDPATE_REPORT_FIELDS_DATA,
  payload: { value: STATE },
});

export const updateSourceDataForUploadAction = (STATE) => ({
  type: UDPATE_SOURCE_DATA_FOR_UPLOAD_FILES,
  payload: { value: STATE },
});

export const updateStoreListAction = (STATE) => ({
  type: UDPATE_STORE_LIST,
  payload: { value: STATE },
});

export const updateStateListAction = (STATE) => ({
  type: UDPATE_STATE_LIST,
  payload: { value: STATE },
});

export const updateStoreCodeAction = (STATE) => ({
  type: UDPATE_STORE_CODE,
  payload: { value: STATE },
});

export const updateErrorStateOfStateAndStoreAction = (STATE) => ({
  type: UDPATE_ERROR_STATE_OF_STORE_AND_STATE_LIST,
  payload: { value: STATE },
});

export const updateCurrentSelectStateAction = (STATE) => ({
  type: UPDATE_CURRENT_SELECT_STATE_LIST,
  payload: { value: STATE },
});

export const updateCurrentSelectStoreAction = (STATE) => ({
  type: UPDATE_CURRENT_SELECT_STORE_LIST,
  payload: { value: STATE },
});
