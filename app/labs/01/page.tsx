import type { Metadata } from "next";
import { siteConfig } from "@/data/content";
import BayerDitheringDemo from "@/components/labs/BayerDitheringDemo";

export const metadata: Metadata = {
  title: "Bayer Dithering Playground",
  description: "An interactive WebGL shader that applies Bayer dithering effects with click-to-spawn ripples",
  openGraph: {
    title: `Bayer Dithering Playground | ${siteConfig.name}`,
    description: "An interactive WebGL shader demonstration",
    url: `${siteConfig.url}/labs/01`,
  },
};

export default function Lab01Page() {
  return (
    <main id="main-content" className="flex-1">
      <BayerDitheringDemo />
    </main>
  );
}
