/**
 * Contact form integration interface.
 *
 * Sarasudha ships as a static site with no backend in Phase 1. This module
 * defines the shape a future submission endpoint must accept, and a thin
 * client for calling it. Configure the endpoint via the
 * PUBLIC_CONTACT_FORM_ENDPOINT environment variable (see .env.example).
 *
 * When no endpoint is configured, `hasContactFormEndpoint()` returns false
 * and the /contact page renders a clearly labelled demo/non-production
 * state instead of pretending a submission succeeded.
 *
 * Expected endpoint contract (implement this on whatever service is
 * eventually wired up — Formspree, a serverless function, etc.):
 *   POST <endpoint>
 *   Content-Type: application/json
 *   Body: ContactFormPayload
 *   Success: 2xx response
 *   Failure: non-2xx response, ideally with a JSON { message: string } body
 */

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  reason: string;
  message: string;
  consent: boolean;
  /** Honeypot field — should always arrive empty from a real visitor. */
  companyWebsite?: string;
}

export function hasContactFormEndpoint(): boolean {
  return Boolean(import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT);
}

/**
 * Builds a mailto: link pre-filled from the form, used as a fallback when
 * no POST endpoint (PUBLIC_CONTACT_FORM_ENDPOINT) is configured but a real
 * contact email exists (see src/config/contact.ts). This hands off to the
 * visitor's own email client rather than claiming the site sent anything —
 * there is no way for client-side JS to confirm a mailto: link was actually
 * sent, so callers must not report a "message sent" success state for it.
 */
export function buildMailtoLink(payload: ContactFormPayload, toEmail: string): string {
  const subject = `Sarasudha — ${payload.reason || 'General enquiry'}`;
  const bodyLines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    '',
    payload.message,
  ].filter((line): line is string => line !== null);

  const params = new URLSearchParams({ subject, body: bodyLines.join('\n') });
  return `mailto:${toEmail}?${params.toString().replace(/\+/g, '%20')}`;
}

export async function submitContactForm(payload: ContactFormPayload): Promise<{ ok: boolean; message: string }> {
  const endpoint = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT;
  if (!endpoint) {
    return { ok: false, message: 'No contact form endpoint is configured yet.' };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { ok: false, message: 'Something went wrong sending your message. Please try again.' };
    }

    return { ok: true, message: 'Thank you — your message has been sent.' };
  } catch {
    return { ok: false, message: 'Something went wrong sending your message. Please try again.' };
  }
}
