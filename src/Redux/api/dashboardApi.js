import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardOverview: builder.query({
      query: () => ({
        url: "/users/dashboard-overview",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    incomeByYear: builder.query({
      query: (year) => ({
        url: `/payment/all-income-rasio?year=${year}`,
        method: "GET",
      }),
      providesTags: ["income"],
    }),

    incomeByDays: builder.query({
      query: (days) => ({
        url: `/payment/all-income-rasio-by-days?days=${days}`,
        method: "GET",
      }),
      providesTags: ["income"],
    }),

    incomeByHour: builder.query({
      query: (hour) => ({
        url: `/payment/all-income-rasio-by-days?days=${hour}`,
        method: "GET",
      }),
      providesTags: ["income"],
    }),
  }),
});

export const {
  useDashboardOverviewQuery,
  useIncomeByYearQuery,
  useIncomeByDaysQuery,
  useIncomeByHourQuery,
} = dashboardApi;
