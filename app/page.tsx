import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main id="main-content" className="flex-1">
        <Hero />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
