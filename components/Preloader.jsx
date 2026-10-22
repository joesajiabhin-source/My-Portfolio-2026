"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LETTERS = "A·J·S".split("");

export default function Preloader() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counter = { value: 0 };
    const counterEl = root.querySelector("[data-counter]");

    window.__lenis?.stop();

    const finish = () => {
      if (window.__appReady) return;
      window.__appReady = true;
      window.dispatchEvent(new Event("app:ready"));
      window.__lenis?.start();
    };

    const tl = gsap.timeline({ onComplete: finish });

    // absolute fail-safe: if anything stalls (slow font/webgl on first
    // visit), force the door open and fire app:ready anyway
    const failsafe = window.setTimeout(() => {
      if (window.__appReady) return;
      // snap the timeline to its end so the door is up, then announce
      tl.progress(1);
      finish();
    }, 6000);

    if (reduce) {
      window.clearTimeout(failsafe);
      tl.set(root, { opacity: 0 }).set(root, { display: "none" }).duration(0.01);
      return () => {
        window.__lenis?.start();
      };
    }

    tl.fromTo(
      root.querySelectorAll("[data-letter]"),
      { yPercent: 120, rotate: -8, opacity: 0 },
      { yPercent: 0, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "back.out(1.9)" },
      0.15
    )
      .fromTo(
        root.querySelector("[data-tag]"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.6
      )
      .to(
        counter,
        {
          value: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            counterEl.textContent = String(Math.round(counter.value)).padStart(3, "0");
          },
        },
        0.3
      )
      .fromTo(
        root.querySelector("[data-bar]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
        0.3
      )
      .to(
        root.querySelectorAll("[data-letter]"),
        { yPercent: -130, rotate: 6, opacity: 0, duration: 0.45, stagger: 0.05, ease: "power3.in" },
        "+=0.15"
      )
      .to(root.querySelector("[data-hud]"), { opacity: 0, duration: 0.35 }, "<")
      // red door lifts — the world is underneath
      .to(root, { yPercent: -100, duration: 0.9, ease: "power4.inOut" })
      .set(root, { display: "none" });

    return () => {
      window.clearTimeout(failsafe);
      tl.kill();
      window.__lenis?.start();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-red"
    >
      <div className="halftone pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="overflow-hidden px-6">
        <h1 className="flex items-baseline font-display text-[clamp(3rem,12vw,7rem)] font-black leading-none tracking-tight text-ink">
          {LETTERS.map((l, i) => (
            <span key={i} data-letter className="inline-block will-transform">
              {l === "·" ? <span className="mx-1 text-paper md:mx-2">·</span> : l}
            </span>
          ))}
        </h1>
      </div>

      <p data-tag className="mt-3 font-mono text-[10px] font-bold tracking-[0.5em] text-ink/70 md:text-xs">
        CREATIVE&nbsp;DEVELOPER&nbsp;·&nbsp;AI&nbsp;ENGINEER
      </p>

      <div className="mt-10 h-2 w-52 overflow-hidden rounded-full border-2 border-ink bg-ink/20 md:w-80">
        <div data-bar className="h-full w-full origin-left scale-x-0 bg-ink" />
      </div>

      <div
        data-hud
        className="absolute bottom-8 flex w-full items-end justify-between px-6 md:px-10"
      >
        <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink/70">
          LOADING&nbsp;THE&nbsp;REVOLUTION
        </p>
        <p className="font-display text-5xl font-black text-ink md:text-7xl">
          <span data-counter>000</span>
          <span className="text-paper">%</span>
        </p>
      </div>
    </div>
  );
}
