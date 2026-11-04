"use client";
import React, { useEffect } from "react";
import BrandingSection from "./BrandingSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// `angle` places the pill on the desktop circle. On mobile there's no room beside the
// headline, so `mobile` puts it on the inner (32vw) or middle (52vw) ring above/below it.
const orbitItems = [
  { text: "A lack of clear strategy behind your content efforts.", angle: 20, mobile: { angle: 45, radius: "32vw" } },
  { text: "Campaigns that feel forced instead of authentic.", angle: 70, mobile: { angle: 65, radius: "52vw" } },
  { text: "No clear performance insights.", angle: 120, mobile: { angle: 115, radius: "52vw" } },
  { text: "Content that looks good but fails to perform.", angle: 160, mobile: { angle: 135, radius: "32vw" } },
  { text: "Brands blending in instead of standing out online.", angle: 210, mobile: { angle: 225, radius: "32vw" } },
  { text: "Ideas without execution.", angle: 250, mobile: { angle: 245, radius: "52vw" } },
  { text: "Brands blending in instead of standing out online.", angle: 300, mobile: { angle: 295, radius: "52vw" } },
  { text: "Brands blending in instead of standing out online.", angle: 340, mobile: { angle: 315, radius: "32vw" } },
];

const services = [
  {
    number: "01",
    title: "Digital Marketing",
    category: "Performance",

    headline: `Accelerating growth with performance-driven marketing systems.`,
    subHeadline: `Strategy meets <em>execution</em> for real <em>results.</em>`,

    capsules: [
      ["Paid ads", "Campaign strategy", "Audience targeting"],
      ["Funnels", "Landing pages", "Conversion optimization"],
      ["Email marketing", "Automation", "Growth scaling"],
    ],
    data: [
      {
        value: "5+",
        unit: "years",
        description:
          "Experience designing websites for brands across lifestyle, wellness, and professional services industries.",
      },
      {
        value: "225+",
        unit: "projects",
        description:
          "Successfully launched from ideation through complex, custom builds.",
      },
      {
        value: "145+",
        unit: "happy clients",
        description:
          "Many of whom return for new collaborations, referrals, or ongoing design support.",
      },
      {
        value: "99%",
        unit: "satisfaction",
        description:
          "Based on client feedback collected over the last two years.",
      },
    ],
  },
  ,
  {
    number: "02",
    title: "Influencer Marketing",
    category: "Marketing",

    headline: `We're brand catalysts, supercharging your transformation with design.`,
    subHeadline: `Smart <em>living</em> starts with smart <em>building.</em>`,

    capsules: [
      [
        "Campaign strategy",
        "Influencer research",
        "Creator partnerships",
        "Brand collaborations",
      ],
      [
        "Content planning",
        "UGC creation",
        "Reels & short-form",
        "Platform targeting",
      ],
      ["Performance tracking", "Analytics", "ROI measurement"],
    ],
    data: [
      {
        value: "5+",
        unit: "years",
        description:
          "Experience designing websites for brands across lifestyle, wellness, and professional services industries.",
      },
      {
        value: "120+",
        unit: "projects",
        description:
          "Successfully launched from ideation through complex, custom builds.",
      },
      {
        value: "45+",
        unit: "happy clients",
        description:
          "Many of whom return for new collaborations, referrals, or ongoing design support.",
      },
      {
        value: "99%",
        unit: "satisfaction",
        description:
          "Based on client feedback collected over the last two years.",
      },
    ],
  },

  {
    number: "03",
    title: "Video Production",
    category: "Content",

    headline: `Crafting stories that capture attention and drive engagement.`,
    subHeadline: `Content that <em>moves</em> people, performs <em>better.</em>`,

    capsules: [
      ["Video strategy", "Storyboarding", "Creative direction"],
      ["Editing", "Motion graphics", "Sound design"],
      ["Ads production", "Reels", "YouTube optimization"],
    ],
    data: [
      {
        value: "5+",
        unit: "years",
        description:
          "Experience designing websites for brands across lifestyle, wellness, and professional services industries.",
      },
      {
        value: "500+",
        unit: "projects",
        description:
          "Successfully launched from ideation through complex, custom builds.",
      },
      {
        value: "100+",
        unit: "happy clients",
        description:
          "Many of whom return for new collaborations, referrals, or ongoing design support.",
      },
      {
        value: "99%",
        unit: "satisfaction",
        description:
          "Based on client feedback collected over the last two years.",
      },
    ],
  },

  {
    number: "04",
    title: "Website Development",
    category: "Development",

    headline: `Building scalable, high-performance digital experiences.`,
    subHeadline: `Great <em>products</em> begin with strong <em>foundations.</em>`,

    capsules: [
      ["UI/UX design", "Wireframing", "Prototyping", "User flows"],
      ["Frontend development", "Backend systems", "API integration"],
      ["E-commerce", "CMS setup", "Performance optimization"],
    ],
    data: [
      {
        value: "5+",
        unit: "years",
        description:
          "Experience designing websites for brands across lifestyle, wellness, and professional services industries.",
      },
      {
        value: "80+",
        unit: "projects",
        description:
          "Successfully launched from ideation through complex, custom builds.",
      },
      {
        value: "50+",
        unit: "happy clients",
        description:
          "Many of whom return for new collaborations, referrals, or ongoing design support.",
      },
      {
        value: "99%",
        unit: "satisfaction",
        description:
          "Based on client feedback collected over the last two years.",
      },
    ],
  },
];

