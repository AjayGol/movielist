import { holdingsUrls } from "../config";
import axiosClient from "../client";

import type { AxiosResponse } from "axios";

type MovieData = {
  primary_release_year: number;
};

const getSearchFnoInstruments = async (): Promise<AxiosResponse> => {
  return axiosClient.request({
    method: "get",
    url: `${holdingsUrls.getFilterData}`,
  });
};

const getListMovie = async (data: MovieData): Promise<AxiosResponse> => {
  return axiosClient.request({
    method: "get",
    url: `${holdingsUrls.getListMovie}&sort_by=popularity.desc&page=1&vote_count.gte=100&primary_release_year=${data.primary_release_year}`,
  });
};

export { getSearchFnoInstruments, getListMovie };
