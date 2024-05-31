import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: (reciverId) => ({
        url: `message/getMessage/${reciverId}`,
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation({
      query: ({ receiverId, data }) => ({
        url: `/message/sendMessage/${receiverId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Participants", "Messages"],
    }),
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `/message/deletedMessage/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Participants", "Messages"],
    }),
  }),
});

export const {
  useGetMessageQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
