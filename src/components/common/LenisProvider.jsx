"use client";
import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
  const lenis = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.innerWidth < 1024) return

    const instance = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      direction: "vertical",
      gestureDirection: "vertical",
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenis.current = instance;
    window.lenis = instance;

    // Drive Lenis from GSAP's ticker so ScrollTrigger (pins, scrubs) updates in
    // the same frame as the scroll position — otherwise pinned sections jitter.
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

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