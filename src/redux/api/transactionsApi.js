import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const transactionsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["pijarTransactionsTag"] })
  .injectEndpoints({
    endpoints(builder) {
      return {
        getAllTransactions: builder.query({
          query: () => ({
            url: `/transactions`,
            method: "GET",
            headers: getUserAuthHeaderApi(),
          }),
        }),
        getTransactionsById: builder.query({
          query: ({ id }) => ({
            url: `/transactions/${id}`,
            method: "GET",
            headers: getUserAuthHeaderApi(),
          }),
        }),
        addTransactions: builder.mutation({
          query: ({ data }) => ({
            url: `/transactions`,
            method: "POST",
            body: {},
            headers: getUserAuthHeaderApi(),
          }),
        }),
        updateTransactions: builder.mutation({
          query: ({ id, data }) => ({
            url: `/transactions/${id}`,
            method: "PUT",
            body: {},
            headers: getUserAuthHeaderApi(),
          }),
        }),
        deleteTransactions: builder.mutation({
          query: ({ id }) => ({
            url: `/transactions/${id}`,
            method: "DELETE",
            headers: getUserAuthHeaderApi(),
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
