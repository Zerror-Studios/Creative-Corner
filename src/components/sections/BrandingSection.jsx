"use client";

import { useEffect, useRef } from "react";
import AnimatedTitle from "../common/AnimatedTitle";

const services = [
  [
    "Brand architecture",
    "Brand positioning",
    "Naming",
    "Brand strategy",
    "Brand development",
  ],
  [
    "Brand identity",
    "Brand implementation",
    "Wayfinding",
    "Iconography",
    "Illustration",
  ],
  ["3D", "Print", "Editorial design", "Type design"],
];

export default function BrandingSection({ nameDiv, data }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Neue+Haas+Grotesk+Display+Pro:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .branding-section {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          min-height: 100vh;
          // position: relative;
          overflow: hidden;
        }

        .number-display {
         
          font-size: clamp(50px, 8vw, 320px);
       
          line-height: 0.85;
          color: #0a0a0a;
          letter-spacing: -0.04em;
          user-select: none;
        }

        .headline {
          
          // font-size: clamp(28px, 4vw, 62px);
        //   font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #0a0a0a;
        }

        .category-label {
          font-weight: 400;
          letter-spacing: 0.04em;
          text-transform: none;
        }

        .service-item {
        
          color: #888;
          font-weight: 400;
          margin-top: 4px;
          line-height: 1.9;
          transition: color 0.2s ease;
          cursor: default;
        }

        .service-item:hover {
          color: #0a0a0a;
        }

        .mock-browser {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.04),
            0 8px 24px rgba(0,0,0,0.08),
            0 24px 64px rgba(0,0,0,0.06);
          width: 100%;
          max-width: 340px;
          position: relative;
        }

        .browser-bar {
          background: #f0f0ee;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .browser-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }

        .browser-content {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .browser-overlay-1 {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 90px;
          height: 100px;
          background: #3b4eff;
          transform: rotate(-5deg);
          opacity: 0.9;
        }

        .browser-overlay-2 {
          position: absolute;
          bottom: -5px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: #00d4aa;
          border-radius: 2px;
          opacity: 0.85;
        }

        .browser-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 80%;
        }

        .browser-text h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255,255,255,0.9);
          line-height: 1.5;
          letter-spacing: -0.01em;
        }

        .browser-text em {
          font-style: italic;
          font-weight: 500;
        }

        .divider {
          height: 1px;
          background: #e0e0dc;
          width: 100%;
        }

        /* Reveal animations */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }
        .reveal-delay-5 { transition-delay: 0.5s; }
        .reveal-delay-6 { transition-delay: 0.6s; }

        .number-reveal {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .number-reveal.animate-in {
          opacity: 1;
          transform: translateX(0);
        }

        /* Mobile: the card is exactly one screen tall (content centred), tighter service list */
        @media (max-width: 639px) {
          .branding-section {
            min-height: 0;
          }

          .service-item {
            line-height: 1.4;
            margin-top: 6px;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`branding-section w-full  px-8 md:px-5 max-sm:px-5 pt-16 max-sm:pt-20 z-40 pb-20 max-sm:pb-8 max-sm:h-svh max-sm:flex max-sm:flex-col max-sm:justify-center-safe abasolute ${nameDiv} top-[100%] left-0 `}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-0 ">
          {/* Big Number */}
          <div className="number-reveal mt-auto  reveal max-sm:hidden">
            <span className="number-display ">{data.number}</span>
          </div>

          {/* Category label top center-ish */}
          <div
            className="reveal reveal-delay-1 mr-auto max-w-[30vw] max-sm:hidden "
            style={{ position: "absolute", left: "1.5%", top: "15vh" }}
          >
            <span className="category-label Text_Color_A  Font_Main text-[5vw] leading-[5vw] uppercase">
              {data.title}
            </span>
          </div>

          {/* Right side: headline + mock browser */}
          <div
            className="flex flex-col  gap-10 max-sm:gap-6 max-sm:w-full sm:w-[58%] pt-[8vh] max-sm:pt-0 "
            // style={{ maxWidth: "58%", paddingTop: "8px" }}
          >
            {/* Headline */}

            <div className=" sm:w-full h-fit flex flex-col justify-center items-center max-sm:gap-[2vh]">

            <span className="category-label Text_Color_A sm:hidden  text-center Font_Main text-[7vw] leading-[7vw] uppercase">
              {data.title}
            </span>

            <h2 className="headline reveal reveal-delay-2 text-[3vw] leading-[3vw] max-sm:text-[5vw] max-sm:leading-[5vw]   max-sm:text-center Font_Main">
              {data.headline}
            </h2>
            </div>

            {/* Mock Browser */}
            <div
              className="reveal reveal-delay-3 max-sm:justify-center max-sm:items-center"
              style={{ marginLeft: "2px" }}
            >
              <div className="grid grid-cols-2 gap-2 max-w-2xl max-lg:w-full w-[70%]">
                {data.data.map((stat, index) => (
                  <div
                    key={index}
                    className="group bg-[#ED1E24] rounded-sm p-5 max-sm:p-4 flex flex-col gap-2 shadow-sm cursor-default relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/30 hover:bg-[#FF2A30]"
                  >
                    {/* Animated shine sweep on hover */}
                    <div
                      className={`absolute inset-0 -translate-x-full group-hover:translate-x-full  bg-gradient-to-r from-transparent via-white/10 to-transparent  transition-transform duration-700 ease-in-out pointer-events-none`}
                    />

                    {/* Subtle bottom border accent that expands on hover */}
                    <div
                      className="absolute bottom-0 left-0 h-[3px] bg-white/40 w-0s  group-hover:w-full transition-all duration-300 ease-out"
                    />

                    {/* Value + Unit row */}
                    <div className="flex items-baseline gap-3 max-lg:flex-col max-lg:items-start max-sm:items-center max-lg:gap-1.5">
                      <span
                        className="text-[3vw] max-sm:text-[7vw] text-white font-black tracking-tight text-whites    leading-none transition-transform duration-300 group-hover:scale-105 origin-left max-sm:origin-center"
                      >
                        {stat.value}
                      </span>
                      <span
                        className="text-sm max-sm:text-[11px] font-medium text-white uppercase tracking-widests    transition-all duration-300 group-hover:text-white group-hover:tracking-[0.2em]"
                      >
                        {stat.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="divider reveal reveal-delay-4" />

            {/* Services grid */}
            <div className="grid grid-cols-3 gap-x-12 max-lg:gap-x-6 max-sm:gap-x-4 reveal reveal-delay-5">
              {data.capsules.map((col, ci) => (
                <ul key={ci}>
                  {col.map((item, ii) => (
                    <div key={ii}>
                      {/* Hover title glitches when it wraps in narrow columns, and touch screens can't hover anyway */}
                      <li className="service-item max-lg:hidden flex flex-col gap-2  text-[16px]">
                        <AnimatedTitle text={item} />
                      </li>
                      <li className="service-item lg:hidden flex flex-col gap-2  text-[15px] max-sm:text-[13px]">
                        {item}
                      </li>
                    </div>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
