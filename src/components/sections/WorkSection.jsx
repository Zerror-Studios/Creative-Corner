"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Rename the titles freely — the first project is shown as the large featured tile.
const projects = [
  { title: "Project 01", src: "/Data/IMG_0593.mp4" },
  { title: "Project 02", src: "/Data/IMG_2510.mp4" },
  { title: "Project 03", src: "/Data/IMG_2967.mp4" },
  { title: "Project 04", src: "/Data/IMG_4842.mp4" },
  { title: "Project 05", src: "/Data/IMG_4843.mp4" },
  { title: "Project 06", src: "/Data/IMG_6359.mp4" },
  { title: "Project 07", src: "/Data/IMG_7148.mp4" },
  { title: "Project 08", src: "/Data/IMG_7162.mp4" },
  { title: "Project 09", src: "/Data/IMG_7483.mp4" },
  { title: "Project 10", src: "/Data/IMG_8224.mp4" },
  { title: "Project 11", src: "/Data/IMG_8225.mp4" },
  { title: "Project 12", src: "/Data/IMG_8228.mp4" },
  { title: "Project 13", src: "/Data/IMG_8500.mp4" },
  { title: "Project 14", src: "/Data/IMG_8900.mp4" },
  { title: "Project 15", src: "/Data/IMG_8924.mp4" },
  { title: "Project 16", src: "/Data/IMG_8992.mp4" },
  { title: "Project 17", src: "/Data/IMG_9995.mp4" },
];

const formatTime = (s) =>
  Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "";

