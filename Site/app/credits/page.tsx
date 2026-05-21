"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const PHOTOS_BASE = "https://github.com/ArthurBr02/bonbons-ensim-usine-du-futur/blob/main/Rendus/Lulu";
const PHOTO_IDS = Array.from({ length: 11 }, (_, i) => i + 1);

export default function CreditsPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main>
        <section style={{ minHeight: "80vh", paddingTop: "160px" }}>
          <div className="wrap">
            <div className="divider"><span>09</span><span>Crédits</span><span /></div>
            
            <div className="sec-head">
              <h2 className="h-display">L&apos;équipe derrière<br />le <em>projet</em>.</h2>
              <p>
                Photos, contributeurs et coulisses de la fabrication du Coco Bonbons MK1. 
                De la conception SolidWorks à l&apos;usinage final.
              </p>
            </div>

            <div className="credits-gallery" style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
              gap: "16px",
              marginTop: "56px"
            }}>
              {PHOTO_IDS.map((id) => (
                <div 
                  key={id} 
                  onClick={() => setSelectedPhoto(id)}
                  style={{ 
                    position: "relative", 
                    aspectRatio: "4/3", 
                    borderRadius: "var(--radius)", 
                    overflow: "hidden",
                    border: ".5px solid var(--hair-2)",
                    background: "var(--paper)",
                    cursor: "zoom-in"
                  }}
                >
                  <Image
                    src={`${PHOTOS_BASE}/${id}.jpg?raw=true`}
                    alt={`Photo de l'équipe ${id}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 760px) 100vw, 30vw"
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: 56, display: "flex", justifyContent: "center" }}>
              <Link href="/" className="btn btn-primary">
                <span className="arrow" style={{ transform: "rotate(180deg)" }}>→</span>
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox Modal */}
      {selectedPhoto !== null && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(20, 19, 14, 0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "grid",
            placeItems: "center",
            padding: "40px",
            cursor: "zoom-out"
          }}
        >
          <button 
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "32px",
              cursor: "pointer",
              zIndex: 1001
            }}
          >
            ✕
          </button>
          
          <div style={{ 
            position: "relative", 
            width: "100%", 
            height: "100%",
            maxWidth: "1200px",
            maxHeight: "80vh"
          }}>
            <Image
              src={`${PHOTOS_BASE}/${selectedPhoto}.jpg?raw=true`}
              alt={`Photo agrandie ${selectedPhoto}`}
              fill
              style={{ objectFit: "contain" }}
              sizes="90vw"
              priority
            />
          </div>
          
          <div style={{ 
            position: "absolute", 
            bottom: "24px", 
            color: "rgba(255,255,255,0.6)",
            fontFamily: "var(--font-mono)",
            fontSize: "12px"
          }}>
            {selectedPhoto} / {PHOTO_IDS.length}
          </div>
        </div>
      )}
    </>
  );
}
