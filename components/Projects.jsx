"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    title: "AI APPLICATIONS",
    tag: "MACHINE MINDS",
    desc: "Intelligent products powered by machine learning — conversational agents, predictive systems, and AI-native interfaces that feel alive.",
    points: ["LLM-powered assistants", "Realtime inference UX", "Vision & NLP pipelines"],
    accent: "#3cff00",
    icon: "brain",
  },
  {
    id: "02",
    title: "INTERACTIVE WORLDS",
    tag: "IMMERSIVE WEB",
    desc: "Scroll-driven cinematic sites and 3D brand worlds — WebGL scenes, shader art and motion design that turn visitors into audiences.",
    points: ["Three.js / WebGL scenes", "Award-style art direction", "Buttery scroll narratives"],
    accent: "#f6a8d7",
    icon: "cube",
  },
  {
    id: "03",
    title: "FULL STACK SYSTEMS",
    tag: "ENGINEERING AT SCALE",
    desc: "End-to-end platforms — robust APIs, realtime data and cloud-native architecture, delivered with a front end that never compromises.",
    points: ["APIs & realtime systems", "Cloud-native deployment", "Design-to-production"],
    accent: "#ffcf3f",
    icon: "rocket",
  },
];

function PanelIcon({ name, className = "h-16 w-16 md:h-20 md:w-20", color }) {
  if (name === "brain")
    return (
      <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
        <g stroke="#050508" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 14 q-22 -6 -28 12 q-14 4 -10 20 q-12 10 2 22 q0 16 18 14 q6 12 18 4 q12 8 18 -4 q18 2 18 -14 q14 -12 2 -22 q4 -16 -10 -20 q-6 -18 -28 -12 z" fill={color} />
          <path d="M50 22 v56 M36 34 q-8 6 -2 14 M64 34 q8 6 2 14 M34 58 q-6 8 4 12 M66 58 q6 8 -4 12" fill="none" />
        </g>
      </svg>
    );
  if (name === "cube")
    return (
      <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
        <g stroke="#050508" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M50 8 L88 28 v44 L50 92 L12 72 V28 Z" fill={color} />
          <path d="M50 8 v40 m0 0 L12 28 M50 48 L88 28 M50 48 v44" />
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g stroke="#050508" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 6 q20 12 16 44 l8 12 -14 -4 q-4 14 -10 22 q-6 -8 -10 -22 l-14 4 8 -12 q-4 -32 16 -44 z" fill={color} />
        <circle cx="50" cy="38" r="9" fill="#050508" />
        <path d="M42 80 q-6 8 -4 14 M58 80 q6 8 4 14 M50 84 v12" fill="none" />
      </g>
    </svg>
  );
}

