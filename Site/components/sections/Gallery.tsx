"use client";

import Image from "next/image";
import { useState } from "react";

const BASE = "https://raw.githubusercontent.com/ArthurBr02/bonbons-ensim-usine-du-futur/main/Rendus";

const PALETTES = [
  { key: "default", label: "Aluminium", color: "#d0cec6" },
  { key: "rose", label: "Rose", color: "#FD5F9F" },
  { key: "menthe", label: "Menthe", color: "#5dd6a8" },
  { key: "violet", label: "Violet", color: "#7c5cff" },
  { key: "orange", label: "Orange", color: "#ff7043" },
];

export default function Gallery() {
  const [palette, setPalette] = useState("default");
  const [missingVariants, setMissingVariants] = useState<Set<string>>(new Set());

  const getImageUrl = (view: string, p: string) => {
    const variantKey = `${view}-${p}`;
    if (p === "default" || missingVariants.has(variantKey)) {
      return `${BASE}/${view}.jpg`;
    }
    return `${BASE}/${view}-${p}.jpg`;
  };

  const handleError = (view: string, p: string) => {
    if (p !== "default") {
      setMissingVariants((prev) => new Set(prev).add(`${view}-${p}`));
    }
  };

  return (
    <section id="gallery">
      <div className="wrap">
        <div className="divider"><span>04</span><span>Galerie</span><span /></div>
        <div className="sec-head">
          <h2 className="h-display">Dans la lumière,<br />sous tous les <em>angles</em>.</h2>
          <div className="gallery-desc">
            <p>
              Vues d&apos;atelier et rendus 3D. La pièce finale est livrée dans une
              boîte en carton kraft tamponnée à la main.
            </p>
            
            <div className="palette-picker">
              <span className="mono muted">Finition :</span>
              <div className="swatches">
                {PALETTES.map((p) => (
                  <button
                    key={p.key}
                    className={`palette-swatch ${palette === p.key ? "active" : ""}`}
                    style={{ backgroundColor: p.color }}
                    onClick={() => setPalette(p.key)}
                    title={p.label}
                  />
                ))}
              </div>
              <span className="palette-label mono">{PALETTES.find(p => p.key === palette)?.label}</span>
            </div>
          </div>
        </div>
        <div className="gallery">
          <div className="tile t1">
            <Image 
              key={`${palette}-front`}
              src={getImageUrl("front", palette)} 
              alt="Vue frontale" 
              fill 
              style={{ objectFit: "cover" }} 
              sizes="(max-width: 760px) 100vw, 40vw" 
              priority 
              onError={() => handleError("front", palette)}
            />
            <span className="tag">01 · vue frontale</span>
          </div>
          <div className="tile t2">
            <Image 
              key={`${palette}-dome`}
              src={getImageUrl("dome", palette)} 
              alt="Dôme" 
              fill 
              style={{ objectFit: "cover" }} 
              sizes="(max-width: 760px) 100vw, 30vw" 
              onError={() => handleError("dome", palette)}
            />
            <span className="tag">02 · dôme</span>
          </div>
          <div className="tile t3">
            <Image 
              key={`${palette}-base`}
              src={getImageUrl("base", palette)} 
              alt="Base" 
              fill 
              style={{ objectFit: "cover" }} 
              sizes="(max-width: 760px) 100vw, 30vw" 
              onError={() => handleError("base", palette)}
            />
            <span className="tag">03 · base</span>
          </div>
          <div className="tile t4">
            <Image 
              key={`${palette}-bonbons`}
              src={getImageUrl("bonbons", palette)} 
              alt="Bonbons" 
              fill 
              style={{ objectFit: "cover" }} 
              sizes="(max-width: 760px) 100vw, 60vw" 
              onError={() => handleError("bonbons", palette)}
            />
            <span className="tag" style={{ color: "var(--ink)" }}>04 · bonbons</span>
          </div>
        </div>
      </div>
    </section>
  );
}
