import { site } from '../config/site';

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
}

export function buildSeo(props: SeoProps) {
  const canonical = new URL(props.path, site.url).toString();
  // Most pages pass a short title ("Music") and get the site name appended
  // automatically. A page can opt out by including the site name itself
  // (e.g. a richer, fully-composed SEO title) — it's used verbatim.
  const fullTitle =
    props.title === site.name || props.title.includes(site.name) ? props.title : `${props.title} — ${site.name}`;
  return {
    title: fullTitle,
    description: props.description,
    canonical,
    image: props.image ? new URL(props.image, site.url).toString() : undefined,
    type: props.type ?? 'website',
    noindex: props.noindex ?? false,
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    description: site.description,
    sameAs: [],
  };
}

export function eventSchema(event: {
  title: string;
  description: string;
  date: Date;
  venue: string;
  city: string;
  status: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date.toISOString(),
    eventStatus:
      event.status === 'cancelled'
        ? 'https://schema.org/EventCancelled'
        : 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.venue,
      address: event.city,
    },
  };
}

export function personSchema(artist: { name: string; bio: string; genre: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artist.name,
    description: artist.bio,
    knowsAbout: artist.genre,
  };
}
