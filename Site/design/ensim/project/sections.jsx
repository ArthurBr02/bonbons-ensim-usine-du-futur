// sections.jsx — all marketing sections of the Coco Bonbons one-page

(function () {
  const { useState, useEffect, useRef } = React;

  // ── Hero ────────────────────────────────────────────────────────────
  function Hero({ onOrder }) {
    return (
      <section id="hero" className="hero" data-stage-section="hero">
        <div className="wrap hero-inner">
          <div>
            <span className="h-eyebrow">Coco Bonbons · Distributeur MK1</span>
            <h1 className="h-display" style={{ marginTop: 20 }}>
              Un bonbon,<br/>
              <em>une rotation</em>,<br/>
              une fabrique<br/>
              de souvenirs.
            </h1>
            <p className="hero-sub">
              Distributeur de bonbons usiné en France, pensé pour les bureaux,
              les comptoirs et toute pièce qui mérite un petit rituel sucré.
              Modélisé dans le cadre du cours <em>Usine du futur</em>.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={onOrder}>
                Commander · 149&nbsp;€ <span className="arrow">→</span>
              </button>
              <a href="#specs" className="btn btn-ghost">Voir les specs</a>
            </div>
            <div className="hero-meta">
              <div>
                <span>1,2&nbsp;kg</span>
                Plastique délicieux
              </div>
              <div>
                <span>300&nbsp;g</span>
                Capacité bonbons
              </div>
              <div>
                <span>4&nbsp;ans</span>
                Garantie atelier
              </div>
            </div>
          </div>
          <div className="hero-stage">
            <InlineDistributor height={620} ry={0} />
          </div>
        </div>
      </section>
    );
  }

  // ── Specs ───────────────────────────────────────────────────────────
  const SPECS = [
    { name: 'Matériau corps', sub: 'Plastique délicieux.', val: 'Plastique délicieux' },
    { name: 'Dôme', sub: 'Verre Bonne maman soufflé, traitement anti-rayure.', val: 'Verre alimentaire' },
    { name: 'Capacité', sub: 'Environ 300 g de bonbons standards, calibre 12–18 mm.', val: '~300 g' },
    { name: 'Mécanisme', sub: 'Roue de dosage usinée, libération par rotation manuelle.', val: 'Manuel · 1 tour' },
    { name: 'Dimensions', sub: 'Dimensions du produit, dôme inclus, sur socle pédestal.', val: '18 × 21 × 20 cm (L x P x H)' },
    { name: 'Poids', sub: 'Pesé à vide, sans bonbons ni emballage.', val: '1,2 kg' },
    { name: 'Origine', sub: 'Usiné, assemblé et calibré dans notre atelier en Loire-Atlantique.', val: 'Made in FR' },
  ];

  function Specs() {
    return (
      <section id="specs" data-stage-section="specs">
        <div className="wrap">
          <div className="divider"><span>02</span><span>Spécifications</span><span /></div>
          <div className="sec-head">
            <h2 className="h-display">Conçu comme une <em>pièce d'atelier</em>, pas comme un gadget.</h2>
            <p>
              Chaque distributeur est usiné à la commande. La pièce vit sur une étagère,
              un bureau, un comptoir d'accueil. Pas de plastique, pas de led inutile —
              juste du plastique, du verre, et du bonbon.
            </p>
          </div>
          <div className="specs-grid specs-grid-solo">
            <div className="specs-list">
              {SPECS.map((s, i) => (
                <div className="spec-row" key={i}>
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
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

  // ── Demo (3 steps) ──────────────────────────────────────────────────
  function StepIllu({ kind }) {
    if (kind === 'fill') {
      return (
        <svg viewBox="0 0 200 120" width="80%" height="100%">
          <defs>
            <linearGradient id="alu1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#e8e6df"/><stop offset=".5" stopColor="#f0eee7"/><stop offset="1" stopColor="#cac8c0"/>
            </linearGradient>
          </defs>
          <rect x="60" y="20" width="80" height="80" rx="40" fill="rgba(255,255,255,.6)" stroke="rgba(0,0,0,.1)" />
          <circle cx="100" cy="58" r="6" fill="var(--candy-1)"/>
          <circle cx="86"  cy="68" r="5" fill="var(--candy-2)"/>
          <circle cx="112" cy="72" r="5" fill="var(--candy-3)"/>
          <circle cx="96"  cy="80" r="4" fill="var(--candy-4)"/>
          <circle cx="108" cy="48" r="4" fill="var(--candy-5)"/>
          {/* falling */}
          <circle cx="100" cy="12" r="4" fill="var(--candy-1)">
            <animate attributeName="cy" values="12;52;52" dur="2.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;1;0" dur="2.4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="100" cy="0" r="4" fill="var(--candy-3)">
            <animate attributeName="cy" values="-4;42;42" dur="2.4s" begin=".8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;1;0" dur="2.4s" begin=".8s" repeatCount="indefinite"/>
          </circle>
          <rect x="84" y="100" width="32" height="6" fill="url(#alu1)" />
        </svg>
      );
    }
    if (kind === 'turn') {
      return (
        <svg viewBox="0 0 200 120" width="80%" height="100%">
          <rect x="56" y="34" width="88" height="62" rx="12" fill="rgba(255,255,255,.6)" stroke="rgba(0,0,0,.1)" />
          <rect x="76" y="48" width="48" height="4" rx="2" fill="#2c2a26"/>
          {/* dial */}
          <circle cx="100" cy="74" r="14" fill="none" stroke="rgba(0,0,0,.15)" strokeDasharray="2 3" />
          <circle cx="100" cy="74" r="9" fill="var(--accent)">
            <animateTransform attributeName="transform" type="rotate" from="0 100 74" to="360 100 74" dur="3s" repeatCount="indefinite"/>
          </circle>
          <rect x="98.5" y="64" width="3" height="6" fill="rgba(0,0,0,.4)">
            <animateTransform attributeName="transform" type="rotate" from="0 100 74" to="360 100 74" dur="3s" repeatCount="indefinite"/>
          </rect>
        </svg>
      );
    }
    // collect
    return (
      <svg viewBox="0 0 200 120" width="80%" height="100%">
        <path d="M40 80 Q100 60 160 80 L160 96 Q100 110 40 96 Z" fill="rgba(255,255,255,.6)" stroke="rgba(0,0,0,.1)"/>
        <circle cx="86"  cy="80" r="6" fill="var(--candy-1)"/>
        <circle cx="100" cy="82" r="6" fill="var(--candy-2)"/>
        <circle cx="116" cy="80" r="6" fill="var(--candy-3)"/>
        <circle cx="100" cy="20" r="5" fill="var(--candy-5)">
          <animate attributeName="cy" values="20;72" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;1;0" keyTimes="0;.85;1" dur="1.6s" repeatCount="indefinite"/>
        </circle>
      </svg>
    );
  }

  function Demo() {
    return (
      <section id="demo" data-stage-section="demo">
        <div className="wrap">
          <div className="divider"><span>03</span><span>Mode d'emploi</span><span /></div>
          <div className="sec-head">
            <h2 className="h-display">Trois gestes, <em>zéro bouton</em>.</h2>
            <p>
              Pas d'app, pas d'écran tactile, pas de capteur capacitif. La mécanique
              fait tout le travail, comme dans les bons vieux distributeurs des annèes 50 —
              mais en mieux usiné.
            </p>
          </div>
          <div className="demo">
            <div className="demo-steps">
              <div className="step">
                <div className="step-no">01</div>
                <div className="step-title">Remplir</div>
                <div className="step-body">
                  Dévissez le capuchon supérieur et versez vos bonbons préférés dans le dôme.
                  Le calibre 12–18 mm est idéal.
                </div>
                <div className="step-illu"><StepIllu kind="fill"/></div>
              </div>
              <div className="step">
                <div className="step-no">02</div>
                <div className="step-title">Tourner</div>
                <div className="step-body">
                  La molette frontale entraîne la roue de dosage. Un tour complet
                  libère trois à cinq bonbons selon la taille.
                </div>
                <div className="step-illu"><StepIllu kind="turn"/></div>
              </div>
              <div className="step">
                <div className="step-no">03</div>
                <div className="step-title">Récolter</div>
                <div className="step-body">
                  Les bonbons tombent dans la fenêtre inférieure, prêts à être pris.
                  Aucun choc, aucun bruit — juste le tintement du verre.
                </div>
                <div className="step-illu"><StepIllu kind="collect"/></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Gallery ────────────────────────────────────────────────────────
  function Gallery() {
    return (
      <section id="gallery" data-stage-section="gallery">
        <div className="wrap">
          <div className="divider"><span>04</span><span>Galerie</span><span /></div>
          <div className="sec-head">
            <h2 className="h-display">Dans la lumière,<br/>sous tous les <em>angles</em>.</h2>
            <p>
              Vues d'atelier et rendus 3D. La pièce finale est livrée dans une
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
              <span className="tag" style={{ color: 'var(--ink)' }}>04 · bonbons</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── About ───────────────────────────────────────────────────────────
  function About() {
    return (
      <section id="about" data-stage-section="about">
        <div className="wrap about">
          <div className="about-card">
            <span className="h-eyebrow">Le projet · Usine du futur</span>
            <h3>
              Un objet pédagogique<br/>
              <em>devenu produit</em>.
            </h3>
            <p>
              Coco Bonbons est né dans le cours <em>Usine du futur</em>. Le distributeur
              a d'abord été modélisé en CAO sur Solidworks, simulé, prototypé,
              puis usiné. L'idée : faire passer un objet de la table à dessin
              à un vrai workflow industriel — de la 3D à la livraison.
            </p>
            <div className="about-tags">
              <span>CAO Solidworks</span>
              <span>Usinage CN</span>
              <span>Verre Bonne maman</span>
              <span>Impression 3D</span>
              <span>Made in Loire-Atlantique</span>
            </div>
          </div>
          <div>
            <span className="h-eyebrow">Notre démarche</span>
            <h2 className="h-display" style={{ marginTop: 18, fontSize: 'clamp(34px, 4.4vw, 60px)' }}>
              Aussi sérieux<br/>qu'un <em>bonbon</em><br/>peut l'être.
            </h2>
            <p style={{ color: 'var(--ink-2)', marginTop: 22, maxWidth: '38ch' }}>
              On a passé plus d'heures à modéliser un truc en plastique qu'à
              choisir les bonbons. C'est probablement un défaut. C'est sûrement
              ce qui rend la pièce belle.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ── Order ───────────────────────────────────────────────────────────
  function Order({ onOrder }) {
    return (
      <section id="order" data-stage-section="order">
        <div className="wrap order">
          <div>
            <div className="divider" style={{ marginBottom: 18 }}>
              <span>06</span><span>Commande</span><span />
            </div>
            <h2 className="h-display" style={{ fontSize: 'clamp(40px, 5.4vw, 76px)' }}>
              Une pièce.<br/>
              <em>Une référence.</em><br/>
              Un produit.
            </h2>
            <p style={{ color: 'var(--ink-2)', marginTop: 22, maxWidth: '42ch' }}>
              Pas de configurateur, pas de variantes. Chaque Coco Bonbons MK1 est
              identique, parce que c'est dèjà le bon. Livré sous 14 jours
              ouvrés, atelier compris.
            </p>
            <div className="hero-actions" style={{ marginTop: 32 }}>
              <button className="btn btn-primary" onClick={onOrder}>
                Ajouter au panier <span className="arrow">→</span>
              </button>
              <a className="btn btn-ghost" href="#specs">Revoir les specs</a>
            </div>
          </div>
          <div className="order-card">
            <span className="h-eyebrow">Réf. CB-MK1-001</span>
            <h3 className="h-display" style={{ marginTop: 14 }}>
              Coco Bonbons <em>MK1</em>
            </h3>
            <div className="price">149<small>€ TTC</small></div>
            <div className="price-meta">Livraison France incluse · Paiement simulé</div>
            <ul>
              <li>Distributeur usiné, dôme en verr</li>
              <li>Boîte cadeau kraft tamponnée à la main</li>
              <li>Sachet de bonbons surprise inclus</li>
              <li>Garantie atelier 2 ans</li>
            </ul>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onOrder}>
              Ajouter au panier <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── FAQ ─────────────────────────────────────────────────────────────
  const FAQS = [
    {
      q: 'Quels bonbons puis-je mettre dedans ?',
      a: 'Tout ce qui rentre dans un dôme et qui pèse moins qu\'une bille de roulement. Idéalement, des bonbons calibrés 12 à 18 mm — type dragées, smarties, fraises tagada compactes.'
    },
    {
      q: 'Le paiement est-il vraiment simulé ?',
      a: 'Oui. Ce site est un projet de cours. Le clic sur "Payer" affiche un message de succès et envoie un email de confirmation, mais aucune transaction n\'est exécutée.'
    },
    {
      q: 'Est-ce livré rempli de bonbons ?',
      a: 'Un petit sachet est offert dans la boîte, juste pour le rituel du premier remplissage. Ensuite, c\'est à vous de choisir vos bonbons préférés.'
    },
    {
      q: 'Puis-je le poser dans un bureau ?',
      a: 'C\'est exactement pour ça qu\'on l\'a dessiné. Il est assez lourd pour rester en place, assez beau pour ne pas se faire ranger dans un tiroir.'
    },
    {
      q: 'Et si je veux une couleur différente ?',
      a: 'Pour l\'instant, il n\'y a qu\'une seule référence (MK1, aluminium brossé). On garde l\'envie d\'autres finitions pour une future MK2.'
    },
  ];
  function FAQ() {
    const [open, setOpen] = useState(0);
    return (
      <section id="faq" data-stage-section="faq">
        <div className="wrap">
          <div className="divider"><span>07</span><span>FAQ</span><span /></div>
          <div className="sec-head">
            <h2 className="h-display">Cinq <em>questions</em>,<br/>cinq réponses.</h2>
            <p>
              Si vous avez une sixième question, écrivez-nous —
              on aime bien parler de bonbons.
            </p>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className={"faq-item" + (open === i ? " open" : "")}
                onClick={() => setOpen(open === i ? -1 : i)}
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

  // ── Marquee ─────────────────────────────────────────────────────────
  function Marquee() {
    const words = [
      'Distributeur de bonbons',
      'Made in France',
      'Plastique délicieux',
      'Verre Bonne maman',
      'Modélisé sur Solidworks',
      'Usine du futur',
    ];
    const row = words.map((w, i) => <span key={i}>{w}</span>);
    return (
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">{row}{row}</div>
      </div>
    );
  }

  // ── Footer ──────────────────────────────────────────────────────────
  function Footer() {
    return (
      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div>
              <div className="foot-mark">Coco Bonbons<em style={{ color: 'var(--accent)' }}>.</em></div>
              <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 13, maxWidth: '36ch' }}>
                Distributeur de bonbons usiné en France.
                Projet pédagogique du cours Usine du futur.
              </div>
            </div>
            <div>
              <h4>Produit</h4>
              <ul>
                <li><a href="#specs">Spécifications</a></li>
                <li><a href="#demo">Mode d'emploi</a></li>
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

  Object.assign(window, { Hero, Specs, Demo, Gallery, About, Order, FAQ, Marquee, Footer });
})();
