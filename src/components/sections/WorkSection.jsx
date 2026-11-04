"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContact } from "../contexts/ContactContext";

gsap.registerPlugin(ScrollTrigger);

// Rename the titles freely. Each card shows the reel's first frame and peeks at the
// middle frame on hover. Reels that open on a black frame (blankStart) use the middle
// frame as the cover instead. Posters live in /Data/posters, durations are in seconds.
const projects = [
  { title: "Project 01", id: "IMG_0593", duration: 30 },
  { title: "Project 02", id: "IMG_2510", duration: 26 },
  { title: "Project 03", id: "IMG_2967", duration: 44 },
  { title: "Project 04", id: "IMG_4842", duration: 58 },
  { title: "Project 05", id: "IMG_4843", duration: 95 },
  { title: "Project 06", id: "IMG_6359", duration: 21 },
  { title: "Project 07", id: "IMG_7148", duration: 44 },
  { title: "Project 08", id: "IMG_7162", duration: 29 },
  { title: "Project 09", id: "IMG_7483", duration: 18 },
  { title: "Project 10", id: "IMG_8224", duration: 35 },
  { title: "Project 11", id: "IMG_8225", duration: 35, blankStart: true },
  { title: "Project 12", id: "IMG_8228", duration: 39, blankStart: true },
  { title: "Project 13", id: "IMG_8500", duration: 48 },
  { title: "Project 14", id: "IMG_8900", duration: 21 },
  { title: "Project 15", id: "IMG_8924", duration: 26, blankStart: true },
  { title: "Project 16", id: "IMG_8992", duration: 48 },
  { title: "Project 17", id: "IMG_9995", duration: 70 },
].map(({ id, blankStart, ...item }) => ({
  ...item,
  src: `/Data/${id}.mp4`,
  poster: `/Data/posters/${id}-${blankStart ? "mid" : "first"}.webp`,
  preview: blankStart ? null : `/Data/posters/${id}-mid.webp`,
}));

const formatTime = (s) =>
  Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "";

const pad = (n) => String(n).padStart(2, "0");

// Phone rail helpers — where card i sits in the rail, and which card is nearest a scroll position
const cardLeft = (rail, i) => rail.children[i].offsetLeft - rail.children[0].offsetLeft;

const nearestCard = (rail, left = rail.scrollLeft) => {
  if (left >= rail.scrollWidth - rail.clientWidth - 2) return rail.children.length - 1;
  let best = 0;
  for (let i = 1; i < rail.children.length; i++) {
    if (Math.abs(cardLeft(rail, i) - left) < Math.abs(cardLeft(rail, best) - left)) best = i;
  }
  return best;
};

const scrollToCard = (rail, i) => {
  const left = Math.min(cardLeft(rail, i), rail.scrollWidth - rail.clientWidth);
  rail.scrollTo({ left, behavior: "smooth" });
  return left;
};

