"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "./Scene";

gsap.registerPlugin(ScrollTrigger);

const TICKER =
  "ABHIN JOE SAJI · CREATIVE DEVELOPER · AI ENGINEER · FULL STACK DEV · THE BORING DAYS ARE OVER · AJS IS HERE · BUILDING DIGITAL WORLDS · ";

/* ---------------- Doodlebit props (floaters on the hero stage) ---------------- */

function Starburst({ className = "", fill = "#3cff00", style }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <path
        d="M50 0l9.8 30.6L90 14.6 71.8 43.4 100 50l-28.2 6.6L90 85.4l-30.2-16L50 100l-9.8-30.6L10 85.4l18.2-28.8L0 50l28.2-6.6L10 14.6l30.2 16z"
        fill={fill}
        stroke="#050508"
        strokeWidth="3"
      />
    </svg>
  );
}

function GlowOrb({ className = "", style }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="orb" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#7b5cff" />
          <stop offset="100%" stopColor="#2a1573" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#orb)" stroke="#050508" strokeWidth="4" />
      <circle cx="34" cy="32" r="10" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}

function InlineCat({ className = "", style }) {
  return (
    <svg viewBox="0 0 160 200" className={className} style={style} aria-hidden="true">
        <g stroke="#050508" strokeLinejoin="round" strokeLinecap="round">
        {/* ears swept back in determination */}
        <path d="M40 74 L26 30 L70 52 Z" fill="#ffffff" strokeWidth="5" />
        <path d="M120 74 L134 30 L90 52 Z" fill="#ffffff" strokeWidth="5" />
        <path d="M43 64 L35 40 L62 52 Z" fill="#f6a8d7" strokeWidth="0" />
        <path d="M117 64 L125 40 L98 52 Z" fill="#f6a8d7" strokeWidth="0" />
        {/* head */}
        <circle cx="80" cy="112" r="56" fill="#ffffff" strokeWidth="5" />
        {/* eyes — angry-cute slits */}
        <path d="M50 110 Q58 103 67 109 Q59 117 50 110 Z" fill="#050508" strokeWidth="0" />
        <path d="M93 109 Q102 103 110 110 Q101 117 93 109 Z" fill="#050508" strokeWidth="0" />
        {/* angry brows */}
        <path d="M48 96 L68 102 M112 96 L92 102" strokeWidth="4" fill="none" />
        {/* tear drops */}
        <path d="M44 82 q5 8 0 12 q-5 -4 0 -12" fill="#8fd6ff" strokeWidth="0" />
        <path d="M116 82 q5 8 0 12 q-5 -4 0 -12" fill="#8fd6ff" strokeWidth="0" />
        {/* nose + mouth */}
        <path d="M76 126 h8 l-4 6 z" fill="#050508" strokeWidth="0" />
        <path d="M80 132 q-4 5 -9 3 M80 132 q4 5 9 3" fill="none" strokeWidth="3.5" />
        {/* whiskers */}
        <path d="M34 122 L10 118 M36 130 L12 136 M126 122 L150 118 M124 130 L148 136" strokeWidth="3" fill="none" />
        {/* hind paws sticking out at the bottom */}
        <ellipse cx="24" cy="184" rx="15" ry="9" fill="#ffffff" strokeWidth="4" transform="rotate(-14 24 184)" />
        <ellipse cx="136" cy="184" rx="15" ry="9" fill="#ffffff" strokeWidth="4" transform="rotate(14 136 184)" />
      </g>
    </svg>
  );
}

function FrontPaws({ className = "", style }) {
  return (
    <svg viewBox="0 0 160 70" className={className} style={style} aria-hidden="true">
      <g stroke="#050508" strokeWidth="4.5" fill="#ffffff" strokeLinecap="round">
        {/* left paw draped over the ledge */}
        <path d="M30 2 q-18 2 -18 18 q0 18 14 22 q14 4 22 -4 q8 -8 4 -22 q-4 -14 -22 -14 z" />
        <path d="M22 8 l-4 -5 M30 4 l-2 -6 M38 3 l1 -6" fill="none" />
        {/* right paw */}
        <path d="M130 2 q18 2 18 18 q0 18 -14 22 q-14 4 -22 -4 q-8 -8 -4 -22 q4 -14 22 -14 z" />
        <path d="M138 8 l4 -5 M130 4 l2 -6 M122 3 l-1 -6" fill="none" />
      </g>
    </svg>
  );
}

