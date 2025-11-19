import type { Metadata } from "next";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Task Manager Demo",
  description: "An automated task management interface with priority levels and real-time statistics",
  openGraph: {
    title: `Task Manager Demo | ${siteConfig.name}`,
    description: "An automated task management demo",
    url: `${siteConfig.url}/labs/03`,
  },
};

export default function Lab03Page() {
  return (
    <main id="main-content" className="fixed inset-0 w-full h-screen">
      <iframe
        src="/labs/03/product_demo.html"
        className="w-full h-full border-0"
        title="Task Manager Demo"
      />
    </main>
  );
}
