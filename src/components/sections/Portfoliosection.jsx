"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Square (1:1) logo artwork. `logo` is a 560px WebP made from the 1200px originals in
// /Data/images/square — sharp at 2x on the largest card, ~16KB each instead of ~40KB.
const clients = [
  { id: 1, name: "NexClean", file: "01-nexclean" },
  { id: 2, name: "Urban Walk", file: "02-urban-walk" },
  { id: 3, name: "Sanaa Couture", file: "03-sanaa-couture" },
  { id: 4, name: "Indian Idol", file: "04-indian-idol" },
  { id: 5, name: "HP", file: "05-hp" },
  { id: 6, name: "Samriddhi Group", file: "06-samriddhi-group" },
  { id: 7, name: "Travelling Turtles", file: "07-travelling-turtles" },
  { id: 8, name: "BookMyRun", file: "08-bookmyrun" },
  { id: 9, name: "Saya", file: "09-saya" },
  { id: 10, name: "Nayanoir", file: "10-nayanoir" },
  { id: 11, name: "PW", file: "11-pw" },
  { id: 12, name: "Kia", file: "12-kia" },
  { id: 13, name: "Our Space Studio", file: "13-our-space-studio" },
  { id: 14, name: "Square Yards", file: "14-square-yards" },
  { id: 15, name: "Ashakiran Hospital", file: "15-ashakiran-hospital" },
  { id: 16, name: "GM Gold", file: "16-gm-gold" },
  { id: 17, name: "Richwood", file: "17-richwood" },
  { id: 18, name: "Good Time Holidays", file: "18-good-time-holidays" },
].map((c) => ({ ...c, logo: `/Data/images/thumb/${c.file}.webp` }));

// Two showcase rows gliding in opposite directions
const rows = [clients.slice(0, 9), clients.slice(9)];

const pad = (n) => String(n).padStart(2, "0");

export default function PortfolioSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const cursorRef = useRef(null);
  const [view, setView] = useState("showcase"); // "showcase" | "grid"
  const [activeId, setActiveId] = useState(null); // logo whose name is pinned open (tap / click)

  // Header + content slide in once when the section scrolls into view
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".clients-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Switching views: fade the new layout in, then let ScrollTrigger re-measure the page
  const firstView = useRef(true);
  useEffect(() => {
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.from(view === "grid" ? ".grid-tile" : ".marquee-row", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: view === "grid" ? { each: 0.03, grid: "auto" } : 0.1,
        clearProps: "transform,opacity",
      });
    }, contentRef);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [view]);

  // A pinned name closes on its own after a few seconds
  useEffect(() => {
    if (activeId === null) return;
    const t = setTimeout(() => setActiveId(null), 3000);
    return () => clearTimeout(t);
  }, [activeId]);

  const toggleActive = (id) => setActiveId((cur) => (cur === id ? null : id));

  // "Drag" cursor badge that follows the mouse over the showcase rows (mouse only)
  const moveCursor = (e) => {
    if (e.pointerType !== "mouse" || !cursorRef.current) return;
    gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power3.out" });
  };
  const showCursor = (on) => (e) => {
    if (e.pointerType !== "mouse" || !cursorRef.current) return;
    if (on) gsap.set(cursorRef.current, { x: e.clientX, y: e.clientY });
    gsap.to(cursorRef.current, { scale: on ? 1 : 0, opacity: on ? 1 : 0, duration: 0.3, ease: "power3.out" });
  };

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="Font_Poppins relative w-full overflow-hidden bg-white text-[#202020] py-20 sm:py-24 lg:py-32"
    >
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between px-5 sm:px-8 lg:px-12 mb-10 lg:mb-14">
        <div className="max-w-2xl">
          {/* <p className="clients-reveal text-sm font-medium tabular-nums text-[#ED1E24]">
            ({pad(clients.length)}) Brands
          </p> */}
          <h2 className="clients-reveal mt-3 text-[clamp(2.25rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.03em]">
            Our Clients
          </h2>
          {/* <p className="clients-reveal mt-5 max-w-md text-[15px] sm:text-base leading-relaxed text-black/60">
            Brands we&apos;ve partnered with, from fashion and real estate to education,
            healthcare and travel.
          </p> */}
        </div>

        <div className="clients-reveal flex flex-col items-start gap-3 md:items-end">
          <ViewToggle view={view} onChange={setView} />
          <p className="text-sm text-black/55">
            {view === "showcase" ? (
              <>
                <span className="hidden [@media(hover:hover)]:inline">Hover to pause · drag to explore</span>
                <span className="[@media(hover:hover)]:hidden">Swipe to explore · tap a logo</span>
              </>
            ) : (
              "All brands at a glance"
            )}
          </p>
        </div>
      </div>

      <div ref={contentRef}>
        {view === "showcase" ? (
          <div
            className="clients-reveal flex flex-col gap-3 sm:gap-4 lg:gap-5"
            onPointerMove={moveCursor}
            onPointerEnter={showCursor(true)}
            onPointerLeave={showCursor(false)}
          >
            {rows.map((items, i) => (
              <MarqueeRow
                key={i}
                items={items}
                direction={i % 2 === 0 ? -1 : 1}
                activeId={activeId}
                onToggle={toggleActive}
              />
            ))}
          </div>
        ) : (
          <ClientGrid />
        )}
      </div>

      {/* Follows the mouse over the showcase rows */}
      {/* <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 -ml-10 -mt-10 grid size-20 scale-0 place-items-center rounded-full bg-[#ED1E24] text-xs font-medium uppercase tracking-wider text-white opacity-0 shadow-[0_12px_30px_-10px_rgba(237,30,36,0.6)]"
      >
        Drag
      </div> */}
    </section>
  );
}

