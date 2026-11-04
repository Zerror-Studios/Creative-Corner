"use client";
import React, { useEffect } from "react";
import BrandingSection from "./BrandingSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// `angle` places the pill on the desktop circle.
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

// The phone layout lists the pain points instead of orbiting them. The orbit repeats one
// line three times; the list shows each point once.
const painPoints = [...new Set(orbitItems.map((item) => item.text))];

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
    // Pinned orbit + stacking cards are tablet/desktop only — phones get the static
    // StrategicMobile layout below, so nothing is scroll-driven there.
    mm.add("(min-width: 640px)", () => {
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
    <div id="services" className="w-full h-[600vh] max-sm:h-auto relative CONTMAINSTRATEGIC ">
      <div className="w-full h-svh BGRED overflow-hidden sticky top-0 left-0 flex justify-center items-center max-sm:hidden">
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
                  className="absolute top-1/2 left-1/2   translate-x-[-50%] translate-y-[-50%] hover:z-10 [transform:rotate(var(--angle))_translate(var(--orbit-r))_rotate(calc(-1*var(--angle)))]"
                  style={{ "--angle": `${item.angle}deg` }}
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

      <StrategicMobile />
    </div>
  );
};

// Phones: a plain, non-sticky layout that shows everything at once — the pain points as a
// list on red, then every service in full (stats + all capsules) stacked on white.
function StrategicMobile() {
  const total = services.filter(Boolean).length;

  return (
    <div className="sm:hidden Font_Poppins">
      {/* Intro */}
      <div className="BGRED relative overflow-hidden px-5 pt-20 pb-16 text-white">
        {/* Echo of the desktop orbit rings */}
        <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full border border-white/20" />
        <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-dashed border-white/25" />

        <h2 className="relative max-w-[16ch] text-[clamp(1.875rem,8.5vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
          Strategic Social Media Growth for Today’s Brands.
        </h2>

        {/* The same white boxes as the desktop orbit, wrapping as a cloud. Tapping one darkens
            it like the desktop hover does. */}
        <ul className="relative mt-10 flex flex-wrap gap-2.5">
          {painPoints.map((text) => (
            <li
              key={text}
              className="max-w-full rounded-md bg-white max-sm:w-full px-4 py-2.5 text-[14px] leading-snug text-[#ED1E24] shadow-md shadow-black/15 transition-[background-color,color,transform] duration-300 ease-out active:scale-[0.97] active:bg-[#202020] active:text-white"
            >
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div className="bg-white px-5 text-[#0a0a0a]">
        {services.map((item) => (
          <article key={item.number} className="border-t border-black/10 py-12 first:border-t-0">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-medium tabular-nums tracking-[0.2em] text-[#ED1E24]">
                {item.number} / {String(total).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-black/55">
                {item.category}
              </span>
            </div>

            <h3 className="mt-5 text-[clamp(1.75rem,8vw,2.25rem)] font-semibold uppercase leading-[1.05] tracking-[-0.01em] text-[#ED1E24]">
              {item.title}
            </h3>
            <p className="mt-3 text-[17px] font-medium leading-snug tracking-[-0.01em]">
              {item.headline}
            </p>

            <div className="mt-7 grid grid-cols-2 border-l border-t border-black/10">
              {item.data.map((stat) => (
                <div key={stat.unit} className="border-b border-r border-black/10 px-4 py-4">
                  <p className="text-[1.75rem] font-semibold leading-none tracking-tight text-[#ED1E24]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.15em] text-black/50">
                    {stat.unit}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mt-7 flex flex-wrap gap-2">
              {item.capsules.flat().map((capsule) => (
                <li
                  key={capsule}
                  className="rounded-full border border-black/10 px-3.5 py-2 text-[13px] leading-none text-black/70"
                >
                  {capsule}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Strategic;
