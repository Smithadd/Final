import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

export default function EntertainersList() {
  const [entertainers, setEntertainers] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://finalbackendatmp3-acc8behte7fhgscf.eastus-01.azurewebsites.net/api/Entertainers'
      )
      .then((res) => {
        console.log('Entertainers data:', res.data);
        setEntertainers(res.data);
      })
      .catch((err) => console.error('Failed to load entertainers:', err));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center text-primary mb-3">Entertainers</h1>

      <div className="card mx-auto shadow-lg p-4" style={{ maxWidth: '800px' }}>
        <table className="table table-striped table-hover table-bordered mx-auto mb-0">
          <thead className="table-light">
            <tr>
              <th>Stage Name</th>
              <th>Bookings</th>
              <th>Last Booked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entertainers.map((ent) => (
              <tr key={ent.entertainerId}>
                <td>{ent.entStageName}</td>
                <td>{ent.bookingCount}</td>
                <td>{ent.dateEntered?.split('T')[0]}</td>
                <td>
                  <Link
                    to={`/entertainers/${ent.entertainerId}`}
                    className="btn btn-info btn-sm px-3 py-1"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br></br>

        {/* ✅ Moved Add Button Below Table */}
        <div className="btn-wrapper mt-4">
          <Link to="/add" className="btn btn-success">
            Add Entertainer
          </Link>
        </div>
      </div>
    </div>
  );
}
