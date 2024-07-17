// export const setAccessTokenInSession = (data) => {
//   sessionStorage.ACCESS_TOKEN = JSON.stringify(data);
// };


// export const logoutUserCredentials = () => {
//   setAccessTokenInSession({});
//   window.location.href =  '/';
// }
// export const logInUserCredentials = val => {
//   setAccessTokenInSession(val)
//   //Redirect to main dashboard page
//   window.location.href =  'dashboard';
// }
// // export const setQuestionParamsSession = (question) => {
// //   sessionStorage.question = JSON.stringify(question);
// // }

// // export const setActivePafeParamsSession = (page) => {
// //   sessionStorage.activePage = JSON.stringify(page);
// // }

// export const getAccessToken = () => {
//   if (sessionStorage?.ACCESS_TOKEN !== undefined && (sessionStorage.ACCESS_TOKEN !== '')) {
//     let data = JSON.parse(sessionStorage.ACCESS_TOKEN);
//     if (data?.access_token !== undefined) {
//       return data;
//     } else {
//       return "";
//     }
//   } else {
//     return "";
//   }
// };

// // export const getQuestionParamsSession = () => {
// //   console.log("FATHER", sessionStorage.question);
// //   if ((sessionStorage?.question !== 'undefined') && (sessionStorage?.question !== undefined) && (sessionStorage.question !== '')) {
// //     let data = JSON.parse(sessionStorage.question);
// //     if (data.length > 0) {
// //       return JSON.parse(sessionStorage.question);
// //     } else {
// //       return "";
// //     }
// //   } else {
// //     return "";
// //   }
//   // JSON.parse(sessionStorage.userInfo);
// // };

// // export const CURRENT_ACTIVE_PAGE = () => {
// //   console.log("FATHER", sessionStorage.activePage);
// //   if ((sessionStorage?.activePage !== 'undefined') && (sessionStorage?.activePage !== undefined) && (sessionStorage.activePage !== '')) {
// //     let data = JSON.parse(sessionStorage.activePage);
// //     if (data.length > 0) {
// //       return JSON.parse(sessionStorage.activePage);
// //     } else {
// //       return "questions";
// //     }
// //   } else {
// //     return "questions";
// //   }
//   // JSON.parse(sessionStorage.userInfo);
// // };

// //   const setTrackerOfKeyInSession = (bol) => {
// //     sessionStorage.isTrackerStatusOpen = JSON.stringify(bol);
// //   };

// //   const getAskLocationLaterFromSession = () => {
// //     return sessionStorage.askLocationLater
// //       ? Utility.tryJsonParse(sessionStorage.askLocationLater)
// //       : false;
// //   };

// //   const setHideLocationPopupOnceInSession = () => {
// //     sessionStorage.hideLocationPopupOnce = JSON.stringify(true);
// //   };

// //   const getHideLocationPopupOnceFromSession = () => {
// //     return sessionStorage.hideLocationPopupOnce
// //       ? Utility.tryJsonParse(sessionStorage.hideLocationPopupOnce)
// //       : false;
// //   };
