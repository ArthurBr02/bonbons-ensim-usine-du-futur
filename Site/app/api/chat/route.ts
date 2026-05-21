import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
Tu es l'assistant de Coco Bonbons, le distributeur de bonbons MK1.
Projet ENSIM "Usine du futur", fait en France par des étudiants.
Prix : 149€ TTC. Paiement simulé (pas de vrai achat).
Matériaux : aluminium brossé, dôme verre borosilicate, socle impression 3D.
Capacité : 300g. Bonbons compatibles : petits ronds (M&Ms, Skittles, Maltesers).
Couleurs disponibles : Rose, Menthe, Violet, Orange (rendus à venir).
Pour toute demande SAV ou réclamation, redirige vers le formulaire section #contact.
Réponds en français, de façon concise et sympathique.
`.trim();

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.MISTRAL_API_KEY) {
      return NextResponse.json(
        { error: "Mistral API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.MISTRAL_MODEL || "open-mistral-nemo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Mistral API error:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch from Mistral AI" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
