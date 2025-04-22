import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="card text-center p-5">
        <h1 className="mb-3 text-primary">🎤 Welcome to Royal Talent Agency 🎤</h1>
        <p className="lead mb-4">
          Discover top talent and manage your entertainment lineup with ease.
        </p>

        {/* ✅ Flex wrapper for centering */}
        <div className="d-flex justify-content-center">
          <Link to="/entertainers" className="btn btn-primary btn-lg">
            View Entertainers
          </Link>
        </div>
      </div>
    </div>
  );
}
