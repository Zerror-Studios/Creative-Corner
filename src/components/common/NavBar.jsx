"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useContact } from "../contexts/ContactContext";
import AnimatedTitle from "./AnimatedTitle";

// `line` is the underline class the sections animate (GSAP) to mark the section in view
const navLinks = [
  { name: "About", href: "#about", line: "AboutLine" },
  { name: "Expertise", href: "#services", line: "ExpertiseLine" },
  { name: "Work", href: "#work", line: "WorkLine" },
];

// AnimatedTitle uses leading-none + overflow-hidden, which clips Poppins descenders (p in Expertise)
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
    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const tl = useRef(null);

  const { setIsContactOpen } = useContact(); // Get contact state

  const openContact = () => {
    setIsOpen(false);
    setIsContactOpen(true); // Open contact form
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (window.lenis) window.lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Initialize GSAP timeline: fade the menu in, then stagger its items up
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    tl.current = gsap.timeline({ paused: true });
    tl.current
      .set(menu, { autoAlpha: 0 })
      .to(menu, { duration: 0.35, autoAlpha: 1, ease: "power2.out" })
      .fromTo(
        menu.querySelectorAll(".nav-menu-item"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" },
        "-=0.15",
      );

    return () => {
      if (tl.current) tl.current.kill();
    };
  }, []);

  // Toggle menu with GSAP, lock the page behind it, close on Escape
  useEffect(() => {
    if (!tl.current) return;

    if (isOpen) {
      tl.current.timeScale(1).play();
    } else {
      tl.current.timeScale(1.6).reverse();
    }
    if (!isOpen) return;

    // Lenis drives touch scrolling too, so pause it as well as the native scroll
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.lenis?.stop();
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // The menu is phones/tablets only — close it if the window grows to desktop
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setIsOpen(false);
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  // Slide the navbar out while scrolling down, bring it back on scroll up
  useEffect(() => {
    const THRESHOLD = 6; // px of travel before the direction counts
    const TOP_ZONE = 80; // always visible near the top of the page
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      setIsScrolled(y > 8);
      if (y < TOP_ZONE) {
        setIsHidden(false);
        lastY = y;
      } else if (Math.abs(delta) > THRESHOLD) {
        setIsHidden(delta > 0);
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = isHidden && !isOpen; // never hide while the mobile menu is open

  return (
    <>
      <nav
        className={`Font_Poppins fixed top-0 left-0 right-0 z-99 bg-white text-[#ED1E24] will-change-transform transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${hidden ? "-translate-y-full" : "translate-y-0"} ${isScrolled && !isOpen ? "shadow-[0_8px_24px_-14px_rgba(0,0,0,0.25)]" : "shadow-[0_1px_0_rgba(0,0,0,0.06)]"}`}
      >
        <div className="mx-auto flex h-[72px] w-full items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo — the light-background version: the white parts are charcoal so they show on white */}
          <a
            href="#"
            onClick={scrollToTop}
            aria-label="Creative Corner — back to top"
            className="relative z-[999] rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED1E24]"
          >
            <img src={`/img/logo/logo-light.webp`} alt="Creative Corner" className="h-[52px] w-auto" />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`group relative h-fit py-1 text-[15px] font-medium ${titleLeading}`}
              >
                <AnimatedTitle text={link.name} />
                <div
                  className={`${link.line} absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#ED1E24] transition-all duration-200 ease-out group-hover:w-full`}
                ></div>
              </a>
            ))}
            <button
              type="button"
              onClick={openContact}
              className={`group inline-flex h-11 items-center gap-2 rounded-full bg-[#ED1E24] px-6 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#202020] cursor-pointer ${titleLeading}`}
            >
              <AnimatedTitle text={"Contact"} />
              <ArrowIcon />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden relative z-[999] grid size-11 place-items-center rounded-full text-[#ED1E24] transition-colors hover:bg-[#ED1E24]/10 focus-visible:outline-2 focus-visible:outline-[#ED1E24] cursor-pointer"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${isOpen ? "top-[6px] rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[2px] w-6 rounded-full bg-current transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${isOpen ? "top-[6px] -rotate-45" : "top-[12px]"}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu (GSAP animated) — full screen under the bar, so the logo and close button stay on top */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`Font_Poppins md:hidden fixed inset-0 z-98 flex flex-col items-center justify-center gap-10 bg-white px-6 pt-[72px] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ visibility: "hidden", opacity: 0 }} // Let GSAP take over from here
        aria-hidden={!isOpen}
      >
        <ul className="flex flex-col items-center gap-2">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-menu-item">
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
                className="block py-2 text-[clamp(2rem,9vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] text-[#ED1E24]"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={openContact}
          tabIndex={isOpen ? 0 : -1}
          className="nav-menu-item group inline-flex items-center gap-2 rounded-full bg-[#ED1E24] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#202020] cursor-pointer"
        >
          Contact
          <ArrowIcon />
        </button>
      </div>
    </>
  );
}
