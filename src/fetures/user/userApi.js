import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/user/getAllUsers",
        method: "GET",
      }),
    }),
    getParticipants: builder.query({
      query: () => ({
        url: "/user/participants",
        method: "GET",
      }),
      providesTags: ["Participants"], 
    }),
  }),
});

export const { useGetAllUserQuery, useGetParticipantsQuery } = userApi;
