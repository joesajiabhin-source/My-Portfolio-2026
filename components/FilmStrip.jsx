"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------- tiny comic scenes (doodle framed panels) ------------- */

function SceneReact() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="120" fill="#000000" />
      <g stroke="#8fd6ff" strokeWidth="2.5" fill="none" opacity="0.9">
        <ellipse cx="100" cy="60" rx="46" ry="17" />
        <ellipse cx="100" cy="60" rx="46" ry="17" transform="rotate(60 100 60)" />
        <ellipse cx="100" cy="60" rx="46" ry="17" transform="rotate(120 100 60)" />
      </g>
      <circle cx="100" cy="60" r="8" fill="#8fd6ff" />
      <path d="M20 100 q10 -14 20 0 q10 14 20 0" stroke="#3cff00" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="172" cy="24" r="9" fill="#f6a8d7" stroke="#000000" strokeWidth="3" />
    </svg>
  );
}

function SceneAI() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="120" fill="#000000" />
      <g stroke="#b79aff" strokeWidth="2" fill="none" opacity="0.8">
        <path d="M40 30 L100 60 M40 90 L100 60 M40 30 L100 20 M100 20 L160 45 M100 100 L160 80 M100 60 L160 45 M100 60 L160 80 M40 90 L100 100" />
      </g>
      {[
        [40, 30, "#3cff00"], [40, 90, "#3cff00"], [100, 20, "#8fd6ff"],
        [100, 60, "#f6a8d7"], [100, 100, "#8fd6ff"], [160, 45, "#ffcf3f"], [160, 80, "#ffcf3f"],
      ].map(([x, y, c], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill={c} stroke="#000000" strokeWidth="3" />
      ))}
      <path d="M14 16 l6 6 m0 -6 l-6 6" stroke="#f5f5f3" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function SceneUI() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="120" fill="#000000" />
      <rect x="30" y="22" width="140" height="76" rx="10" fill="#f5f5f3" stroke="#000000" strokeWidth="4" />
      <rect x="30" y="22" width="140" height="18" rx="9" fill="#ed0000" stroke="#000000" strokeWidth="4" />
      <circle cx="42" cy="31" r="3" fill="#000000" /><circle cx="54" cy="31" r="3" fill="#000000" /><circle cx="66" cy="31" r="3" fill="#000000" />
      <rect x="42" y="52" width="70" height="9" rx="4.5" fill="#000000" />
      <rect x="42" y="68" width="46" height="9" rx="4.5" fill="#ed0000" />
      <rect x="42" y="84" width="58" height="7" rx="3.5" fill="#b9b9c2" />
      <circle cx="146" cy="72" r="14" fill="#3cff00" stroke="#000000" strokeWidth="4" />
      <path d="M141 72 l4 4 8 -9" stroke="#000000" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SceneDeploy() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="120" fill="#000000" />
      <g transform="rotate(-8 100 60)">
        <path d="M100 96 q-26 -16 -22 -44 l22 -10 22 10 q4 28 -22 44 z" fill="#ed0000" stroke="#000000" strokeWidth="4" />
        <circle cx="100" cy="58" r="10" fill="#f5f5f3" stroke="#000000" strokeWidth="3.5" />
        <path d="M78 88 q-12 10 -10 22 M122 88 q12 10 10 22" stroke="#ffcf3f" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
      <path d="M30 30 l7 7 m0 -7 l-7 7 M170 88 l7 7 m0 -7 l-7 7" stroke="#f6a8d7" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function SceneCat() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="120" fill="#ed0000" />
      <g transform="translate(55 18)">
        <path d="M12 26 L4 0 L34 18 Z" fill="#fff" stroke="#000000" strokeWidth="4" strokeLinejoin="round" />
        <path d="M78 26 L86 0 L56 18 Z" fill="#fff" stroke="#000000" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="45" cy="52" r="34" fill="#fff" stroke="#000000" strokeWidth="4" />
        <path d="M28 50 q5 -5 10 0 q-5 5 -10 0 M52 50 q5 -5 10 0 q-5 5 -10 0" fill="#000000" />
        <path d="M41 60 h8 l-4 5 z" fill="#000000" />
      </g>
      <path d="M150 88 q8 -18 22 -12 q14 6 8 22" fill="none" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function SceneChart() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="120" fill="#000000" />
      <g stroke="#5c5c66" strokeWidth="1.5" opacity="0.6">
        <path d="M20 30 H180 M20 55 H180 M20 80 H180" />
      </g>
      <path d="M22 92 L60 66 L92 78 L128 40 L176 22" fill="none" stroke="#3cff00" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M176 22 l-16 2 m16 -2 l-2 16" stroke="#3cff00" strokeWidth="6" strokeLinecap="round" />
      <circle cx="128" cy="40" r="7" fill="#ffcf3f" stroke="#000000" strokeWidth="3" />
    </svg>
  );
}

const SCENES = [SceneReact, SceneAI, SceneUI, SceneDeploy, SceneCat, SceneChart];

/**
 * A full-bleed tilted band of comic frames, like mew.xyz's chapter strips.
 * The whole strip drifts sideways on scroll (scrubbed parallax) and each
 * panel wobbles in with a slight rotation as it enters.
 */
export default function FilmStrip({
  rotate = -2.4,
  offset = 0,
  className = "",
  panels = 8,
  speed = 14,
}) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      // sideways drift scrubbed to scroll — classic mew band motion
      gsap.fromTo(
        trackRef.current,
        { xPercent: speed },
        {
          xPercent: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // panels hop in one by one
      gsap.fromTo(
        "[data-frame-panel]",
        { y: 60, opacity: 0, rotate: () => gsap.utils.random(-6, 6) },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 92%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={rootRef}
      className={`relative z-20 select-none overflow-hidden py-6 md:py-8 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex w-max gap-5 pr-5 will-transform">
        {Array.from({ length: panels }).map((_, i) => {
          const Scene = SCENES[(i + offset) % SCENES.length];
          return (
            <div
              key={i}
              data-frame-panel
              className="frame-sm relative h-36 w-60 shrink-0 overflow-hidden md:h-44 md:w-72"
              style={{ transform: `rotate(${i % 2 === 0 ? 1.2 : -1.2}deg)` }}
            >
              <div className="absolute inset-0">
                <Scene />
              </div>
              {/* inner gloss */}
              <div className="pointer-events-none absolute inset-0 rounded-[16px] ring-1 ring-inset ring-white/10" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
