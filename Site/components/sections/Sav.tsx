"use client";

import { useState } from "react";

export default function Sav() {
  const [formData, setFormData] = useState({
    type: "info",
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="divider"><span>08</span><span>Contact & SAV</span><span /></div>
        
        <div className="sec-head">
          <h2 className="h-display">Besoin d&apos;aide ?<br />On est <em>là</em>.</h2>
          <p>
            Une question technique, une demande de SAV ou juste envie de dire bonjour ? 
            Remplissez le formulaire ou utilisez notre assistant intelligent.
          </p>
        </div>

        <div className="about">
          <div className="about-card">
            {status === "success" ? (
              <div className="success" style={{ padding: "20px 0" }}>
                <div className="ok">✓</div>
                <h4>Message envoyé !</h4>
                <p>Merci pour votre message. Nous reviendrons vers vous par email sous 48h.</p>
                <button className="btn btn-ghost" onClick={() => setStatus("idle")}>Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form-grid">
                <div className="full field">
                  <label>Type de demande</label>
                  <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                    <button
                      type="button"
                      className={`btn ${formData.type === "info" ? "btn-primary" : "btn-ghost"}`}
                      style={{ padding: "8px 16px", fontSize: 13 }}
                      onClick={() => setFormData({ ...formData, type: "info" })}
                    >
                      Information
                    </button>
                    <button
                      type="button"
                      className={`btn ${formData.type === "sav" ? "btn-primary" : "btn-ghost"}`}
                      style={{ padding: "8px 16px", fontSize: 13 }}
                      onClick={() => setFormData({ ...formData, type: "sav" })}
                    >
                      SAV / Réclamation
                    </button>
                  </div>
                </div>
                
                <div className="full field">
                  <label>Nom complet</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jean Dupont"
                  />
                </div>

                <div className="full field">
                  <label>Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean@exemple.fr"
                  />
                </div>

                <div className="full field">
                  <label>Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Dites-nous tout..."
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      border: ".5px solid var(--hair-2)",
                      background: "var(--paper)",
                      fontFamily: "inherit",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                </div>

                {status === "error" && (
                  <div className="full" style={{ color: "#ff4d4f", fontSize: 13 }}>
                    Désolé, une erreur est survenue lors de l&apos;envoi.
                  </div>
                )}

                <div className="full">
                  <button type="submit" className="btn btn-primary" disabled={status === "submitting"} style={{ width: "100%", justifyContent: "center" }}>
                    {status === "submitting" ? "Envoi en cours..." : "Envoyer le message"}
                    <span className="arrow">→</span>
                  </button>
                  <p className="mono muted" style={{ textAlign: "center", marginTop: 12, fontSize: 10 }}>
                    Une réponse par email sous 48h (jours ouvrés).
                  </p>
                </div>
              </form>
            )}
          </div>

          <div>
            <span className="h-eyebrow">Le processus</span>
            <h2 className="h-display" style={{ marginTop: 18, fontSize: "clamp(30px, 4vw, 52px)" }}>
              Simple. <em>Rapide</em>.<br />Humain.
            </h2>
            
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", fontSize: 13, flexShrink: 0, fontWeight: 700 }}>01</div>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: 16 }}>Soumission</h4>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--ink-2)" }}>Votre demande est enregistrée et transmise à notre équipe étudiante.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", fontSize: 13, flexShrink: 0, fontWeight: 700 }}>02</div>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: 16 }}>Confirmation</h4>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--ink-2)" }}>Un email de confirmation vous est envoyé automatiquement avec votre ticket.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", fontSize: 13, flexShrink: 0, fontWeight: 700 }}>03</div>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: 16 }}>Réponse</h4>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--ink-2)" }}>Un membre de l&apos;équipe vous répond personnellement sous 48h.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 40, padding: 20, borderRadius: 14, background: "rgba(0,0,0,0.03)", border: ".5px solid var(--hair-2)" }}>
              <p style={{ margin: 0, fontSize: 13, color: "var(--ink-2)" }}>
                Pour une réponse immédiate aux questions fréquentes, essayez notre assistant IA en bas à droite de votre écran ↘
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
