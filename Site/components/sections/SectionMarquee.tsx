const WORDS = [
  "Distributeur de bonbons",
  "Made in France",
  "Plastique délicieux",
  "Verre Bonne maman",
  "Modélisé sur Solidworks",
];

export default function SectionMarquee() {
  const items = WORDS.map((w, i) => <span key={i}>{w}</span>);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{items}{items}</div>
    </div>
  );
}
