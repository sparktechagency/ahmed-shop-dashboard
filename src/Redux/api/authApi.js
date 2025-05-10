import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["user"],
    }),

    // Forget password
    ForgetPassword: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("accessToken");
        console.log("Forget Pass Mail Token", token);
        return {
          url: "/auth/forgot-password-otp",
          method: "POST",
          body: data,
          headers: {
            "content-type": "application/json",
          },
        };
      },
      invalidatesTags: ["user"],
    }),

    // Verify Otp
    VerifyOtp: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("otpToken");
        console.log("vetifyOtpToken", token);
        return {
          url: "/auth/forgot-password-otp-match",
          method: "PATCH",
          body: data,
          headers: {
            "content-type": "application/json",
            token: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),

    // Resend Otp
    ResendOtp: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("otpToken");
        console.log("Resend OTP Token", token);
        return {
          url: "/otp/resend-otp",
          method: "PATCH",
          body: data,
          headers: {
            "content-type": "application/json",
            token: token,
          },
        };
      },
    }),

    // Reset Password
    ResetPassword: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("verifiedOtpToken");
        console.log({ token });
        return {
          url: "/auth/forgot-password-reset",
          method: "PATCH",
          body: data,
          headers: {
            // "content-type": "application/json",
            token: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSignInMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
} = authApi;
