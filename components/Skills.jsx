"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "React", detail: "Component systems & SPAs", level: "95" },
  { name: "Next.js", detail: "SSR / App Router / RSC", level: "92" },
  { name: "Three.js", detail: "Realtime 3D & shaders", level: "86" },
  { name: "WebGL", detail: "GPU-driven visuals", level: "82" },
  { name: "GSAP", detail: "Scroll-choreographed motion", level: "90" },
  { name: "AI Dev", detail: "LLMs, agents, pipelines", level: "88" },
  { name: "Full Stack", detail: "APIs, DBs, scale", level: "91" },
  { name: "UI/UX", detail: "Interaction & art direction", level: "85" },
];

const TILTS = [-3.5, 2.5, -2, 3, -4, 2, -2.5, 3.5];

export default function Skills() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // heading — "THE ARSENAL" slams down like a title card
      gsap.fromTo(
        "[data-skills-head] span",
        { yPercent: 120, rotate: -3, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
        }
      );

      // cards scatter in like a deck being dealt
      gsap.utils.toArray("[data-skill-card]").forEach((el, i) => {
        const tilt = TILTS[i % TILTS.length];
        gsap.fromTo(
          el,
          { y: 120, opacity: 0, rotate: tilt * 4, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            rotate: tilt,
            scale: 1,
            duration: 0.9,
            delay: (i % 4) * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
        // progress bar fills as the card enters
        const bar = el.querySelector("[data-skill-bar]");
        if (bar) {
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              delay: 0.25 + (i % 4) * 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 92%" },
            }
          );
        }
      });

      // outline backdrop travel
      gsap.fromTo(
        "[data-skills-outline]",
        { xPercent: -18 },
        {
          xPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, rootRef);

    /* pointer tilt on the comic cards */
    const fine = window.matchMedia("(pointer: fine)").matches;
    let cleanups = [];
    if (fine) {
      const cards = gsap.utils.toArray("[data-skill-card]", rootRef.current);
      cleanups = cards.map((card) => {
        const xTo = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
        const move = (e) => {
          const r = card.getBoundingClientRect();
          xTo(((e.clientX - r.left) / r.width - 0.5) * 18);
          yTo(-((e.clientY - r.top) / r.height - 0.5) * 18);
        };
        const leave = () =>
          gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        return () => {
          card.removeEventListener("mousemove", move);
          card.removeEventListener("mouseleave", leave);
        };
      });
    }

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      id="skills"
      ref={rootRef}
      className="relative z-10 overflow-hidden py-[16vh]"
    >
      <h2
        data-skills-outline
        aria-hidden="true"
        className="pointer-events-none absolute top-[4vh] whitespace-nowrap font-display text-[19vw] font-black leading-none text-stroke-thin opacity-50"
      >
        ARSENAL · ARSENAL
      </h2>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 flex items-center gap-4">
          <span className="grid h-9 w-9 place-items-center rounded-full border-[3px] border-ink bg-blush font-display text-xs font-black">02</span>
          <span className="h-[3px] w-16 bg-ink" />
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-ink">THE ARSENAL</span>
        </div>

        <h2 data-skills-head className="font-display font-black leading-[0.88] tracking-tight text-ink">
          <span className="mask-line">
            <span className="inline-block text-[clamp(3rem,11vw,9rem)] will-transform">MY</span>
          </span>
          <span className="mask-line">
            <span className="inline-block text-[clamp(3rem,11vw,9rem)] will-transform">
              <span style={{ color: "#000000" }}>WEAPONS</span>
            </span>
          </span>
        </h2>

        {/* dealt deck */}
        <div className="mt-16 grid grid-cols-2 gap-5 [perspective:1200px] md:mt-24 md:grid-cols-4 md:gap-6">
          {SKILLS.map((skill, i) => (
            <article
              key={skill.name}
              data-skill-card
              data-cursor="hover"
              className="relative will-transform [transform-style:preserve-3d]"
              style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
            >
              <div className="frame-sm group relative overflow-hidden rounded-[20px] bg-ink p-5 transition-transform duration-300 hover:-translate-y-2 md:p-6">
                {/* corner bolt like a comic panel */}
                <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-ink" />
                <p className="font-mono text-[9px] font-bold tracking-[0.3em] text-paper/40">
                  PWR /{skill.level}
                </p>
                <div className="mt-8 md:mt-10">
                  <h3 className="font-display text-xl font-black text-paper md:text-2xl">
                    {skill.name}
                  </h3>
                  <p className="mt-1 font-body text-xs text-paper/60 md:text-sm">{skill.detail}</p>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      data-skill-bar
                      className="h-full w-full origin-left rounded-full bg-gradient-to-r from-lime to-blush"
                      style={{ transform: "scaleX(0)", width: `${skill.level}%` }}
                    />
                  </div>
                </div>
                {/* glow hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle at 50% 120%, rgba(60,255,0,0.18), transparent 65%)" }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
