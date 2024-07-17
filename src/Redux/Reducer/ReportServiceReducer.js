const StorageArea = {
    ReportStore: {
      reportGenerateTable: [],
    },
    name: "ReportService",
  };
  
  export const ReportService = (state = StorageArea, action) => {
    
    switch (action.type) {
      case "UDPATE_REPORT_GENERATE_TABLE_DATA":
        return {
          ...state,
          ...{
            ReportStore: {
              ...state.ReportStore,
              reportGenerateTable: action.payload.value.length > 0 ? [action.payload.value] : []
            },
          },
        };
        break;

      default:
        return {...state};
        break;
    }
  };