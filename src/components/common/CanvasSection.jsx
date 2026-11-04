"use client";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import HeroScene from "../scene/HeroScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const CanvasSection = () => {
  const distance = 700;
  const [Fov, setFov] = useState(75);
  const [active, setActive] = useState(true);

  const FovCalc = () => {
    const height = window.innerHeight;
    const fov = 2 * Math.atan(height / (2 * distance)) * (180 / Math.PI);
    setFov(fov);
  };

  useEffect(() => {
    FovCalc();

    const mm = gsap.matchMedia();
    const scrollOut = () => ({
      trigger: ".aboutDIV",
      start: "top bottom",
      end: "top 50%", // scroll distance (tweak this)
      scrub: true,
      // markers: true,
    });

    // BLUR ON SCROLL (desktop)
    mm.add("(min-width: 1024px)", () => {
      gsap.to(".CANVASContMAIN", {
        filter: "blur(10px) ", // adjust blur strength
        ease: "none",
        scrollTrigger: scrollOut(),
      });
    });

    // Phones/tablets: blurring the full-screen WebGL canvas (8 playing video textures) with a
    // radius that changes every scroll frame is the heaviest thing a phone GPU does on this
    // page, right during the first swipe. Fade it back instead — opacity is composited for free.
    mm.add("(max-width: 1023px)", () => {
      gsap.to(".CANVASContMAIN", {
        opacity: 0.45,
        ease: "none",
        scrollTrigger: scrollOut(),
      });
    });

    // black fade
    // CTL.to(
    //   ".overlay",
    //   {
    //     opacity: 0.4,
    //     ease: "none",
    //     scrollTrigger: {
    //       trigger: ".aboutDIV",
    //       start: "top bottom",
    //       end: "top 50%",
    //       scrub: true,
    //     },
    //   },
    //   "c1",
    // );
    

    window.addEventListener("resize", FovCalc);
    return () => {
      window.removeEventListener("resize", FovCalc);
      mm.revert();
    };
  }, []);

  // Once the About section has slid over the hero, none of the canvas is visible. Stop
  // rendering it (and its 8 video textures) and hide the blurred layer until we scroll back.
  useEffect(() => {
    const cover = ScrollTrigger.create({
      trigger: ".aboutDIV",
      start: "top top",
      end: "max",
      onToggle: (self) => setActive(!self.isActive),
    });
    return () => cover.kill();
  }, []);

  return (
    <div className={`w-full h-svh CANVASContMAIN fixed top-0 left-0 overflow-hidden z-[-1] ${active ? "" : "invisible"}`}>
      <div className="overlay absolute w-full h-svh bg-black opacity-0 pointer-events-none"></div>

      {/* dpr capped at 1.5 — 3x phone screens otherwise render 4x the pixels for no visible gain */}
      <Canvas className="w-full h-full canvas-container " dpr={[1, 1.5]} frameloop={active ? "always" : "never"}>
        <PerspectiveCamera makeDefault position={[0, 0, distance]} fov={Fov} />
        <HeroScene active={active} />
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 2 - Math.PI / 6} // up
          // maxPolarAngle={Math.PI / 2 + Math.PI / 6} // down
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default CanvasSection;
