import { useState } from "react";
import toast from "react-hot-toast";

export type ContentPageType = "about" | "privacy" | "terms";

const DUMMY_CONTENT: Record<ContentPageType, string> = {
  about: `Welcome to RobbyWork! We are a dedicated team committed to building powerful tools that help businesses and individuals manage their data effectively.

Our mission is to provide intuitive, reliable, and secure solutions that empower users to take full control of their information. Founded in 2020, we have grown to serve thousands of customers worldwide.

We believe in transparency, innovation, and putting our users first. Our platform is continuously evolving to meet the needs of a rapidly changing digital landscape.

If you have any questions or feedback, feel free to reach out to our support team at support@robbywork.com.`,

  privacy: `Privacy Policy — Last updated: January 1, 2025

At RobbyWork, we take your privacy seriously. This policy outlines how we collect, use, and t your personal information.

1. Information We Collect
We collect information you provide directly to us, such as your name, email address, and usage data when you interact with our platform.

2. How We Use Your Information
We use the information we collect to provide, maintain, and improve our services, communicate with you, and ensure platform security.

3. Data Sharing
We do not sell or share your personal data with third parties except as necessary to provide our services or as required by law.

4. Data Security
We implement industry-standard security measures to t your information from unauthorized access or disclosure.

5. Contact Us
If you have questions about this policy, contact us at privacy@robbywork.com.`,

  terms: `Terms and Conditions — Last updated: January 1, 2025

By accessing or using RobbyWork, you agree to be bound by these Terms and Conditions.

1. Acceptance of Terms
By using our platform, you confirm that you are at least 18 years of age and agree to comply with these terms.

2. Use of Service
You agree to use RobbyWork only for lawful purposes and in a manner that does not infringe the rights of others.

3. Account Responsibility
You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

4. Intellectual Property
All content, trademarks, and data on this platform are the property of RobbyWork and may not be reproduced without permission.

5. Termination
We reserve the right to suspend or terminate your access to the platform at our discretion if you violate these terms.

6. Contact
For questions regarding these terms, contact us at legal@robbywork.com.`,
};

export function useGetContentPage(type: ContentPageType) {
  const [content, setContent] = useState(DUMMY_CONTENT[type]);

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("Content cannot be empty.");
      return;
    }
    toast.success("Content saved successfully.");
  };

  return {
    isLoading: false,
    isSaving: false,
    content,
    setContent,
    handleSave,
  };
}
