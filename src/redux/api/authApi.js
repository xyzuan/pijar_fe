import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const authApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["pijarAuthTag"] })
  .injectEndpoints({
    endpoints(builder) {
      return {
        signin: builder.mutation({
          query: ({ data }) => ({
            url: `/login`,
            method: "POST",
            body: {
              email: data.email,
              password: data.password,
            },
          }),
        }),
        logout: builder.mutation({
          query: () => ({
            url: "/signout",
            method: "POST",
            headers: getUserAuthHeaderApi(),
          }),
        }),
        signup: builder.mutation({
          query: ({ data }) => ({
            url: `/signup`,
            method: "POST",
            body: {
              name: data.name,
              email: data.email,
              password: data.password,
            },
          }),
        }),
      };
    },
  });

export const { useSigninMutation, useSignupMutation, useLogoutMutation } =
  authApi;
