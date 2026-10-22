"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import FilmStrip from "@/components/FilmStrip";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Page() {
  // Mark app ready if preloader was skipped via reduced motion
  useEffect(() => {
    const onReady = () => {
      window.__appReady = true;
      // recalculates pin heights / trigger positions after fonts settle
      ScrollTrigger.refresh();
    };
    window.addEventListener("app:ready", onReady, { once: true });
    window.addEventListener("load", () => ScrollTrigger.refresh());
    return () => window.removeEventListener("app:ready", onReady);
  }, []);

  return (
    <SmoothScroll>
      <div className="grain relative">
        <Preloader />
        <CustomCursor />
        <Nav />
        <Scene />

        <main className="relative">
          <Hero />
          <About />
          <div className="relative z-20 my-2 md:my-4">
            <FilmStrip rotate={-2.4} offset={0} speed={12} panels={8} />
          </div>
          <Skills />
          <div className="relative z-20 my-2 md:my-4">
            <FilmStrip rotate={2.2} offset={3} speed={16} panels={9} />
          </div>
          <Projects />
          <Experience />
          <div className="relative z-20 my-2 md:my-4">
            <FilmStrip rotate={-1.8} offset={1} speed={10} panels={8} />
          </div>
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
