export const UPDATE_IS_USER_CREATE_MODAL = "UPDATE_IS_USER_CREATE_MODAL";
export const UDPATE_IS_USER_UPDATE_MODAL = "UDPATE_IS_USER_UPDATE_MODAL";
export const UDPATE_ALERT_MODAL = "UDPATE_ALERT_MODAL";
export const UDPATE_ALERT_DATA_MODAL = "UDPATE_ALERT_DATA_MODAL";
export const UPDATE_IS_ROLE_CREATE_MODAL = "UPDATE_IS_ROLE_CREATE_MODAL";
export const UDPATE_IS_ROLE_UPDATE_MODAL = "UDPATE_IS_ROLE_UPDATE_MODAL";
export const UDPATE_OFF_CANVAS_MODAL = "UDPATE_OFF_CANVAS_MODAL";
export const UDPATE_SEND_VOUCHER_APPROVAL_MODAL = "UDPATE_SEND_VOUCHER_APPROVAL_MODAL";
export const UPDATE_SQUARE_LOADER = "UPDATE_SQUARE_LOADER";
export const UPDATE_IS_LOGOUT_MODAL = "UPDATE_IS_LOGOUT_MODAL";
export const IS_DOWNLOAD_PROGRESSBAR = "IS_DOWNLOAD_PROGRESSBAR";

export const updateIsUserCreateModalToStore = (STATE) => ({
  type: UPDATE_IS_USER_CREATE_MODAL,
  payload: { value: STATE },
});

export const updateIsUserUpdateModalToStore = (STATE) => ({
  type: UDPATE_IS_USER_UPDATE_MODAL,
  payload: { value: STATE },
});

export const updateAlertModalToStore = (STATE) => ({
  type: UDPATE_ALERT_MODAL,
  payload: { value: STATE },
});

export const updateAlertDataModalToStore = (STATE) => ({
  type: UDPATE_ALERT_DATA_MODAL,
  payload: { value: STATE },
});

export const updateIsRoleCreateModalToStore = (STATE) => ({
  type: UPDATE_IS_ROLE_CREATE_MODAL,
  payload: { value: STATE },
});

export const updateIsRoleUpdateModalToStore = (STATE) => ({
  type: UDPATE_IS_ROLE_UPDATE_MODAL,
  payload: { value: STATE },
});

export const updateOffCanvasModalToStore = (STATE) => ({
  type: UDPATE_OFF_CANVAS_MODAL,
  payload: { value: STATE },
});

export const updateSendVoucherApprovalModalModalToStore = (STATE) => ({
  type: UDPATE_SEND_VOUCHER_APPROVAL_MODAL,
  payload: { value: STATE },
});

export const updateSquareLoaderModalToStore = (STATE) => ({
  type: UPDATE_SQUARE_LOADER,
  payload: { value: STATE },
});

export const updateIsLogoutModalToStore = (STATE) => ({
  type: UPDATE_IS_LOGOUT_MODAL,
  payload: { value: STATE },
});

export const updateIsDownloadProgressbarToStore = (STATE) => ({
  type: IS_DOWNLOAD_PROGRESSBAR,
  payload: { value: STATE },
});
