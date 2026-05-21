import {
  Html, Head, Body, Container, Section, Text, Heading,
  Hr, Row, Column,
} from "@react-email/components";

interface OrderEmailProps {
  orderId: string;
  name: string;
  email: string;
  quantity: number;
  total: number;
}

export default function OrderEmail({ orderId, name, quantity, total }: OrderEmailProps) {
  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + " €";

  return (
    <Html>
      <Head />
      <Body style={{ background: "#f4f3ee", margin: 0, padding: "40px 0", fontFamily: "Georgia, serif" }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", background: "#faf9f5", borderRadius: 14, overflow: "hidden" }}>
          {/* Header */}
          <Section style={{ background: "#15140f", padding: "28px 40px" }}>
            <Row align="left">
              <Column width="40">
                <img 
                  src="https://github.com/ArthurBr02/bonbons-ensim-usine-du-futur/blob/main/Communication/LOGO_LITE.png?raw=true" 
                  alt="Logo" 
                  width="32" 
                  height="32" 
                />
              </Column>
              <Column style={{ paddingLeft: 12 }}>
                <Heading style={{ color: "#faf9f5", margin: 0, fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}>
                  Coco Bonbons.
                </Heading>
              </Column>
            </Row>
          </Section>

          {/* Body */}
          <Section style={{ padding: "40px 40px 24px" }}>
            <Text style={{ color: "#84807a", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace", margin: "0 0 20px" }}>
              Confirmation de commande
            </Text>
            <Heading as="h2" style={{ color: "#15140f", fontSize: 32, fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
              Merci, {name || "cher client"} !
            </Heading>
            <Text style={{ color: "#46443c", fontSize: 15, lineHeight: 1.6, margin: "0 0 24px" }}>
              Votre commande a bien été reçue. Vous trouverez ci-dessous le récapitulatif.
              Elle sera préparée dans notre atelier et expédiée sous 14 jours ouvrés.
            </Text>
          </Section>

          <Hr style={{ borderColor: "rgba(20,19,14,0.10)", margin: "0 40px" }} />

          {/* Order details */}
          <Section style={{ padding: "24px 40px" }}>
            <Text style={{ color: "#84807a", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace", margin: "0 0 16px" }}>
              Récapitulatif
            </Text>
            <Row>
              <Column style={{ background: "linear-gradient(180deg,#e8e6df,#d0cec6 25%,#f0eee7 50%,#c9c7be 78%,#ddd9d0)", width: 80, height: 80, borderRadius: 10 }} />
              <Column style={{ paddingLeft: 16 }}>
                <Text style={{ color: "#15140f", fontSize: 17, margin: "0 0 4px", fontFamily: "Georgia, serif" }}>
                  Coco Bonbons MK1
                </Text>
                <Text style={{ color: "#84807a", fontSize: 11, margin: "0 0 4px", fontFamily: "monospace" }}>
                  CB-MK1-001 · Aluminium brossé
                </Text>
                <Text style={{ color: "#46443c", fontSize: 13, margin: 0, fontFamily: "monospace" }}>
                  Quantité : {quantity} × {fmt(149)}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={{ borderColor: "rgba(20,19,14,0.10)", margin: "0 40px" }} />

          {/* Totals */}
          <Section style={{ padding: "20px 40px" }}>
            <Row style={{ marginBottom: 8 }}>
              <Column><Text style={{ color: "#46443c", fontSize: 13, margin: 0 }}>Sous-total</Text></Column>
              <Column style={{ textAlign: "right" }}><Text style={{ color: "#46443c", fontSize: 13, margin: 0, fontFamily: "monospace" }}>{fmt(total)}</Text></Column>
            </Row>
            <Row style={{ marginBottom: 8 }}>
              <Column><Text style={{ color: "#46443c", fontSize: 13, margin: 0 }}>Livraison</Text></Column>
              <Column style={{ textAlign: "right" }}><Text style={{ color: "#15140f", fontSize: 13, margin: 0, fontFamily: "monospace" }}>Offerte</Text></Column>
            </Row>
            <Hr style={{ borderColor: "rgba(20,19,14,0.10)", margin: "12px 0" }} />
            <Row>
              <Column><Text style={{ color: "#15140f", fontSize: 16, margin: 0, fontFamily: "Georgia, serif" }}>Total</Text></Column>
              <Column style={{ textAlign: "right" }}><Text style={{ color: "#15140f", fontSize: 22, margin: 0, fontFamily: "Georgia, serif", letterSpacing: "-0.01em" }}>{fmt(total)}</Text></Column>
            </Row>
          </Section>

          <Hr style={{ borderColor: "rgba(20,19,14,0.10)", margin: "0 40px" }} />

          {/* Order number */}
          <Section style={{ padding: "24px 40px 40px" }}>
            <Text style={{ color: "#84807a", fontSize: 12, fontFamily: "monospace", margin: "0 0 8px", letterSpacing: "0.04em" }}>
              Numéro de commande
            </Text>
            <Text style={{ background: "rgba(20,19,14,0.05)", display: "inline-block", padding: "6px 14px", borderRadius: 999, fontFamily: "monospace", fontSize: 13, color: "#15140f", margin: "0 0 20px", letterSpacing: "0.04em" }}>
              {orderId}
            </Text>
            <Text style={{ color: "#84807a", fontSize: 12, margin: 0, fontFamily: "monospace" }}>
              Paiement simulé · aucune transaction réelle n&apos;a été exécutée.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ background: "#15140f", padding: "20px 40px" }}>
            <Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontFamily: "monospace", margin: 0, letterSpacing: "0.06em" }}>
              © 2026 · Coco Bonbons · Projet pédagogique ENSIM — Usine du futur
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
