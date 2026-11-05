// "use client";

// import { useState } from "react";

// export default function ContactPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(form);
//   };

//   return (
//     <section id="contact" className="w-full min-h-screen bg-white text-neutral-800 px-4 sm:px-6 lg:px-20 py-16 lg:py-24 relative z-90">
      
//       {/* HEADER */}
//       <div className="max-w-6xl mx-auto mb-16">
//         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
//           Let’s Build Something Great
//         </h1>
//         <p className="text-neutral-500 max-w-xl">
//           Have a project in mind or just want to say hello? We’d love to hear from you.
//         </p>
//       </div>

//       {/* MAIN GRID */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
//         {/* LEFT SIDE - CONTACT INFO */}
//         <div className="space-y-10">
          
//           <div>
//             <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-2">
//               Contact
//             </h3>
//             <p className="text-lg">hello@creativecorner.com</p>
//             <p className="text-lg">+91 98765 43210</p>
//           </div>

//           <div>
//             <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-2">
//               Office
//             </h3>
//             <p className="text-neutral-600">
//               2nd Floor, Creative Building <br />
//               Mumbai, India
//             </p>
//           </div>

//           <div>
//             <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-2">
//               Social
//             </h3>
//             <div className="flex gap-4 text-neutral-600">
//               <a href="#" className="hover:text-black transition">Instagram</a>
//               <a href="#" className="hover:text-black transition">LinkedIn</a>
//               <a href="#" className="hover:text-black transition">Twitter</a>
//             </div>
//           </div>

//           {/* Optional Map Placeholder */}
//           <div className="w-full h-[200px] bg-neutral-100 flex items-center justify-center text-sm text-neutral-400">
//             Map Placeholder
//           </div>

//         </div>

//         {/* RIGHT SIDE - FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col gap-6"
//         >
          
//           <div>
//             <label className="text-sm text-neutral-500">Your Name</label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="w-full border-b border-neutral-300 focus:border-black outline-none py-2 transition"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-neutral-500">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full border-b border-neutral-300 focus:border-black outline-none py-2 transition"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-neutral-500">Your Message</label>
//             <textarea
//               name="message"
//               rows="5"
//               value={form.message}
//               onChange={handleChange}
//               required
//               className="w-full border-b border-neutral-300 focus:border-black outline-none py-2 transition resize-none"
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="mt-4 bg-black text-white py-3 px-6 rounded-full w-fit hover:bg-neutral-800 transition"
//           >
//             Send Message
//           </button>

//         </form>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { useContact } from "../contexts/ContactContext";

// export default function ContactPopup() {
//   // const [open, setOpen] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//    const { isContactOpen, setIsContactOpen } = useContact(); // Use shared state

//     const open = isContactOpen;

//   const modalRef = useRef(null);
//   const overlayRef = useRef(null);
//   const headerRef = useRef(null);
//   const fieldsRef = useRef([]);
//   const submitRowRef = useRef(null);
//   const successRef = useRef(null);
//   const checkCircleRef = useRef(null);
//   const openBtnRef = useRef(null);
//   const bgSceneRef = useRef(null);
//   const particleTimers = useRef([]);

//   const PARTICLE_COLORS = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD", "#D4537E"];

//   function spawnParticle() {
//     if (!bgSceneRef.current) return;
//     const el = document.createElement("div");
//     const size = 4 + Math.random() * 8;
//     el.style.cssText = `
//       position: absolute;
//       width: ${size}px;
//       height: ${size}px;
//       border-radius: 50%;
//       background: ${PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]};
//       opacity: 0;
//       pointer-events: none;
//       left: ${Math.random() * 100}%;
//       top: ${Math.random() * 100}%;
//     `;
//     bgSceneRef.current.appendChild(el);
//     gsap.fromTo(
//       el,
//       { opacity: 0, scale: 0 },
//       {
//         opacity: 0.4,
//         scale: 1,
//         duration: 0.4,
//         ease: "back.out(2)",
//         onComplete: () =>
//           gsap.to(el, {
//             opacity: 0,
//             y: -30,
//             duration: 1.2,
//             ease: "power2.in",
//             onComplete: () => el.remove(),
//           }),
//       }
//     );
//   }

