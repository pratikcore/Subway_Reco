import axios from "axios";
import {
  getAccessTokenLocalStorage,
  setAccessTokenInLocalStorage,
} from "../../ApplicationStorage/LocalStorageFun";
import { baseURL } from "./apiEndpoints";
// import AWN from "awesome-notifications";

let timeInMinutes = 30;
const axiosConfig = {
  baseURL: baseURL,
  responseType: "json",
  timeout: 1000*60*timeInMinutes,
  headers: {
    langId: 1,
    Authorization: "",
    Accept: "application/json",
  },
};

const HTTP = axios.create(axiosConfig);
// let globalOptions = {
//   icons: {
//     enabled: true,
//     async: "cog",
//   },
//   // options.icons = {
//   //   async: "cog",
//   //   ...
//   // }
//   position: "top-right",
// };

// let notifier = new AWN(globalOptions);

// Interceptor to add access token to requests
const accessTokenInterceptor = (config) => {
  const { access_token = "" } = getAccessTokenLocalStorage() || {};
  if (!config.url?.includes("refresh") && access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
};

// Interceptor to refresh access token if response is 401 (Unauthorized)
const refreshTokenInterceptor = async (error) => {
  console.log(error);
  const { refresh_token = "" } = getAccessTokenLocalStorage() || {};
  const originalRequest = error.config;
  if (error?.response?.status === 401 && !originalRequest?._retry) {
    originalRequest._retry = true;
    const refreshToken = refresh_token; // Replace with your token retrieval logic
    if (refreshToken) {
      try {
        // Call your refresh token API
        const response = await HTTP.post("auth/refresh/token", {
          refresh_token: refreshToken,
        });
        if (response.status === 200) {
          const newAccessToken = response.data.access_token;
          setAccessTokenInLocalStorage({
            ...getAccessTokenLocalStorage(),
            access_token: newAccessToken,
          });
          // localStorage.setItem('access_token', newAccessToken);
          // Update the original request with the new access token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        // Handle error while refreshing token
        console.error("Error refreshing token:", error);
        // window.location.href = "/login"; // Redirect to login page or handle error gracefully
      }
    }
  }
  return Promise.reject(error);
};

// Interceptor to log errors for responses with status code 500
const errorLoggerInterceptor = (error) => {
  console.log("----+", error?.response?.data );
  const { message = "" } = error?.response?.data || {}
  const st = error?.response?.status 
  if ((st !== 200 )|| (st !== 201)) {
    if(st === 403){
      // notifier.alert("You don't have permission to access this resource");
    } else if(st === 406 ) {
      // notifier.alert(message || "Something Went wrong");
    } else if(st === 404 ) {
      // notifier.alert(message || "Data Not Found");
    } else {
      // notifier.alert("Something Went wrong");
    }
      
    // console.error("Something went wrong:", error);
    // Add your custom logging or error handling logic here
  } // 
  return Promise.reject(error);
};

// Function to log loader message
const logLoader = (methodName) => {
  console.log(`Calling ${methodName} - Loader activated`);
};

// Request interceptor to log loader message before making a request
HTTP.interceptors.request.use((config) => {
  logLoader(config.method);
  return config;
});

// Add interceptors to the HTTP instance
HTTP.interceptors.request.use(accessTokenInterceptor);
HTTP.interceptors.response.use((response) => {
  console.log("get response", response)
  return response
}, refreshTokenInterceptor);
HTTP.interceptors.response.use((response) => {
  console.log("get error")
  return response
}, errorLoggerInterceptor);

export default HTTP;
