import { Links } from "@/constants";

const baseUrl = Links.MovieList;

const APIKEY = "2dca580c2a14b55200e784d157207b4d";

const holdingsUrls = {
  getFilterData: `${Links.MovieCategory}?api_key=${APIKEY}`,
  getListMovie: `${Links.MovieList}?api_key=${APIKEY}`,
};

export { baseUrl, holdingsUrls };
