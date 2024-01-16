import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const transactionsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["pijarTransactionsTag"] })
  .injectEndpoints({
    endpoints(builder) {
      return {
        getAllTransactions: builder.query({
          headers: getUserAuthHeaderApi(),
          query: () => ({
            url: `/transactions`,
            method: "GET",
          }),
        }),
        getTransactionsById: builder.query({
          headers: getUserAuthHeaderApi(),
          query: ({ id }) => ({
            url: `/transactions/${id}`,
            method: "GET",
          }),
        }),
        addTransactions: builder.mutation({
          headers: getUserAuthHeaderApi(),
          query: ({ data }) => ({
            url: `/transactions`,
            method: "POST",
            body: {},
          }),
        }),
        updateTransactions: builder.mutation({
          headers: getUserAuthHeaderApi(),
          query: ({ id, data }) => ({
            url: `/transactions/${id}`,
            method: "PUT",
            body: {},
          }),
        }),
        deleteTransactions: builder.mutation({
          headers: getUserAuthHeaderApi(),
          query: ({ id }) => ({
            url: `/transactions/${id}`,
            method: "DELETE",
          }),
        }),
      };
    },
  });

export const {
  useAddTransactionsMutation,
  useDeleteTransactionsMutation,
  useGetAllTransactionsQuery,
  useGetTransactionsByIdQuery,
} = transactionsApi;
