import ContentPageLayout from "@/components/shared/ContentPageLayout";
import { useGetContentPage } from "@/services/hooks/useGetContent";

export default function PrivacyPolicyPage() {
  const { isLoading, isSaving, content, setContent, handleSave } =
    useGetContentPage("privacy");

  return (
    <ContentPageLayout
      title="Privacy Policy"
      isLoading={isLoading}
      isSaving={isSaving}
      content={content}
      onContentChange={setContent}
      onSave={handleSave}
    />
  );
}
