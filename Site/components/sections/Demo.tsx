function StepIllu({ kind }: { kind: "fill" | "turn" | "collect" }) {
  if (kind === "fill") {
    return (
      <svg viewBox="0 0 200 120" width="80%" height="100%">
        <defs>
          <linearGradient id="alu1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e8e6df" />
            <stop offset=".5" stopColor="#f0eee7" />
            <stop offset="1" stopColor="#cac8c0" />
          </linearGradient>
        </defs>
        <rect x="60" y="20" width="80" height="80" rx="40" fill="rgba(255,255,255,.6)" stroke="rgba(0,0,0,.1)" />
        <circle cx="100" cy="58" r="6" fill="var(--candy-1)" />
        <circle cx="86" cy="68" r="5" fill="var(--candy-2)" />
        <circle cx="112" cy="72" r="5" fill="var(--candy-3)" />
        <circle cx="96" cy="80" r="4" fill="var(--candy-4)" />
        <circle cx="108" cy="48" r="4" fill="var(--candy-5)" />
        <circle cx="100" cy="12" r="4" fill="var(--candy-1)">
          <animate attributeName="cy" values="12;52;52" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="0" r="4" fill="var(--candy-3)">
          <animate attributeName="cy" values="-4;42;42" dur="2.4s" begin=".8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0" dur="2.4s" begin=".8s" repeatCount="indefinite" />
        </circle>
        <rect x="84" y="100" width="32" height="6" fill="url(#alu1)" />
      </svg>
    );
  }
  if (kind === "turn") {
    return (
      <svg viewBox="0 0 200 120" width="80%" height="100%">
        <rect x="56" y="34" width="88" height="62" rx="12" fill="rgba(255,255,255,.6)" stroke="rgba(0,0,0,.1)" />
        <rect x="76" y="48" width="48" height="4" rx="2" fill="#2c2a26" />
        <circle cx="100" cy="74" r="14" fill="none" stroke="rgba(0,0,0,.15)" strokeDasharray="2 3" />
        <circle cx="100" cy="74" r="9" fill="var(--accent)">
          <animateTransform attributeName="transform" type="rotate" from="0 100 74" to="360 100 74" dur="3s" repeatCount="indefinite" />
        </circle>
        <rect x="98.5" y="64" width="3" height="6" fill="rgba(0,0,0,.4)">
          <animateTransform attributeName="transform" type="rotate" from="0 100 74" to="360 100 74" dur="3s" repeatCount="indefinite" />
        </rect>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 120" width="80%" height="100%">
      <path d="M40 80 Q100 60 160 80 L160 96 Q100 110 40 96 Z" fill="rgba(255,255,255,.6)" stroke="rgba(0,0,0,.1)" />
      <circle cx="86" cy="80" r="6" fill="var(--candy-1)" />
      <circle cx="100" cy="82" r="6" fill="var(--candy-2)" />
      <circle cx="116" cy="80" r="6" fill="var(--candy-3)" />
      <circle cx="100" cy="20" r="5" fill="var(--candy-5)">
        <animate attributeName="cy" values="20;72" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;1;0" keyTimes="0;.85;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function Demo() {
  return (
    <section id="demo">
      <div className="wrap">
        <div className="divider"><span>03</span><span>Mode d&apos;emploi</span><span /></div>
        <div className="sec-head">
          <h2 className="h-display">Trois gestes, <em>zéro bouton</em>.</h2>
          <p>
            Pas d&apos;app, pas d&apos;écran tactile, pas de capteur capacitif. La mécanique
            fait tout le travail, comme dans les bons vieux distributeurs des années 50 —
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
              <div className="step-illu"><StepIllu kind="fill" /></div>
            </div>
            <div className="step">
              <div className="step-no">02</div>
              <div className="step-title">Tourner</div>
              <div className="step-body">
                La molette frontale entraîne la roue de dosage. Un tour complet
                libère trois à cinq bonbons selon la taille.
              </div>
              <div className="step-illu"><StepIllu kind="turn" /></div>
            </div>
            <div className="step">
              <div className="step-no">03</div>
              <div className="step-title">Récolter</div>
              <div className="step-body">
                Les bonbons tombent dans la fenêtre inférieure, prêts à être pris.
                Aucun choc, aucun bruit — juste le tintement du verre.
              </div>
              <div className="step-illu"><StepIllu kind="collect" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