/* ticker content (repeated for seamless loop) */
function TickerItems() {
  const chunk = TICKER.repeat(2);
  return (
    <span className="whitespace-nowrap font-display text-sm font-extrabold tracking-[0.08em] text-ink md:text-base">
      {chunk}
    </span>
  );
}

export default function Hero() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const marqueeRef = useRef(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    /* ---------- infinite ticker ---------- */
    let marqueeTween = null;
    let timeScaleTo = null;
    if (marqueeRef.current) {
      marqueeTween = gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 24,
        repeat: -1,
      });
      timeScaleTo = gsap.quickTo(marqueeTween, "timeScale", {
        duration: 0.6,
        ease: "power2",
      });
    }

    const ctx = gsap.context(() => {
      // reveal starts hidden & non-interactive until Act III
      gsap.set("[data-reveal]", { clipPath: "inset(100% 0% 0% 0%)", pointerEvents: "none" });

      /* ---------- INTRO: the world assembles after preloader ----------
         Only animate the intro when the hero is actually on screen.
         If the user loops back to the hero from deep in the page, elements
         must already be visible — the scrub timeline controls them then. */
      const intro = gsap.timeline({ paused: true });

      const startIntro = () => {
        const heroVisible = window.scrollY < window.innerHeight * 0.6;
        if (!heroVisible) {
          // the letters live above the pin anyway — keep them visible by
          // starting the one-timeline immediately at its end so any
          // scrub-driven opacity stays in charge instead of a stuck intro.
          const end = gsap.timeline();
          end
            .set(".hero-letter", { opacity: 1, yPercent: 0, rotate: 0 })
            .set("[data-hero-cat], [data-float], [data-hero-tl], [data-hero-tr], [data-hero-bottom]", { opacity: 1 })
            .set("[data-hero-ticker]", { yPercent: 0 })
            .set("[data-hero-frame]", { scale: 1, y: 0 });
          return;
        }
        intro
          .fromTo(
            "[data-hero-frame]",
            { scale: 0.7, opacity: 0, y: 60 },
            { scale: 1, opacity: 1, y: 0, duration: 1, ease: "expo.out" },
            0.1
          )
          .fromTo(
            ".hero-letter",
            { yPercent: 110, rotate: (i) => [-8, 6, -5][i] || 0, opacity: 0 },
            {
              yPercent: 0,
              rotate: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.09,
              ease: "back.out(1.4)",
            },
            0.15
          )
          .fromTo(
            "[data-hero-cat]",
            { y: -240, opacity: 0, rotate: -14 },
            { y: 0, opacity: 1, rotate: 0, duration: 0.9, ease: "bounce.out" },
            0.85
          )
          .fromTo(
            "[data-float]",
            { scale: 0, opacity: 0, rotate: () => gsap.utils.random(-40, 40) },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.7, stagger: 0.07, ease: "back.out(2.4)" },
            0.8
          )
          .fromTo(
            "[data-hero-tl], [data-hero-tr], [data-hero-bottom]",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
            0.9
          )
          .fromTo(
            "[data-hero-ticker]",
            { yPercent: -110 },
            { yPercent: 0, duration: 0.6, ease: "power3.out" },
            1.05
          );

        intro.play();
      };

      // run when the app-ready event fires (or immediately if we somehow missed it)
      if (window.__appReady) startIntro();
      else window.addEventListener("app:ready", startIntro, { once: true });

      // fall-back: after 2.5s regardless, make sure nothing got stuck hidden
      const introspect = window.setTimeout(() => {
        if (!intro.isActive() && intro.progress() === 0) startIntro();
      }, 2500);

      /* ---------- ONE PINNED TRACK: stage + reveal + finale ---------- */
      const trackTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => "+=" + (root.offsetHeight - window.innerHeight) * 0.78,
          scrub: 0.45,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => {
            scrollState.heroP = self.progress;
            // ticker velocity boost while scrolling — the mew signature
            if (timeScaleTo) timeScaleTo(1 + Math.abs(self.getVelocity()) / 900);
            gsap.delayedCall(0.3, () => timeScaleTo && timeScaleTo(1));
          },
        },
      });

        trackTl
        // ACT I — the stage lives: letters split into depth layers
        .to("[data-hero-frame]", { scale: 1.04, ease: "none", duration: 0.28 }, 0)
        .to(letterRefs.current[0], { y: "-3vh", rotate: -1.5, ease: "none", duration: 0.28 }, 0)
        .to(letterRefs.current[1], { y: "2vh", scale: 1.04, ease: "none", duration: 0.28 }, 0)
        .to(letterRefs.current[2], { y: "-4vh", rotate: 2, ease: "none", duration: 0.28 }, 0)
        .to("[data-float='a']", { y: -110, x: -45, rotate: -16, ease: "none", duration: 0.28 }, 0)
        .to("[data-float='b']", { y: -80, x: 60, rotate: 20, ease: "none", duration: 0.28 }, 0)
        .to("[data-float='c']", { y: -130, x: 26, rotate: 11, ease: "none", duration: 0.28 }, 0)
        .to("[data-float='d']", { y: -60, x: -80, rotate: -24, ease: "none", duration: 0.28 }, 0)
        .to("[data-float='e']", { y: -95, x: 80, rotate: 30, ease: "none", duration: 0.28 }, 0)
        .to("[data-hero-cat]", { y: 24, rotate: 4, ease: "none", duration: 0.2 }, 0)
        // ACT II — letters drift apart in depth, never leaving the stage
        .to(letterRefs.current[0], { y: "-2.5vh", rotate: -2, scale: 1.04, ease: "none", duration: 0.2 }, 0.28)
        .to(letterRefs.current[1], { y: "2vh", scale: 1.06, ease: "none", duration: 0.2 }, 0.28)
        .to(letterRefs.current[2], { y: "-3.5vh", rotate: 2.5, scale: 1.04, ease: "none", duration: 0.2 }, 0.28)
        .to(".hero-letter", { opacity: 0.38, ease: "power1.in", duration: 0.2 }, 0.34)
        .to("[data-hero-cat]", { y: -340, opacity: 0, rotate: -18, ease: "power2.in", duration: 0.16 }, 0.3)
        .to("[data-float]", { opacity: 0, y: "-=90", ease: "power1.in", duration: 0.16 }, 0.3)
        .to("[data-hero-tl], [data-hero-tr], [data-hero-ticker], [data-hero-bottom]", {
          opacity: 0,
          y: -34,
          ease: "power1.in",
          duration: 0.14,
        }, 0.3)
        .to("[data-hero-frame]", { scale: 0.92, filter: "blur(6px)", ease: "power1.inOut", duration: 0.2 }, 0.32)
        // ACT III — the ink reveal rises through the stage
        .fromTo(
          "[data-reveal]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 0.3 },
          0.34
        )
        .fromTo(
          "[data-reveal-text]",
          { y: 110, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.035, ease: "power2.out", duration: 0.2 },
          0.5
        )
        .fromTo(
          "[data-zoom-fly]",
          { scale: 0.3, opacity: 0 },
          { scale: 1.15, opacity: 1, ease: "power1.in", duration: 0.34 },
          0.56
        )
        // ACT IV — let go: fade the full stage into the about chapter
        .to(pinRef.current, { opacity: 0, scale: 0.96, ease: "power1.in", duration: 0.22 }, 0.78);
    }, rootRef);

    /* ---------- pointer parallax across depth layers ---------- */
    const layers = gsap.utils.toArray("[data-layer]", root);
    const qts = layers.map((el) => ({
      x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
      d: parseFloat(el.dataset.layer) || 1,
    }));
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      qts.forEach(({ x, y, d }) => {
        x(nx * d * 40);
        y(ny * d * 26);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // hovering the ticker band slows it to a browse-able crawl
    const tickerBand = root.querySelector("[data-ticker-band]");
    const slowTicker = () => marqueeTween && gsap.to(marqueeTween, { timeScale: 0.08, duration: 0.4 });
    const resumeTicker = () => marqueeTween && gsap.to(marqueeTween, { timeScale: 1, duration: 0.5 });
    tickerBand?.addEventListener("mouseenter", slowTicker);
    tickerBand?.addEventListener("mouseleave", resumeTicker);

    return () => {
      window.clearTimeout(introspect);
      marqueeTween?.kill();
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
      tickerBand?.removeEventListener("mouseenter", slowTicker);
      tickerBand?.removeEventListener("mouseleave", resumeTicker);
    };
  }, []);

  const letters = ["A", "J", "S"];

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative z-10 h-[380svh]"
    >
      {/* pinned stage */}
      <div ref={pinRef} className="relative flex h-[100svh] flex-col overflow-hidden bg-red">
        {/* subtle print texture on the red */}
        <div className="halftone pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(255,90,60,0.55), transparent 62%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 118%, rgba(90,0,0,0.65), transparent 55%)" }}
          aria-hidden="true"
        />
        {/* scrolling world inside the stage */}
        <div data-hero-frame className="relative flex h-full flex-col will-transform">

          {/* ticker — halo band under the nav (hover pauses it) */}
          <div
            data-hero-ticker
            data-ticker-band
            className="group/ticker relative z-30 mt-[68px] overflow-hidden border-y-4 border-ink bg-red md:mt-[80px]"
          >
            <div className="halftone absolute inset-0 opacity-40" aria-hidden="true" />
            <div ref={marqueeRef} className="relative flex w-max py-2 will-transform md:py-2.5">
              <TickerItems />
              <TickerItems />
            </div>
          </div>

          {/* corner copy */}
          <div data-hero-tl className="pointer-events-none absolute left-5 top-[150px] z-30 hidden md:left-10 md:top-[170px] md:block">
            <h3 className="font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-black leading-[0.95] tracking-tight text-ink">
              CODE IS
              <br />
              MY CANVAS
            </h3>
            <div className="mt-4 flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full border-[3px] border-ink bg-ink text-red">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 4v13m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <p className="font-mono text-[10px] font-bold leading-tight tracking-[0.2em] text-ink">
                THE REVOLUTION
                <br />
                HAS BEGUN
              </p>
            </div>
          </div>

          <div data-hero-tr className="pointer-events-none absolute right-5 top-[150px] z-30 hidden text-right md:right-10 md:top-[170px] md:block">
            <h3 className="font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-black leading-[0.95] tracking-tight text-ink">
              SITES RULED
              <br />
              THE WORLD
            </h3>
            <div className="mt-4 flex items-center justify-end gap-4 text-ink">
              {["IG", "TT", "X", "TG"].map((s) => (
                <span key={s} className="font-mono text-[11px] font-bold tracking-[0.15em] underline decoration-2 underline-offset-4">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* ================= THE AJS LETTERS ================= */}
          <div className="relative z-10 flex flex-1 items-center justify-center px-4">
            <div className="flex items-end justify-center gap-[1.2vw]" style={{ perspective: "900px" }}>
              {letters.map((l, i) => (
                <div
                  key={l}
                  data-layer={i === 1 ? 0.55 : 0.9}
                  className="group/letter relative will-transform"
                  data-cursor-label={["ABHIN", "JOE", "SAJI"][i]}
                >
                  <div
                    ref={(el) => (letterRefs.current[i] = el)}
                    className="will-transform"
                  >
                    <span
                      className="hero-letter block select-none font-display font-black leading-[0.8] text-ink transition-transform duration-300 ease-out group-hover/letter:-translate-y-3 group-hover/letter:scale-[1.03]"
                      style={{
                        fontSize: "clamp(6rem, 24vw, 23rem)",
                        letterSpacing: "-0.04em",
                        textShadow: "0 14px 0 rgba(0,0,0,0.3)",
                        transform: "translateZ(0)",
                      }}
                    >
                      {l}
                    </span>
                  </div>

                  {/* hover reveal — the name this letter stands for */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-[4.4rem] left-1/2 z-50 -translate-x-1/2 translate-y-3 rotate-[-3deg] whitespace-nowrap rounded-2xl border-[3px] border-ink px-4 py-2 font-display text-lg font-black tracking-tight text-ink opacity-0 transition-all duration-300 ease-out group-hover/letter:translate-y-0 group-hover/letter:rotate-[2deg] group-hover/letter:opacity-100 md:text-2xl ${
                      i === 0 ? "bg-lime" : i === 1 ? "bg-blush" : "bg-gold"
                    }`}
                    style={{ boxShadow: "5px 6px 0 rgba(0,0,0,0.5)" }}
                  >
                    {["ABHIN", "JOE", "SAJI"][i]}
                    <span className="absolute -bottom-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-[3px] border-r-[3px] border-ink bg-inherit" />
                  </span>
                </div>
              ))}
            </div>

            {/* floating props — each its own speed, its own depth */}
            <div data-float="a" data-layer="1.6" className="pointer-events-none absolute left-[6%] top-[14%] z-20 will-transform md:left-[8%] md:top-[16%]">
              <div className="floaty">
                <Starburst className="h-10 w-10 md:h-24 md:w-24 spin-slow" />
              </div>
            </div>
            <div data-float="b" data-layer="1.2" className="pointer-events-none absolute right-[7%] top-[20%] z-20 will-transform md:right-[10%] md:top-[22%]">
              <div className="floaty" style={{ animationDelay: "-1.4s" }}>
                <GlowOrb className="h-9 w-9 md:h-20 md:w-20" />
              </div>
            </div>
            <div data-float="c" data-layer="0.7" className="pointer-events-none absolute left-[16%] bottom-[16%] z-0 will-transform md:left-[22%] md:bottom-[14%]">
              <div className="floaty" style={{ animationDelay: "-2.6s" }}>
                <Starburst className="h-8 w-8 md:h-16 md:w-16" fill="#f6a8d7" />
              </div>
            </div>
            <div data-float="d" data-layer="1.4" className="pointer-events-none absolute right-[22%] bottom-[20%] z-20 will-transform md:right-[24%] md:bottom-[18%]">
              <div className="floaty" style={{ animationDelay: "-0.8s" }}>
                <svg viewBox="0 0 100 100" className="h-9 w-9 md:h-16 md:w-16" aria-hidden="true">
                  <g stroke="#050508" strokeWidth="7" fill="none" strokeLinecap="round">
                    <circle cx="50" cy="50" r="40" fill="#ffcf3f" />
                    <circle cx="36" cy="42" r="5" fill="#050508" />
                    <circle cx="64" cy="42" r="5" fill="#050508" />
                    <path d="M32 62 q18 16 36 0" />
                  </g>
                </svg>
              </div>
            </div>
            <div data-float="e" data-layer="0.9" className="pointer-events-none absolute left-[44%] top-[9%] z-0 will-transform md:left-[46%] md:top-[10%]">
              <div className="floaty" style={{ animationDelay: "-3.4s" }}>
                <svg viewBox="0 0 120 60" className="h-6 w-12 md:h-12 md:w-24" aria-hidden="true">
                  <path d="M6 30 q14 -28 28 0 q14 28 28 0 q14 -28 28 0 q14 28 24 -6" fill="none" stroke="#f5f5f3" strokeWidth="7" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* the cat — peeking over the J, paws draped in front */}
            <div
              data-hero-cat
              data-layer="1.35"
              className="pointer-events-none absolute left-1/2 top-[1%] z-40 w-[30vw] max-w-[230px] min-w-[110px] -translate-x-1/2 will-transform md:top-[0%] md:w-[21vw]"
            >
              <div className="relative">
                <InlineCat className="w-full" />
                <div
                  className="absolute left-[4%] top-[56%] w-[92%] rounded-b-[42px]"
                  style={{ background: "#ed0000" }}
                >
                  <FrontPaws className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* bottom strip */}
          <div data-hero-bottom className="relative z-30 mb-5 flex items-end justify-between px-5 md:px-10">
            <p className="max-w-[240px] font-mono text-[10px] font-bold leading-relaxed tracking-[0.18em] text-ink md:text-[11px]">
              TOO LONG THE WEB WAS BLACK & BORING —
              <span className="bg-ink px-1 text-red">I BROUGHT COLOR.</span>
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.25em] text-ink md:text-[11px]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-lime opacity-80" />
                <span className="h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-ink" />
              </span>
              SCROLL TO JOIN
            </div>
          </div>
        </div>

        {/* ============ THE REVEAL — mew's second page, ink world ============ */}
        <div
          data-reveal
          className="absolute inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-[#050508] will-transform"
          style={{ clipPath: "inset(100% 0% 0% 0%)", pointerEvents: "none" }}
        >
          <div className="halftone absolute inset-0 opacity-[0.07] invert" aria-hidden="true" />
          <p data-reveal-text className="mb-4 font-mono text-[10px] font-bold tracking-[0.5em] text-lime md:text-xs">
            POWERED BY PASSION ≋ FUELED BY CODE
          </p>
          <h2 data-reveal-text className="px-6 text-center font-display text-[clamp(2rem,9vw,8rem)] font-black leading-[0.9] tracking-tight text-paper">
            ABHIN JOE SAJI
          </h2>
          <p data-reveal-text className="mt-6 max-w-xl px-6 text-center font-body text-sm text-paper/70 md:text-lg">
            Creative developer & AI engineer building digital worlds that refuse
            to be boring.
          </p>
          <div data-reveal-text className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border-2 border-lime px-4 py-1.5 font-mono text-[10px] font-bold tracking-[0.3em] text-lime">
              INDIA
            </span>
            <span className="rounded-full border-2 border-blush px-4 py-1.5 font-mono text-[10px] font-bold tracking-[0.3em] text-blush">
              EST. 2023
            </span>
          </div>
          {/* zoom-through flyer */}
          <div
            data-zoom-fly
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 will-transform"
            style={{ transform: "translate(-50%,-50%)", transformStyle: "preserve-3d" }}
          >
            <div className="h-[60vmin] w-[60vmin] rounded-full bg-red/25 blur-[90px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
