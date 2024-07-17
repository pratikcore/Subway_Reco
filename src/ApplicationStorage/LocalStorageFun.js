export const setAccessTokenInLocalStorage = (data) => {
    localStorage.ACCESS_TOKEN = JSON.stringify(data);
  };
  
  export const logoutUserCredentialsLocalStorage  = () => {
    setAccessTokenInLocalStorage({});
    window.location.href =  '/';
  }
  export const logInUserCredentialsLocalStorage = val => {
    setAccessTokenInLocalStorage(val)
    //Redirect to main dashboard page
    window.location.href =  '/';
  }

  
  export const getAccessTokenLocalStorage = () => {
    if (localStorage?.ACCESS_TOKEN !== undefined && (localStorage.ACCESS_TOKEN !== '')) {
      let data = JSON.parse(localStorage.ACCESS_TOKEN);
      if (data?.access_token !== undefined) {
        return data;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };