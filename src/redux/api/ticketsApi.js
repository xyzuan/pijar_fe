import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const ticketsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["pijarTicketsTag"] })
  .injectEndpoints({
    endpoints(builder) {
      return {
        getAllTickets: builder.query({
          query: () => ({
            url: `/tickets`,
            method: "GET",
            headers: getUserAuthHeaderApi(),
          }),
        }),
        getTicketsById: builder.query({
          query: ({ id }) => ({
            url: `/tickets/${id}`,
            method: "GET",
            headers: getUserAuthHeaderApi(),
          }),
        }),
        addTickets: builder.mutation({
          query: ({ data }) => ({
            url: `/tickets`,
            method: "POST",
            body: {
              event_id: data.event_id,
              holder_name: data.holder_name,
              holder_gender: data.holder_gender,
              holder_email: data.holder_email,
              holder_phone: data.holder_phone,
              purchase_amount: data.purchase_amount,
            },
            headers: getUserAuthHeaderApi(),
          }),
        }),
        updateTickets: builder.mutation({
          query: ({ id, data }) => ({
            url: `/tickets/${id}`,
            method: "PUT",
            body: {
              event_id: data.event_id,
              holder_name: data.holder_name,
              holder_gender: data.holder_gender,
              holder_email: data.holder_email,
              holder_phone: data.holder_phone,
              purchase_amount: data.purchase_amount,
            },
            headers: getUserAuthHeaderApi(),
          }),
        }),
        deleteTickets: builder.mutation({
          query: ({ id }) => ({
            url: `/tickets/${id}`,
            method: "DELETE",
          }),
          headers: getUserAuthHeaderApi(),
        }),
      };
    },
  });

export const {
  useGetAllTicketsQuery,
  useGetTicketsByIdQuery,
  useAddTicketsMutation,
  useDeleteTicketsMutation,
} = ticketsApi;
