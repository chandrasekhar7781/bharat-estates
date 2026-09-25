// Usage: npm run check:images
// Confirms that every property photo loads, and that no photo is used twice.
import { properties, heroImages } from "../src/data/properties.js";

const all = [];
properties.forEach((p) => {
  all.push({ where: `#${p.id} ${p.title} (main)`, url: p.image });
  (p.gallery || []).forEach((u, i) => all.push({ where: `#${p.id} ${p.title} (gallery ${i + 1})`, url: u }));
});
Object.entries(heroImages).forEach(([k, u]) => all.push({ where: `home hero (${k})`, url: u }));

const photoId = (u) => (u.match(/photos\/(\d+)/) || [])[1] || u;
const seen = new Map();
let dupes = 0;
for (const { where, url } of all) {
  const id = photoId(url);
  if (seen.has(id)) { dupes++; console.log(`DUPLICATE  ${where}  =  ${seen.get(id)}`); }
  else seen.set(id, where);
}

let broken = 0;
const queue = [...all];
async function worker() {
  while (queue.length) {
    const { where, url } = queue.shift();
    try {
      const res = await fetch(url, { method: "GET", headers: { Range: "bytes=0-1023" } });
      const type = res.headers.get("content-type") || "";
      if (!(res.status === 200 || res.status === 206) || !type.startsWith("image/")) {
        broken++;
        console.log(`BROKEN (${res.status})  ${where}\n           ${url}`);
      }
    } catch (err) {
      broken++;
      console.log(`BROKEN (${err.message})  ${where}\n           ${url}`);
    }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));

console.log(`\nChecked ${all.length} images: ${broken} broken, ${dupes} duplicates.`);
process.exit(broken || dupes ? 1 : 0);
