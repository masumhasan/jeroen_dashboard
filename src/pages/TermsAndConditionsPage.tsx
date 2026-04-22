import ContentPageLayout from "@/components/shared/ContentPageLayout";
import { useGetContentPage } from "@/services/hooks/useGetContent";

export default function TermsAndConditionsPage() {
  const { isLoading, isSaving, content, setContent, handleSave } =
    useGetContentPage("terms");

  return (
    <ContentPageLayout
      title="Terms & Conditions"
      isLoading={isLoading}
      isSaving={isSaving}
      content={content}
      onContentChange={setContent}
      onSave={handleSave}
    />
  );
}