const WorkSection = () => {
  const GridRef = useRef();
  const visibleVideos = useRef(new Set());
  const [activeIndex, setActiveIndex] = useState(null);
  const isLightboxOpen = activeIndex !== null;

  // Navbar "Work" underline + card reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const PLT1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".WorkCONTDIV",
          start: "top top",
          end: "top top",
          scrub: true,
        },
      });
      PLT1.to(".ExpertiseLine", {
        width: "0%",
      });
      PLT1.to(".WorkLine", {
        width: "100%",
      });

      const PLTE = gsap.timeline({
        scrollTrigger: {
          trigger: ".WorkCONTDIV",
          start: "bottom top",
          end: "bottom top",
          scrub: true,
        },
      });
      PLTE.to(".WorkLine", {
        width: "0%",
      });

      // ── Card Reveal Animation ──────────────────────────────────────
      const cards = gsap.utils.toArray(".work-card", GridRef.current);
      gsap.set(cards, { opacity: 0, y: 40 });
      ScrollTrigger.batch(cards, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }),
      });
    });

    return () => ctx.revert();
  }, []);

  // Only play previews that are on (or near) screen — 17 videos never decode at once
  useEffect(() => {
    const videos = GridRef.current?.querySelectorAll("video");
    if (!videos?.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            visibleVideos.current.add(target);
            target.play().catch(() => {});
          } else {
            visibleVideos.current.delete(target);
            target.pause();
          }
        });
      },
      { rootMargin: "200px 0px" },
    );

    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  // Pause the previews behind the player, resume them on close
  useEffect(() => {
    visibleVideos.current.forEach((v) => (isLightboxOpen ? v.pause() : v.play().catch(() => {})));
  }, [isLightboxOpen]);

  const showPrev = () => setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
  const showNext = () => setActiveIndex((i) => (i + 1) % projects.length);

  return (
    <div
      id="work"
      className={` w-full h-fit WorkCONTDIV relative bg-white px-8 max-sm:px-4 pt-[10vh] pb-[10vh]`}
    >
      {/* <div className="w-full h-fit flex justify-center Font_Main items-center sticky top-0 left-0 mix-blend-difference py-10 z-50">
        <h1 className="text-[5vw] leading-[5vw] max-sm:text-[10vw] max-sm:leading-[10vw]  text-white">[ WORK. ]</h1>
      </div> */}

      {/* Header */}
      <div className="flex items-end justify-between gap-6 mb-8 lg:mb-12">
        <h2 className="Font_Main Text_Color_B uppercase leading-none text-[clamp(1.75rem,3.5vw,3.5rem)]">
          Selected Work
        </h2>
        <p className="Font_Sec Text_Color_B text-sm lg:text-base opacity-60 pb-1 whitespace-nowrap">
          ({String(projects.length).padStart(2, "0")}) Projects
        </p>
      </div>

      {/* Grid — featured tile (2×2) + 16 tiles = 20 cells, which fills 2 / 4 / 5 columns exactly */}
      <ul
        ref={GridRef}
        className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4"
      >
        {projects.map((item, index) => (
          <WorkCard
            key={item.src}
            item={item}
            featured={index === 0}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </ul>

      {/* Portal to <body> so no transformed ancestor can break position: fixed */}
      {isLightboxOpen &&
        createPortal(
          <VideoLightbox
            item={projects[activeIndex]}
            position={activeIndex + 1}
            total={projects.length}
            onClose={() => setActiveIndex(null)}
            onPrev={showPrev}
            onNext={showNext}
          />,
          document.body,
        )}
    </div>
  );
};

function WorkCard({ item, featured, onOpen }) {
  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(null);

  return (
    <li className={`work-card ${featured ? "col-span-2 row-span-2" : ""}`}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Play ${item.title}`}
        className={`group relative block w-full overflow-hidden bg-[#1a1a1a] cursor-pointer text-left ${
          featured ? "aspect-[9/16] md:aspect-auto md:h-full" : "aspect-[9/16]"
        }`}
      >
        <video
          src={item.src}
          muted
          loop
          playsInline
          preload="none"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onLoadedData={() => setReady(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Legibility gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {/* Play button on hover */}
        <span
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white text-[#202020] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ${
            featured ? "size-20" : "size-14"
          }`}
        >
          <svg viewBox="0 0 24 24" className={featured ? "size-7 ml-1" : "size-5 ml-0.5"} fill="currentColor">
            <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
          </svg>
        </span>

        {/* Label */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4 text-white pointer-events-none">
          <span className={`Font_Main leading-none ${featured ? "text-lg sm:text-2xl" : "text-xs sm:text-sm"}`}>
            {item.title}
          </span>
          <span className="text-[10px] sm:text-xs leading-none tabular-nums text-white/70">
            {formatTime(duration)}
          </span>
        </div>
      </button>
    </li>
  );
}

function VideoLightbox({ item, position, total, onClose, onPrev, onNext }) {
  const overlayRef = useRef();
  const closeRef = useRef();

  // Lock page scroll (Lenis + native) while the player is open
  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    const prevFocus = document.activeElement;
    window.lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });

    return () => {
      window.lenis?.start();
      document.documentElement.style.overflow = prevOverflow;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const stop = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0b0b0b]/95"
    >
      {/* Player */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-black"
        style={{ height: "min(84svh, calc(92vw * 16 / 9))", aspectRatio: "9 / 16" }}
      >
        <video
          key={item.src}
          src={item.src}
          autoPlay
          controls
          playsInline
          className="w-full h-full object-contain"
        />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 sm:p-6 text-white pointer-events-none">
        <p className="Font_Main text-sm sm:text-base">
          {item.title}
          <span className="ml-3 text-white/50 tabular-nums">
            {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={stop(onClose)}
          aria-label="Close video"
          className="pointer-events-auto flex items-center justify-center size-11 rounded-full border border-white/25 hover:bg-white hover:text-[#202020] transition-colors cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Prev / Next — bottom bar on phones, sides on larger screens */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-3 p-5 md:top-0 md:justify-between md:items-center md:px-8 pointer-events-none">
        <button
          type="button"
          onClick={stop(onPrev)}
          aria-label="Previous project"
          className="pointer-events-auto flex items-center justify-center size-12 rounded-full border border-white/25 text-white hover:bg-white hover:text-[#202020] transition-colors cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={stop(onNext)}
          aria-label="Next project"
          className="pointer-events-auto flex items-center justify-center size-12 rounded-full border border-white/25 text-white hover:bg-white hover:text-[#202020] transition-colors cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default WorkSection;
