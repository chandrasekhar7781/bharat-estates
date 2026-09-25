// If a photo ever fails to load, show a clean placeholder instead of a broken-image icon.
const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
      <rect width="1200" height="850" fill="#eceef3"/>
      <g fill="none" stroke="#8a93a8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M480 470 L600 370 L720 470"/><path d="M510 450 V560 H690 V450"/><path d="M575 560 V500 H625 V560"/>
      </g>
      <text x="600" y="640" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#8a93a8">Photo unavailable</text>
    </svg>`
  );

export function handleImgError(e) {
  const img = e.currentTarget;
  if (img.dataset.fallback) return; // avoid an error loop
  img.dataset.fallback = "1";
  img.src = PLACEHOLDER;
}
