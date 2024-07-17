const StorageArea = {
    Modals: {
      isUserCreateModal: false,
      isUserUpdateModal: false,
      isAlertModal: false,
      isRoleCreateModal: false,
      isRoleUpdateModal: false,
      alertModalData: {
        imgSrc: "", 
        title: '', 
        underTitle: "", 
        bodyMsg: ""
      },
      offCanvasModal: false,
      sendVoucherAprrovalModal: false,
      squareLoader: false,
      isLogoutModal: false,
      isDownloadProgressBar: false
    },
    name: "DashboardModal",
  };
  
  export const DashboardModal = (state = StorageArea, action) => {
    switch (action.type) {
      case "UPDATE_IS_USER_CREATE_MODAL":
        return {
          ...state,
          ...{
            Modals: {
              ...state.Modals,
              isUserCreateModal: action.payload.value
            },
          },
        };

      case "UDPATE_IS_USER_UPDATE_MODAL":
        return {...state, ...{
          Modals: {
            ...state.Modals,
            isUserUpdateModal: action.payload.value
          }
        }}

      case "UDPATE_ALERT_MODAL":
        return {...state, ...{
          Modals: {
            ...state.Modals,
            isAlertModal: action.payload.value
          }
        }}

      case "UDPATE_ALERT_DATA_MODAL":
        return {...state, ...{
          Modals: {
            ...state.Modals,
            alertModalData: {...state.Modals.alertModalData, ...action.payload.value}
          }
        }}

      case "UPDATE_IS_ROLE_CREATE_MODAL":
        return {
          ...state,
          ...{
            Modals: {
              ...state.Modals,
              isRoleCreateModal: action.payload.value
            },
          },
        };

      case "UDPATE_IS_ROLE_UPDATE_MODAL":
        return {...state, ...{
          Modals: {
            ...state.Modals,
            isRoleUpdateModal: action.payload.value
          }
        }}

      case "UDPATE_OFF_CANVAS_MODAL":
        return {...state, ...{
          Modals: {
            ...state.Modals,
            offCanvasModal: action.payload.value
          }
        }}

      case "UDPATE_SEND_VOUCHER_APPROVAL_MODAL":
        return {...state, ...{
          Modals: {
            ...state.Modals,
            sendVoucherAprrovalModal: action.payload.value
          }
        }}

      case "UPDATE_SQUARE_LOADER":
        return {...state, ...{
          Modals: {
            ...state.Modals,
            squareLoader: action.payload.value
          }
        }}

      case "UPDATE_IS_LOGOUT_MODAL":
        return {...state, ...{
          Modals: {
            ...state.Modals,
            isLogoutModal: action.payload.value
          }
        }}

      case "IS_DOWNLOAD_PROGRESSBAR":
        return {...state, ...{
          Modals: {
            ...state.Modals,
            isDownloadProgressBar: action.payload.value
          }
        }}

      default:
        return {...state};
    }
  };