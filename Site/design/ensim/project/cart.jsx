// cart.jsx — Side drawer with 3 steps (cart → form → success)

(function () {
  const { useState, useEffect } = React;

  function CartDrawer({ open, step, setStep, qty, setQty, onClose, onOrderComplete, orderNo }) {
    const unit = 149;
    const total = unit * qty;
    const [form, setForm] = useState({
      email: '', firstname: '', lastname: '',
      address: '', city: '', postcode: '',
      card: '4242 4242 4242 4242', expiry: '12/28', cvc: '123',
    });
    const setField = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const fmt = (n) => n.toFixed(2).replace('.', ',') + ' €';

    return (
      <>
        <div className={"drawer-scrim" + (open ? " open" : "")} onClick={onClose} />
        <aside className={"drawer" + (open ? " open" : "")} role="dialog" aria-label="Panier">
          <div className="drawer-head">
            <h3>
              <small>
                {step === 'cart' && '01 / Panier'}
                {step === 'form' && '02 / Livraison & paiement'}
                {step === 'success' && '03 / Confirmation'}
              </small>
              {step === 'cart' && 'Votre panier'}
              {step === 'form' && 'Finaliser la commande'}
              {step === 'success' && 'Merci !'}
            </h3>
            <button className="drawer-close" onClick={onClose} aria-label="Fermer">✕</button>
          </div>

          <div className="drawer-body">
            {step === 'cart' && (
              <>
                {qty === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ink-2)' }}>
                    Votre panier est vide.
                  </div>
                ) : (
                  <div className="line-item">
                    <div className="li-thumb" />
                    <div>
                      <div className="li-name">Coco Bonbons MK1</div>
                      <div className="li-sku">CB-MK1-001 · Aluminium brossé</div>
                      <div className="li-price">{fmt(unit)} · l'unité</div>
                      <div className="qty">
                        <button onClick={() => setQty(Math.max(0, qty - 1))} aria-label="moins">–</button>
                        <span>{qty}</span>
                        <button onClick={() => setQty(qty + 1)} aria-label="plus">+</button>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{
                  padding: '14px 16px', border: '.5px solid var(--hair-2)',
                  borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--ink-2)',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  background: 'rgba(245,166,35,0.06)',
                }}>
                  <div style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                                background: 'var(--accent)', color: 'var(--accent-ink)',
                                display: 'grid', placeItems: 'center', fontSize: 12,
                                fontWeight: 700 }}>i</div>
                  <div>
                    <strong style={{ color: 'var(--ink)' }}>Paiement simulé.</strong>
                    {' '}Ce site est un projet pédagogique. Aucune transaction réelle n'est exécutée.
                  </div>
                </div>
              </>
            )}

            {step === 'form' && (
              <>
                <div className="crumbs">
                  <span>Panier</span><i/>
                  <span className="active">Livraison</span><i/>
                  <span>Confirmation</span>
                </div>
                <div className="form-grid">
                  <div className="field full">
                    <label>Email</label>
                    <input type="email" value={form.email} onChange={setField('email')} placeholder="vous@exemple.fr"/>
                  </div>
                  <div className="field">
                    <label>Prénom</label>
                    <input value={form.firstname} onChange={setField('firstname')} placeholder="Camille"/>
                  </div>
                  <div className="field">
                    <label>Nom</label>
                    <input value={form.lastname} onChange={setField('lastname')} placeholder="Durand"/>
                  </div>
                  <div className="field full">
                    <label>Adresse</label>
                    <input value={form.address} onChange={setField('address')} placeholder="12 rue de l'Atelier"/>
                  </div>
                  <div className="field">
                    <label>Ville</label>
                    <input value={form.city} onChange={setField('city')} placeholder="Paris"/>
                  </div>
                  <div className="field">
                    <label>Code postal</label>
                    <input value={form.postcode} onChange={setField('postcode')} placeholder="75011"/>
                  </div>
                  <div className="field full" style={{ marginTop: 8 }}>
                    <label>Carte (simulée)</label>
                    <input value={form.card} onChange={setField('card')}/>
                  </div>
                  <div className="field">
                    <label>Expiration</label>
                    <input value={form.expiry} onChange={setField('expiry')}/>
                  </div>
                  <div className="field">
                    <label>CVC</label>
                    <input value={form.cvc} onChange={setField('cvc')}/>
                  </div>
                </div>
              </>
            )}

            {step === 'success' && (
              <div className="success">
                <div className="ok">✓</div>
                <h4>Commande bien reçue</h4>
                <p>
                  Vous recevrez une confirmation par mail{form.email ? ` à ${form.email}` : ''}.
                </p>
                <div className="order-no">Commande&nbsp;#&nbsp;{orderNo}</div>
                <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                  Paiement simulé · aucune transaction n'a été exécutée.
                </p>
              </div>
            )}
          </div>

          {step !== 'success' && (
            <div className="drawer-foot">
              <div className="totals">
                <div className="row">
                  <span>Sous-total</span>
                  <span className="mono">{fmt(total)}</span>
                </div>
                <div className="row">
                  <span>Livraison</span>
                  <span className="mono" style={{ color: 'var(--ink)' }}>Offerte</span>
                </div>
                <div className="row total">
                  <span>Total</span>
                  <span className="v">{fmt(total)}</span>
                </div>
              </div>
              {step === 'cart' && (
                <button
                  className="btn btn-primary"
                  disabled={qty === 0}
                  style={{ opacity: qty === 0 ? .5 : 1 }}
                  onClick={() => setStep('form')}
                >
                  Passer commande <span className="arrow">→</span>
                </button>
              )}
              {step === 'form' && (
                <button
                  className="btn btn-primary"
                  onClick={() => onOrderComplete(form)}
                >
                  Payer (simulé) {fmt(total)} <span className="arrow">→</span>
                </button>
              )}
            </div>
          )}

          {step === 'success' && (
            <div className="drawer-foot">
              <button className="btn btn-primary" onClick={onClose}>
                Continuer la visite <span className="arrow">→</span>
              </button>
            </div>
          )}
        </aside>
      </>
    );
  }

  window.CartDrawer = CartDrawer;
})();
