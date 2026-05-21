import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import ContactEmail from "@/emails/ContactEmail";

export async function POST(req: Request) {
  try {
    const { type, name, email, message } = await req.json();

    if (!type || !name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const resend = getResend();
    const savEmail = process.env.SAV_EMAIL || "sav@cocobonbons.fr";

    const { error } = await resend.emails.send({
      from: "Coco Bonbons <onboarding@resend.dev>",
      to: [savEmail],
      subject: `[${type.toUpperCase()}] Nouvelle demande — ${name}`,
      react: ContactEmail({ type, name, email, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Erreur lors de l'envoi du mail" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
