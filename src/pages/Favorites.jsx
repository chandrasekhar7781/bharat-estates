import { Link } from "react-router-dom";
import { properties } from "../data/properties";
import { useFavorites } from "../context/FavoritesContext";
import PropertyCard from "../components/PropertyCard";

export default function Favorites() {
  const { favorites } = useFavorites();
  const saved = properties.filter((p) => favorites.includes(p.id));

  return (
    <section className="block">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Your favorites</h2>
            <p>Saved locally in your browser — no account needed.</p>
          </div>
        </div>

        {saved.length === 0 ? (
          <div className="empty">
            <h3>No favorites yet</h3>
            <p>Tap the heart on any listing to save it here.</p>
            <Link to="/listings" className="btn btn-primary" style={{ marginTop: 18 }}>
              Browse listings
            </Link>
          </div>
        ) : (
          <div className="grid">
            {saved.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
