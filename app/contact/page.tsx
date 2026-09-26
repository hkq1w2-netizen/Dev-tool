import { generateSeoMetadata } from "@/lib/seo/metadata";
import ContactClient from "@/components/contact/ContactClient";

export const metadata = generateSeoMetadata({
  title: "Contact Support & Feedback",
  description: "Get in touch with DevKitLab engineering and support. Submit bug reports, feature requests, or security inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}

