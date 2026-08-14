/**
 * Central site configuration: identity, navigation and feature flags.
 * Contact details live in `./contact.ts`.
 */

export const site = {
  name: 'Sarasudha',
  domain: 'sarasudha.in',
  url: 'https://sarasudha.in',
  positioning: 'Rooted in tradition. Open to every note.',
  description:
    'Sarasudha brings together Carnatic tradition, light music and contemporary expression — creating a space for artists, audiences and generations to connect through music.',
  locale: 'en_IN',
} as const;

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Music', href: '/music' },
  { label: 'Ragam', href: '/ragam' },
  { label: 'Artists', href: '/artists' },
  { label: 'Events', href: '/events' },
  { label: 'Heritage', href: '/heritage' },
  { label: 'Participate', href: '/participate' },
] as const;

export const footerLinks = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'Music', href: '/music' },
  { label: 'Sarasudha Ragam', href: '/ragam' },
  { label: 'Artists', href: '/artists' },
  { label: 'Events', href: '/events' },
  { label: 'Heritage', href: '/heritage' },
  { label: 'Participate', href: '/participate' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
] as const;

/**
 * Controls whether sample/demo records are rendered across the site.
 * Backed by PUBLIC_SHOW_DEMO_CONTENT — defaults to true so the Phase 1
 * build ships with representative content out of the box. Set to
 * "false" in the production environment once real content exists.
 */
export const showDemoContent = import.meta.env.PUBLIC_SHOW_DEMO_CONTENT !== 'false';

export const brandArchitecture = {
  master: 'Sarasudha',
  verticals: [
    {
      name: 'Sarasudha Ragam',
      slug: 'ragam',
      description: 'The classical vertical within Sarasudha, dedicated to Carnatic performance and heritage.',
    },
  ],
} as const;
