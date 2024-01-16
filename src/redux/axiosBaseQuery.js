import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "./config";

const metaBaseQuery = async (args, api, extraOptions) => {
  const timestamp = Date.now();

  const baseResult = await fetchBaseQuery({ baseUrl: `${BASE_API_URL}` })(
    args,
    api,
    extraOptions
  );

  return {
    ...baseResult,
    meta: baseResult.meta && { ...baseResult.meta, timestamp },
  };
};

export const baseApi = createApi({
  baseQuery: metaBaseQuery,
  endpoints: () => ({}),
});
