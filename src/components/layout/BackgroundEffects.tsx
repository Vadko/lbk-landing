"use client";

import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(
  () => import("./ParticlesBackground").then((mod) => mod.ParticlesBackground),
  { ssr: false }
);

export function BackgroundEffects() {
  return (
    <>
      <ParticlesBackground />
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
    </>
  );
}