//   function burstParticles(count = 12, intervalMs = 55) {
//     particleTimers.current.forEach(clearTimeout);
//     particleTimers.current = [];
//     for (let i = 0; i < count; i++) {
//       const t = setTimeout(spawnParticle, i * intervalMs);
//       particleTimers.current.push(t);
//     }
//   }

//   // Open animation
//   useEffect(() => {
//     if (!open) return;
//     const modal = modalRef.current;
//     const overlay = overlayRef.current;

//     setSubmitted(false);
//     overlay.style.display = "block";
//     modal.style.pointerEvents = "auto";

//     // Overlay fade + blur
//     gsap.to(overlay, {
//       duration: 0.35,
//       ease: "power2.out",
//       onUpdate: function () {
//         const p = this.progress();
//         overlay.style.background = `rgba(0,0,0,${p * 0.48})`;
//         overlay.style.backdropFilter = `blur(${p * 7}px)`;
//       },
//     });

//     // Modal spring-in
//     gsap.fromTo(
//       modal,
//       { opacity: 0, scale: 0.82, y: 40, rotationX: 8 },
//       { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.55, ease: "back.out(1.6)" }
//     );

//     // Header slide down
//     gsap.fromTo(
//       headerRef.current,
//       { opacity: 0, y: -14 },
//       { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.15 }
//     );

//     // Fields stagger
//     gsap.fromTo(
//       fieldsRef.current,
//       { opacity: 0, y: 22, x: -8 },
//       { opacity: 1, y: 0, x: 0, duration: 0.4, ease: "power3.out", stagger: 0.09, delay: 0.22 }
//     );

//     // Submit button
//     gsap.fromTo(
//       submitRowRef.current,
//       { opacity: 0, y: 12 },
//       { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", delay: 0.5 }
//     );

//     burstParticles(10, 60);
//   }, [open]);

//   function closeModal() {
//     const modal = modalRef.current;
//     const overlay = overlayRef.current;

//     gsap.to(modal, { opacity: 0, scale: 0.88, y: 24, duration: 0.32, ease: "power3.in" });
//     gsap.to(overlay, {
//       duration: 0.32,
//       ease: "power2.in",
//       onUpdate: function () {
//         const p = 1 - this.progress();
//         overlay.style.background = `rgba(0,0,0,${p * 0.48})`;
//         overlay.style.backdropFilter = `blur(${p * 7}px)`;
//       },
//       onComplete: () => {
//         overlay.style.display = "none";
//         modal.style.pointerEvents = "none";
//         setOpen(false);
//         setForm({ name: "", email: "", message: "" });
//       },
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log(form);

//     const toHide = [headerRef.current, ...fieldsRef.current, submitRowRef.current];

//     gsap.to(toHide, {
//       opacity: 0,
//       y: -18,
//       duration: 0.28,
//       ease: "power3.in",
//       stagger: 0.04,
//       onComplete: () => {
//         setSubmitted(true);

//         requestAnimationFrame(() => {
//           // Check circle bounce
//           gsap.fromTo(
//             checkCircleRef.current,
//             { scale: 0, rotation: -45 },
//             { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)", delay: 0.05 }
//           );

//           // Success text fade up
//           const successTexts = successRef.current?.querySelectorAll("p") || [];
//           gsap.fromTo(
//             successTexts,
//             { opacity: 0, y: 14 },
//             { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.1, delay: 0.3 }
//           );

//           burstParticles(18, 45);

