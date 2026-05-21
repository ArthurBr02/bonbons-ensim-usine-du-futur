"use client";
import { useState } from "react";
import { useCart } from "@/store/cart";

const UNIT_PRICE = 149;

interface FormData {
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  postcode: string;
  card: string;
  expiry: string;
  cvc: string;
}

const defaultForm: FormData = {
  email: "",
  firstname: "",
  lastname: "",
  address: "",
  city: "",
  postcode: "",
  card: "4242 4242 4242 4242",
  expiry: "12/28",
  cvc: "123",
};

function fmt(n: number) {
  return n.toFixed(2).replace(".", ",") + " €";
}

export default function CartDrawer() {
  const { qty, isOpen, step, orderId, increment, decrement, close, setStep, setOrderId } = useCart();
  const [form, setForm] = useState<FormData>(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const total = UNIT_PRICE * qty;
  const setField = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handlePay = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: `${form.firstname} ${form.lastname}`.trim(),
          address: form.address,
          city: form.city,
          postcode: form.postcode,
          quantity: qty,
        }),
      });
      const data = await res.json();
      setOrderId(data.orderId ?? "CB-ERROR");
      setStep("success");
    } catch {
      setOrderId("CB-ERROR");
      setStep("success");
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabel = { cart: "01 / Panier", form: "02 / Livraison & paiement", success: "03 / Confirmation" };
  const stepTitle = { cart: "Votre panier", form: "Finaliser la commande", success: "Merci !" };

  return (
    <>
      <div className={`drawer-scrim${isOpen ? " open" : ""}`} onClick={close} />
      <aside className={`drawer${isOpen ? " open" : ""}`} role="dialog" aria-label="Panier">
        <div className="drawer-head">
          <h3>
            <small>{stepLabel[step]}</small>
            {stepTitle[step]}
          </h3>
          <button className="drawer-close" onClick={close} aria-label="Fermer">✕</button>
        </div>

        <div className="drawer-body">
          {step === "cart" && (
            <>
              {qty === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-2)" }}>
                  Votre panier est vide.
                </div>
              ) : (
                <div className="line-item">
                  <div className="li-thumb" />
                  <div>
                    <div className="li-name">Coco Bonbons MK1</div>
                    <div className="li-sku">CB-MK1-001 · Aluminium brossé</div>
                    <div className="li-price">{fmt(UNIT_PRICE)} · l&apos;unité</div>
                    <div className="qty">
                      <button onClick={decrement} aria-label="moins">–</button>
                      <span>{qty}</span>
                      <button onClick={increment} aria-label="plus">+</button>
                    </div>
                  </div>
                </div>
              )}
              <div style={{
                padding: "14px 16px", border: ".5px solid var(--hair-2)",
                borderRadius: "var(--radius)", fontSize: 13, color: "var(--ink-2)",
                display: "flex", gap: 12, alignItems: "flex-start",
                background: "rgba(245,166,35,0.06)",
              }}>
                <div style={{
                  flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
                  background: "var(--accent)", color: "var(--accent-ink)",
                  display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700,
                }}>i</div>
                <div>
                  <strong style={{ color: "var(--ink)" }}>Paiement simulé.</strong>
                  {" "}Ce site est un projet pédagogique. Aucune transaction réelle n&apos;est exécutée.
                </div>
              </div>
            </>
          )}

          {step === "form" && (
            <>
              <div className="crumbs">
                <span>Panier</span><i /><span className="active">Livraison</span><i /><span>Confirmation</span>
              </div>
              <div className="form-grid">
                <div className="field full">
                  <label>Email</label>
                  <input type="email" value={form.email} onChange={setField("email")} placeholder="vous@exemple.fr" />
                </div>
                <div className="field">
                  <label>Prénom</label>
                  <input value={form.firstname} onChange={setField("firstname")} placeholder="Camille" />
                </div>
                <div className="field">
                  <label>Nom</label>
                  <input value={form.lastname} onChange={setField("lastname")} placeholder="Durand" />
                </div>
                <div className="field full">
                  <label>Adresse</label>
                  <input value={form.address} onChange={setField("address")} placeholder="12 rue de l'Atelier" />
                </div>
                <div className="field">
                  <label>Ville</label>
                  <input value={form.city} onChange={setField("city")} placeholder="Paris" />
                </div>
                <div className="field">
                  <label>Code postal</label>
                  <input value={form.postcode} onChange={setField("postcode")} placeholder="75011" />
                </div>
                <div className="field full" style={{ marginTop: 8 }}>
                  <label>Carte (simulée)</label>
                  <input value={form.card} onChange={setField("card")} />
                </div>
                <div className="field">
                  <label>Expiration</label>
                  <input value={form.expiry} onChange={setField("expiry")} />
                </div>
                <div className="field">
                  <label>CVC</label>
                  <input value={form.cvc} onChange={setField("cvc")} />
                </div>
              </div>
            </>
          )}

          {step === "success" && (
            <div className="success">
              <div className="ok">✓</div>
              <h4>Commande bien reçue</h4>
              <p>
                Vous recevrez une confirmation par mail{form.email ? ` à ${form.email}` : ""}.
              </p>
              <div className="order-no">Commande&nbsp;#&nbsp;{orderId}</div>
              <p style={{ fontSize: 12, color: "var(--ink-3)" }}>
                Paiement simulé · aucune transaction n&apos;a été exécutée.
              </p>
            </div>
          )}
        </div>

        {step !== "success" && (
          <div className="drawer-foot">
            <div className="totals">
              <div className="row"><span>Sous-total</span><span className="mono">{fmt(total)}</span></div>
              <div className="row"><span>Livraison</span><span className="mono" style={{ color: "var(--ink)" }}>Offerte</span></div>
              <div className="row total"><span>Total</span><span className="v">{fmt(total)}</span></div>
            </div>
            {step === "cart" && (
              <button className="btn btn-primary" disabled={qty === 0} style={{ opacity: qty === 0 ? 0.5 : 1 }} onClick={() => setStep("form")}>
                Passer commande <span className="arrow">→</span>
              </button>
            )}
            {step === "form" && (
              <button className="btn btn-primary" disabled={submitting} onClick={handlePay}>
                {submitting ? "Traitement…" : `Payer (simulé) ${fmt(total)}`} <span className="arrow">→</span>
              </button>
            )}
          </div>
        )}

        {step === "success" && (
          <div className="drawer-foot">
            <button className="btn btn-primary" onClick={close}>
              Continuer la visite <span className="arrow">→</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
