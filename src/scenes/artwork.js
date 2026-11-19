// Each sheet contains one two-second gesture at the source film's 12 Hz drawing cadence.
const sheets = new Map();
export async function loadArtwork(scenes) {
  await Promise.all(scenes.map(async ({ art }) => {
    const image = new Image();
    image.src = new URL('../artworks/' + art + '.webp', import.meta.url);
    await image.decode();
    sheets.set(art, image);
  }));
}

export function drawArtwork(ctx, scene, { localT }) {
  const sheet = sheets.get(scene.art);
  const frame = Math.floor(localT * 12 + 1e-7) % 24;
  const w = sheet.width / 4, h = sheet.height / 6;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  ctx.drawImage(sheet, (frame % 4) * w, Math.floor(frame / 4) * h, w, h,
    0, scene.art === 'song' ? 325 : 75, 1000, 1000 * h / w);
  ctx.restore();
}
