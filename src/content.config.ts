import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Shared genre/tag vocabulary used across performances, artists and the
 * music discovery filters. Keep this list in sync with docs/CONTENT_GUIDE.md.
 */
export const musicTags = [
  'Carnatic',
  'Light',
  'Devotional',
  'Vocal',
  'Instrumental',
  'Contemporary',
  'Young Artists',
] as const;

const performances = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/performances' }),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    genre: z.array(z.enum(musicTags)).min(1),
    date: z.coerce.date(),
    thumbnail: z.string(),
    thumbnailAlt: z.string(),
    description: z.string(),
    youtubeUrl: z.string().url().optional(),
    audioUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    /** Sample/placeholder content used to populate the Phase 1 build. */
    isDemoContent: z.boolean().default(false),
  }),
});

const artists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artists' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    photo: z.string(),
    photoAlt: z.string(),
    genre: z.array(z.enum(musicTags)).min(1),
    instruments: z.array(z.string()).default([]),
    location: z.string().optional(),
    bio: z.string(),
    social: z
      .object({
        website: z.string().url().optional(),
        instagram: z.string().url().optional(),
        youtube: z.string().url().optional(),
        spotify: z.string().url().optional(),
        appleMusic: z.string().url().optional(),
      })
      .default({}),
    featuredPerformances: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    /** Sample/placeholder content used to populate the Phase 1 build. */
    isDemoContent: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    startTime: z.string().optional(),
    venue: z.string(),
    city: z.string(),
    description: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    artists: z.array(z.string()).default([]),
    registrationUrl: z.string().url().optional(),
    eventType: z.enum(['Performance', 'Lecture Demonstration', 'Conversation', 'Gathering', 'Festival']),
    status: z.enum(['upcoming', 'completed', 'cancelled']),
    /** Sample/placeholder content used to populate the Phase 1 build. */
    isDemoContent: z.boolean().default(false),
  }),
});

const archive = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/archive' }),
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'People',
      'Performances',
      'Photographs',
      'Programmes & Invitations',
      'Newspaper Clippings',
      'Recordings',
      'Documents',
    ]),
    year: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /** True while the physical/original material has not yet been digitised. */
    pendingDigitisation: z.boolean().default(true),
    /** Sample/placeholder content used to populate the Phase 1 build. */
    isDemoContent: z.boolean().default(false),
  }),
});

export const collections = { performances, artists, events, archive };
