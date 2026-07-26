"use client";

import Image from "next/image";
import { HoverCard } from "@/components/ui/HoverCard";

export function PartnerSection() {
  const partnersData: Array<{
    name: string;
    Logo: string;
    width: number;
    height: number;
  }> = [
    {
      name: "Kuli",
      Logo: "/assets/Logo-kuli.png",
      width: 58,
      height: 40,
    },
    {
      name: "FanСon",
      Logo: "/assets/Logo-FanСon.png",
      width: 58,
      height: 48,
    },
    {
      name: "CloverDUB",
      Logo: "/assets/Logo-CloverDUB.svg",
      width: 90,
      height: 40,
    },
  ];

  return (
    <section id="partners" className="partners container section-margin">
      <HoverCard className="hover-card partners-card">
        <div className="partners-list">
          {partnersData.map((partner) => {
            const { name, Logo, width, height } = partner;
            return (
              <div key={name} className="partners-list__item">
                <Image src={Logo} width={width} height={height} alt={name} />
                <p>{name}</p>
              </div>
            );
          })}
        </div>
        <p className="h3">Нам довіряють та з нами працюють.</p>
      </HoverCard>
    </section>
  );
}
