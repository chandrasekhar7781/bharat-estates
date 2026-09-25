import { useMemo, useState } from "react";
import { properties, states, propertyTypes } from "../data/properties";
import PropertyCard from "../components/PropertyCard";

const PRICE_BANDS = [
  { label: "Any budget", min: 0, max: Infinity },
  { label: "Under ₹75 Lakh", min: 0, max: 75 },
  { label: "₹75 Lakh – ₹1.5 Cr", min: 75, max: 150 },
  { label: "₹1.5 Cr – ₹3 Cr", min: 150, max: 300 },
  { label: "Above ₹3 Cr", min: 300, max: Infinity },
];

export default function Listings() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("All states");
  const [type, setType] = useState("All types");
  const [band, setBand] = useState(0);
  const [sort, setSort] = useState("relevance");

  const filtered = useMemo(() => {
    const priceBand = PRICE_BANDS[band];
    let list = properties.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        p.state.toLowerCase().includes(search.toLowerCase());
      const matchesState = state === "All states" || p.state === state;
      const matchesType = type === "All types" || p.type === type;
      const matchesPrice = p.priceLakh >= priceBand.min && p.priceLakh <= priceBand.max;
      return matchesSearch && matchesState && matchesType && matchesPrice;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.priceLakh - b.priceLakh);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.priceLakh - a.priceLakh);
    if (sort === "area-desc") list = [...list].sort((a, b) => b.area - a.area);

    return list;
  }, [search, state, type, band, sort]);

  return (
    <section className="block">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>All listings, pan-India</h2>
            <p>Every state and union territory, one filter panel. Narrow by location, type, budget or size.</p>
          </div>
        </div>

        <div className="filters">
          <input
            className="grow"
            type="text"
            placeholder="Search by title, city or state…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option>All states</option>
            {states.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>All types</option>
            {propertyTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select value={band} onChange={(e) => setBand(Number(e.target.value))}>
            {PRICE_BANDS.map((b, i) => (
              <option key={b.label} value={i}>{b.label}</option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="area-desc">Size: Largest First</option>
          </select>
        </div>

        <p className="filter-count">{filtered.length} of {properties.length} properties match your filters</p>

        {filtered.length === 0 ? (
          <div className="empty">
            <h3>No properties match those filters</h3>
            <p>Try widening the budget band or clearing the state filter.</p>
          </div>
        ) : (
          <div className="grid">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
