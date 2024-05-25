import { holdingsUrls } from "../config";
import axiosClient from "../client";

import type { AxiosResponse } from "axios";

const getSearchFnoInstruments = async (): Promise<AxiosResponse> => {
  return axiosClient.request({
    method: "get",
    url: `${holdingsUrls.getFilterData}`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2Y2NDM5MDliYTJmNDIzYWNjNDEyYjJmMDFhMWY3ZiIsInN1YiI6IjY2NTE3MGQ4ZmY0OWFkZTZhYzk2MDdhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K7_iqQd5cSwxbcNSSJkfJbabWLTwRY6iiq0f66uRFag",
    },
  });
};

export { getSearchFnoInstruments };
