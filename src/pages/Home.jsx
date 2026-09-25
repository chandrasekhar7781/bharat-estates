import { Link } from "react-router-dom";
import { properties, heroImages, propertyTypes } from "../data/properties";
import PropertyCard from "../components/PropertyCard";

const FEATURED_IDS = [14, 11, 21, 6, 24, 33, 9, 23];

export default function Home() {
  const featured = FEATURED_IDS.map((id) => properties.find((p) => p.id === id));

  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <div>
            <div className="hero-eyebrow">36 states & union territories, one address book</div>
            <h1>Homes worth relocating your whole life for.</h1>
            <p className="lede">
              From a Worli skyline penthouse to a Dal Lake houseboat estate — Bharat Estates
              curates verified listings across every state and union territory in India.
            </p>
            <div className="hero-actions">
              <Link to="/listings" className="btn btn-primary">Browse all listings</Link>
              <Link to="/favorites" className="btn btn-outline">My favorites</Link>
            </div>
            <div className="hero-stats">
              <div><strong>36</strong><span>States & UTs covered</span></div>
              <div><strong>{properties.length}</strong><span>Verified properties</span></div>
              <div><strong>{propertyTypes.length}</strong><span>Property types</span></div>
            </div>
          </div>
          <div className="hero-collage">
            <img className="img-a" src={heroImages.primary} alt="Featured luxury residence" />
            <img className="img-b" src={heroImages.secondary} alt="Featured coastal villa" />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Featured this week</h2>
              <p>A hand-picked spread from the coast, the hills and the capital — one from nearly every region.</p>
            </div>
            <Link to="/listings" className="btn btn-outline">View all {properties.length} listings</Link>
          </div>
          <div className="grid">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
