import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Engage Stonehenge Trust. A scoping call takes thirty minutes. If we are the right firm for the work, we will say so.",
};

export default function Page() {
  return <ContactPage />;
}
