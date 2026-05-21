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
            <div className="stripes" />
            <span className="tag">01 · vue frontale</span>
          </div>
          <div className="tile t2">
            <div className="stripes" />
            <span className="tag">02 · dôme</span>
          </div>
          <div className="tile t3">
            <div className="stripes" />
            <span className="tag">03 · base</span>
          </div>
          <div className="tile t4">
            <span className="tag" style={{ color: "var(--ink)" }}>04 · bonbons</span>
          </div>
        </div>
      </div>
    </section>
  );
}
