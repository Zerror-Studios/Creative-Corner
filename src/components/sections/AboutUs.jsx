"use client";
import { Fragment } from "react";

const content = [
  "Welcome to Creative Corner — a passionate",
  "team of digital marketing strategists, creatives",
  "and tech savvy experts dedicated to helping",
  "brands thrive in the ever-evolving world of social",
  "media and online marketing.",
  "Founded with a vision to",
  "empower businesses with",
  "powerful digital tools, we",
  "blend creativity with data-driven strategies to",
  "deliver measurable results. Whether you're a",
  "startup or a growing enterprise, we craft",
  "customized campaigns that speak your brand's",
  "language and drive real impact.",
];

// Lines indented on desktop to leave room for the two photos
const PHOTO_LINES = [4, 5, 6, 7];
// Mobile: the photos sit as a row before this line (between the two sentences)
const PHOTO_ROW_BEFORE = 5;

const AboutUs = () => {
  return (
    <div className="w-full flex items-center relative BGRED text-white px-5 py-16 sm:px-10 sm:py-20 lg:w-screen lg:h-screen lg:shrink-0 lg:justify-around lg:p-0">
      <div className="w-full h-fit flex flex-col lg:flex-row lg:justify-around">
        <div className="text-[clamp(1rem,4.5vw,1.5rem)] leading-[1.25] lg:text-[1.5vw] lg:leading-[1.5vw] lg:pt-[10vh]">
          Hi, nice to meet you. <br /> This is the part where <br /> We talk
          about OurSelf.

          <div className="w-[10vw] h-[10vw] max-w-14 max-h-14 mt-2 mb-8 overflow-hidden lg:w-[3vw] lg:h-[3vw] lg:max-w-none lg:max-h-none lg:mb-0">
            <img src={`/img/logo/icon.png`} alt="" className="w-full h-full object-cover object-center" />
          </div>
        </div>

        {/* Mobile: one flowing paragraph, the photos as a full-width row between its sentences.
            Desktop: fixed lines, photos absolutely placed in the indented gap. */}
        <p className="relative text-[clamp(1.375rem,6.5vw,2.5rem)] leading-[1.15] lg:flex lg:flex-col lg:w-fit lg:text-[2vw] lg:leading-[2.5vw]">
          {content.map((line, i) => (
            <Fragment key={i}>
              {i === PHOTO_ROW_BEFORE && (
                <span className="grid grid-cols-2 gap-3 max-w-md my-6 sm:gap-4 sm:my-8 lg:contents">
                  <img
                    src={`/img/about/img3.webp`}
                    alt="Model with curly hair posing for a fashion shoot"
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-8/9 object-cover object-center lg:absolute lg:top-[10.5vw] lg:left-0 lg:w-[8vw] lg:h-[9vw] lg:aspect-auto"
                  />
                  <img
                    src={`/img/about/img1.webp`}
                    alt="Filming a reel on a smartphone"
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-8/9 object-cover object-center lg:absolute lg:top-[10.5vw] lg:left-[9vw] lg:w-[8vw] lg:h-[9vw] lg:aspect-auto"
                  />
                </span>
              )}
              <span
                className={`AboutLineDiv${i + 1} ${PHOTO_LINES.includes(i) ? "lg:pl-[18vw]" : ""}`}
              >
                {line}
              </span>{" "}
            </Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
