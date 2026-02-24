import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EBOOK_URL =
  process.env.SITE_URL
    ? `${process.env.SITE_URL}/Lexavy%207%20Signals%20E-book.pdf`
    : "https://lexavy.com/Lexavy%207%20Signals%20E-book.pdf";

const FROM_EMAIL = process.env.FROM_EMAIL || "Lexavy <noreply@lexavy.com>";

function buildHtml(name, lang) {
  const isEs = lang === "es";
  const heading = isEs
    ? `Hola ${name}, tu ebook está listo`
    : `Hi ${name}, your ebook is ready`;
  const body = isEs
    ? "Gracias por tu interés. Aquí tienes tu copia del ebook:"
    : "Thanks for your interest. Here's your copy of the ebook:";
  const cta = isEs ? "Descargar Ebook" : "Download Ebook";
  const footer = isEs
    ? "Si tienes preguntas, responde a este email."
    : "If you have any questions, just reply to this email.";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0B1620;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <img src="https://lexavy.com/images/ebook-cover.jpg" alt="Ebook" style="width:160px;border-radius:12px;display:block;margin:0 auto 24px;" />
    <h1 style="color:#EAF2F7;font-size:22px;text-align:center;margin:0 0 12px;">${heading}</h1>
    <p style="color:#9FB3C8;font-size:15px;line-height:1.6;text-align:center;margin:0 0 28px;">${body}</p>
    <div style="text-align:center;">
      <a href="${EBOOK_URL}" style="display:inline-block;background:#00C2D1;color:#0B1620;font-weight:bold;font-size:14px;padding:14px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.5px;">${cta}</a>
    </div>
    <p style="color:#9FB3C8;font-size:13px;text-align:center;margin:32px 0 0;line-height:1.5;">${footer}</p>
  </div>
</body>
</html>`.trim();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, lang } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const recipientName = name || "there";
  const subject =
    (lang === "es" ? "Tu ebook de Lexavy" : "Your Lexavy Ebook") +
    " — Data Protection Is Not A Policy Problem";

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject,
      html: buildHtml(recipientName, lang || "en"),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
