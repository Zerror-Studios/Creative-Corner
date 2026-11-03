"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// All logos are pre-squared (1:1) in /Data/images/square so nothing gets cropped in the grid.
const allPortfolioItems = [
  { id: 1, name: "NexClean", logo: "/Data/images/square/01-nexclean.webp" },
  { id: 2, name: "Urban Walk", logo: "/Data/images/square/02-urban-walk.webp" },
  { id: 3, name: "Sanaa Couture", logo: "/Data/images/square/03-sanaa-couture.webp" },
  { id: 4, name: "Indian Idol", logo: "/Data/images/square/04-indian-idol.webp" },
  { id: 5, name: "HP", logo: "/Data/images/square/05-hp.webp" },
  { id: 6, name: "Samriddhi Group", logo: "/Data/images/square/06-samriddhi-group.webp" },
  { id: 7, name: "Travelling Turtles", logo: "/Data/images/square/07-travelling-turtles.webp" },
  { id: 8, name: "BookMyRun", logo: "/Data/images/square/08-bookmyrun.webp" },
  { id: 9, name: "Saya", logo: "/Data/images/square/09-saya.webp" },
  { id: 10, name: "Nayanoir", logo: "/Data/images/square/10-nayanoir.webp" },
  { id: 11, name: "PW", logo: "/Data/images/square/11-pw.webp" },
  { id: 12, name: "Kia", logo: "/Data/images/square/12-kia.webp" },
  { id: 13, name: "Our Space Studio", logo: "/Data/images/square/13-our-space-studio.webp" },
  { id: 14, name: "Square Yards", logo: "/Data/images/square/14-square-yards.webp" },
  { id: 15, name: "Ashakiran Hospital", logo: "/Data/images/square/15-ashakiran-hospital.webp" },
  { id: 16, name: "GM Gold", logo: "/Data/images/square/16-gm-gold.webp" },
  { id: 17, name: "Richwood", logo: "/Data/images/square/17-richwood.webp" },
  { id: 18, name: "Good Time Holidays", logo: "/Data/images/square/18-good-time-holidays.webp" },
];

export default function PortfolioSection() {
  const HeadCliteTextRef = useRef();
  const GridRef = useRef();
  const HEADING_TEXT_Client = "[ Our Clients. ]";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Text Reveal Animation ──────────────────────────────────────
      const chars = HeadCliteTextRef.current?.querySelectorAll(".char");

      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          {
            yPercent: 110, // start below the clip mask
            opacity: 0,
            rotateX: -60, // subtle 3D tilt for elegance
          },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.04, // each character staggers 40ms apart
            scrollTrigger: {
              trigger: HeadCliteTextRef.current,
              start: "top 80%", // fires when heading enters 80% of viewport
              toggleActions: "play none none reverse",
              scrub: true,
            },
          },
        );
      }

      // ── Grid Reveal Animation ──────────────────────────────────────
      const tiles = GridRef.current?.querySelectorAll(".client-tile");

      if (tiles && tiles.length > 0) {
        gsap.from(tiles, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: { each: 0.05, grid: "auto", from: "start" },
          scrollTrigger: {
            trigger: GridRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    });

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section
      id="clients"
      className="bg-white px-8 max-sm:px-4 py-[10vh] font-sans"
    >
      {/* Header */}
      {/* <div className="flex items-center justify-between mb-[10vh] bg-white">
        <h1
          ref={HeadCliteTextRef}
          className="text-[5vw] uppercase Font_Main  mx-auto leading-[5vw] max-sm:text-[10vw] max-sm:leading-[10vw] Text_Color_A flex overflow-hidden"
          style={{ perspective: "600px" }}
        >
          {HEADING_TEXT_Client.split("").map((char, i) => (
            <span
              key={i}
              className="char inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div> */}

      <div className="flex items-end justify-between gap-6 mb-8 lg:mb-12">
        <h2 className="Font_Main Text_Color_B uppercase leading-none text-[clamp(1.75rem,3.5vw,3.5rem)]">
          Our Clients
        </h2>
      </div>

      {/* Grid — 2 / 3 / 6 columns so all 18 tiles always fill complete rows */}
      <ul
        ref={GridRef}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4"
      >
        {allPortfolioItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}

function PortfolioCard({ item }) {
  return (
    <li className="client-tile relative aspect-square overflow-hidden bg-gray-100 group">
      <img
        src={item.logo}
        alt={item.name}
        width={1200}
        height={1200}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />

      {/* Hairline edge so white logos don't melt into the white page */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/[0.07]" />
    </li>
  );
}
