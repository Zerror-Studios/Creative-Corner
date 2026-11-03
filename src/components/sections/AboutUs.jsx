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

const AboutUs = () => {
  return (
    <div className="w-full flex items-center relative BGRED text-white px-5 py-16 sm:px-10 sm:py-20 lg:w-screen lg:h-screen lg:shrink-0 lg:justify-around lg:p-0">
      <div className="w-full h-fit flex flex-col lg:flex-row lg:justify-around">
        <div className="text-[clamp(1rem,4.5vw,1.5rem)] leading-[1.25] lg:text-[1.5vw] lg:leading-[1.5vw] lg:pt-[10vh]">
          Hi, nice to meet you. <br /> This is the part where <br /> We talk
          about OurSelf.

          <div className="w-[10vw] h-[10vw] max-w-14 max-h-14 mt-2 mb-8 overflow-hidden lg:w-[3vw] lg:h-[3vw] lg:max-w-none lg:max-h-none lg:mb-0">
            <img src={`/img/logo/icon.png`} alt="Di" className="w-full h-full object-cover object-center" />
          </div>
        </div>

        {/* Mobile: one flowing paragraph with the photos floated left.
            Desktop: fixed lines, photos absolutely placed in the indented gap. */}
        <p className="relative text-[clamp(1.5rem,6.5vw,2.5rem)] leading-[1.15] lg:flex lg:flex-col lg:w-fit lg:text-[2vw] lg:leading-[2.5vw]">
          {content.map((line, i) => (
            <Fragment key={i}>
              {i === PHOTO_LINES[0] && (
                <span className="float-left flex flex-col gap-2 mr-3 mt-1 mb-1 lg:contents">
                  <img
                    src={`/img/about/img3.jpg`}
                    alt="Owner IMG"
                    decoding="async"
                    className="w-[22vw] max-w-40 aspect-[11/9] object-cover object-center lg:absolute lg:top-[10.5vw] lg:left-0 lg:w-[8vw] lg:h-[9vw] lg:max-w-none lg:aspect-auto"
                  />
                  <img
                    src={`/img/about/img1.jpg`}
                    alt="Owner IMG"
                    decoding="async"
                    className="w-[22vw] max-w-40 aspect-[11/9] object-cover object-center lg:absolute lg:top-[10.5vw] lg:left-[9vw] lg:w-[8vw] lg:h-[9vw] lg:max-w-none lg:aspect-auto"
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
