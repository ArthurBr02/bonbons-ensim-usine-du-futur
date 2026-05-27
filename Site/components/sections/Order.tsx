"use client";
import { useCart } from "@/store/cart";

export default function Order() {
  const { open, increment } = useCart();

  const handleOrder = () => {
    increment();
    open();
  };

  return (
    <section id="order">
      <div className="wrap order">
        <div>
          <div className="divider" style={{ marginBottom: 18 }}>
            <span>06</span><span>Commande</span><span />
          </div>
          <h2 className="h-display" style={{ fontSize: "clamp(40px, 5.4vw, 76px)" }}>
            Une pièce.<br />
            <em>Une référence.</em><br />
            Un produit.
          </h2>
          <p style={{ color: "var(--ink-2)", marginTop: 22, maxWidth: "42ch" }}>
            Pas de configurateur, pas de variantes. Chaque Coco Bonbons MK1 est
            identique, parce que c&apos;est déjà le bon. Livré sous 14 jours
            ouvrés, atelier compris.
          </p>
          {/* <div className="hero-actions" style={{ marginTop: 32 }}>
            <button className="btn btn-primary" onClick={handleOrder}>
              Ajouter au panier <span className="arrow">→</span>
            </button>
            <a className="btn btn-ghost" href="#specs">Revoir les specs</a>
          </div> */}
        </div>
        <div className="order-card">
          <span className="h-eyebrow">Réf. CB-MK1-001</span>
          <h3 className="h-display" style={{ marginTop: 14 }}>
            Coco Bonbons <em>MK1</em>
          </h3>
          <div className="price">149<small>€ TTC</small></div>
          <div className="price-meta">Livraison France incluse · Paiement simulé</div>
          <ul>
            <li>Distributeur usiné, dôme en verre</li>
            <li>Boîte cadeau kraft tamponnée à la main</li>
            <li>Sachet de bonbons surprise inclus</li>
            <li>Garantie atelier 4 ans</li>
          </ul>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleOrder}>
            Ajouter au panier <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
