import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders =  {
  'x-rapidapi-key': 'd92bf9d723msh340759db0b21820p152b4cjsn3fc9829b797c',
  'x-rapidapi-host': 'newsapi90.p.rapidapi.com'
};

const baseUrl = `
https://newsapi90.p.rapidapi.com`;
const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/search?query=crypto&language=en-US&region=US`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
