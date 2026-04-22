import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.recallproapp.com/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token_recall_pro_dashboard");
      console.log(token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile", "AboutUs", "TermsAndConditions", "PrivacyPolicy"],
  endpoints: () => ({}),
});