const Strategic = () => {
  useEffect(() => {
    const mm = gsap.matchMedia();
    const breakpoints = {
      isMobile: "(max-width: 639px)",
      isDesktop: "(min-width: 640px)",
    };
    mm.add(breakpoints, ({ conditions }) => {
      const PreTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".CONTMAINSTRATEGIC",
          start: "top top",
          end: "top -100%",
          scrub: true,
        },
      });
      PreTL.to(".BorderClr", {
        opacity: 1,
        stagger: 0.5,
        ease: "none",
      });
      PreTL.to(".ContDivList", {
        opacity: 1,
        stagger: 0.5,
        ease: "none",
      });

      // =======================================
      const ATL = gsap.timeline({
        scrollTrigger: {
          trigger: ".CONTMAINSTRATEGIC",
          start: "top -100%",
          end: "bottom bottom",
          scrub: true,
        },
      });
      // Mobile pills sit above/below the headline, so spinning them would sweep them across it
      if (!conditions.isMobile) {
        ATL.to(".ContDivListCOVER", {
          rotateZ: "90deg",
          ease: "none",
        });
        ATL.to(
          ".ContDivList",
          {
            rotateZ: "-90deg", // counter-rotate each pill to keep text upright
            ease: "none",
          },
          "<",
        ); //
      }
      ATL.to(
        ".ContDivList",
        {
          scale: 0, // counter-rotate each pill to keep text upright
          translate: 0,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "a1",
      );
      ATL.to(
        ".BorderClr ",
        {
          opacity: 0, // counter-rotate each pill to keep text upright
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "a1",
      );
      const cards = gsap.utils.toArray(".EXPDIV");
      cards.forEach((card, i) => {
        ATL.to(card, {
          top: "0%",
          ease: "none",
          onUpdate: function () {
            // When this card is animating in, blur the one below it
            if (i > 0) {
              const progress = this.progress();
              gsap.set(cards[i - 1], {
                filter: `blur(${progress * 6}px)`,
                scale: 1 - progress * 0.03,
                // opacity: 1 - progress * 0.4,
              });
            }
          },
        });
      });
      ATL.to(".StrategicText", {
        opacity: 0,
        duration: 0.5,
        ease: "none",
      });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const OLT1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".CONTMAINSTRATEGIC",
        start: "top top",
        end: "top top",
        scrub: true,
      },
    });
    OLT1.to(".AboutLine", {
      width: "0%",
    });
    OLT1.to(".ExpertiseLine", {
      width: "100%",
    });
  }, []);

  return (
    <div id="services" className="w-full h-[600vh] relative CONTMAINSTRATEGIC ">
      <div className="w-full h-svh BGRED overflow-hidden sticky top-0 left-0 flex justify-center items-center">
        {/* Center Text */}
        <div className="absolute text-center z-[-4] max-w-[420px]">
          <h1 className="text-white text-[max(2vw,1.25rem)] max-sm:text-[5vw] StrategicText  z-[-1] leading-[max(2vw,1.25rem)] max-sm:leading-[5vw] font-semibold tracking-tight">
            Strategic Social Media
            <br />
            Growth for Today’s
            <br />
            Brands.
          </h1>
        </div>

        {/* Back ORBIT — --orbit-r is 320px on desktop, shrinking so the circle + pills fit shorter/narrower screens */}
        <div className=" w-full h-screen flex justify-center items-center [--orbit-r:min(320px,calc(50svh_-_50px),calc(50vw_-_120px))]">
          {/* INNER DOTTED CIRCLE */}
          <div className="absolute size-[calc(var(--orbit-r)*1.125)] max-sm:size-[64vw]  BorderClr opacity-0 rounded-full border border-dashed border-[#e6e6e6]/40"></div>

          {/* MIDDLE CIRCLE */}
          <div className="absolute size-[calc(var(--orbit-r)*1.625)] max-sm:size-[104vw]  BorderClr opacity-0 rounded-full border border-[#e6e6e6]/40"></div>

          {/* OUTER CIRCLE */}
          <div className="absolute size-[calc(var(--orbit-r)*2.25)] max-sm:size-[150vw]   BorderClr opacity-0 rounded-full border border-[#e6e6e6]/40"></div>

          {/* ORBIT ITEMS */}
          <div className="absolute w-[720px] h-[720px] ContDivListCOVER ">
            {orbitItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2   translate-x-[-50%] translate-y-[-50%] hover:z-10 [transform:rotate(var(--angle))_translate(var(--orbit-r))_rotate(calc(-1*var(--angle)))] max-sm:[transform:rotate(var(--m-angle))_translate(var(--m-radius))_rotate(calc(-1*var(--m-angle)))]"
                  style={{
                    "--angle": `${item.angle}deg`,
                    "--m-angle": `${item.mobile.angle}deg`,
                    "--m-radius": item.mobile.radius,
                  }}
                >
                  {/* GSAP animates ContDivList, so hover styles live on the inner card */}
                  <div className="ContDivList opacity-0">
                    <div className="group relative overflow-hidden bg-white text-[#ED1E24] max-w-[200px] max-sm:max-w-[40vw] flex flex-wrap max-sm:items-center max-sm:min-h-[calc(3lh+0.75rem)] text-[13px] max-sm:text-[11.5px] max-sm:leading-[1.35] px-4 max-sm:px-3 py-2 max-sm:py-1.5 rounded-md shadow-md cursor-default transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-[#202020] hover:text-white hover:shadow-xl hover:shadow-black/30">
                      {/* Shine sweep on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out pointer-events-none" />
                      <span className="relative">{item.text}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {services.map((data, index) => {
          return (
            <BrandingSection
              nameDiv={`EXPDIV absolute left-0  `}
              data={data}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Strategic;
