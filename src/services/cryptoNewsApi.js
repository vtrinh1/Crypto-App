import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": process.env.REACT_APP_NEWS_API_URL,
  "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
};

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, selectedSortByKey }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Month&count=100&sortBy=${selectedSortByKey}&mkt=en-AU&originalImg=True`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
