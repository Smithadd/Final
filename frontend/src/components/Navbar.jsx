import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const showBackButton = location.pathname !== '/';

  return (
    <nav className="navbar-container">
      {showBackButton && (
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
      )}

      <div>
        <Link to="/" className="btn btn-outline-primary home-button me-2">
          Home
        </Link>

        <Link to="/entertainers" className="btn btn-outline-primary home-button">
          Entertainers
        </Link>
      </div>
    </nav>
  );
}
