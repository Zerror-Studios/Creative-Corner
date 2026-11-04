"use client";
import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useContact } from "../contexts/ContactContext";
gsap.registerPlugin(ScrollTrigger);

// Phones show/hide the address bar while scrolling, which fires resize — don't re-measure
// every ScrollTrigger for it (that's a visible hitch mid-scroll)
ScrollTrigger.config({ ignoreMobileResize: true });

// Horizontal scrollers (the Work rail) keep their own native wheel/trackpad scrolling
const isHorizontalScroller = (node) =>
  node.scrollWidth > node.clientWidth &&
  ["auto", "scroll"].includes(getComputedStyle(node).overflowX);

export default function LenisProvider({ children }) {
  const lenis = useRef(null);
  const pathname = usePathname();
  const { isContactOpen } = useContact();

  useEffect(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true });
  }, [pathname]);

  // Freeze the page behind the contact form
  useEffect(() => {
    if (isContactOpen) lenis.current?.stop();
    else lenis.current?.start();
  }, [isContactOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Keep plain native scrolling for people who ask for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Smooth wheel scrolling on desktop. Touch screens keep the browser's own scrolling:
    // it runs off the main thread at the display's refresh rate (120Hz on newer phones)
    // with the OS's momentum. Lenis' syncTouch replaced that with a JS-driven scroll capped
    // to requestAnimationFrame (60fps on iOS), 1.2x faster than the finger and with its own
    // fling curve, so every busy frame showed up as a stutter. Lenis still reports native
    // scroll to ScrollTrigger, and lenis.stop() still blocks touch scrolling (menu/contact).
    const instance = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      direction: "vertical",
      gestureDirection: "vertical",
      wheelMultiplier: 0.8,
      infinite: false,
      prevent: isHorizontalScroller,
    });

    lenis.current = instance;
    window.lenis = instance;

    // Drive Lenis from GSAP's ticker so ScrollTrigger (pins, scrubs) updates in
    // the same frame as the scroll position — otherwise pinned sections jitter.
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    // Desktop only: phones/tablets stall for a moment while the WebGL canvas and its videos
    // load, and with lag smoothing off GSAP jumps every running tween forward by that stall —
    // the intro loader (PageLoading) and the hero fade-in skip straight to their end. Keep
    // GSAP's default lag smoothing below 1024px so those animations pick up where they paused.
    if (window.matchMedia("(min-width: 1024px)").matches) {
      gsap.ticker.lagSmoothing(0);
    }

    const handleResize = () => {
      instance.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener("resize", handleResize);
      instance.destroy();
      lenis.current = null;
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
