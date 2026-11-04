"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AboutUs from "./AboutUs";
import LazyVideo from "../common/LazyVideo";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutSection = () => {
  const section = useRef();
  const track = useRef();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and slide the strip horizontally.
      // Below lg the panels simply stack — no pin, no extra scroll distance.
      // matchMedia reverts / rebuilds this automatically when crossing the breakpoint.
      mm.add("(min-width: 1024px)", () => {
        const distance = () =>
          track.current.scrollWidth - section.current.clientWidth;

        // Vertical scroll needed per px of horizontal travel (0.5 = half, ~3 wheel scrolls instead of ~6)
        const scrollRatio = 0.3;

        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance() * scrollRatio}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        });
      });

      // Navbar "About" underline (lives outside this section, so no selector text)
      gsap.to(document.querySelectorAll(".AboutLine"), {
        width: "100%",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "top top",
          scrub: true,
        },
      });
    },
    { scope: section },
  );

  return (
    <section
      id="about"
      ref={section}
      className="aboutDIV relative w-full mt-[100vh] bg-white overflow-x-clip lg:h-screen lg:overflow-hidden"
    >
      <div
        ref={track}
        className="flex flex-col lg:flex-row lg:w-max lg:h-full lg:will-change-transform"
      >
        {/* Reel-1 */}
        <Reel src={`/Data/IMG_4843.mp4`} poster={`/Data/posters/IMG_4843-first.webp`} />

        {/* Reel-2: photo collage */}
        <div className="w-full flex justify-center items-center py-12 px-4 sm:px-8 lg:w-[80vw] lg:h-full lg:p-0 lg:shrink-0">
          <PhotoCollage />
        </div>

        {/* Reel-3 */}
        <Reel src={`/Data/IMG_4842.mp4`} poster={`/Data/posters/IMG_4842-first.webp`} />

        <AboutUs />
      </div>
    </section>
  );
};

/* ─── Video Reel ─── */
// Loads only once it's on screen (these are 10–14MB each and used to download at page open)
const Reel = ({ src, poster }) => (
  <div className="w-full aspect-[3/4] max-h-svh overflow-hidden lg:w-[40vw] lg:h-full lg:max-h-none lg:aspect-auto lg:shrink-0">
    <LazyVideo
      src={src}
      poster={poster}
      className="w-full h-full object-cover object-center"
    />
  </div>
);

/* ─── Photo Collage ─── */
const words = [
  {
    text: "CR",
    style: { gridColumn: "1 / 6", gridRow: "1 / 4", paddingBottom: "4px" },
    className:
      "items-end text-[clamp(2rem,10vw,3.5rem)] lg:text-[clamp(3.5rem,8vw,10rem)]",
  },
  {
    text: "EAT",
    style: { gridColumn: "6 / 13", gridRow: "4 / 7" },
    className:
      "items-center justify-end text-[clamp(1.8rem,9vw,3rem)] lg:text-[clamp(3rem,7vw,9rem)]",
  },
  {
    text: "IVE",
    style: { gridColumn: "1 / 9", gridRow: "8 / 11", paddingTop: "4px" },
    className:
      "items-start text-[clamp(1.8rem,9vw,3rem)] lg:text-[clamp(3rem,7vw,9rem)]",
  },
];

// WebP copies of the 1920px JPGs, scaled to 900px on the short side (~2x the largest grid
// cell on a retina screen): 2.3MB → 0.36MB for all seven
const photos = [
  { src: "/img/about/img1.webp", gridColumn: "6 / 13", gridRow: "1 / 4" },
  { src: "/img/about/img2.webp", gridColumn: "1 / 7", gridRow: "4 / 7" },
  { src: "/img/about/img3.webp", gridColumn: "1 / 6", gridRow: "7 / 11" },
  { src: "/img/about/img4.webp", gridColumn: "9 / 13", gridRow: "4 / 8" },
  { src: "/img/about/img5.webp", gridColumn: "6 / 10", gridRow: "7 / 10" },
  { src: "/img/about/img6.webp", gridColumn: "10 / 13", gridRow: "8 / 11" },
  { src: "/img/about/img7.webp", gridColumn: "6 / 10", gridRow: "5 / 7" },
];

const PhotoCollage = () => (
  <div className="relative grid grid-cols-12 grid-rows-10 gap-1 w-full max-w-[600px] h-[clamp(340px,80vw,480px)] lg:max-w-none lg:w-[clamp(420px,58vw,700px)] lg:h-[clamp(480px,80vh,820px)]">
    {words.map(({ text, style, className }) => (
      <div
        key={text}
        className={`hl-word Text_Color_A Font_Main flex z-[2] ${className}`}
        style={style}
      >
        {text}
      </div>
    ))}

    {photos.map(({ src, gridColumn, gridRow }) => (
      <div key={src} className="overflow-hidden" style={{ gridColumn, gridRow }}>
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover grayscale"
        />
      </div>
    ))}
  </div>
);

export default AboutSection;
