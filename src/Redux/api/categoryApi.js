import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    AllCategory: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/category",
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "multipart/form-data",
        },
        invalidatesTags: ["category"],
      }),
    }),
    changeCategoryStatus: builder.mutation({
      query: ({ id, data }) => {
        console.log("id", id);
        return {
          url: `/category/isActive/${id}`,
          method: "PATCH",
          body: data,
          invalidatesTags: ["category"],
        };
      },
    }),
  }),
});

export const {
  useAllCategoryQuery,
  useCreateCategoryMutation,
  useChangeCategoryStatusMutation,
} = categoryApi;
