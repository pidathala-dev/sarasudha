#!/usr/bin/env node
/**
 * CLI entry point for the Sarasudha Instagram asset system.
 *
 * Usage: node social/instagram/scripts/export.mjs [feed|stories|highlights|profile|all]
 * (wired up as npm run social:instagram[:feed|:stories|:highlights|:profile])
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { posts } from '../data/posts.mjs';
import { highlights } from '../data/highlights.mjs';
import { buildPostSvg, buildAvatarSvg, buildHighlightSvg, renderSvgToPng } from './render.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..'); // social/instagram/

const FEED_SIZE = { width: 1080, height: 1080 };
const STORY_SIZE = { width: 1080, height: 1920 };

async function exportFeed() {
  for (const post of posts) {
    const svg = buildPostSvg(post, { ...FEED_SIZE, variant: 'feed' });
    const outPath = path.join(root, 'feed', `${post.id}-1080x1080.png`);
    await renderSvgToPng(svg, outPath, FEED_SIZE);
    console.log('✓ feed  ', path.relative(root, outPath));
  }
}

async function exportStories() {
  for (const post of posts) {
    const svg = buildPostSvg(post, { ...STORY_SIZE, variant: 'story' });
    const outPath = path.join(root, 'stories', `${post.id}-story-1080x1920.png`);
    await renderSvgToPng(svg, outPath, STORY_SIZE);
    console.log('✓ story ', path.relative(root, outPath));
  }
}

async function exportHighlights() {
  for (const h of highlights) {
    const svg = buildHighlightSvg(h, FEED_SIZE);
    const outPath = path.join(root, 'highlights', `${h.id}-1080x1080.png`);
    await renderSvgToPng(svg, outPath, FEED_SIZE);
    console.log('✓ highlight', path.relative(root, outPath));
  }
}

async function exportProfile() {
  const svg = buildAvatarSvg(FEED_SIZE);
  const outPath = path.join(root, 'profile', 'avatar-1080x1080.png');
  await renderSvgToPng(svg, outPath, FEED_SIZE);
  console.log('✓ profile', path.relative(root, outPath));
}

async function main() {
  const target = process.argv[2] ?? 'all';
  const run = {
    feed: exportFeed,
    stories: exportStories,
    highlights: exportHighlights,
    profile: exportProfile,
    all: async () => {
      await exportProfile();
      await exportHighlights();
      await exportFeed();
      await exportStories();
    },
  }[target];

  if (!run) {
    console.error(`Unknown target "${target}". Use one of: feed, stories, highlights, profile, all.`);
    process.exit(1);
  }

  await run();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
