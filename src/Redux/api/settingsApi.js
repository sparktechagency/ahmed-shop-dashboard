import { baseApi } from "../baseApi";

const accessToken = localStorage.getItem("accessToken");
console.log(accessToken);

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => {
        // const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/auth/change-password",
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getSettings: builder.query({
      query: () => ({
        url: "/setting",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    addSettings: builder.mutation({
      query: (data) => ({
        url: "/setting",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        invalidatesTags: ["settings"],
      }),
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/setting",
        method: "PATCH",
        body: data,
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `Bearer ${accessToken}`,
        // },
        invalidatesTags: ["settings"],
      }),
    }),
    getFaq: builder.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    addFaq: builder.mutation({
      query: (data) => ({
        url: "/faq/create-faq",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        invalidatesTags: ["settings"],
      }),
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }) => {
        console.log("API Updating FAQ with ID:", id);
        console.log("API Updated data:", data);

        return {
          url: `/faq/${id}`,
          method: "PATCH",
          body: data,
          invalidatesTags: ["settings"],
        };
      },
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "delete",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `Bearer ${accessToken}`,
        // },
        invalidatesTags: ["settings"],
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useAddSettingsMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useGetFaqQuery,
  useAddFaqMutation,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
} = settingsApi;
