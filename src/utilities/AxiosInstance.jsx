import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3004/api",
  timeout: "5000",
  timeoutErrorMessage: "Something went wrong. Try after sometime.",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem("token");
    if (token) {
      const jsonToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${jsonToken.accessToken}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.data) {
      return Promise.reject(new Error(error.response.data));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
