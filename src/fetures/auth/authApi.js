import { apiSlice } from "../api/apiSlice";
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("accessToken", result?.data?.data?.token);
          // eslint-disable-next-line no-empty
        } catch (error) {}
      },
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation } = authApi;
