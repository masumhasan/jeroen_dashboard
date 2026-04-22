import ContentPageLayout from "@/components/shared/ContentPageLayout";
import { useGetContentPage } from "@/services/hooks/useGetContent";

export default function AboutUsPage() {
  const { isLoading, isSaving, content, setContent, handleSave } =
    useGetContentPage("about");

  return (
    <ContentPageLayout
      title="About Us"
      isLoading={isLoading}
      isSaving={isSaving}
      content={content}
      onContentChange={setContent}
      onSave={handleSave}
    />
  );
}
