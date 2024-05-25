import { holdingsUrls } from "../config";
import axiosClient from "../client";

import type { AxiosResponse } from "axios";

const getSearchFnoInstruments = async (): Promise<AxiosResponse> => {
  return axiosClient.request({
    method: "get",
    url: `${holdingsUrls.getFilterData}`,
  });
};

export { getSearchFnoInstruments };
