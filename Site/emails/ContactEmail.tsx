import {
  Html, Head, Body, Container, Section, Text, Heading,
  Hr, Row, Column,
} from "@react-email/components";

interface ContactEmailProps {
  type: string;
  name: string;
  email: string;
  message: string;
}

export default function ContactEmail({ type, name, email, message }: ContactEmailProps) {
  const typeLabel = type === "sav" ? "Service après-vente" : "Demande d'information";

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
              Nouvelle demande — {typeLabel}
            </Text>
            <Heading as="h2" style={{ color: "#15140f", fontSize: 32, fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
              Message de {name}
            </Heading>
            <Text style={{ color: "#46443c", fontSize: 13, fontFamily: "monospace", margin: "0 0 24px" }}>
              Email : {email}
            </Text>
            <Hr style={{ borderColor: "rgba(20,19,14,0.10)", margin: "0 0 24px" }} />
            <Text style={{ color: "#15140f", fontSize: 15, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
              {message}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ background: "#15140f", padding: "20px 40px", marginTop: 40 }}>
            <Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontFamily: "monospace", margin: 0, letterSpacing: "0.06em" }}>
              © 2026 · Coco Bonbons · Projet pédagogique ENSIM — Usine du futur
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
