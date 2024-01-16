import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const eventsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["pijarEventsTag"] })
  .injectEndpoints({
    endpoints(builder) {
      return {
        getAllEvents: builder.query({
          query: () => ({
            url: `/events`,
            method: "GET",
          }),
          transformResponse: (data, meta) => {
            if (!meta) return [];
            return { data, meta };
          },
        }),
        getEventsById: builder.query({
          query: ({ id }) => ({
            url: `/events/${id}`,
            method: "GET",
          }),
        }),
        addEvent: builder.mutation({
          headers: getUserAuthHeaderApi(),
          query: ({ data }) => ({
            url: `/events`,
            method: "POST",
            body: {
              name: data.name,
              description: data.description,
              capacity: data.capacity,
              location: data.location,
              location_coords_lat: data.location_coords_lat,
              location_coords_long: data.location_coords_long,
              held_date: data.held_date,
            },
          }),
        }),
        updateEvent: builder.mutation({
          headers: getUserAuthHeaderApi(),
          query: ({ id, data }) => ({
            url: `/events/${id}`,
            method: "PUT",
            body: {
              name: data.name,
              description: data.description,
              capacity: data.capacity,
              location: data.location,
              location_coords_lat: data.location_coords_lat,
              location_coords_long: data.location_coords_long,
              held_date: data.held_date,
            },
          }),
        }),
        deleteEvent: builder.mutation({
          headers: getUserAuthHeaderApi(),
          query: ({ id }) => ({
            url: `/events/${id}`,
            method: "DELETE",
          }),
        }),
      };
    },
  });

export const {
  useGetAllEventsQuery,
  useGetEventsByIdQuery,
  useAddEventMutation,
  useDeleteEventMutation,
} = eventsApi;
