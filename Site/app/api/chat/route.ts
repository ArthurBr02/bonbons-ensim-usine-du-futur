import { NextResponse } from "next/server";

const REMOTE_DOC_URL = "https://raw.githubusercontent.com/ArthurBr02/bonbons-ensim-usine-du-futur/main/Communication/doc-chatbot.txt";

const SYSTEM_PROMPT_BASE = `
Tu es l'assistant de Coco Bonbons, le distributeur de bonbons MK1.
Projet ENSIM "Usine du futur", fait en France par des étudiants.
Bonbons compatibles : petits ronds (M&Ms, Skittles, Maltesers).
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

    // Fetch remote documentation
    let remoteDoc = "";
    try {
      const docRes = await fetch(REMOTE_DOC_URL, { next: { revalidate: 3600 } }); // Cache for 1 hour
      if (docRes.ok) {
        remoteDoc = await docRes.text();
      }
    } catch (err) {
      console.error("Failed to fetch remote doc:", err);
    }

    const fullSystemPrompt = `${SYSTEM_PROMPT_BASE}\n\nINFORMATIONS COMPLÉMENTAIRES :\n${remoteDoc}`;

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.MISTRAL_MODEL || "open-mistral-nemo",
        messages: [
          { role: "system", content: fullSystemPrompt },
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
