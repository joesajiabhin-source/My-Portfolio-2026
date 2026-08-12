"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: "GitHub", handle: "@abhinjoesaji", href: "https://github.com/abhinjoesaji" },
  { label: "LinkedIn", handle: "/in/abhinjoesaji", href: "https://linkedin.com/in/abhinjoesaji" },
  { label: "X / Twitter", handle: "@abhinjoesaji", href: "https://x.com/abhinjoesaji" },
  { label: "Dribbble", handle: "@abhinjoesaji", href: "https://dribbble.com/abhinjoesaji" },
  { label: "Email", handle: "hello@abhinjoesaji.dev", href: "mailto:hello@abhinjoesaji.dev" },
];

export default function Contact() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // the ink finale rises like night falling over the red world
      gsap.fromTo(
        rootRef.current,
        { clipPath: "inset(12% 3% 0% 3% round 60px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "top 35%",
            scrub: 0.5,
          },
        }
      );

      // ring system expands behind the CTA — the portal opens
      gsap.fromTo(
        "[data-contact-ring]",
        { scale: 0.35, opacity: 0, rotate: -30 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        "[data-contact-head] span",
        { yPercent: 120, rotate: -2 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: rootRef.current, start: "top 58%" },
        }
      );

      gsap.fromTo(
        "[data-contact-cta], [data-contact-sub]",
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 42%" },
        }
      );

      gsap.fromTo(
        "[data-social]",
        { y: 30, opacity: 0, rotate: 3 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: "[data-socials]", start: "top 90%" },
        }
      );

      // stamp spins in
      gsap.fromTo(
        "[data-stamp]",
        { scale: 0, rotate: -160 },
        {
          scale: 1,
          rotate: -12,
          duration: 0.9,
          ease: "back.out(2)",
          scrollTrigger: { trigger: rootRef.current, start: "top 50%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={rootRef}
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink px-5 py-[14vh] text-center"
      style={{ borderRadius: "60px 60px 0 0" }}
    >
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.06] invert" aria-hidden="true" />

      {/* portal rings */}
      <div
        data-contact-ring
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 will-transform"
      >
        <div className="h-full w-full rounded-full border-[3px] border-dashed border-lime/25" />
        <div className="absolute inset-[14%] rounded-full border-[3px] border-red/40" />
        <div className="absolute inset-[28%] rounded-full border border-paper/10" />
        <div className="absolute inset-[40%] rounded-full border-2 border-blush/20" />
      </div>

      {/* stamp */}
      <div
        data-stamp
        className="absolute right-[8%] top-[12%] hidden md:block"
        aria-hidden="true"
      >
        <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-lime bg-ink/40 text-center backdrop-blur-sm">
          <p className="font-display text-[10px] font-black leading-tight tracking-[0.1em] text-lime">
            OPEN FOR
            <br />
            WORK
            <br />
            2026
          </p>
        </div>
      </div>

      <p className="relative mb-6 font-mono text-[10px] font-bold tracking-[0.5em] text-lime md:text-xs">
        05&nbsp;—&nbsp;FINAL&nbsp;SCROLL
      </p>

      <h2
        data-contact-head
        className="relative max-w-full font-display font-black leading-[0.9] tracking-tight text-paper"
      >
        <span className="mask-line">
          <span className="inline-block text-[clamp(2.1rem,7vw,6rem)] will-transform">LET&apos;S BUILD</span>
        </span>
        <span className="mask-line">
          <span className="inline-block text-[clamp(2.1rem,7vw,6rem)] will-transform">
            SOMETHING <span className="text-red" style={{ WebkitTextStroke: "2px rgba(245,245,243,0.4)" }}>IMPOSSIBLE</span>
          </span>
        </span>
      </h2>

      <p data-contact-sub className="relative mx-auto mt-8 max-w-lg font-body text-base leading-relaxed text-paper/60 md:text-lg">
        Have an idea that deserves to feel like cinema? A product that deserves
        to feel alive? Let&apos;s build it — loud, fast and unforgettable.
      </p>

      <a
        href="mailto:hello@abhinjoesaji.dev"
        data-cursor-label="SAY HI"
        data-contact-cta
        className="group relative mt-12 inline-flex items-center gap-4 overflow-hidden rounded-full border-4 border-lime bg-lime px-10 py-5 shadow-[6px_8px_0_rgba(0,0,0,0.6)] transition-transform duration-200 hover:-translate-y-1.5"
      >
        <span className="absolute inset-0 origin-left scale-x-0 bg-red transition-transform duration-400 ease-out group-hover:scale-x-100" />
        <span className="relative z-10 font-display text-base font-black tracking-[0.1em] text-ink transition-colors duration-300 group-hover:text-paper md:text-lg">
          CONNECT WITH ME
        </span>
        <span className="relative z-10 text-xl text-ink transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-paper">
          →
        </span>
      </a>

      {/* socials */}
      <div data-socials className="relative mt-20 grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            data-social
            data-cursor="hover"
            className="group rounded-2xl border-2 border-paper/15 bg-paper/5 px-4 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime/60 hover:bg-paper/10"
          >
            <p className="font-mono text-[9px] font-bold tracking-[0.3em] text-paper/40 transition-colors duration-300 group-hover:text-lime">
              {s.label.toUpperCase()}
            </p>
            <p className="mt-2 truncate font-body text-sm text-paper">{s.handle}</p>
          </a>
        ))}
      </div>

      {/* footer */}
      <footer className="relative mt-16 flex w-full flex-col items-center gap-2 border-t-2 border-paper/10 px-6 py-6 font-mono text-[10px] font-bold tracking-[0.25em] text-paper/40 md:flex-row md:justify-between md:px-10">
        <span>© 2026 ABHIN JOE SAJI</span>
        <span className="text-paper/60">BUILT WITH NEXT.JS + WEBGL · POWERED BY PASSION</span>
        <button
          onClick={() => window.__lenis?.scrollTo(0, { duration: 2.4 })}
          data-cursor="hover"
          className="tracking-[0.25em] text-paper transition-colors hover:text-lime"
        >
          BACK TO ORBIT ↑
        </button>
      </footer>
    </section>
  );
}
