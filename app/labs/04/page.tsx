import type { Metadata } from "next";
import { siteConfig } from "@/data/content";
import Lab04Demo from "@/components/labs/Lab04Demo";

export const metadata: Metadata = {
  title: "Notification Toast",
  description: "Spring-animated notification toast with live DialKit controls",
  openGraph: {
    title: `Notification Toast | ${siteConfig.name}`,
    description: "Spring-animated notification toast with live DialKit controls",
    url: `${siteConfig.url}/labs/04`,
  },
};

export default function Lab04Page() {
  return (
    <main id="main-content" className="fixed inset-0 w-full h-screen">
      <Lab04Demo />
    </main>
  );
}
