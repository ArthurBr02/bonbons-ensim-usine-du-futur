import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import { generateOrderId } from "@/lib/order-id";
import OrderEmail from "@/emails/OrderEmail";
import { createElement } from "react";

interface OrderBody {
  email: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const body: OrderBody = await req.json();
  const { email, name, address, city, postcode, quantity } = body;

  if (!email || !name || !address || !city || !postcode || !quantity) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const orderId = generateOrderId();
  const total = 149 * quantity;

  try {
    await getResend().emails.send({
      from: "Coco Bonbons <onboarding@resend.dev>",
      to: email,
      subject: `Commande ${orderId} — Coco Bonbons MK1`,
      react: createElement(OrderEmail, { orderId, name, email, quantity, total }),
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    // Email failure is non-blocking for the demo
  }

  return NextResponse.json({ orderId });
}
