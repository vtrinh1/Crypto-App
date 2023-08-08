import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
  "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
};

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: ({ selectedOrderByKey }) =>
        createRequest(`/coins?limit=500&orderBy=${selectedOrderByKey.key}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history/?timePeriod=${timePeriod}`),
    }),
    getGlobalStats: builder.query({
      query: () => createRequest(`/stats`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetExchangesQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetGlobalStatsQuery,
} = cryptoApi;
