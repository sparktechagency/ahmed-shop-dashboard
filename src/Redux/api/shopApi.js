import { baseApi } from "../baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    shops: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/shop/all-admin",
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    verifyShop: builder.mutation({
      query: (shopId) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: `/shop/verify/${shopId}`,
          method: "patch",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { useShopsQuery, useVerifyShopMutation } = shopApi;
