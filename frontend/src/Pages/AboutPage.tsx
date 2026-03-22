import React, { useEffect } from "react";
import AboutHero from "./landing_page_about/AboutHero";
import AboutMission from "./landing_page_about/AboutMission";
import AboutProblems from "./landing_page_about/AboutProblems";
import AboutTestimonials from "./landing_page_about/AboutTestimonials";
import AboutOutro from "./landing_page_about/AboutOutro";
import Footer from "./PageComponents/Footer";
import Navbar from "./PageComponents/Navbar";

export default function AboutPage() {
  // ensure user starts at top when navigating to About page
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-poppins flex flex-col">
      <Navbar />
      <main id="about" className="flex-1 overflow-x-hidden w-full">
        <AboutHero />
        <AboutMission />
        <AboutProblems />
        <AboutTestimonials />
        <AboutOutro />
      </main>
      <Footer />
    </div>
  );
}
