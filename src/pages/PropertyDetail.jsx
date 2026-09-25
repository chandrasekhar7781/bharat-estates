import { Link, useParams } from "react-router-dom";
import { properties } from "../data/properties";
import { useFavorites } from "../context/FavoritesContext";
import { handleImgError } from "../utils/imageFallback";

const formatPrice = (lakh) =>
  lakh >= 100 ? `₹${(lakh / 100).toFixed(2)} Cr` : `₹${lakh} Lakh`;

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!property) {
    return (
      <div className="wrap empty">
        <h3>Property not found</h3>
        <Link to="/listings" className="btn btn-primary">Back to listings</Link>
      </div>
    );
  }

  const fav = isFavorite(property.id);
  const photos = [property.image, ...(property.gallery || [])];

  return (
    <section className="block">
      <div className="wrap">
        <div className="detail-hero-media">
          <img src={photos[0]} alt={`${property.title}, ${property.city}`} onError={handleImgError} />
          <span className="card-tag">{property.type}</span>
        </div>

        {photos.length > 1 && (
          <div className="detail-gallery">
            {photos.slice(1).map((src, i) => (
              <div className="detail-gallery-item" key={i}>
                <img src={src} alt={`${property.title} — view ${i + 2}`} loading="lazy" onError={handleImgError} />
              </div>
            ))}
          </div>
        )}

        <div className="detail-grid">
          <div>
            <div className="card-loc">{property.city}, {property.state}</div>
            <h1>{property.title}</h1>
            <p style={{ marginTop: 12 }}>{property.tagline}</p>

            <div className="card-meta" style={{ marginTop: 22, fontSize: "0.95rem" }}>
              <span>{property.type}</span>
              <span>{property.bhk} BHK</span>
              <span>{property.area.toLocaleString("en-IN")} sq.ft</span>
            </div>

            <h4 style={{ marginTop: 36 }}>Amenities</h4>
            <ul className="amenity-list">
              {property.amenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          <aside className="sidebar-card">
            <h4>Price</h4>
            <span className="price">{formatPrice(property.priceLakh)}</span>
            <button
              className={`btn ${fav ? "btn-primary" : "btn-outline"}`}
              style={{ width: "100%", justifyContent: "center", marginBottom: 10 }}
              onClick={() => toggleFavorite(property.id)}
            >
              {fav ? "♥ Saved to favorites" : "♡ Save to favorites"}
            </button>
            <Link to="/listings" className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }}>
              ← Back to all listings
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
