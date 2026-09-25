import { NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const { favorites } = useFavorites();

  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          Bharat <span>Estates</span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/listings" className={({ isActive }) => (isActive ? "active" : "")}>
            All Listings
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? "active" : "")}>
            Favorites {favorites.length > 0 && `(${favorites.length})`}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
