// app.jsx — main app composition

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "atelier",
  "accent": "#FD5F9F",
  "displayFont": "Instrument Serif",
  "bodyFont": "Manrope",
  "drawerStyle": "glass"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  { val: '#FD5F9F', name: 'Bonbon' },
  { val: '#ff5a8a', name: 'Fraise' },
  { val: '#5dd6a8', name: 'Pistache' },
  { val: '#7c5cff', name: 'Myrtille' },
  { val: '#0f1117', name: 'Encre' },
];
const ACCENT_INK = {
  '#FD5F9F': '#1a1303',
  '#ff5a8a': '#2c0010',
  '#5dd6a8': '#082417',
  '#7c5cff': '#0d0628',
  '#0f1117': '#fafaf5',
};
const DISPLAY_FONTS = ['Instrument Serif', 'Newsreader', 'DM Serif Display'];
const BODY_FONTS    = ['Manrope', 'Geist', 'Public Sans'];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks → CSS vars + dataset on <html>
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-direction', t.direction);
    root.setAttribute('data-drawer-style', t.drawerStyle);
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--accent-ink', ACCENT_INK[t.accent] || '#fff');
    root.style.setProperty('--font-display', `"${t.displayFont}", "Newsreader", Georgia, serif`);
    root.style.setProperty('--font-body', `"${t.bodyFont}", ui-sans-serif, system-ui, sans-serif`);
  }, [t]);

  // Cart state
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [step, setStep] = React.useState('cart');
  const [qty, setQty] = React.useState(1);
  const [orderNo, setOrderNo] = React.useState('');

  const cartCount = qty;

  const openCart = () => {
    setStep('cart');
    if (qty === 0) setQty(1);
    setDrawerOpen(true);
  };

  const completeOrder = (form) => {
    // generate order no — short, readable
    const t = Date.now().toString(36).toUpperCase().slice(-5);
    const r = Math.floor(Math.random() * 36 ** 3).toString(36).toUpperCase().padStart(3, '0');
    setOrderNo(`CB-${t}-${r}`);
    setStep('success');
  };

  return (
    <>
      <nav className="nav">
        <a href="#hero" className="nav-brand">
          <span className="dot" />
          Coco Bonbons
        </a>
        <div className="nav-links">
          <a href="#specs">Specs</a>
          <a href="#demo">Mode d'emploi</a>
          <a href="#about">Projet</a>
          <a href="#faq">FAQ</a>
        </div>
        <button className="cart-btn" onClick={() => { setStep('cart'); setDrawerOpen(true); }}>
          Panier <span className="count">{cartCount}</span>
        </button>
      </nav>

      <main>
        <Hero onOrder={openCart} />
        <Specs />
        <Marquee />
        <Demo />
        <Gallery />
        <About />
        <Order onOrder={openCart} />
        <FAQ />
      </main>
      <Footer />

      <CartDrawer
        open={drawerOpen}
        step={step}
        setStep={setStep}
        qty={qty}
        setQty={setQty}
        onClose={() => setDrawerOpen(false)}
        onOrderComplete={completeOrder}
        orderNo={orderNo}
      />

      <TweaksPanel title="Tweaks · Coco Bonbons">
        <TweakSection label="Direction" />
        <TweakRadio
          label="Style"
          value={t.direction}
          options={[{ value: 'atelier', label: 'Atelier' }, { value: 'confiserie', label: 'Confiserie' }]}
          onChange={(v) => setTweak('direction', v)}
        />

        <TweakSection label="Couleur d'accent" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={ACCENT_OPTIONS.map((o) => o.val)}
          onChange={(v) => setTweak('accent', v)}
        />

        <TweakSection label="Typographie" />
        <TweakSelect
          label="Display"
          value={t.displayFont}
          options={DISPLAY_FONTS}
          onChange={(v) => setTweak('displayFont', v)}
        />
        <TweakSelect
          label="Texte"
          value={t.bodyFont}
          options={BODY_FONTS}
          onChange={(v) => setTweak('bodyFont', v)}
        />

        <TweakSection label="Panier" />
        <TweakRadio
          label="Style"
          value={t.drawerStyle}
          options={[{ value: 'glass', label: 'Glass' }, { value: 'opaque', label: 'Opaque' }]}
          onChange={(v) => setTweak('drawerStyle', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
