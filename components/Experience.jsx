"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2023",
    title: "First Lines of Impact",
    tag: "BEGINNING",
    text: "Started the deep dive into full-stack development — shipping real products, learning systems from database to pixel.",
  },
  {
    year: "2024",
    title: "The Creative Turn",
    tag: "DESIGN × CODE",
    text: "Fell into the world of Three.js, WebGL and GSAP. Began building interfaces where motion and light are part of the language.",
  },
  {
    year: "2025",
    title: "AI Integration",
    tag: "INTELLIGENCE",
    text: "Went deep on AI engineering — LLM pipelines, agents and intelligent interfaces woven into production full-stack apps.",
  },
  {
    year: "2026",
    title: "Beyond Reality",
    tag: "NOW",
    text: "Crafting immersive digital worlds as a creative developer — every project a cinematic journey, not a webpage.",
  },
];

export default function Experience() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // the spine draws itself — a hazard line of progress
      gsap.fromTo(
        "[data-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 60%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray("[data-milestone]").forEach((el, i) => {
        const card = el.querySelector("[data-milestone-card]");
        const node = el.querySelector("[data-milestone-node]");

        gsap.fromTo(
          card,
          {
            x: window.innerWidth >= 768 ? (i % 2 === 0 ? 110 : -110) : 60,
            scale: 0.85,
            opacity: 0,
            rotate: i % 2 === 0 ? 6 : -6,
          },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            rotate: i % 2 === 0 ? -2 : 2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 78%" },
          }
        );

        gsap.fromTo(
          node,
          { scale: 0, rotate: -180 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 72%" },
          }
        );
      });

      // travel-the-years heading
      gsap.fromTo(
        "[data-exp-head] span",
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.09,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );

      // giant year counter rolls in the background
      gsap.fromTo(
        "[data-year-ghost]",
        { yPercent: 30, opacity: 0.0 },
        {
          yPercent: -10,
          opacity: 0.22,
          ease: "none",
          scrollTrigger: { trigger: "[data-timeline]", start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={rootRef}
      className="relative z-10 overflow-hidden px-5 py-[18vh] md:px-10"
    >
      <h2
        data-year-ghost
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 whitespace-nowrap font-display text-[26vw] font-black leading-none text-stroke-thin will-transform"
      >
        2023→26
      </h2>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="grid h-9 w-9 place-items-center rounded-full border-[3px] border-ink bg-lime font-display text-xs font-black">04</span>
          <span className="h-[3px] w-16 bg-ink" />
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-ink">THE JOURNEY</span>
        </div>

        <h2 data-exp-head className="mb-24 font-display font-black leading-[0.88] tracking-tight text-ink">
          <span className="mask-line">
            <span className="inline-block text-[clamp(2.8rem,10vw,8rem)] will-transform">THE ROAD</span>
          </span>
          <span className="mask-line">
            <span className="inline-block text-[clamp(2.8rem,10vw,8rem)] will-transform">
              <span style={{ color: "#000000" }}>SO FAR</span>
            </span>
          </span>
        </h2>

        <div data-timeline className="relative">
          {/* the spine — ink rail with lime fill */}
          <div className="absolute left-4 top-0 h-full w-[6px] -translate-x-1/2 rounded-full bg-ink/25 md:left-1/2">
            <div
              data-line
              className="h-full w-full origin-top rounded-full bg-lime"
              style={{ boxShadow: "0 0 14px rgba(60,255,0,0.7)" }}
            />
          </div>

          <div className="space-y-20 md:space-y-32">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                data-milestone
                className={`relative flex items-start gap-8 md:items-center ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* node — comic sun on the spine */}
                <div className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                  <div data-milestone-node className="relative grid h-10 w-10 place-items-center rounded-full border-[3px] border-ink bg-ink">
                    <span className="h-2.5 w-2.5 rounded-full bg-lime" />
                    <span className="absolute h-full w-full animate-ping rounded-full border-2 border-lime opacity-40" />
                  </div>
                </div>

                <div className="hidden w-1/2 md:block" />

                {/* the milestone card */}
                <div className="ml-12 w-full [perspective:1000px] md:ml-0 md:w-1/2">
                  <div
                    data-milestone-card
                    data-cursor="hover"
                    className={`frame-white relative rounded-[24px] p-6 will-transform md:p-8 ${
                      i % 2 === 0 ? "md:mr-14" : "md:ml-14"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-4xl font-black text-ink md:text-5xl">
                        {m.year}
                      </span>
                      <span className="rounded-full border-[3px] border-ink bg-red px-3 py-1 font-mono text-[9px] font-black tracking-[0.2em] text-paper">
                        {m.tag}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-black text-ink md:text-2xl">
                      {m.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-ink/70 md:text-base">
                      {m.text}
                    </p>
                    {/* corner deco */}
                    <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full border-[3px] border-ink bg-gold font-display text-[10px] font-black">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
