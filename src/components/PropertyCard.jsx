import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { handleImgError } from "../utils/imageFallback";

const formatPrice = (lakh) =>
  lakh >= 100 ? `₹${(lakh / 100).toFixed(2)} Cr` : `₹${lakh} Lakh`;

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(property.id);

  return (
    <div className="card">
      <Link to={`/property/${property.id}`} className="card-media" aria-label={property.title}>
        <img src={property.image} alt={`${property.title}, ${property.city}`} loading="lazy" onError={handleImgError} />
        <span className="card-tag">{property.type}</span>
      </Link>
      <button
        className={`fav-btn ${fav ? "active" : ""}`}
        onClick={() => toggleFavorite(property.id)}
        aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      >
        {fav ? "♥" : "♡"}
      </button>
      <div className="card-body">
        <div className="card-loc">{property.city}, {property.state}</div>
        <Link to={`/property/${property.id}`}>
          <h3>{property.title}</h3>
        </Link>
        <div className="card-meta">
          <span>{property.bhk} BHK</span>
          <span>{property.area.toLocaleString("en-IN")} sq.ft</span>
        </div>
        <div className="card-foot">
          <div className="price">{formatPrice(property.priceLakh)}<span> onwards</span></div>
          <Link to={`/property/${property.id}`} className="btn btn-outline" style={{ padding: "8px 14px", fontSize: "0.82rem" }}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
