import { baseApi } from "./baseApi";

// --------------------
// Types
// --------------------
export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  isVerified: boolean;
  authProvider: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profilePicture?: string;
}

export interface LoginResponseData {
  token: string;
  user: AuthUser;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponseData {
  message: string;
  otp: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: ForgotPasswordResponseData;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponseData {
  message: string;
  isValid: boolean;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: VerifyOtpResponseData;
}

export interface ResendOtpRequest {
  email: string;
}

export interface ResendOtpResponseData {
  message: string;
  otp: string;
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
  data: ResendOtpResponseData;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponseData {
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  data: ResetPasswordResponseData;
}

// --------------------
// API Slice
// --------------------
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

// --------------------
// Export Hooks
// --------------------
export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
} = authApi;
