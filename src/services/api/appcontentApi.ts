import { baseApi } from "./baseApi";

export type AppContentType =
  | "about-us"
  | "terms-and-conditions"
  | "privacy-policy";

export interface AppContent {
  _id: string;
  type: AppContentType;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppContentResponse {
  success: boolean;
  message: string;
  data: AppContent;
}

export const appContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query<AppContentResponse, void>({
      query: () => "/app-content/about-us",
      providesTags: ["AboutUs"],
    }),
    updateAboutUs: builder.mutation<AppContentResponse, { content: string }>({
      query: (body) => ({
        url: "/app-content/about-us",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AboutUs"],
    }),

    getTermsAndConditions: builder.query<AppContentResponse, void>({
      query: () => "/app-content/terms-and-conditions",
      providesTags: ["TermsAndConditions"],
    }),
    updateTermsAndConditions: builder.mutation<
      AppContentResponse,
      { content: string }
    >({
      query: (body) => ({
        url: "/app-content/terms-and-conditions",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TermsAndConditions"],
    }),

    getPrivacyPolicy: builder.query<AppContentResponse, void>({
      query: () => "/app-content/privacy-policy",
      providesTags: ["PrivacyPolicy"],
    }),
    updatePrivacyPolicy: builder.mutation<
      AppContentResponse,
      { content: string }
    >({
      query: (body) => ({
        url: "/app-content/privacy-policy",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} = appContentApi;
