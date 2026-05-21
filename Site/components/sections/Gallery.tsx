import Image from "next/image";

const BASE = "https://raw.githubusercontent.com/ArthurBr02/bonbons-ensim-usine-du-futur/main/Rendus";

export default function Gallery() {
  return (
    <section id="gallery">
      <div className="wrap">
        <div className="divider"><span>04</span><span>Galerie</span><span /></div>
        <div className="sec-head">
          <h2 className="h-display">Dans la lumière,<br />sous tous les <em>angles</em>.</h2>
          <p>
            Vues d&apos;atelier et rendus 3D. La pièce finale est livrée dans une
            boîte en carton kraft tamponnée à la main.
          </p>
        </div>
        <div className="gallery">
          <div className="tile t1">
            <Image src={`${BASE}/front.jpg`} alt="Vue frontale" fill style={{ objectFit: "cover" }} sizes="(max-width: 760px) 100vw, 40vw" priority />
            <span className="tag">01 · vue frontale</span>
          </div>
          <div className="tile t2">
            <Image src={`${BASE}/dome.jpg`} alt="Dôme" fill style={{ objectFit: "cover" }} sizes="(max-width: 760px) 100vw, 30vw" />
            <span className="tag">02 · dôme</span>
          </div>
          <div className="tile t3">
            <Image src={`${BASE}/base.jpg`} alt="Base" fill style={{ objectFit: "cover" }} sizes="(max-width: 760px) 100vw, 30vw" />
            <span className="tag">03 · base</span>
          </div>
          <div className="tile t4">
            <Image src={`${BASE}/bonbons.jpg`} alt="Bonbons" fill style={{ objectFit: "cover" }} sizes="(max-width: 760px) 100vw, 60vw" />
            <span className="tag" style={{ color: "var(--ink)" }}>04 · bonbons</span>
          </div>
        </div>
      </div>
    </section>
  );
}