const WorkSection = () => {
  const GridRef = useRef();
  const [activeIndex, setActiveIndex] = useState(null);
  const [muted, setMuted] = useState(false);
  const [railIndex, setRailIndex] = useState(0);

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

  // Phone rail: which card is snapped to the left edge (the last index is the CTA tile)
  const onRailScroll = (e) => {
    const rail = e.currentTarget;
    if (rail.scrollWidth > rail.clientWidth) setRailIndex(nearestCard(rail));
  };

  const goToCard = (i) => scrollToCard(GridRef.current, Math.max(0, Math.min(i, projects.length)));

  // Touch swipes scroll the rail natively. A mouse can't, so drag it by hand — this covers
  // desktop browsers shrunk to phone width and DevTools without touch emulation.
  const dragRef = useRef(null);
  const draggedRef = useRef(false);

  const onRailPointerDown = (e) => {
    const rail = e.currentTarget;
    draggedRef.current = false;
    if (e.pointerType !== "mouse" || e.button !== 0 || rail.scrollWidth <= rail.clientWidth) return;
    dragRef.current = { x: e.clientX, left: rail.scrollLeft };
  };

  const onRailPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    const rail = e.currentTarget;
    const dx = e.clientX - drag.x;
    if (!draggedRef.current) {
      if (Math.abs(dx) < 6) return;
      draggedRef.current = true;
      rail.setPointerCapture(e.pointerId);
      rail.style.scrollSnapType = "none"; // mandatory snap would fight every scrollLeft write
    }
    rail.scrollLeft = drag.left - dx;
  };

  const onRailPointerUp = (e) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || !draggedRef.current) return;
    const rail = e.currentTarget;
    const dx = e.type === "pointercancel" ? 0 : e.clientX - drag.x;

    // Settle on the nearest card; a short flick still moves one card
    let index = nearestCard(rail);
    if (Math.abs(dx) > 40 && index === nearestCard(rail, drag.left)) index -= Math.sign(dx);
    scrollToCard(rail, Math.max(0, Math.min(index, rail.children.length - 1)));

    // Snap back on once the glide ends — with a timeout too, since scrollend isn't everywhere
    let restored = false;
    const restoreSnap = () => {
      if (restored) return;
      restored = true;
      rail.style.scrollSnapType = "";
    };
    rail.addEventListener("scrollend", restoreSnap, { once: true });
    setTimeout(restoreSnap, 600);
    // The click that ends a drag must not toggle a reel
    setTimeout(() => (draggedRef.current = false), 0);
  };

  const onRailClickCapture = (e) => {
    if (!draggedRef.current) return;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section
      id="work"
      className="WorkCONTDIV Font_Poppins relative w-full h-fit bg-white text-[#202020] py-20 sm:py-24 lg:py-32"
    >
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between px-5 sm:px-8 lg:px-12 mb-10 lg:mb-14">
        <div>
          <h2 className="mt-4 text-[clamp(2.25rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.03em]">
            Selected Work
          </h2>
        </div>
        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:gap-1.5 text-sm">
          <p className="font-medium tabular-nums">({pad(projects.length)}) Projects</p>
          <p className="text-black/55">Tap any reel to play with sound</p>
        </div>
      </div>

      {/* Swipeable rail on phones, grid from md. 17 reels + the CTA tile fill 3 / 4 / 5 columns exactly. */}
      <ul
        ref={GridRef}
        onScroll={onRailScroll}
        onPointerDown={onRailPointerDown}
        onPointerMove={onRailPointerMove}
        onPointerUp={onRailPointerUp}
        onPointerCancel={onRailPointerUp}
        onClickCapture={onRailClickCapture}
        className="flex gap-3 overflow-x-auto overscroll-x-contain max-md:select-none snap-x snap-mandatory scroll-px-5 sm:scroll-px-8 px-5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 md:gap-4 lg:gap-5 md:overflow-visible lg:px-12"
      >
        {projects.map((item, index) => (
          <WorkCard
            key={item.src}
            item={item}
            isActive={activeIndex === index}
            muted={muted}
            onPlay={() => setActiveIndex(index)}
            onToggleMute={() => setMuted((m) => !m)}
          />
        ))}
        <CtaCard />
      </ul>

      {/* Rail position (phones only) */}
      <div className="md:hidden flex items-center gap-4 px-5 sm:px-8 mt-6 text-xs font-medium tabular-nums text-black/55">
        <span>
          {pad(Math.min(railIndex + 1, projects.length))} / {pad(projects.length)}
        </span>
        <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-black/10">
          <div
            className="absolute inset-y-0 left-0 bg-[#ED1E24] transition-[width] duration-300"
            style={{ width: `${(Math.min(railIndex + 1, projects.length) / projects.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goToCard(railIndex - 1)}
            disabled={railIndex === 0}
            aria-label="Previous reel"
            className="grid place-items-center size-10 rounded-full border border-black/15 text-[#202020] transition-colors active:bg-[#202020] active:text-white disabled:opacity-30 cursor-pointer disabled:cursor-default"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goToCard(railIndex + 1)}
            disabled={railIndex >= projects.length}
            aria-label="Next reel"
            className="grid place-items-center size-10 rounded-full border border-black/15 text-[#202020] transition-colors active:bg-[#202020] active:text-white disabled:opacity-30 cursor-pointer disabled:cursor-default"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

function WorkCard({ item, isActive, muted, onPlay, onToggleMute }) {
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [peek, setPeek] = useState(false);

  // Only one reel plays at a time
  useEffect(() => {
    if (!isActive) videoRef.current?.pause();
  }, [isActive]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // Pause once the card is mostly scrolled away (vertically, or out of the phone rail)
  useEffect(() => {
    if (!playing) return;
    const io = new IntersectionObserver(
      ([entry]) => !entry.isIntersecting && videoRef.current?.pause(),
      { threshold: 0.25 },
    );
    io.observe(videoRef.current);
    return () => io.disconnect();
  }, [playing]);

  // play() runs inside the click so browsers allow sound
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video.paused) return video.pause();
    video.muted = muted;
    setStarted(true);
    setLoading(true);
    onPlay();
    video.play().catch(() => setLoading(false));
  };

  const onTimeUpdate = (e) => {
    const { currentTime, duration } = e.currentTarget;
    if (barRef.current && duration) barRef.current.style.transform = `scaleX(${currentTime / duration})`;
  };

  return (
    <li className="work-card shrink-0 snap-start w-[78vw] max-w-[340px] md:w-auto md:max-w-none">
      <div
        onPointerEnter={(e) => e.pointerType === "mouse" && setPeek(true)}
        className="group relative aspect-[9/16] overflow-hidden  bg-[#1a1a1a]"
      >
        <img
          src={item.poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />

        {/* Middle-frame peek, fetched on first hover only */}
        {item.preview && peek && !started && (
          <img
            src={item.preview}
            alt=""
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-0 scale-[1.04] transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* preload="none": nothing is downloaded until the reel is played */}
        <video
          ref={videoRef}
          src={item.src}
          preload="none"
          playsInline
          loop
          onPlaying={() => {
            setReady(true);
            setPlaying(true);
            setLoading(false);
          }}
          onPause={() => {
            setPlaying(false);
            setLoading(false);
          }}
          onWaiting={() => setLoading(true)}
          onTimeUpdate={onTimeUpdate}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Legibility gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent" />

        {/* Play / pause — the whole card is the hit area */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={`${playing ? "Pause" : "Play"} ${item.title}`}
          className="absolute inset-0 z-[1] cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
        >
          <span
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center size-14 sm:size-16 rounded-full bg-white text-[#ED1E24] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 ${
              playing && !loading
                ? "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                : "opacity-100 scale-100 group-hover:scale-110"
            }`}
          >
            {loading ? (
              <span className="size-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : playing ? (
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-5 sm:size-6 ml-0.5" fill="currentColor">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
              </svg>
            )}
          </span>
        </button>

        {/* Duration */}
        <span className="pointer-events-none absolute right-3 top-3 sm:right-4 sm:top-4 z-[2] rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-medium leading-none tabular-nums text-white backdrop-blur-md">
          {formatTime(item.duration)}
        </span>

        {/* Title + sound toggle */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-3 p-3 sm:p-4 text-white">
          <p className="text-sm sm:text-base font-medium leading-tight">{item.title}</p>
          {started && (
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={muted ? "Unmute sound" : "Mute sound"}
              className="pointer-events-auto grid shrink-0 place-items-center size-10 rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-[#202020] cursor-pointer"
            >
              {muted ? (
                <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                  <path d="m22 9-6 6M16 9l6 6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Progress */}
        {started && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[3px] bg-white/25">
            <div ref={barRef} className="h-full origin-left bg-white" style={{ transform: "scaleX(0)" }} />
          </div>
        )}
      </div>
    </li>
  );
}

function CtaCard() {
  const { setIsContactOpen } = useContact();

  return (
    <li className="work-card shrink-0 snap-start w-[78vw] max-w-[340px] md:w-auto md:max-w-none lg:col-span-3">
      <div className="BGRED relative flex h-full aspect-[9/16] lg:aspect-auto flex-col justify-between overflow-hidden  p-6 sm:p-8 md:p-5 lg:p-12 text-white">
        {/* <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/80">Next up</p> */}
        <div>
          <h3 className="text-[clamp(1.75rem,3.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] max-w-[11ch]">
            Your brand could be next.
          </h3>
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="group mt-6 lg:mt-8 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 md:px-5 lg:px-6 py-3.5 text-sm sm:text-base md:text-sm lg:text-base font-medium text-[#ED1E24] transition-colors duration-300 hover:bg-[#202020] hover:text-white cursor-pointer"
          >
            Start a project
            <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}

export default WorkSection;
