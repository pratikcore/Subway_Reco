export const UPDATE_USERS_LIST = "UPDATE_USERS_LIST";
export const SELECTED_USERS_LIST = "SELECTED_USERS_LIST";
export const UPDATE_LOGIN_ROLE = "UPDATE_LOGIN_ROLE";
export const UPDATE_ROLES_LIST = "UPDATE_ROLES_LIST";
export const SELECTED_ROLE_LIST = "SELECTED_ROLE_LIST";
export const USER_AUTHORITY_LIST = "USER_AUTHORITY_LIST";
export const AUTHORITY_ROLES = "AUTHORITY_ROLES";

export const updateUsersListToStore = (STATE) => ({
  type: UPDATE_USERS_LIST,
  payload: { value: STATE },
});

export const updateSelectedUserListToStore = (STATE) => ({
  type: SELECTED_USERS_LIST,
  payload: { value: STATE },
});

export const updateLoginRoleToStore = (STATE) => ({
  type: UPDATE_LOGIN_ROLE,
  payload: { value: STATE },
});

export const updateRolesListToStore = (STATE) => ({
  type: UPDATE_ROLES_LIST,
  payload: { value: STATE },
});

export const updateSelectedRoleListToStore = (STATE) => ({
  type: SELECTED_ROLE_LIST,
  payload: { value: STATE },
});

export const updateUserAuthorityListToStore = (STATE) => ({
  type: USER_AUTHORITY_LIST,
  payload: { value: STATE },
});

export const updateAuthorityRoleToStore = (STATE) => ({
  type: AUTHORITY_ROLES,
  payload: { value: STATE },
});