export default function Projects() {
  const rootRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const panels = gsap.utils.toArray("[data-panel]");
      const count = panels.length;

      /* Pinned — one poster per screen, scaling in from the distance */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=" + (count - 1) * 110 + "%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const q = gsap.utils.selector(panel);
        const segment = i - 1;

        tl.fromTo(
          panel,
          { scale: 0.5, opacity: 0, filter: "blur(14px)", y: "18vh", rotate: i % 2 ? 4 : -4 },
          { scale: 1, opacity: 1, filter: "blur(0px)", y: 0, rotate: 0, duration: 1, ease: "power2.out" },
          segment
        )
          .fromTo(
            q("[data-panel-title]"),
            { yPercent: 45, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            segment + 0.45
          )
          .fromTo(
            q("[data-panel-meta]"),
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.07 },
            segment + 0.55
          )
          .fromTo(
            q("[data-panel-icon]"),
            { scale: 0, rotate: -120 },
            { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2)" },
            segment + 0.5
          );

        // outgoing poster drifts away like a frame being closed
        const prev = panels[i - 1];
        tl.to(
          prev,
          { opacity: 0, scale: 1.18, y: "-12vh", rotate: i % 2 ? -5 : 5, filter: "blur(22px)", duration: 0.85, ease: "power2.in" },
          segment + 0.05
        );
      });

      // progress rail
      const nums = gsap.utils.toArray("[data-prog-num]");
      const dots = gsap.utils.toArray("[data-prog-dot]");
      panels.forEach((_, i) => {
        tl.to(nums, { opacity: (j) => (j === i ? 1 : 0.3), duration: 0.2 }, i);
        tl.to(dots, { scale: (j) => (j === i ? 1.6 : 1), duration: 0.2 }, i);
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray("[data-panel]").forEach((panel) => {
        const q = gsap.utils.selector(panel);
        gsap.fromTo(
          panel,
          { scale: 0.85, opacity: 0, filter: "blur(10px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: { trigger: panel, start: "top 88%", end: "top 35%", scrub: 0.6 },
          }
        );
        gsap.fromTo(
          q("[data-panel-title], [data-panel-meta]"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 62%" },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={rootRef} className="relative z-10 md:h-screen">
      {/* header bar */}
      <div className="pointer-events-none absolute left-5 right-5 top-6 z-20 flex items-center justify-between md:left-10 md:right-10">
        <div className="flex items-center gap-4">
          <span className="grid h-9 w-9 place-items-center rounded-full border-[3px] border-ink bg-gold font-display text-xs font-black">03</span>
          <span className="h-[3px] w-16 bg-ink" />
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-ink">SELECTED WORK</span>
        </div>
        <p className="hidden font-mono text-[10px] font-bold tracking-[0.3em] text-ink/60 md:block">
          ONE PROJECT / ONE SCREEN
        </p>
      </div>

      {/* progress rail (desktop) */}
      <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-5 md:flex md:right-10">
        {PROJECTS.map((p) => (
          <div key={p.id} className="flex items-center gap-3">
            <span data-prog-num className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink opacity-30">
              {p.id}
            </span>
            <span data-prog-dot className="block h-2.5 w-2.5 rounded-full border-2 border-ink bg-ink" />
          </div>
        ))}
      </div>

      {/* panels */}
      <div className="relative grid md:h-full md:[grid-template-areas:'stage']">
        {PROJECTS.map((p, i) => (
          <article
            key={p.id}
            data-panel
            className="relative flex min-h-[96vh] flex-col justify-center px-5 py-28 will-transform md:col-start-1 md:row-start-1 md:min-h-0 md:h-full md:px-10 [grid-area:stage]"
            style={{ zIndex: i + 1 }}
          >
            <div className="mx-auto w-full max-w-6xl">
              <div data-panel-meta className="mb-6 flex items-center gap-4">
                <span
                  className="rounded-full border-[3px] border-ink px-4 py-1.5 font-mono text-[10px] font-black tracking-[0.25em] text-ink"
                  style={{ background: p.accent }}
                >
                  {p.tag}
                </span>
                <span className="font-display text-5xl font-black text-stroke md:text-7xl">{p.id}</span>
              </div>

              <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <h3
                    data-panel-title
                    className="font-display text-[clamp(2.6rem,7.5vw,6.2rem)] font-black leading-[0.92] tracking-tight text-ink"
                  >
                    {p.title.split(" ").map((word, wi) => (
                      <span key={wi} className="block">
                        {wi === 1 ? <span style={{ color: "#050508" }}>{word}</span> : word}
                      </span>
                    ))}
                  </h3>
                  <p data-panel-meta className="mt-6 max-w-xl font-body text-base font-medium leading-relaxed text-ink/80 md:text-lg">
                    {p.desc}
                  </p>

                  <a
                    href="#contact"
                    data-cursor-label="OPEN"
                    data-panel-meta
                    className="group mt-8 inline-flex items-center gap-3 rounded-full border-[3px] border-ink bg-ink px-7 py-3.5 font-display text-sm font-black tracking-[0.1em] text-paper shadow-[5px_6px_0_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1"
                  >
                    VIEW CASE
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: p.accent }}>→</span>
                  </a>
                </div>

                {/* poster card */}
                <div className="lg:col-span-5 [perspective:1000px]">
                  <div
                    data-panel-meta
                    className="frame relative overflow-hidden rounded-[28px] p-1"
                    style={{ transform: `rotate(${i % 2 ? 2.5 : -2.5}deg)` }}
                  >
                    <div className="relative rounded-[22px] bg-gradient-to-b from-[#171726] to-[#050508] p-6">
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-[9px] font-bold tracking-[0.3em] text-paper/50">
                          CASE&nbsp;FILE&nbsp;{p.id}
                        </p>
                        <span className="rounded-full px-2.5 py-1 font-mono text-[8px] font-black tracking-[0.2em] text-ink" style={{ background: p.accent }}>
                          SHIPPED
                        </span>
                      </div>

                      <div className="my-6 flex justify-center">
                        <div data-panel-icon className={`floaty`} style={{ animationDelay: `${i * -1.2}s` }}>
                          <PanelIcon name={p.icon} color={p.accent} />
                        </div>
                      </div>

                      <ul className="space-y-2.5">
                        {p.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                          >
                            <span className="h-2 w-2 rounded-full" style={{ background: p.accent }} />
                            <span className="font-body text-sm text-paper/85">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* glow ring behind the poster */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
              style={{ background: `${p.accent}1c` }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
