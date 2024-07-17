const StorageArea = {
    VoucherStore: {
      MainDashboardVoucherTableData: [],
      voucherTypes: [],
      CreateVoucherTable: [],
      ApprovedVoucherTable: [],
      PendingVoucherTable: [],
      RejectedVoucherTable: [],
      voucherDate: {
        created: [new Date(), new Date()],
        approval: [new Date(), new Date()],
        pending: [new Date(), new Date()],
        rejected: [new Date(), new Date()],
      },
      counts: {
        created: 0,
        approval: 0,
        pending: 0,
        rejected: 0,
      },
      getAllVoucherPayload: {}
    },
    name: "VoucherService",
  };
  
  export const VoucherService = (state = StorageArea, action) => {
    
    switch (action.type) {
      case "UDPATE_VOUCHER_TYPES_DATA":
        return {
          ...state,
          ...{
            VoucherStore: {
              ...state.VoucherStore,
              voucherTypes: action.payload.value || []
            },
          },
        };
        break;

      case "UDPATE_CREATE_VOUCHER_TABLE_DATA":
        return {
          ...state,
          ...{
            VoucherStore: {
              ...state.VoucherStore,
              CreateVoucherTable: action.payload.value || []
            },
          },
        };
        break;

      case "UDPATE_APPROVED_VOUCHER_TABLE_DATA":
        return {
          ...state,
          ...{
            VoucherStore: {
              ...state.VoucherStore,
              ApprovedVoucherTable: action.payload.value || []
            },
          },
        };
        break;

      case "UDPATE_PENDING_VOUCHER_TABLE_DATA":
        return {
          ...state,
          ...{
            VoucherStore: {
              ...state.VoucherStore,
              PendingVoucherTable: action.payload.value || []
            },
          },
        };
        break;

      case "UDPATE_REJECTED_VOUCHER_TABLE_DATA":
        return {
          ...state,
          ...{
            VoucherStore: {
              ...state.VoucherStore,
              RejectedVoucherTable: action.payload.value || []
            },
          },
        };
        break;

      case "UDPATE_VOUCHER_DATE_TABLE_DATA":
        return {
          ...state,
          ...{
            VoucherStore: {
              ...state.VoucherStore,
              voucherDate: action.payload.value
            },
          },
        };
        break;

      case "UDPATE_GET_ALL_VOUCHER_PAYLOAD_DATA":
        return {
          ...state,
          ...{
            VoucherStore: {
              ...state.VoucherStore,
              getAllVoucherPayload: action.payload.value || []
            },
          },
        };
        break;

      case "UDPATE_COUNT_VOUCHER_PAYLOAD_DATA":
        return {
          ...state,
          ...{
            VoucherStore: {
              ...state.VoucherStore,
              counts: action.payload.value || []
            },
          },
        };
        break;

      case "ADD_MAIN_VOUCHER_DASHBOARD_TABLE_DATA":
        return {
          ...state,
          ...{
            VoucherStore: {
              ...state.VoucherStore,
              MainDashboardVoucherTableData: action.payload.value || []
            },
          },
        };
        break;

      default:
        return {...state};
        break;
    }
  };