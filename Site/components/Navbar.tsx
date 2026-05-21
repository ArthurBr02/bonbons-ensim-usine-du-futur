"use client";
import { useCart } from "@/store/cart";

export default function Navbar() {
  const { qty, open } = useCart();

  return (
    <nav className="nav">
      <a href="#" className="nav-brand">
        <img 
          src="https://github.com/ArthurBr02/bonbons-ensim-usine-du-futur/blob/main/Communication/LOGO_LITE.png?raw=true" 
          alt="Coco Bonbons Logo" 
          width={24} 
          height={24}
          style={{ objectFit: 'contain' }}
        />
        Coco Bonbons
      </a>
      <div className="nav-links">
        <a href="/#specs">Atelier</a>
        <a href="/#demo">Mécanique</a>
        <a href="/#order">Commander</a>
        <a href="/equipe">Équipe</a>
        <a href="/#contact">Contact</a>
      </div>
      <button className="cart-btn" onClick={open} aria-label="Ouvrir le panier">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        Panier
        {qty > 0 && <span className="count">{qty}</span>}
      </button>
    </nav>
  );
}
