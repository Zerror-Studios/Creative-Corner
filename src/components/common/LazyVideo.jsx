"use client";
import { useEffect, useRef } from "react";

// Muted, looping background video that downloads nothing until it is actually on screen.
// Until then it shows its poster (the video's first frame, so the switch is seamless).
// It also pauses whenever it scrolls out of view, so off-screen reels don't keep decoding.
// (A plain <video autoPlay> starts downloading the whole file the moment the page opens,
// even far below the fold.)
const LazyVideo = ({ src, poster, className }) => {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // ratio > 0, not isIntersecting: a reel sitting exactly at the bottom edge of the
        // screen (About on phones) counts as "intersecting" without a single pixel showing
        if (entry.intersectionRatio > 0) {
          if (!video.getAttribute("src")) video.src = src;
          video.play().catch(() => {}); // e.g. iOS Low Power Mode blocks autoplay
        } else if (video.getAttribute("src")) {
          video.pause();
        }
      },
      { threshold: [0, 0.01] },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
};

export default LazyVideo;
