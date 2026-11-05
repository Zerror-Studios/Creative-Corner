"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import SplitText from "gsap/dist/SplitText";
import CustomEase from "gsap/dist/CustomEase";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(SplitText, CustomEase);

const PageLoading = () => {
  CustomEase.create("custom", "0.77, 0, 0.175, 1");

  const container = useRef();

  useGSAP(
    () => {
      const line2Split = new SplitText(".line2a", {
        type: "chars",
        charsClass: "word",
      });

      const line3Split = new SplitText(".line3a", {
        type: "chars",
        charsClass: "word",
      });
      const descSplit = new SplitText(".hero_desc", {
        type: "lines",
        linesClass: "line-wrapper",
      });

      descSplit.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        wrapper.style.width = "fit-content";

        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set([...line2Split.chars, ...line3Split.chars, ...descSplit.lines], {
        yPercent: 100,
      });

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(".line1a", {
        transform: "translateY(-100%)",
        ease: "custom",
        duration: 0.8,
      });
      tl.to(
        ".line2a",
        {
          transform: "translateY(-8%)",
          ease: "custom",
          duration: 0.8,
        },
        "<",
      );
      tl.to(
        line2Split.chars,
        {
          yPercent: 0,
          stagger: 0.025,
          ease: "custom",
        },
        "<0.1",
      );
      tl.to(".line2a", {
        transform: "translateY(-108%)",
        ease: "custom",
        duration: 0.8,
      });
      tl.to(
        ".line3a",
        {
          transform: "translateY(-8%)",
          ease: "custom",
          duration: 0.8,
        },
        "<",
      );
      tl.to(
        line3Split.chars,
        {
          yPercent: 0,
          stagger: 0.01,
          ease: "custom",
        },
        "<0.1",
      );
      // tl.to(".line3a", {
      //   color: "white",
      //   ease: "custom",
      //   duration: 0.8,

      //   onComplete: () => {
      //   gsap.to(container.current, {
      //     opacity: 0,
      //   });
      // },
      // });
      tl.to(".line3a", {
        transform: "translateY(-108%)",
        ease: "custom",
        duration: 0.8,
         onComplete: () => {
         gsap.to(container.current, {
           opacity: 0,
         });
       },
      });
    },
    { scope: container },
  );
  return (
    <div
      ref={container}
      className="w-full h-screen fixed flex justify-center items-center top-0 left-0 z-[1000] bg-white pointer-events-none"
      aria-hidden="true"
    >
      {/* Intro overlay, not a heading — the page's one <h1> is in HeroSection */}
      <div className="text-[2.2vw] md:w-1/2 w-full max-sm:text-[6.5vw]  text-center mx-auto">
        <div className="block overflow-hidden relative w-full">
          <div className="line1a Font_Main text-black w-full text-center">
            Hi
          </div>

          <div className="line2a Font_Main translate-y-full absolute inset-0 text-black w-full text-center">
            We’re
          </div>

          <div className="line3a Font_Main translate-y-full absolute inset-0 text-[#ff0000] w-full text-center">
            Creative Corner
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
