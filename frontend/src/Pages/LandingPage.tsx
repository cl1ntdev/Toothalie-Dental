import React, { useEffect } from "react";
import Navbar from "./PageComponents/Navbar";
import Hero from "./landing_page_sections/Hero";
import About from "./landing_page_sections/About";
import Services from "./landing_page_sections/Services";
import Testimonials from "./landing_page_sections/Testimonials";
import StatsCTA from "./landing_page_sections/StatsCTA";
import Footer from "./PageComponents/Footer";
import bg from '../assets/bg.webp'
import Dentist from "./landing_page_sections/Dentists";
export default function LandingPage() {
  useEffect(() => {
    try {
      localStorage.setItem("theme", "light");
    } catch {
      throw new Error("Noooooo");
    }

    
    if (typeof document !== "undefined") {
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "smooth";
      return () => {
        document.documentElement.style.scrollBehavior = prev || "";
      };
    }
    return undefined;
  }, []);

  return (
    <div 
  className="min-h-screen text-gray-900 bg-no-repeat bg-center bg-contain md:bg-cover"
    style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar />

      <main className="">
        <section aria-label="Hero">
          <Hero />
        </section>

        <section id="about" aria-label="About">
          <About />
        </section>

        <section id="services" aria-label="Services">
          <Services />
        </section>

        <section id="testimonials" aria-label="Testimonials">
          <Testimonials />
        </section>

        <section id="dentists" aria-label="Dentists">
          <Dentist />
        </section>
        <section aria-label="Stats and CTA">
          <StatsCTA />
        </section>

        <footer aria-label="Footer">
          <Footer />
        </footer>
      </main>
    </div>
  );
}
