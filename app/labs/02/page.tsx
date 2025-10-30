import type { Metadata } from "next";
import { siteConfig } from "@/data/content";
import Lab02Demo from "@/components/labs/Lab02Demo";

export const metadata: Metadata = {
  title: "Lab 02",
  description: "Experimental project placeholder",
  openGraph: {
    title: `Lab 02 | ${siteConfig.name}`,
    description: "Experimental project",
    url: `${siteConfig.url}/labs/02`,
  },
};

export default function Lab02Page() {
  return (
    <main id="main-content" className="fixed inset-0 w-full h-screen">
      <Lab02Demo />
    </main>
  );
}
