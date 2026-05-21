"use client";
import { useMemo, useState, CSSProperties } from "react";

interface Candy {
  x: number;
  y: number;
  c: string;
  d: number;
  sz: number;
}

function generateCandies(seed = 13): Candy[] {
  const colors = [
    "var(--candy-1)", "var(--candy-2)", "var(--candy-3)",
    "var(--candy-4)", "var(--candy-5)", "var(--candy-6)",
  ];
  const rng = (i: number) => {
    const x = Math.sin(seed * 9.13 + i * 3.71) * 10000;
    return x - Math.floor(x);
  };
  const candies: Candy[] = [];
  let placed = 0, tries = 0;
  while (placed < 18 && tries < 400) {
    tries++;
    const r = Math.sqrt(rng(tries)) * 0.40;
    const a = rng(tries + 99) * Math.PI * 2;
    const x = 0.5 + r * Math.cos(a);
    const y = 0.5 + r * Math.sin(a);
    let ok = true;
    for (const c of candies) {
      const dx = c.x - x, dy = c.y - y;
      if (Math.sqrt(dx * dx + dy * dy) < 0.13) { ok = false; break; }
    }
    if (!ok) continue;
    candies.push({
      x, y,
      c: colors[Math.floor(rng(tries + 33) * colors.length)],
      d: 0.5 + rng(tries + 55) * 3,
      sz: 11 + rng(tries + 77) * 4,
    });
    placed++;
  }
  return candies;
}

function Distributor({ dispensing = false }: { dispensing?: boolean }) {
  const candies = useMemo(() => generateCandies(13), []);
  return (
    <div className={`distributor${dispensing ? " dispense" : ""}`}>
      <div className="dist-cap" />
      <div className="dist-dome">
        <div className="candies">
          {candies.map((k, i) => (
            <span
              key={i}
              className="candy"
              style={{
                left: `calc(${k.x * 100}% - ${k.sz / 2}%)`,
                top: `calc(${k.y * 100}% - ${k.sz / 2}%)`,
                width: `${k.sz}%`,
                height: `${k.sz}%`,
                ["--c" as keyof CSSProperties]: k.c,
                animationDelay: `${k.d}s`,
              } as CSSProperties}
            />
          ))}
        </div>
        <div className="etch">Coco</div>
      </div>
      <div className="dist-collar" />
      <div className="dist-neck" />
      <div className="dist-base">
        <div className="slot" />
        <div className="window" />
        <div className="lever" />
      </div>
      <div className="dist-pedestal">
        <div className="label">Coco Bonbons · MK1</div>
      </div>
    </div>
  );
}

interface DistributorCSSProps {
  height?: number;
  rotateY?: number;
  withLabels?: boolean;
  className?: string;
}

export default function DistributorCSS({
  height = 560,
  rotateY = 0,
  withLabels = true,
  className = "",
}: DistributorCSSProps) {
  const [dispensing, setDispensing] = useState(false);

  const handleDispense = () => {
    setDispensing(true);
    setTimeout(() => setDispensing(false), 600);
  };

  return (
    <div
      className={`stage ${className}`}
      style={{ height, pointerEvents: "auto" }}
      onClick={handleDispense}
      aria-hidden="true"
    >
      <div className="stage-inner" style={{ transform: `rotateY(${rotateY}deg)` }}>
        <Distributor dispensing={dispensing} />
      </div>
      {withLabels && (
        <>
          <span className="stage-label stage-label-tl">01 · DÔME VERRE</span>
          <span className="stage-label stage-label-mr">02 · ALU BROSSÉ</span>
          <span className="stage-label stage-label-bl">03 · SOCLE</span>
        </>
      )}
    </div>
  );
}
