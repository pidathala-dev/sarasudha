import sharp from 'sharp';
import path from 'node:path';

const SRC_DIR = 'incoming/heritage/akb-archive-01';
const OUT_DIR = 'public/images/heritage';
const MAX_WIDTH = 1600;

// crop: { left, top, width, height } as fractions of the source image (post auto-rotate).
// null crop = no crop, use full frame.
const JOBS = [
  {
    src: 'P1010278.JPG',
    out: 'cuddapah-1997-canopy.webp',
    crop: { left: 0.02, top: 0.02, width: 0.96, height: 0.94 },
  },
  {
    src: 'P1010282.JPG',
    out: 'cuddapah-1997-offerings.webp',
    crop: { left: 0.0, top: 0.0, width: 1.0, height: 1.0 },
  },
  {
    src: 'P1010273.JPG',
    out: 'cuddapah-1997-closeup.webp',
    crop: { left: 0.0, top: 0.1, width: 1.0, height: 0.9 },
  },
  {
    src: 'P1010289.JPG',
    out: 'tallapaka-1997-signage.webp',
    crop: { left: 0.05, top: 0.0, width: 0.8, height: 1.0 },
  },
  {
    src: 'P1010291.JPG',
    out: 'tallapaka-1997-music-programme.webp',
    crop: { left: 0.0, top: 0.0, width: 1.0, height: 1.0 },
  },
];

async function run() {
  for (const job of JOBS) {
    const srcPath = path.join(SRC_DIR, job.src);
    const outPath = path.join(OUT_DIR, job.out);

    const img = sharp(srcPath).rotate(); // auto-orient per EXIF, no-op here since orientation=1
    const meta = await img.metadata();
    const w = meta.width;
    const h = meta.height;

    let pipeline = sharp(srcPath).rotate();

    if (job.crop) {
      const left = Math.round(job.crop.left * w);
      const top = Math.round(job.crop.top * h);
      const width = Math.round(job.crop.width * w);
      const height = Math.round(job.crop.height * h);
      pipeline = pipeline.extract({ left, top, width, height });
    }

    pipeline = pipeline
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .normalize({ lower: 1, upper: 99 }) // mild contrast stretch, non-generative
      .webp({ quality: 76 });

    await pipeline.toFile(outPath);
    const outMeta = await sharp(outPath).metadata();
    console.log(job.out, outMeta.width, 'x', outMeta.height);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
