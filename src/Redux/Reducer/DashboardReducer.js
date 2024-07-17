const StorageArea = {
    Dashboard: {
      usersList: [],
      selectedUsers: [],
      LoginUser: {
        role: '',
        roleName: ''
      },
      roleLists: [],
      selectedRoles: [],
      userAuthorityList: [],
      authorityRoles: {}
    },
    name: "Dashboard",
  };
  
  export const Dashboard = (state = StorageArea, action) => {
    
    switch (action.type) {
      case "UPDATE_USERS_LIST":
        return {
          ...state,
          ...{
            Dashboard: {
              ...state.Dashboard,
              usersList: action.payload.value
            },
          },
        };
        break;

      case "SELECTED_USERS_LIST":
        return {...state, ...{
          Dashboard: {
            ...state.Dashboard,
            selectedUsers: action.payload.value || []
          }
        }}
        break;

      case "UPDATE_LOGIN_ROLE":
        return {...state, ...{
          Dashboard: {
            ...state.Dashboard,
            LoginUser: action.payload.value || {}
          }
        }}
        break;

      case "UPDATE_ROLES_LIST":
        return {
          ...state,
          ...{
            Dashboard: {
              ...state.Dashboard,
              roleLists: action.payload.value || []
            },
          },
        };
        break;

      case "SELECTED_ROLE_LIST":
        return {...state, ...{
          Dashboard: {
            ...state.Dashboard,
            selectedRoles: action.payload.value || []
          }
        }}
        break;

      case "USER_AUTHORITY_LIST":
        return {...state, ...{
          Dashboard: {
            ...state.Dashboard,
            userAuthorityList: action.payload.value || []
          }
        }}
        break;

      case "AUTHORITY_ROLES":
        return {...state, ...{
          Dashboard: {
            ...state.Dashboard,
            authorityRoles: action.payload.value || []
          }
        }}
        break;

      default:
        return {...state};
        break;
    }
  };