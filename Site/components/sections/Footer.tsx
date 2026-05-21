export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div className="foot-mark">
              Coco Bonbons<em style={{ color: "var(--accent)" }}>.</em>
            </div>
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: 13, maxWidth: "36ch" }}>
              Distributeur de bonbons usiné en France.
              Projet pédagogique du cours Usine du futur.
            </div>
          </div>
          <div>
            <h4>Produit</h4>
            <ul>
              <li><a href="#specs">Spécifications</a></li>
              <li><a href="#demo">Mode d&apos;emploi</a></li>
              <li><a href="#gallery">Galerie</a></li>
              <li><a href="#order">Commander</a></li>
            </ul>
          </div>
          <div>
            <h4>Atelier</h4>
            <ul>
              <li><a href="#about">Le projet</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#">Newsletter</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Mentions</h4>
            <ul>
              <li><a href="#">CGV</a></li>
              <li><a href="#">Politique RGPD</a></li>
              <li><a href="#">Cookies</a></li>
              <li><a href="#">Crédits</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 · Coco Bonbons · Projet pédagogique</span>
          <span>v1.0 · MK1 — Stack: Next.js · Three.js · GSAP · Prisma</span>
        </div>
      </div>
    </footer>
  );
}
