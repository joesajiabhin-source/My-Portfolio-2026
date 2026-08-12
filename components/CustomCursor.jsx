"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Dot + lagging ring cursor. Ring expands & shows a label over
 * [data-cursor-label] elements, and grows slightly over [data-cursor="hover"].
 * Disabled on touch devices and reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    document.documentElement.classList.add("custom-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -200, y: -200 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e) => {
      const labeled = e.target.closest("[data-cursor-label]");
      const hoverable = e.target.closest("[data-cursor='hover']");

      if (labeled) {
        label.textContent = labeled.dataset.cursorLabel;
        gsap.to(ring, { scale: 3.1, backgroundColor: "rgba(10,10,18,0.9)", borderColor: "rgba(10,10,18,1)", duration: 0.35, ease: "power3.out" });
        gsap.to(label, { opacity: 1, duration: 0.25 });
      } else if (hoverable) {
        gsap.to(ring, { scale: 1.8, backgroundColor: "rgba(60,255,0,0.25)", duration: 0.35, ease: "power3.out" });
        gsap.to(label, { opacity: 0, duration: 0.2 });
      } else {
        gsap.to(ring, { scale: 1, backgroundColor: "rgba(255,255,255,0)", duration: 0.35, ease: "power3.out" });
        gsap.to(label, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[160] hidden md:block" aria-hidden="true">
      <div ref={dotRef} className="fixed left-0 top-0 h-2 w-2 rounded-full bg-ink ring-2 ring-paper/60" />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] border-ink/60"
      >
        <span ref={labelRef} className="font-mono text-[9px] font-bold tracking-[0.2em] text-paper opacity-0">
          VIEW
        </span>
      </div>
    </div>
  );
}
