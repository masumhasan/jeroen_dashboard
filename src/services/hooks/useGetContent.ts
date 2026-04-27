import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetAboutUsQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsAndConditionsQuery,
  useUpdateAboutUsMutation,
  useUpdatePrivacyPolicyMutation,
  useUpdateTermsAndConditionsMutation,
} from "../api/appcontentApi";

export type ContentPageType = "about" | "privacy" | "terms";

export function useGetContentPage(type: ContentPageType) {
  const aboutQuery = useGetAboutUsQuery(undefined, { skip: type !== "about" });
  const privacyQuery = useGetPrivacyPolicyQuery(undefined, {
    skip: type !== "privacy",
  });
  const termsQuery = useGetTermsAndConditionsQuery(undefined, {
    skip: type !== "terms",
  });

  const [updateAboutUs, aboutUpdateState] = useUpdateAboutUsMutation();
  const [updatePrivacyPolicy, privacyUpdateState] =
    useUpdatePrivacyPolicyMutation();
  const [updateTermsAndConditions, termsUpdateState] =
    useUpdateTermsAndConditionsMutation();

  const selectedQuery = useMemo(() => {
    if (type === "about") return aboutQuery;
    if (type === "privacy") return privacyQuery;
    return termsQuery;
  }, [type, aboutQuery, privacyQuery, termsQuery]);

  const [content, setContent] = useState("");

  useEffect(() => {
    const apiContent = selectedQuery.data?.data?.content ?? "";
    setContent(apiContent);
  }, [selectedQuery.data?.data?.content]);

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("Content cannot be empty.");
      return;
    }

    try {
      if (type === "about") {
        await updateAboutUs({ content }).unwrap();
      } else if (type === "privacy") {
        await updatePrivacyPolicy({ content }).unwrap();
      } else {
        await updateTermsAndConditions({ content }).unwrap();
      }
      toast.success("Content saved successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save content.");
    }
  };

  const isSaving =
    aboutUpdateState.isLoading ||
    privacyUpdateState.isLoading ||
    termsUpdateState.isLoading;

  return {
    isLoading: selectedQuery.isLoading,
    isSaving,
    content,
    setContent,
    handleSave,
  };
}
