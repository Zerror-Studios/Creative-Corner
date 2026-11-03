

import AnimatedTitle from "../common/AnimatedTitle";

const navLinks = [
  { name: "Work", path: "#work" },
  { name: "About", path: "#about" },
  { name: "Expertise", path: "#services" },
];


export default function Footer() {
  return (
    <main className="min-h-screen BGRED font-sans flex flex-col pt-[10vh]">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="flex flex-col lg:flex-row items-start justify-between gap-10 px-6 sm:pt-10 pb-0">
        {/* Left: headline */}
        <h1 className="text-[clamp(1.5rem,2vw,2vw)] Font_Main leading-[1.1] font-normal text-white max-w-full lg:max-w-[50vw]">
          Let’s collaborate and
          <br />
          take your brand
          <br />
          to the next level!
        </h1>

        {/* Right: video */}
        <div className="flex justify-center lg:justify-end w-full lg:w-auto">
          <div className="w-full max-w-[260px] max-sm:w-[200px] aspect-[3/4] lg:w-[220px] lg:h-[300px] relative overflow-hidden">
            <video
              muted
              loop
              autoPlay
              playsInline
              src={`/Data/IMG_8500.mp4`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="mt-auto BGRED border-t Font_Main border-[#fd6161] w-full">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 py-10">
          {/* Col 1 – Logo */}
          <div className="flex justify-center lg:justify-start">
            <div className="h-[50px] font-bold text-white max-sm:text-[#202020] mix-blend-normal">
              <img
                src={`/img/logo/logo.webp`}
                alt="IMG"
                className=" h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Col 2 – Contact */}
          <div className="flex flex-col gap-3 text-center sm:text-left text-white lg:text-right lg:items-end ">
            <a href="mailto:contact-us@yourcreativecorner.com">
              {" "}
              <AnimatedTitle text={`contactus@yourcreativecorner.com`} />
            </a>
            <a
              href="https://wa.me/917559410689"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp: +917559410689"
            >
              {" "}
              <AnimatedTitle text={`+917559410689`} />
            </a>
            <a href="tel:+917738938443">
              {" "}
              <AnimatedTitle text={`+917738938443`} />
            </a>
            {/* <AnimatedTitle text={`Address: 101 73rd St, North Bergen`} /> */}
          </div>

          {/* Col 3 – Nav */}
          <div className="flex flex-col gap-2 items-center sm:items-start text-white lg:items-end text-center sm:text-left lg:text-right">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="w-fit h-[1.2rem] text-[1rem] leading-[1.2rem] max-sm:ml-auto flex flex-col overflow-hidden select-none cursor-pointer"
              >
                <AnimatedTitle text={item.name} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#fd6161] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white text-center sm:text-left">
            ©2025 All Rights Reserved Creative Corner.
          </p>

          <div className="text-xs flex  sm:translate-x-[7vh] justify-center items-center gap-1 text-white text-center sm:text-left">
            Developed by <a target="blank" className=" border-b border-white underline" href="https://www.zerrorstudios.com/"> <AnimatedTitle text={'Zerror Studios'} /> </a>
          </div>

          <div className="flex items-center gap-4 text-white">
            <a
              href="https://www.instagram.com/_yourcreativecorner_?utm_source=qr&xtok=Mnc0dGMyZTVueDMw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-70"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61585698844927"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-opacity hover:opacity-70"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
              </svg>
            </a>
            <a
              href="https://wa.me/917559410689"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transition-opacity hover:opacity-70"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
