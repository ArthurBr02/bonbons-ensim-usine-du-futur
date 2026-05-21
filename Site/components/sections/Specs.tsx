const SPECS = [
  { name: "Matériau corps", sub: "Aluminium 6061 anodisé, finition brossée mate.", val: "Alu 6061" },
  { name: "Dôme", sub: "Verre borosilicate soufflé, traitement anti-rayure.", val: "Borosilicate 3mm" },
  { name: "Capacité", sub: "Environ 300 g de bonbons standards, calibre 12–18 mm.", val: "~300 g" },
  { name: "Mécanisme", sub: "Roue de dosage usinée, libération par rotation manuelle.", val: "Manuel · 1 tour" },
  { name: "Dimensions", sub: "Hauteur totale, dôme inclus, sur socle pédestal.", val: "38 × 18 × 18 cm" },
  { name: "Poids", sub: "Pesé à vide, sans bonbons ni emballage.", val: "1,2 kg" },
  { name: "Origine", sub: "Usiné, assemblé et calibré dans notre atelier en Loire-Atlantique.", val: "Made in FR" },
];

export default function Specs() {
  return (
    <section id="specs">
      <div className="wrap">
        <div className="divider"><span>02</span><span>Spécifications</span><span /></div>
        <div className="sec-head">
          <h2 className="h-display">Conçu comme une <em>pièce d&apos;atelier</em>, pas comme un gadget.</h2>
          <p>
            Chaque distributeur est usiné à la commande. La pièce vit sur une étagère,
            un bureau, un comptoir d&apos;accueil. Pas de plastique, pas de led inutile —
            juste du métal, du verre, et du bonbon.
          </p>
        </div>
        <div className="specs-grid" style={{ gridTemplateColumns: "1fr", maxWidth: 920 }}>
          <div className="specs-list">
            {SPECS.map((s, i) => (
              <div className="spec-row" key={i}>
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <div className="name">{s.name}<small>{s.sub}</small></div>
                <span className="val">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
