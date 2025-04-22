import { useState, useEffect } from 'react';

export default function EntertainerForm({ initialData, onSubmit, isEditing }) {
  const [formData, setFormData] = useState({
    entStageName: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEmailAddress: '',
    dateEntered: '',
  });

  // ✅ Set dateEntered to today only if adding
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData((prev) => ({
        ...prev,
        dateEntered: new Date().toISOString().split('T')[0], // yyyy-mm-dd
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Stage Name</label>
        <input
          type="text"
          className="form-control"
          name="entStageName"
          value={formData.entStageName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Street Address</label>
        <input
          type="text"
          className="form-control"
          name="entStreetAddress"
          value={formData.entStreetAddress}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          name="entCity"
          value={formData.entCity}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">State</label>
        <input
          type="text"
          className="form-control"
          name="entState"
          value={formData.entState}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Zip Code</label>
        <input
          type="text"
          className="form-control"
          name="entZipCode"
          value={formData.entZipCode}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input
          type="text"
          className="form-control"
          name="entPhoneNumber"
          value={formData.entPhoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Web Page</label>
        <input
          type="text"
          className="form-control"
          name="entWebPage"
          value={formData.entWebPage}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="form-control"
          name="entEmailAddress"
          value={formData.entEmailAddress}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date Entered</label>
        <input
          type="date"
          className="form-control"
          name="dateEntered"
          value={formData.dateEntered}
          onChange={handleChange}
          disabled={isEditing} // ✅ disables during edit only
        />
      </div>

      <div className="form-button-wrapper">
        <button type="submit" className="btn btn-submit">
          {isEditing ? 'Update' : 'Add'} Entertainer
        </button>
      </div>
    </form>
  );
}
