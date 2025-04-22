import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EntertainerForm from '../components/EntertainerForm';
import '../styles/AddEntertainer.css'; // ✅ same CSS as Add page

export default function EditEntertainer() {
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

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(
        `https://finalbackendatmp3-acc8behte7fhgscf.eastus-01.azurewebsites.net/api/Entertainers/${id}`,
        {
          ...updatedData,
          entertainerId: Number(id),
        }
      );
      alert('Entertainer updated!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('Failed to update entertainer:', err);
      alert('Error updating entertainer.');
    }
  };

  if (!entertainer) return <div className="add-entertainer-page">Loading...</div>;

  return (
    <div className="add-entertainer-page">
      <div className="add-entertainer-card">
        <h2>Edit Entertainer</h2>
        <EntertainerForm initialData={entertainer} onSubmit={handleUpdate} isEditing={true} />
      </div>
    </div>
  );
}
