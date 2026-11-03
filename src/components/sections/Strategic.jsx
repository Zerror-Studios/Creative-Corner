"use client";
import React, { useEffect } from "react";
import BrandingSection from "./BrandingSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const orbitItems = [
  { text: "A lack of clear strategy behind your content efforts.", angle: 20 },
  { text: "Campaigns that feel forced instead of authentic.", angle: 70 },
  { text: "No clear performance insights.", angle: 120 },
  { text: "Content that looks good but fails to perform.", angle: 160 },
  { text: "Brands blending in instead of standing out online.", angle: 210 },
  { text: "Ideas without execution.", angle: 250 },
  { text: "Brands blending in instead of standing out online.", angle: 300 },
  { text: "Brands blending in instead of standing out online.", angle: 340 },
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
          <h1 className="text-white text-[2vw]  max-sm:scale-[2.5] StrategicText  z-[-1] leading-[2vw] font-semibold tracking-tight">
            Strategic Social Media
            <br />
            Growth for Today’s
            <br />
            Brands.
          </h1>
        </div>

        {/* Back ORBIT */}
        <div className=" w-full h-screen flex justify-center scale-[1] max-sm:scale-[0.5] items-center">
          {/* INNER DOTTED CIRCLE */}
          <div className="absolute w-[360px] h-[360px]  BorderClr opacity-0 rounded-full border border-dashed border-[#e6e6e6]/40"></div>

          {/* MIDDLE CIRCLE */}
          <div className="absolute w-[520px] h-[520px]  BorderClr opacity-0 rounded-full border border-[#e6e6e6]/40"></div>

          {/* OUTER CIRCLE */}
          <div className="absolute w-[720px] h-[720px]   BorderClr opacity-0 rounded-full border border-[#e6e6e6]/40"></div>

          {/* ORBIT ITEMS */}
          <div className="absolute w-[720px] h-[720px] ContDivListCOVER ">
            {orbitItems.map((item, i) => {
              const radius = 320;

              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2   translate-x-[-50%] translate-y-[-50%] hover:z-10"
                  style={{
                    transform: `
                  rotate(${item.angle}deg)
                  translate(${radius}px)
                  rotate(-${item.angle}deg)
                `,
                  }}
                >
                  {/* GSAP animates ContDivList, so hover styles live on the inner card */}
                  <div className="ContDivList opacity-0">
                    <div className="group relative overflow-hidden bg-white text-[#ED1E24] max-w-[200px] flex flex-wrap text-[13px] px-4 py-2 rounded-md shadow-md cursor-default transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-[#202020] hover:text-white hover:shadow-xl hover:shadow-black/30">
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
