# Bharat Estates — Pan-India Property Explorer

A frontend-only React application for browsing real-estate listings across
all 28 Indian states and 8 union territories. Built with React Router,
Context API, and localStorage — no backend required.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build a production bundle: `npm run build` (output in `dist/`).
Deploy the `dist/` folder for free on Vercel, Netlify, or GitHub Pages.

## What's inside

- **36 properties**, one per state/UT, each with a globally unique photo
  (deterministic Picsum seed — no two properties, and no two photos on the
  detail page, ever repeat).
- **Home page** — hero + 8 featured listings.
- **Listings page** — the full catalogue with live filters (state, property
  type, price band, search, sort).
- **Property detail page** — dynamic route (`/property/:id`), 3-image
  gallery, amenities, save-to-favorites.
- **Favorites page** — persisted via `localStorage` through Context API.

## Resume guidance

See below for the project name to use, resume bullet points, and the
interview questions you're most likely to get about it.
