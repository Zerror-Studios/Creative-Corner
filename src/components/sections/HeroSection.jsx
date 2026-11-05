"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  useEffect(() => {
    gsap.to(".mainHomeCont", {
      delay: 4,
      opacity: 1,
      duration: 2,
      ease: "power1.out",
    });

    const mm = gsap.matchMedia();
    const scrollOut = () => ({
      trigger: ".aboutDIV",
      start: "top bottom",
      end: "top 50%", // scroll distance (tweak this)
      scrub: true,
      // markers:true
    });

    // BLUR ON SCROLL (desktop)
    mm.add("(min-width: 1024px)", () => {
      gsap.to(".mainHomeCont", {
        filter: "blur(10px) ", // adjust blur strength
        ease: "none",
        scrollTrigger: scrollOut(),
      });
    });

    // Phones/tablets: a full-screen blur whose radius changes on every scroll frame makes the
    // GPU re-blur the whole layer each frame of the first swipe — that's where the stutter
    // came from. Fade the text out instead (opacity is composited for free). The children
    // are faded, not .mainHomeCont itself, so this doesn't fight the intro fade-in above.
    mm.add("(max-width: 1023px)", () => {
      gsap.to(".mainHomeCont > *", {
        opacity: 0,
        ease: "none",
        scrollTrigger: scrollOut(),
      });
    });

    // Fully covered once About reaches the top — hide the blurred fixed layer so the
    // browser stops compositing it on every scroll frame
    const cover = ScrollTrigger.create({
      trigger: ".aboutDIV",
      start: "top top",
      end: "max",
      toggleClass: { targets: ".mainHomeCont", className: "invisible" },
    });
    return () => {
      cover.kill();
      mm.revert();
    };
  }, []);

  return (
    <div
      id="home"
      className="w-full h-svh flex overflow-hidden mainHomeCont opacity-0 justify-start items-end fixed top-0 left-0 pointer-events-none p-10 max-sm:px-5 z-[-1] "
    >
      <h1 className="text-[7vw] Font_Main leading-[6vw] max-sm:text-[18vw] max-sm:leading-[18vw] Text_Color_A">
        Creative <br /> Corner
        <span className="sr-only"> — digital marketing, influencer marketing and video production agency</span>
      </h1>

      <div className=" absolute w-full h-fit  flex justify-between items-center max-sm:top-[15%] max-sm:gap-2  max-sm:flex  max-sm:flex-col top-1/2 left-1/2 pointer-events-none -translate-x-1/2 -translate-y-1/2 px-10">
        <p className="Text_Color_B text-[1rem] leading-[1rem] max-w-[18%] max-sm:max-w-[100%] max-sm:hidden ">We Build Digital Experiences That Stand Out.</p>
        <p className="Text_Color_B text-[1rem] leading-[1rem] max-w-[20%] max-sm:max-w-[100%] max-sm:hidden text-end ">We combine creativity with clarity.</p>
        <p className="Text_Color_B text-[1rem] leading-[1rem] max-w-[20%] max-sm:max-w-[100%] sm:hidden pt-10 text-center ">We Build Digital Experiences That Stand Out. We combine creativity with clarity.</p>
      </div>
    </div>
  );
};

export default HeroSection;
