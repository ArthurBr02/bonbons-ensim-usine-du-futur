export default function About() {
  return (
    <section id="about">
      <div className="wrap about">
        <div className="about-card">
          <span className="h-eyebrow">Le projet · Usine du futur</span>
          <h3>
            Un objet pédagogique<br />
            <em>devenu produit</em>.
          </h3>
          <p>
            Coco Bonbons est né dans le cours <em>Usine du futur</em>. Le distributeur
            a d&apos;abord été modélisé en CAO sur Solidworks, simulé, prototypé,
            puis usiné. L&apos;idée : faire passer un objet de la table à dessin
            à un vrai workflow industriel — de la 3D à la livraison.
          </p>
          <div className="about-tags">
            <span>CAO Solidworks</span>
            <span>Usinage CN</span>
            <span>Verre borosilicate</span>
            <span>Anodisation</span>
            <span>Made in Loire-Atlantique</span>
          </div>
        </div>
        <div>
          <span className="h-eyebrow">Notre démarche</span>
          <h2 className="h-display" style={{ marginTop: 18, fontSize: "clamp(34px, 4.4vw, 60px)" }}>
            Aussi sérieux<br />qu&apos;un <em>bonbon</em><br />peut l&apos;être.
          </h2>
          <p style={{ color: "var(--ink-2)", marginTop: 22, maxWidth: "38ch" }}>
            On a passé plus d&apos;heures à modéliser un cap en aluminium qu&apos;à
            choisir les bonbons. C&apos;est probablement un défaut. C&apos;est sûrement
            ce qui rend la pièce belle.
          </p>
        </div>
      </div>
    </section>
  );
}
