import AnimatedTitle from "../common/AnimatedTitle";

const navLinks = [
  { name: "Work", path: "#work" },
  { name: "About", path: "#about" },
  { name: "Expertise", path: "#services" },
];

const contactLinks = [
  {
    label: "Email",
    text: "contactus@yourcreativecorner.com",
    href: "mailto:contact-us@yourcreativecorner.com",
  },
  {
    label: "WhatsApp",
    text: "+91 75594 10689",
    href: "https://wa.me/917559410689",
    external: true,
  },
  {
    label: "Call",
    text: "+91 77389 38443",
    href: "tel:+917738938443",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/_yourcreativecorner_?utm_source=qr&xtok=Mnc0dGMyZTVueDMw",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[18px] h-[18px]"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61585698844927",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[18px] h-[18px]"
      >
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/917559410689",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[18px] h-[18px]"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
];

// AnimatedTitle uses leading-none + overflow-hidden, which clips Poppins descenders (y, p, g).
const titleLeading = "[&>div]:leading-[1.3]";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="BGRED Font_Poppins text-white w-full">
      <div className="px-5 sm:px-8 lg:px-12">
        {/* ─── CTA ──────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] md:items-end gap-10 lg:gap-16 pt-20 pb-14 sm:pt-24 lg:pt-32 lg:pb-20">
          <div>
            

            <h2 className="mt-5 sm:mt-6 text-[clamp(2rem,5vw,5rem)] font-semibold leading-[1.08] tracking-[-0.02em] max-w-[14em] text-balance">
              Let’s collaborate and take your brand to the next level!
            </h2>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:contact-us@yourcreativecorner.com"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm sm:text-base font-medium text-[#ED1E24] transition-colors duration-300 hover:bg-[#202020] hover:text-white"
              >
                Start a project
                <ArrowIcon />
              </a>
              <a
                href="https://wa.me/917559410689"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/70 px-6 py-3.5 text-sm sm:text-base font-medium text-white transition-colors duration-300 hover:bg-white hover:text-[#ED1E24]"
              >
                Chat on WhatsApp
                <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="w-full max-w-[340px] md:w-[220px] lg:w-[260px] xl:w-[300px] aspect-[4/5] md:aspect-[3/4] overflow-hidden  bg-[#202020] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]">
            <video
              muted
              loop
              autoPlay
              playsInline
              src={`/Data/IMG_8500.mp4`}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* ─── LINKS ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_auto_auto] gap-x-12 lg:gap-x-20 xl:gap-x-28 gap-y-12 border-t border-white/25 py-12 lg:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-row items-end justify-between lg:flex-col lg:items-start lg:justify-start gap-6">
            {/* Dark tile keeps the red + white logo from blending into the red background */}
            <div className="w-fit  bg-[#202020] p-4 sm:p-5">
              <img
                src={`/img/logo/logo.webp`}
                alt="Creative Corner"
                className="h-16 sm:h-20 lg:h-24 w-auto"
              />
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="grid place-items-center w-10 h-10 rounded-full border border-white/40 transition-colors duration-300 hover:bg-white hover:text-[#ED1E24] hover:border-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
              Contact
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              {contactLinks.map((item) => (
                <li key={item.label}>
                  <span className="block text-xs text-white/60 mb-1">
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    {...(item.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className={`inline-block text-[15px] sm:text-base lg:text-lg font-medium ${titleLeading}`}
                  >
                    <AnimatedTitle text={item.text} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
              Explore
            </h3>
            <ul className="mt-5 flex flex-row flex-wrap sm:flex-col gap-x-8 gap-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className={`inline-block text-base lg:text-lg font-medium select-none ${titleLeading}`}
                  >
                    <AnimatedTitle text={item.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── BOTTOM BAR ───────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/25 py-6 text-xs sm:text-sm text-white/80">
          <p className="max-sm:mx-auto">©2025 All Rights Reserved Creative Corner.</p>
          <div className="flex items-center gap-1 max-sm:mx-auto">
            Developed by
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.zerrorstudios.com/"
              className={`text-white border-b border-white ${titleLeading}`}
            >
              <AnimatedTitle text={"Zerror Studios"} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
