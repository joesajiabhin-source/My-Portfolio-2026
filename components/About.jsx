"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  "A developer exploring the intersection of AI, design and storytelling — building products that feel alive and interfaces that refuse to be boring.";

const FACTS = [
  { k: "ROLE", v: "Creative Developer" },
  { k: "DISCIPLINE", v: "AI + Full Stack" },
  { k: "BASE", v: "India" },
  { k: "FOCUS", v: "Immersive Web" },
];

export default function About() {
  const rootRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // word-by-word identity reveal
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.12, y: 16, rotate: 1.5 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-statement]",
            start: "top 80%",
            end: "bottom 48%",
            scrub: 0.6,
          },
        }
      );

      // giant heading pieces slam in from opposite sides
      gsap.fromTo(
        "[data-about-head='who']",
        { xPercent: -18, opacity: 0, rotate: -4 },
        {
          xPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 74%" },
        }
      );
      gsap.fromTo(
        "[data-about-head='ami']",
        { xPercent: 14, opacity: 0, rotate: 3 },
        {
          xPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          delay: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 74%" },
        }
      );

      // backdrop outline keeps travelling behind everything
      gsap.fromTo(
        "[data-about-outline]",
        { xPercent: 12 },
        {
          xPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // holo card enters flipped like a trading card pull
      gsap.fromTo(
        cardRef.current,
        { rotateY: 78, x: 130, opacity: 0, scale: 0.85 },
        {
          rotateY: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 82%" },
        }
      );

      // facts row pops
      gsap.fromTo(
        "[data-fact]",
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger: { trigger: "[data-facts]", start: "top 88%" },
        }
      );
    }, rootRef);

    /* holographic tilt on pointer */
    const fine = window.matchMedia("(pointer: fine)").matches;
    let cleanup = () => {};
    if (fine && cardRef.current) {
      const card = cardRef.current;
      const xTo = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
      const sheen = card.querySelector("[data-sheen]");
      const move = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        xTo(px * 24);
        yTo(-py * 24);
        if (sheen)
          gsap.to(sheen, {
            background: `linear-gradient(${115 + px * 60}deg, rgba(60,255,0,0.25), rgba(246,168,215,0.3) 45%, rgba(143,214,255,0.22))`,
            duration: 0.4,
          });
      };
      const leave = () => gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.9, ease: "elastic.out(1, 0.45)" });
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      cleanup = () => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      };
    }

    return () => {
      ctx.revert();
      cleanup();
    };
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="relative z-10 overflow-hidden rounded-t-[48px] bg-red px-5 pb-[14vh] pt-[14vh] shadow-[0_-14px_40px_rgba(0,0,0,0.35)] md:rounded-t-[72px] md:px-10"
    >
      {/* travelling outline backdrop — depth behind everything */}
      <h2
        data-about-outline
        aria-hidden="true"
        className="pointer-events-none absolute top-[6vh] whitespace-nowrap font-display text-[20vw] font-black leading-none text-stroke-thin opacity-50"
      >
        DIGITAL MIND — DIGITAL MIND
      </h2>

      <div className="relative mx-auto max-w-7xl">
        {/* chapter marker */}
        <div className="mb-12 flex items-center gap-4">
          <span className="grid h-9 w-9 place-items-center rounded-full border-[3px] border-ink bg-lime font-display text-xs font-black">01</span>
          <span className="h-[3px] w-16 bg-ink" />
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-ink">IDENTITY</span>
        </div>

        <h2 className="font-display font-black leading-[0.88] tracking-tight text-ink">
          <span data-about-head="who" className="block text-[clamp(3.4rem,12vw,10rem)] will-transform">
            WHO AM
          </span>
          <span data-about-head="ami" className="block text-[clamp(3.4rem,12vw,10rem)] will-transform">
            I<span className="text-stroke" style={{ WebkitTextStrokeWidth: "3px" }}>?</span>
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-14 md:mt-24 lg:grid-cols-12">
          {/* statement */}
          <div className="lg:col-span-7">
            <p
              data-statement
              className="font-display text-[clamp(1.5rem,3.2vw,2.7rem)] font-bold leading-[1.22] text-ink"
            >
              {STATEMENT.split(" ").map((w, i) => (
                <span key={i} data-word className="mr-[0.3em] inline-block will-transform">
                  {w === "alive" || w === "boring." ? (
                    <span className="rounded-lg bg-ink px-2 text-red">{w}</span>
                  ) : (
                    w
                  )}
                </span>
              ))}
            </p>

            <div data-facts className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
              {FACTS.map((f) => (
                <div
                  key={f.k}
                  data-fact
                  className="rounded-2xl border-[3px] border-ink bg-ink/5 p-4 backdrop-blur-[2px]"
                >
                  <p className="font-mono text-[9px] font-bold tracking-[0.3em] text-ink/60">{f.k}</p>
                  <p className="mt-2 font-display text-sm font-black text-ink md:text-base">{f.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* holographic ID card */}
          <div className="relative lg:col-span-5 [perspective:1200px]">
            <div
              ref={cardRef}
              data-cursor-label="ME?"
              className="frame relative mx-auto max-w-sm overflow-hidden rounded-[28px] p-1 will-transform [transform-style:preserve-3d]"
              style={{ transform: "rotate(3deg)" }}
            >
              <div data-sheen className="absolute inset-0 z-10 opacity-70" />
              <div className="relative rounded-[22px] bg-gradient-to-b from-[#000000] to-[#000000] p-6">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] font-bold tracking-[0.35em] text-lime">AJS&nbsp;/&nbsp;ID&nbsp;CARD</p>
                  <span className="rounded-full bg-lime px-2.5 py-1 font-mono text-[8px] font-black tracking-[0.2em] text-ink">
                    LEGENDARY
                  </span>
                </div>

                {/* avatar — the cat dev */}
                <div className="mx-auto mt-6 w-40 [transform:translateZ(40px)]">
                  <svg viewBox="0 0 160 130" className="w-full">
                    <circle cx="80" cy="65" r="58" fill="#ed0000" opacity="0.2" />
                    <g stroke="#000000" strokeLinejoin="round" strokeLinecap="round">
                      <path d="M40 52 L33 10 L72 32 Z" fill="#fff" strokeWidth="5" />
                      <path d="M120 52 L127 10 L88 32 Z" fill="#fff" strokeWidth="5" />
                      <path d="M43 44 L40 20 L64 33 Z" fill="#f6a8d7" strokeWidth="0" />
                      <path d="M117 44 L120 20 L96 33 Z" fill="#f6a8d7" strokeWidth="0" />
                      <circle cx="80" cy="72" r="44" fill="#fff" strokeWidth="5" />
                      {/* shades — this dev means business */}
                      <rect x="42" y="60" width="34" height="18" rx="8" fill="#000000" />
                      <rect x="84" y="60" width="34" height="18" rx="8" fill="#000000" />
                      <path d="M76 66 h8" stroke="#000000" strokeWidth="5" fill="none" />
                      <path d="M74 62 l-8 -2 M86 62 l8 -2" stroke="#f5f5f3" strokeWidth="3" fill="none" opacity="0.7" />
                      <path d="M74 96 q-4 4 -8 2 M86 96 q4 4 8 2 M80 90 v7" fill="none" strokeWidth="3" transform="translate(-80 0) translate(80 0)" />
                      <path d="M76 86 h8 l-4 5 z" fill="#000000" strokeWidth="0" />
                    </g>
                  </svg>
                </div>

                <div className="mt-6 text-center [transform:translateZ(28px)]">
                  <h3 className="font-display text-2xl font-black tracking-tight text-paper">
                    ABHIN JOE SAJI
                  </h3>
                  <p className="mt-1 font-mono text-[10px] font-bold tracking-[0.3em] text-blush">
                    THE&nbsp;ONE&nbsp;MAN&nbsp;STUDIO
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t-2 border-dashed border-white/15 pt-4 text-center">
                  {[
                    ["PWR", "98"],
                    ["SPD", "93"],
                    ["CHA", "99"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="font-display text-xl font-black text-lime">{v}</p>
                      <p className="font-mono text-[8px] font-bold tracking-[0.3em] text-paper/50">{k}</p>
                    </div>
                  ))}
                </div>

                {/* holo stripes */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-[0.13]"
                  style={{ background: "repeating-linear-gradient(0deg, transparent 0 6px, #fff 6px 7px)" }}
                />
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-[300px] text-center font-body text-sm leading-relaxed text-ink/80">
              Every pixel is intentional. Every interaction, choreographed. My
              work sits where engineering meets cinema.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
