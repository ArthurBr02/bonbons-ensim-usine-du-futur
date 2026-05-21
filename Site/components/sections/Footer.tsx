import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div className="foot-mark" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src="https://github.com/ArthurBr02/bonbons-ensim-usine-du-futur/blob/main/Communication/LOGO_LITE.png?raw=true" 
                alt="Coco Bonbons Logo" 
                width={32} 
                height={32}
                style={{ objectFit: 'contain' }}
              />
              <span>
                Coco Bonbons<em style={{ color: "var(--accent)" }}>.</em>
              </span>
            </div>
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: 13, maxWidth: "36ch", marginTop: '12px' }}>
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
              <li><Link href="/equipe">L&apos;Équipe</Link></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Mentions</h4>
            <ul>
              <li><a href="#">CGV</a></li>
              <li><a href="#">Politique RGPD</a></li>
              <li><a href="#">Cookies</a></li>
              <li><Link href="/credits">Crédits</Link></li>
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
