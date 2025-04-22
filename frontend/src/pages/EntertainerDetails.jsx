import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/EntertainerDetails.css'; // (Optional) if you want to make it even fancier

export default function EntertainerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://finalbackendatmp3-acc8behte7fhgscf.eastus-01.azurewebsites.net/api/Entertainers/${id}`
      )
      .then((res) => setEntertainer(res.data))
      .catch((err) => console.error('Failed to load entertainer:', err));
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this entertainer?');
    if (!confirm) return;

    try {
      await axios.delete(
        `https://finalbackendatmp3-acc8behte7fhgscf.eastus-01.azurewebsites.net/api/Entertainers/${id}`
      );
      alert('Entertainer deleted.');
      navigate('/');
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Failed to delete entertainer.');
    }
  };

  if (!entertainer) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center text-primary mb-4">{entertainer.entStageName} - Details</h2>

        <ul className="list-group mb-4">
          <li className="list-group-item">
            <strong>Address:</strong>{' '}
            {`${entertainer.entStreetAddress}, ${entertainer.entCity}, ${entertainer.entState} ${entertainer.entZipCode}`}
          </li>
          <li className="list-group-item">
            <strong>Phone:</strong> {entertainer.entPhoneNumber}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong>{' '}
            {entertainer.entEmailAddress || <span className="text-muted">N/A</span>}
          </li>
          <li className="list-group-item">
            <strong>Web Page:</strong>{' '}
            {entertainer.entWebPage ? (
              <a href={`https://${entertainer.entWebPage}`} target="_blank" rel="noreferrer">
                {entertainer.entWebPage}
              </a>
            ) : (
              <span className="text-muted">N/A</span>
            )}
          </li>
          <li className="list-group-item">
            <strong>Date Entered:</strong> {entertainer.dateEntered?.split('T')[0]}
          </li>
        </ul>

        <div className="button-row mt-4">
          <Link to={`/edit/${entertainer.entertainerId}`} className="btn btn-edit">
            Edit
          </Link>
          <button className="btn btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
