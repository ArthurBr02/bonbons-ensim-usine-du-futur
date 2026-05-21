"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "Quels bonbons puis-je mettre dedans ?",
    a: "Tout ce qui rentre dans un dôme et qui pèse moins qu'une bille de roulement. Idéalement, des bonbons calibrés 12 à 18 mm — type dragées, smarties, fraises tagada compactes.",
  },
  {
    q: "Le paiement est-il vraiment simulé ?",
    a: "Oui. Ce site est un projet de cours. Le clic sur \"Payer\" affiche un message de succès et envoie un email de confirmation, mais aucune transaction n'est exécutée.",
  },
  {
    q: "Est-ce livré rempli de bonbons ?",
    a: "Un petit sachet est offert dans la boîte, juste pour le rituel du premier remplissage. Ensuite, c'est à vous de choisir vos bonbons préférés.",
  },
  {
    q: "Puis-je le poser dans un bureau ?",
    a: "C'est exactement pour ça qu'on l'a dessiné. Il est assez lourd pour rester en place, assez beau pour ne pas se faire ranger dans un tiroir.",
  },
  {
    q: "Et si je veux une couleur différente ?",
    a: "Pour l'instant, il n'y a qu'une seule référence (MK1, aluminium brossé). On garde l'envie d'autres finitions pour une future MK2.",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section id="faq">
      <div className="wrap">
        <div className="divider"><span>07</span><span>FAQ</span><span /></div>
        <div className="sec-head">
          <h2 className="h-display">Cinq <em>questions</em>,<br />cinq réponses.</h2>
          <p>
            Si vous avez une sixième question, écrivez-nous —
            on aime bien parler de bonbons.
          </p>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className={`faq-item${openIdx === i ? " open" : ""}`}
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            >
              <div className="faq-q">
                <span>{f.q}</span>
                <span className="plus">+</span>
              </div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
