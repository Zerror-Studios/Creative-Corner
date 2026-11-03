"use client";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";

const videoData = [
  `/Data/IMG_7483.mp4`,
  `/Data/IMG_8224.mp4`,
  `/Data/IMG_2510.mp4`,
  `/Data/IMG_7162.mp4`,
  `/Data/IMG_6359.mp4`,
  `/Data/IMG_8900.mp4`,
  `/Data/IMG_8225.mp4`,
  `/Data/IMG_8228.mp4`,
];

const MeshMaker = ({ width, height, position, rotation, videoSrc, index }) => {
  const meshRef = useRef();
  const videoRef = useRef();
  const textureRef = useRef();
  const materialRef = useRef();

  useEffect(() => {
    // Create video element
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;      // ✅ Required for iOS
    video.setAttribute("playsinline", ""); // ✅ Extra safety for older iOS
    video.setAttribute("webkit-playsinline", "");
    video.preload = "auto";
    video.src = videoSrc;

    videoRef.current = video;

    // Wait for video to be ready
    const handleLoaded = () => {
      video.play().catch(e => console.log(`Video ${index} play failed:`, e));
    };

    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("canplaythrough", handleLoaded);

    // Create texture
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    
    textureRef.current = texture;

    // Create material with correct color settings
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      toneMapped: false, // Critical for correct colors
    });

    materialRef.current = material;

    // Update mesh material
    if (meshRef.current) {
      meshRef.current.material = material;
    }

    return () => {
      video.pause();
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("canplaythrough", handleLoaded);
      
      if (textureRef.current) {
        textureRef.current.dispose();
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
    };
  }, [videoSrc, index]);

  // Continuous video texture update
  useFrame(() => {
    if (textureRef.current && videoRef.current?.readyState > 2) {
      textureRef.current.needsUpdate = true;
    }
    if (meshRef.current) {
    meshRef.current.lookAt(0, 0, 0);
  }
  });

  // Position and rotation
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...position);
      meshRef.current.rotation.set(...rotation);
      meshRef.current.lookAt(0, 0, 0);
    }
  }, [position, rotation]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
    </mesh>
  );
};

const HeroScene = () => {
  const [geometry, setGeometry] = useState({ width: 20, height: 30 });
  const groupRef = useRef();

  // Responsive geometry
  useEffect(() => {
    const updateGeometry = () => {
      // const width = Math.min(window.innerWidth / 25, 25);

       const isMobile = window.innerWidth <= 768;
       let baseWidth;
       if (isMobile) {
    baseWidth = window.innerWidth / 7;     // mobile width
  } else {
    baseWidth = window.innerWidth / 18; // caps desktop width at ~25
  }

      const width = baseWidth;
      const height = width * 1.5;
      setGeometry({ width, height });
    };

    updateGeometry();
    window.addEventListener("resize", updateGeometry);
    return () => window.removeEventListener("resize", updateGeometry);
  }, []);

  const RADIUS = useMemo(() => {
    return (videoData.length * geometry.width) / (2 * Math.PI) ;
  }, [geometry.width]);


  useEffect(() => {
  if (!groupRef.current) return;

  // Set initial position explicitly
  groupRef.current.position.y = -1000;

  gsap.to(groupRef.current.position, {
    delay:2.5,
    y: 0,
    duration: 2,
    ease: "power3.out",
  });
}, []);


  // Infinite rotation animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate around Y-axis continuously
      groupRef.current.rotation.y += delta * 0.3; // Adjust speed (0.3 = smooth rotation)
    }
    
  });

  return (
    <group ref={groupRef} scale={2}>
      {videoData.map((videoSrc, index) => {
        const angle = (Math.PI * 2 * index) / videoData.length;
        const x = Math.cos(angle) * RADIUS;
        const z = Math.sin(angle) * RADIUS;
        const position = [x, 0, z];
        const rotation = [0, angle + Math.PI, 0];

        return (
          <MeshMaker
            key={videoSrc}
            width={geometry.width}
            height={geometry.height}
            position={position}
            rotation={rotation}
            videoSrc={videoSrc}
            index={index}
          />
        );
      })}
    </group>
  );
};

HeroScene.displayName = "HeroScene";

export default HeroScene;