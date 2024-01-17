import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const meApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["pijarMeTag"] })
  .injectEndpoints({
    endpoints(builder) {
      return {
        getMe: builder.query({
          query: () => ({
            url: `/me`,
            method: "GET",
            headers: getUserAuthHeaderApi(),
          }),
          transformResponse: (data, meta) => {
            if (!meta) return [];
            return { data, meta };
          },
        }),
      };
    },
  });

export const { useGetMeQuery } = meApi;
