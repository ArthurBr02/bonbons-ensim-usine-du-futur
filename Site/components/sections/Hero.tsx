"use client";
import Distributor from "@/components/distributor";
import { useCart } from "@/store/cart";

export default function Hero() {
  const { open, increment } = useCart();

  const handleOrder = () => {
    increment();
    open();
  };

  return (
    <section id="hero" className="hero">
      <div className="wrap hero-inner">
        <div>
          <span className="h-eyebrow">Coco Bonbons · Distributeur MK1</span>
          <h1 className="h-display" style={{ marginTop: 20 }}>
            Un bonbon,<br />
            <em>une rotation</em>,<br />
            une fabrique<br />
            de souvenirs.
          </h1>
          <p className="hero-sub">
            Distributeur de bonbons usiné en France, pensé pour les bureaux,
            les comptoirs et toute pièce qui mérite un petit rituel sucré.
            Modélisé dans le cadre du cours <em>Usine du futur</em>.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={handleOrder}>
              Commander · 149&nbsp;€ <span className="arrow">→</span>
            </button>
            <a href="#specs" className="btn btn-ghost">Voir les specs</a>
          </div>
          <div className="hero-meta">
            <div><span>1,2&nbsp;kg</span>Plastique délicieux</div>
            <div><span>300&nbsp;g</span>Capacité bonbons</div>
            <div><span>4&nbsp;ans</span>Garantie atelier</div>
          </div>
        </div>
        <div className="hero-visual">
          <Distributor height={620} />
        </div>
      </div>
    </section>
  );
}
