import axiosClient from "axios";
import { baseUrl } from "./config";

import type { InternalAxiosRequestConfig } from "axios";

const getDefaultRequestConfig = (
  config: InternalAxiosRequestConfig<unknown>,
) => {
  return {
    ...config,
    baseURL: baseUrl,
    withCredentials: true,
    timeout: 15000,
  };
};

axiosClient.interceptors.request.use((config) => {
  const defaultConfig = getDefaultRequestConfig(config);
  return {
    ...config,
    ...defaultConfig,
  };
});

export default axiosClient;