/* ─── Showcase / Grid switch ─── */
function ViewToggle({ view, onChange }) {
  const options = [
    {
      value: "showcase",
      label: "Showcase",
      icon: <path d="M3 8h18M3 16h18M7 4v16M17 4v16" />,
    },
    {
      value: "grid",
      label: "Grid",
      icon: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
    },
  ];
  return (
    <div role="group" aria-label="Layout" className="inline-flex rounded-full border border-black/15 p-1">
      {options.map((o) => {
        const on = view === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1E24] ${
              on ? "bg-[#202020] text-white" : "text-[#202020] hover:bg-black/[0.06]"
            }`}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {o.icon}
            </svg>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ─── One endlessly gliding row ───
   Pauses on hover / keyboard focus / an open name, can be dragged or swiped (with momentum),
   speeds up briefly while the page is scrolled, and only animates while on screen. */
function MarqueeRow({ items, direction, activeId, onToggle }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const holdRef = useRef(false); // a name is open in this row
  const draggedRef = useRef(false);

  const holding = items.some((c) => c.id === activeId);
  useEffect(() => {
    holdRef.current = holding;
  }, [holding]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPEED = window.innerWidth < 768 ? 28 : 45; // px per second

    let period = group.offsetWidth; // one copy of the logos, incl. its trailing gap
    let x = direction > 0 ? -period : 0;
    let factor = reduceMotion ? 0 : 1; // eases to 0 while paused, back to 1 after
    let boost = 0; // extra speed from page scrolling
    let inertia = 0; // px/s left over from a fling
    let hover = false;
    let focused = false;
    let visible = false;
    let drag = null;

    const wrap = gsap.utils.wrap(-period, 0);
    let wrapX = wrap;
    const render = () => {
      x = wrapX(x);
      track.style.transform = `translate3d(${x}px,0,0)`;
    };

    const tick = (_time, deltaMs) => {
      if (!visible) return;
      const dt = Math.min(deltaMs, 64) / 1000;
      const paused = hover || focused || holdRef.current || reduceMotion;
      factor += ((paused ? 0 : 1) - factor) * Math.min(1, dt * 5);
      boost *= Math.exp(-dt * 3);
      if (!drag) {
        x += direction * SPEED * (factor + boost) * dt + inertia * dt;
        inertia *= Math.exp(-dt * 3.5);
        if (Math.abs(inertia) < 2) inertia = 0;
      }
      render();
    };
    gsap.ticker.add(tick);
    render();

    // Only animate while the row is on screen
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(viewport);

    // Logos have fixed sizes, but the breakpoint can change them
    const ro = new ResizeObserver(() => {
      period = group.offsetWidth;
      wrapX = gsap.utils.wrap(-period, 0);
      render();
    });
    ro.observe(group);

    // Scrolling the page gives the rows a short push
    const st = ScrollTrigger.create({
      trigger: viewport,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (reduceMotion) return;
        boost = Math.max(boost, Math.min(Math.abs(self.getVelocity()) / 600, 3));
      },
    });

    // Drag / swipe. touch-action: pan-y keeps vertical page scrolling native.
    const onDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      drag = { startX: e.clientX, startPos: x, lastX: e.clientX, lastT: performance.now(), v: 0, id: e.pointerId };
      draggedRef.current = false;
      inertia = 0;
    };
    const onMove = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.startX;
      if (!draggedRef.current && Math.abs(dx) > 6) {
        draggedRef.current = true;
        viewport.setPointerCapture?.(e.pointerId);
      }
      if (!draggedRef.current) return;
      const now = performance.now();
      const dtm = Math.max(1, now - drag.lastT);
      drag.v = drag.v * 0.6 + ((e.clientX - drag.lastX) / dtm) * 1000 * 0.4;
      drag.lastX = e.clientX;
      drag.lastT = now;
      x = drag.startPos + dx;
      render();
    };
    const onUp = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (draggedRef.current) inertia = Math.max(-2500, Math.min(2500, drag.v));
      drag = null;
      // the click that ends a drag must not open a name
      setTimeout(() => (draggedRef.current = false), 0);
    };
    // Laptop trackpads: a sideways two-finger swipe scrubs the row (vertical still scrolls the page)
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault(); // also stops the browser's swipe-to-go-back
      inertia = 0;
      x -= e.deltaX;
      render();
    };
    const onEnter = (e) => e.pointerType === "mouse" && (hover = true);
    const onLeave = (e) => e.pointerType === "mouse" && (hover = false);
    // Keyboard focus only — a mouse click or tap also focuses the card, and that shouldn't
    // leave the row paused until the visitor clicks somewhere else
    const onFocusIn = (e) => (focused = !!e.target.matches?.(":focus-visible"));
    const onFocusOut = (e) => !viewport.contains(e.relatedTarget) && (focused = false);

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    viewport.addEventListener("focusin", onFocusIn);
    viewport.addEventListener("focusout", onFocusOut);
    viewport.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      viewport.removeEventListener("wheel", onWheel);
      gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      st.kill();
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
      viewport.removeEventListener("focusin", onFocusIn);
      viewport.removeEventListener("focusout", onFocusOut);
    };
  }, [direction]);

  const onClickCapture = (e) => {
    if (!draggedRef.current) return;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      ref={viewportRef}
      onClickCapture={onClickCapture}
      className="marquee-row relative w-full overflow-hidden select-none touch-pan-y cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {/* The second copy makes the loop seamless. Screen readers and Tab only see the first,
            but both copies still react to the mouse/touch — on wide screens the copy is often
            what's on screen. (Not `inert`: that would make those logos ignore hover and taps.) */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            ref={copy === 0 ? groupRef : undefined}
            aria-hidden={copy === 1 ? true : undefined}
            className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4 lg:gap-5 lg:pr-5"
          >
            {items.map((c) => (
              <li key={c.id} className="shrink-0">
                <LogoCard
                  client={c}
                  active={activeId === c.id}
                  onToggle={onToggle}
                  tabIndex={copy === 1 ? -1 : undefined}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/* ─── Logo artwork + hairline edge (shared by both views) ─── */
const LogoArt = ({ client, zoomed, groupHover }) => (
  <>
    <img
      src={client.logo}
      alt=""
      width={560}
      height={560}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`absolute inset-0 size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${groupHover} ${zoomed ? "scale-[1.06]" : ""}`}
    />
    {/* Hairline edge so white logos don't melt into the white page */}
    <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.07]" />
  </>
);

/* ─── Showcase tile: its name slides up on hover / keyboard focus / tap ─── */
function LogoCard({ client, active, onToggle, tabIndex }) {
  return (
    <button
      type="button"
      tabIndex={tabIndex}
      aria-label={client.name}
      aria-pressed={active}
      onClick={() => onToggle(client.id)}
      className="group/card relative block aspect-square w-[clamp(136px,36vw,176px)] overflow-hidden bg-neutral-100 cursor-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-[#ED1E24] focus-visible:ring-offset-2 sm:w-[200px] lg:w-[clamp(210px,16vw,260px)]"
    >
      <LogoArt client={client} zoomed={active} groupHover="[@media(hover:hover)]:group-hover/card:scale-[1.06]" />
      <span
        className={`pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-12 text-left text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-4 sm:pb-4 ${
          active
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 [@media(hover:hover)]:group-hover/card:translate-y-0 [@media(hover:hover)]:group-hover/card:opacity-100 group-focus-visible/card:translate-y-0 group-focus-visible/card:opacity-100"
        }`}
      >
        <span className="text-[13px] font-medium leading-tight sm:text-sm">{client.name}</span>
        <span className="text-[11px] tabular-nums text-white/60">{pad(client.id)}</span>
      </span>
    </button>
  );
}

/* ─── Grid view: every brand with its name ─── */
function ClientGrid() {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-7 px-5 sm:grid-cols-3 sm:gap-x-4 sm:px-8 md:grid-cols-4 lg:grid-cols-6 lg:gap-x-5 lg:gap-y-10 lg:px-12">
      {clients.map((c) => (
        <li key={c.id} className="grid-tile group/tile">
          <div className="relative aspect-square overflow-hidden bg-neutral-100">
            <LogoArt client={c} groupHover="[@media(hover:hover)]:group-hover/tile:scale-[1.06]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2 border-t border-black/10 pt-3">
            <span className="text-[11px] tabular-nums text-black/40">{pad(c.id)}</span>
            <span className="text-sm font-medium transition-colors duration-300 group-hover/tile:text-[#ED1E24]">
              {c.name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
