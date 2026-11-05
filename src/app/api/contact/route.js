// POST /api/contact — emails a contact-form enquiry to the client.
//
// Server-only env vars (.env locally, Project Settings → Environment Variables on Vercel).
// Never prefix these with NEXT_PUBLIC_ — that would ship the password to every visitor's browser.
//   EMAIL_USER    the mailbox that sends (Google Workspace / Gmail address)
//   EMAIL_PASS    its Google app password (Google Account → Security → App passwords)
//   CLIENT_EMAIL  where enquiries go; several addresses can be comma-separated
//   SMTP_HOST / SMTP_PORT  optional, default to Gmail (smtp.gmail.com:465)

import nodemailer from "nodemailer";
import { site } from "@/lib/site";

export const runtime = "nodejs"; // Nodemailer needs Node's net/tls, not the Edge runtime

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[^\s@<>()[\],;:"]{2,}$/;

// Best-effort spam brake: 5 enquiries per IP per 10 minutes, per server instance
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

let transporter;
function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 465;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
  }
  return transporter;
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// One line, no control characters — used in the subject and reply-to name
const oneLine = (s) => s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

const fail = (status, error) => Response.json({ ok: false, error }, { status });

export async function POST(request) {
  const { EMAIL_USER, EMAIL_PASS, CLIENT_EMAIL } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS || !CLIENT_EMAIL) {
    console.error("[contact] EMAIL_USER, EMAIL_PASS and CLIENT_EMAIL must all be set");
    return fail(500, "The contact form isn't set up yet. Please email us directly.");
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Invalid request.");
  }

  // Honeypot: a hidden field people never see. Bots that fill it get a fake success.
  if (typeof body?.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = oneLine(String(body?.name ?? ""));
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !message) return fail(400, "Please fill in all the fields.");
  if (name.length > LIMITS.name) return fail(400, "That name is too long.");
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) {
    return fail(400, "Please enter a valid email address.");
  }
  if (message.length > LIMITS.message) {
    return fail(400, `Please keep the message under ${LIMITS.message} characters.`);
  }

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return fail(429, "Too many messages — please try again in a few minutes.");

  const sentAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

  const text = [
    `New enquiry from the ${site.name} website`,
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Sent:    ${sentAt} IST`,
    "",
    "Message:",
    message,
    "",
    "—",
    "Reply to this email to answer them directly.",
  ].join("\n");

  const row = (label, value) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;font-size:13px;vertical-align:top;white-space:nowrap">${label}</td>` +
    `<td style="padding:6px 0;color:#202020;font-size:15px">${value}</td></tr>`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f4f4;font-family:Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden">
    <tr><td style="background:#ED1E24;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:bold">
      New enquiry · ${escapeHtml(site.name)}
    </td></tr>
    <tr><td style="padding:24px 28px">
      <table role="presentation" cellspacing="0" cellpadding="0">
        ${row("Name", escapeHtml(name))}
        ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#ED1E24">${escapeHtml(email)}</a>`)}
        ${row("Sent", `${escapeHtml(sentAt)} IST`)}
      </table>
      <div style="margin-top:20px;padding-top:20px;border-top:1px solid #eeeeee;color:#202020;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
      <p style="margin:24px 0 0;color:#9a9a9a;font-size:12px">Reply to this email to answer ${escapeHtml(name)} directly.</p>
    </td></tr>
  </table>
</body></html>`;

  try {
    await getTransporter().sendMail({
      // Gmail only sends as the signed-in mailbox, so the visitor goes in Reply-To
      from: { name: `${site.name} Website`, address: EMAIL_USER },
      to: CLIENT_EMAIL.split(",").map((a) => a.trim()).filter(Boolean),
      replyTo: { name, address: email },
      subject: `New enquiry from ${name} — ${site.name} website`,
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] sending failed:", err?.code || "", err?.message || err);
    return fail(502, "Sorry, your message couldn't be sent. Please try again or email us directly.");
  }

  return Response.json({ ok: true });
}
