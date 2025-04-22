import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EntertainerForm from '../components/EntertainerForm';
import '../styles/AddEntertainer.css';

export default function AddEntertainer() {
  const navigate = useNavigate();

  const handleAdd = async (newEnt) => {
    try {
      await axios.post(
        'https://finalbackendatmp3-acc8behte7fhgscf.eastus-01.azurewebsites.net/api/Entertainers',
        newEnt
      );
      alert('Entertainer added successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('Failed to add entertainer:', err);
      alert('Error adding entertainer.');
    }
  };

  return (
    <div className="add-entertainer-page">
      <div className="add-entertainer-card">
        <h2>Add New Entertainer</h2>
        <EntertainerForm onSubmit={handleAdd} isEditing={false} />
      </div>
    </div>
  );
}
