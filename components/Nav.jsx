"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "ABOUT", target: "#about", tag: "01" },
  { label: "SKILLS", target: "#skills", tag: "02" },
  { label: "WORK", target: "#work", tag: "03" },
  { label: "JOURNEY", target: "#experience", tag: "04" },
  { label: "CONTACT", target: "#contact", tag: "05" },
];

function CatMark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g stroke="#000000" strokeLinejoin="round" strokeLinecap="round">
        <path d="M18 46 L12 8 L46 26 Z" fill="#ffffff" strokeWidth="6" />
        <path d="M82 46 L88 8 L54 26 Z" fill="#ffffff" strokeWidth="6" />
        <path d="M21 38 L18 16 L40 28 Z" fill="#f6a8d7" strokeWidth="0" />
        <path d="M79 38 L82 16 L60 28 Z" fill="#f6a8d7" strokeWidth="0" />
        <circle cx="50" cy="58" r="34" fill="#ffffff" strokeWidth="6" />
        <path d="M33 58 Q39 53 45 58 Q39 63 33 58 Z M55 58 Q61 53 67 58 Q61 63 55 58 Z" fill="#000000" strokeWidth="0" />
        <path d="M23 44 q4 6 0 9 q-4 -3 0 -9 M77 44 q4 6 0 9 q-4 -3 0 -9" fill="#8fd6ff" strokeWidth="0" />
        <path d="M46 70 h8 l-4 5 z" fill="#000000" strokeWidth="0" />
        <path d="M50 75 q-4 4 -8 2 M50 75 q4 4 8 2" fill="none" strokeWidth="3" />
      </g>
    </svg>
  );
}

export default function Nav() {
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const [open, setOpen] = useState(false);
  const openTl = useRef(null);

  useEffect(() => {
    // Nav pops in once the preloader lifts (driven by app:ready, with a safety timeout)
    let safety;
    const popIn = () => {
      gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.6)", overwrite: "auto" });
    };
    if (window.__appReady) popIn();
    else {
      window.addEventListener("app:ready", popIn, { once: true });
      safety = window.setTimeout(popIn, 5000);
    }

    const showAnim = gsap
      .from(navRef.current, { yPercent: -130, paused: true, duration: 0.4, ease: "power3.out" })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (open) return;
        if (self.direction === -1) showAnim.play();
        else if (self.scroll() > 140) showAnim.reverse();
      },
    });

    /* overlay timeline — red doors slam open, links cascade */
    const overlay = overlayRef.current;
    openTl.current = gsap
      .timeline({ paused: true })
      .set(overlay, { display: "flex" })
      .fromTo(overlay, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power4.inOut" })
      .fromTo(
        "[data-menu-link]",
        { y: 90, opacity: 0, rotate: 3 },
        { y: 0, opacity: 1, rotate: 0, duration: 0.55, stagger: 0.06, ease: "back.out(1.7)" },
        "-=0.2"
      )
      .fromTo("[data-menu-foot]", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.25");

    return () => {
      window.removeEventListener("app:ready", popIn);
      window.clearTimeout(safety);
      openTl.current?.kill();
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      openTl.current?.timeScale(1).play();
      window.__lenis?.stop();
    } else {
      openTl.current?.timeScale(1.6).reverse();
      window.__lenis?.start();
    }
  }, [open]);

  const scrollTo = (target) => (e) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(target, { duration: 1.6 });
      else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }, open ? 350 : 0);
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-[140] flex items-center justify-between px-4 py-3 opacity-0 md:px-6 md:py-4"
      >
        {/* logo pill */}
        <a
          href="#top"
          onClick={scrollTo("#top")}
          data-cursor="hover"
          className="flex items-center gap-2 rounded-full border-[3px] border-ink bg-ink py-1.5 pl-1.5 pr-4 shadow-[4px_5px_0_rgba(0,0,0,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <CatMark className="h-8 w-8" />
          <span className="font-display text-sm font-black tracking-[0.08em] text-paper">
            AJS<span className="text-red">.</span>
          </span>
        </a>

        <div className="flex items-center gap-2.5 md:gap-3">
          {/* menu pill — the pink mew-style dropdown */}
          <button
            onClick={() => setOpen((v) => !v)}
            data-cursor="hover"
            className="flex items-center gap-2 rounded-2xl border-[3px] border-ink bg-blush px-4 py-2 font-display text-sm font-black tracking-[0.08em] text-ink shadow-[4px_5px_0_rgba(0,0,0,0.55)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {open ? "CLOSE" : "MENU"}
            <span
              className="inline-block transition-transform duration-300"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
            >
              <svg viewBox="0 0 16 10" className="h-2.5 w-4"><path d="M1 1l7 7 7-7" stroke="#000000" strokeWidth="2.6" fill="none" strokeLinecap="round" /></svg>
            </span>
          </button>

          {/* burger — lime disc */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            data-cursor="hover"
            className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-lime shadow-[4px_5px_0_rgba(0,0,0,0.55)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 md:h-12 md:w-12"
          >
            <div className="flex flex-col items-center gap-[5px]">
              <span
                className="block h-[3px] w-5 rounded-full bg-ink transition-all duration-300"
                style={{ transform: open ? "translateY(4px) rotate(45deg)" : "none" }}
              />
              <span
                className="block h-[3px] w-5 rounded-full bg-ink transition-all duration-300"
                style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ============ FULL SCREEN MENU — the red door ============ */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[130] hidden flex-col justify-between bg-red px-6 pb-8 pt-28 md:px-12"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div className="halftone pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

        <nav className="relative flex flex-col gap-1 md:gap-2">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.target}
              onClick={scrollTo(link.target)}
              data-cursor="hover"
              className="group flex items-baseline gap-4 md:gap-8"
            >
              <span data-menu-link className="font-mono text-xs font-bold tracking-[0.3em] text-ink/60 md:text-sm">
                {link.tag}
              </span>
              <span
                data-menu-link
                className="font-display text-[clamp(2.4rem,8vh,5.5rem)] font-black leading-[1.02] tracking-tight text-ink transition-all duration-300 group-hover:translate-x-4 group-hover:text-paper"
              >
                {link.label}
              </span>
              <span data-menu-link className="ml-auto hidden -translate-x-3 font-display text-4xl text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
                →
              </span>
          </a>
          ))}
        </nav>

        <div data-menu-foot className="relative flex items-end justify-between font-mono text-[10px] font-bold tracking-[0.3em] text-ink/70">
          <p>© 2026 ABHIN JOE SAJI</p>
          <p className="text-right">
            INDIA — 26.9°N
            <br />
            ALWAYS SHIPPING
          </p>
        </div>
      </div>
    </>
  );
}
