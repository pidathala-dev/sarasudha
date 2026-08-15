/**
 * Central contact configuration.
 *
 * IMPORTANT: No account, address or number has been invented for this
 * build. Every value below is `null` until the Sarasudha team supplies the
 * real detail. Components that consume this file (SocialLinks, the
 * /contact page, the footer) must treat `null` as "not yet available" and
 * omit that item rather than rendering a broken or placeholder link.
 *
 * To go live: replace the relevant `null` with the real value. No other
 * file needs to change — every page reads from here.
 */

export interface ContactDetails {
  /** Primary contact email address. */
  email: string | null;
  /** City / region shown publicly, not a street address. */
  location: string | null;
  instagram: string | null;
  youtube: string | null;
  facebook: string | null;
  /** WhatsApp contact as a full https://wa.me/<number> link. */
  whatsapp: string | null;
}

export const contact: ContactDetails = {
  email: 'hello@sarasudha.in',
  location: null,
  instagram: null,
  youtube: null,
  facebook: null,
  whatsapp: null,
};

/**
 * Endpoint the contact form should POST to. Configure via the
 * PUBLIC_CONTACT_FORM_ENDPOINT environment variable (see .env.example).
 * When unset, the form UI renders in a labelled demo/non-production state
 * rather than pretending to submit.
 */
export const contactFormEndpoint: string | null =
  import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT || null;

export const contactReasons = [
  'Artist / Performer',
  'Collaboration',
  'Event',
  'Archive contribution',
  'Partnership',
  'Volunteer',
  'General enquiry',
] as const;
