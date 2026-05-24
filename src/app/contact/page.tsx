import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Engage Stonehenge Trust for ACD Responsible Distribution verification, ISO management systems, or EPA regulatory work. A scoping call takes thirty minutes — info@stonehengetrust.com.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactPage />;
}
