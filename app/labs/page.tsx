import type { Metadata } from "next";
import Labs from "@/components/sections/Labs";
import Footer from "@/components/sections/Footer";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Labs",
  description: "Experimental projects and prototypes by Andrew Tang",
  openGraph: {
    title: `Labs | ${siteConfig.name}`,
    description: "Experimental projects and prototypes",
    url: `${siteConfig.url}/labs`,
  },
};

export default function LabsPage() {
  return (
    <>
      <main id="main-content" className="flex-1">
        <Labs />
      </main>
      <Footer />
    </>
  );
}
