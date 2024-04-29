import axios, { AxiosResponse, ResponseType } from "axios";

import { useAuthStore } from "../store/auth";
let authToken = useAuthStore.getState().token;
const removeUser = useAuthStore.getState().removeAll;

useAuthStore.subscribe((state) => {
  authToken = state.token;
});


axios.interceptors.request.use(
  function (config) {
    if (!config.headers) {
      config.headers;
    }
    if (authToken) {
      config.headers["Authorization"] = "Bearer " + authToken;
    }

    // config.headers["Content-Type"] = "application/json";
    // config.headers["accept-language"] = 'en';
    // config.headers["Accept"] = "application/json";

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    if (response.headers["content-type"]?.includes("application/json")) {
      response = response.data;
      if (response.status) {
        return response;
      } else {
        return Promise.reject(response);
      }
    } else if (response.status === 200) {
      return response;
    }

    return Promise.reject(response);
  },

  function (error) {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      removeUser();
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const message =
      error.response?.status === 404
        ? "API not found."
        : error?.response?.data?.message || "Something went wrong";
    return Promise.reject(message);
  }
);

export const request = async ({
  url,
  method = "GET",
  params,
  body,
  headers,
  responseType,
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: any;
  body?: any;
  headers?: any;
  responseType?: ResponseType;
}) => {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  // const BASE_URL = import.meta.env.VITE_APP_BASE_URL;


  const res: AxiosResponse = await axios.request({
    url: BASE_URL + url,
    method,
    params,
    data: body,
    headers,
    responseType,
  });

  return res;
};



import { AxiosResponse } from "../types";
import { request } from "../utils/request";
const PrefixEndpoint = "/admin";


export const PackageCountApi = async (id: string) => {
    const response: AxiosResponse<any> = await request({
      url: `${PrefixEndpoint}/users/game-package-count/${id}`,
      method: "GET",
    });
    return response;
  };

  export const UsersPackageDataApi = async (id: string) => {
    const response: AxiosResponse<any> = await request({
      url: `${PrefixEndpoint}/users/game-packages/${id}`,
      method: "GET",
    });
    return response;
  };

  export const UsersGamehistoryApi = async (id: string) => {
    const response: AxiosResponse<any> = await request({
      url: `${PrefixEndpoint}/users/game-history/${id}`,
      method: "GET",
    });
    return response;
  };

  export const UsersSpecialGamehistoryApi = async (id: string) => {
    const response: AxiosResponse<any> = await request({
      url: `${PrefixEndpoint}/users/special-game-history/${id}`,
      method: "GET",
    });
    return response;
  };

      import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme.tsx";
import ScrollToTop from "./hooks/ScrollToTop.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      <ToastContainer
            position="top-right"
            autoClose={5000}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            limit={3}
          />
          
        <BrowserRouter>
          <App />
          <ScrollToTop />
          
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