//           // Auto-close
//           setTimeout(() => closeModal(), 2400);
//         });
//       },
//     });
//   }

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   function handleOpenClick() {
//     const btn = openBtnRef.current;
//     gsap.to(btn, {
//       scale: 0.92,
//       duration: 0.1,
//       ease: "power2.in",
//       onComplete: () => gsap.to(btn, { scale: 1, duration: 0.35, ease: "back.out(2)" }),
//     });
//     setOpen(true);
//   }

//   function addFieldRef(el) {
//     if (el && !fieldsRef.current.includes(el)) fieldsRef.current.push(el);
//   }

//   // Reset fieldsRef on each render so stale refs don't accumulate
//   fieldsRef.current = [];

//   return (
//     <>
//       {/* ── TRIGGER ── */}
//       <div className="flex justify-center items-center h-screen bg-white">
//         <button
//           ref={openBtnRef}
//           onClick={handleOpenClick}
//           onMouseEnter={() => gsap.to(openBtnRef.current, { scale: 1.05, duration: 0.2, ease: "power2.out" })}
//           onMouseLeave={() => gsap.to(openBtnRef.current, { scale: 1, duration: 0.2, ease: "power2.out" })}
//           className="bg-black text-white px-8 py-3.5 rounded-full text-[15px] tracking-wide"
//         >
//           Contact Us
//         </button>
//       </div>

//       {/* ── PORTAL ── */}
//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           {/* Particle canvas */}
//           <div
//             ref={bgSceneRef}
//             className="absolute inset-0 pointer-events-none overflow-hidden"
//           />

//           {/* Overlay */}
//           <div
//             ref={overlayRef}
//             className="absolute inset-0 cursor-pointer"
//             style={{ display: "none" }}
//             onClick={closeModal}
//           />

//           {/* Modal */}
//           <div
//             ref={modalRef}
//             className="relative bg-white w-[90%] max-w-[440px] rounded-2xl p-8 shadow-2xl"
//             style={{ opacity: 0, pointerEvents: "none" }}
//           >
//             {/* Close */}
//             <button
//               onClick={closeModal}
//               onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.15, duration: 0.18, ease: "back.out(2)" })}
//               onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.18 })}
//               className="absolute top-4 right-4 w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm hover:text-neutral-700 transition-colors"
//             >
//               ✕
//             </button>

//             {!submitted ? (
//               <>
//                 {/* Header */}
//                 <div ref={headerRef}>
//                   <h2 className="text-xl font-semibold mb-1 text-neutral-900">
//                     Let's build something great
//                   </h2>
//                   <p className="text-sm text-neutral-400 mb-6">
//                     Have a project in mind? Send us a message.
//                   </p>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//                   <div ref={addFieldRef}>
//                     <label className="text-xs text-neutral-400 block mb-1">Your name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={form.name}
//                       onChange={handleChange}
//                       required
//                       placeholder="Jane Smith"
//                       className="w-full border-b border-neutral-200 focus:border-black outline-none py-2 text-sm bg-transparent transition-colors duration-200"
//                     />
//                   </div>

//                   <div ref={addFieldRef}>
//                     <label className="text-xs text-neutral-400 block mb-1">Email address</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={form.email}
//                       onChange={handleChange}
//                       required
//                       placeholder="jane@example.com"
//                       className="w-full border-b border-neutral-200 focus:border-black outline-none py-2 text-sm bg-transparent transition-colors duration-200"
//                     />
//                   </div>

//                   <div ref={addFieldRef}>
//                     <label className="text-xs text-neutral-400 block mb-1">Your message</label>
//                     <textarea
//                       name="message"
//                       rows={3}
//                       value={form.message}
//                       onChange={handleChange}
//                       required
//                       placeholder="Tell us about your project..."
//                       className="w-full border-b border-neutral-200 focus:border-black outline-none py-2 text-sm bg-transparent resize-none transition-colors duration-200"
//                     />
//                   </div>

//                   <div ref={submitRowRef} className="mt-2">
//                     <button
//                       type="submit"
//                       onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.04, duration: 0.18, ease: "power2.out" })}
//                       onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.18 })}
//                       className="bg-black text-white py-3 px-7 rounded-full text-sm"
//                     >
//                       Send message
//                     </button>
//                   </div>
//                 </form>
//               </>
//             ) : (
//               /* Success state */
//               <div ref={successRef} className="text-center py-8">
//                 <div
//                   ref={checkCircleRef}
//                   className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"
//                 >
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                     <polyline
//                       points="4,13 9,18 20,7"
//                       stroke="#16a34a"
//                       strokeWidth="2.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//                 <p className="text-base font-semibold text-neutral-900 mb-1">Message sent!</p>
//                 <p className="text-sm text-neutral-400">We'll be in touch soon.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useContact } from "../contexts/ContactContext";

// `company` is a honeypot: hidden from people, so only bots fill it in
const EMPTY_FORM = { name: "", email: "", message: "", company: "" };

export default function ContactPopup() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const { isContactOpen, setIsContactOpen } = useContact(); // ✅ Context works

  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const headerRef = useRef(null);
  const fieldsRef = useRef([]);
  const submitRowRef = useRef(null);
  const successRef = useRef(null);
  const checkCircleRef = useRef(null);
  const bgSceneRef = useRef(null);
  const particleTimers = useRef([]);

  const PARTICLE_COLORS = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD", "#D4537E"];

  // ✅ Fixed: Use useCallback to prevent recreation
  const spawnParticle = useCallback(() => {
    if (!bgSceneRef.current) return;
    const el = document.createElement("div");
    const size = 4 + Math.random() * 8;
    el.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]};
      opacity: 0;
      pointer-events: none;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;
    bgSceneRef.current.appendChild(el);
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0 },
      {
        opacity: 0.4,
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)",
        onComplete: () =>
          gsap.to(el, {
            opacity: 0,
            y: -30,
            duration: 1.2,
            ease: "power2.in",
            onComplete: () => el.remove(),
          }),
      }
    );
  }, []);

  const burstParticles = useCallback((count = 12, intervalMs = 55) => {
    particleTimers.current.forEach(clearTimeout);
    particleTimers.current = [];
    for (let i = 0; i < count; i++) {
      const t = setTimeout(spawnParticle, i * intervalMs);
      particleTimers.current.push(t);
    }
  }, [spawnParticle]);

  // ✅ Open animation - add setIsContactOpen to deps
  useEffect(() => {
    if (!isContactOpen) return;
    const modal = modalRef.current;
    const overlay = overlayRef.current;

    setSubmitted(false);
    setError("");
    overlay.style.display = "block";
    modal.style.pointerEvents = "auto";

    // Overlay fade + blur
    gsap.to(overlay, {
      duration: 0.35,
      ease: "power2.out",
      onUpdate: function () {
        const p = this.progress();
        overlay.style.background = `rgba(0,0,0,${p * 0.48})`;
        overlay.style.backdropFilter = `blur(${p * 7}px)`;
      },
    });

    // Modal spring-in
    gsap.fromTo(
      modal,
      { opacity: 0, scale: 0.82, y: 40, rotationX: 8 },
      { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.55, ease: "back.out(1.6)" }
    );

    // Header slide down
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -14 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.15 }
    );

    // Fields stagger
    gsap.fromTo(
      fieldsRef.current,
      { opacity: 0, y: 22, x: -8 },
      { opacity: 1, y: 0, x: 0, duration: 0.4, ease: "power3.out", stagger: 0.09, delay: 0.22 }
    );

    // Submit button
    gsap.fromTo(
      submitRowRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", delay: 0.5 }
    );

    burstParticles(10, 60);
  }, [isContactOpen, burstParticles]); // ✅ Fixed deps

  // ✅ FIXED: Use setIsContactOpen from context
  const closeModal = useCallback(() => {
    const modal = modalRef.current;
    const overlay = overlayRef.current;

    gsap.to(modal, { opacity: 0, scale: 0.88, y: 24, duration: 0.32, ease: "power3.in" });
    gsap.to(overlay, {
      duration: 0.32,
      ease: "power2.in",
      onUpdate: function () {
        const p = 1 - this.progress();
        overlay.style.background = `rgba(0,0,0,${p * 0.48})`;
        overlay.style.backdropFilter = `blur(${p * 7}px)`;
      },
      onComplete: () => {
        overlay.style.display = "none";
        modal.style.pointerEvents = "none";
        setIsContactOpen(false); // ✅ FIXED: Use context setter
        setForm(EMPTY_FORM);
        setError("");
      },
    });
  }, [setIsContactOpen]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");

    // Emails the enquiry to the client (src/app/api/contact/route.js). The success
    // animation only plays once the email has actually gone out.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Sorry, your message couldn't be sent. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof TypeError // fetch itself failed: offline / server unreachable
          ? "Couldn't reach the server. Check your connection and try again."
          : err.message,
      );
      setSending(false);
      return;
    }
    setSending(false);

    const toHide = [headerRef.current, ...fieldsRef.current, submitRowRef.current];

    gsap.to(toHide, {
      opacity: 0,
      y: -18,
      duration: 0.28,
      ease: "power3.in",
      stagger: 0.04,
      onComplete: () => {
        setSubmitted(true);

        requestAnimationFrame(() => {
          // Check circle bounce
          gsap.fromTo(
            checkCircleRef.current,
            { scale: 0, rotation: -45 },
            { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)", delay: 0.05 }
          );

          // Success text fade up
          const successTexts = successRef.current?.querySelectorAll("p") || [];
          gsap.fromTo(
            successTexts,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.1, delay: 0.3 }
          );

          burstParticles(18, 45);

          // Auto-close
          setTimeout(() => closeModal(), 2400);
        });
      },
    });
  }, [form, sending, burstParticles, closeModal]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  function addFieldRef(el) {
    if (el && !fieldsRef.current.includes(el)) fieldsRef.current.push(el);
  }

  // ✅ FIXED: Reset refs properly
  useEffect(() => {
    fieldsRef.current = [];
  }, []);

  // ✅ REMOVED: Demo trigger button & unused functions
  // Now controlled only by Navbar

  return (
    <>
      {/* ── PORTAL ── */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Particle canvas */}
          <div
            ref={bgSceneRef}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          />

          {/* Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 cursor-pointer"
            style={{ display: "none" }}
            onClick={closeModal}
          />

          {/* Modal */}
          <div
            ref={modalRef}
            className="relative bg-white w-[90%] max-w-[440px] rounded-2xl p-8 shadow-2xl"
            style={{ opacity: 0, pointerEvents: "none" }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.15, duration: 0.18, ease: "back.out(2)" })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.18 })}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm hover:text-neutral-700 transition-colors"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div ref={headerRef}>
                  <h2 className="text-xl font-semibold mb-1 text-neutral-900">
                    Let's build something great
                  </h2>
                  <p className="text-sm text-neutral-400 mb-6">
                    Have a project in mind? Send us a message.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div ref={addFieldRef}>
                    <label className="text-xs text-neutral-400 block mb-1">Your name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className="w-full border-b border-neutral-200 focus:border-black outline-none py-2 text-sm bg-transparent transition-colors duration-200"
                    />
                  </div>

                  <div ref={addFieldRef}>
                    <label className="text-xs text-neutral-400 block mb-1">Email address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@example.com"
                      className="w-full border-b border-neutral-200 focus:border-black outline-none py-2 text-sm bg-transparent transition-colors duration-200"
                    />
                  </div>

                  <div ref={addFieldRef}>
                    <label className="text-xs text-neutral-400 block mb-1">Your message</label>
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project..."
                      className="w-full border-b border-neutral-200 focus:border-black outline-none py-2 text-sm bg-transparent resize-none transition-colors duration-200"
                    />
                  </div>

                  {/* Honeypot — off-screen and skipped by keyboard and screen readers */}
                  <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
                    <label>
                      Company
                      <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div ref={submitRowRef} className="mt-2">
                    <button
                      type="submit"
                      disabled={sending}
                      aria-busy={sending}
                      onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.04, duration: 0.18, ease: "power2.out" })}
                      onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.18 })}
                      className="bg-black text-white py-3 px-7 rounded-full text-sm disabled:opacity-60 disabled:cursor-wait"
                    >
                      {sending ? "Sending…" : "Send message"}
                    </button>
                    {error && (
                      <p role="alert" className="mt-3 text-sm text-[#ED1E24]">
                        {error}
                      </p>
                    )}
                  </div>
                </form>
              </>
            ) : (
              /* Success state */
              <div ref={successRef} className="text-center py-8">
                <div
                  ref={checkCircleRef}
                  className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polyline
                      points="4,13 9,18 20,7"
                      stroke="#16a34a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-base font-semibold text-neutral-900 mb-1">Message sent!</p>
                <p className="text-sm text-neutral-400">We'll be in touch soon.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}