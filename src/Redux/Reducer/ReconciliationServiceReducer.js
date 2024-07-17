const StorageArea = {
  ReconciliationStore: {
    reportTenders: [],
    reportFields: [],
    sourceDataFields: [],
    storeList: [],
    stateList: [],
    currentSelectState: [],
    currentSelectStore: [],
    storeCode: [],
    selectStateAndStoreError: {
      storeError: false,
      stateError: false
    },
    lastSyncedLogs: [],
  },
  name: "ReconciliationService",
};

export const ReconciliationService = (state = StorageArea, action) => {
  switch (action.type) {
    case "UDPATE_REPORT_TENDER_DATA":
      return {
        ...state,
        ...{
          ReconciliationStore: {
            ...state.ReconciliationStore,
            reportTenders: action.payload.value || [],
          },
        },
      };
      break;

    case "UDPATE_LAST_SYNCED_LOGS":
      return {
        ...state,
        ...{
          ReconciliationStore: {
            ...state.ReconciliationStore,
            lastSyncedLogs: action.payload.value || [],
          },
        },
      };
      break;

    case "UDPATE_REPORT_FIELDS_DATA":
      return {
        ...state,
        ...{
          ReconciliationStore: {
            ...state.ReconciliationStore,
            reportFields: action.payload.value || [],
          },
        },
      };
      break;

    case "UDPATE_SOURCE_DATA_FOR_UPLOAD_FILES":
      return {
        ...state,
        ...{
          ReconciliationStore: {
            ...state.ReconciliationStore,
            sourceDataFields: action.payload.value || [],
          },
        },
      };
      break;

    case "UDPATE_STORE_LIST":
      return {
        ...state,
        ...{
          ReconciliationStore: {
            ...state.ReconciliationStore,
            storeList: action.payload.value || [],
          },
        },
      };
      break;

    case "UDPATE_STATE_LIST":
      return {
        ...state,
        ...{
          ReconciliationStore: {
            ...state.ReconciliationStore,
            stateList: action.payload.value || [],
          },
        },
      };
      break;

    case "UDPATE_STORE_CODE":
      return {
        ...state,
        ...{
          ReconciliationStore: {
            ...state.ReconciliationStore,
            storeCode: action.payload.value || [],
          },
        },
      };
      break;

    case "UDPATE_ERROR_STATE_OF_STORE_AND_STATE_LIST":
      return {
        ...state,
        ...{
          ReconciliationStore: {
            ...state.ReconciliationStore,
            selectStateAndStoreError: action.payload.value || {},
          },
        },
      };
      break;

    case "UPDATE_CURRENT_SELECT_STATE_LIST":
      return {
        ...state,
        ...{
          ReconciliationStore: {
            ...state.ReconciliationStore,
            currentSelectState: action.payload.value || [],
          },
        },
      };
      break;

    case "UPDATE_CURRENT_SELECT_STORE_LIST":
      return {
        ...state,
        ...{
          ReconciliationStore: {
            ...state.ReconciliationStore,
            currentSelectStore: action.payload.value || [],
          },
        },
      };
      break;

    default:
      return { ...state };
      break;
  }
};
