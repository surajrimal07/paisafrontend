import React, { useState } from 'react';

const EditProfileForm = ({ userData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    password: userData.password,
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear validation errors when the input changes
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!editedData.name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
      errors.name = 'Please enter your full name (First Name and Last Name)';
    }

    if (!editedData.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!editedData.phone.match(/^\d{10}$/)) {
      errors.phone = 'Please enter a 10-digit phone number';
    }

    if (editedData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0; // Form is valid if there are no errors
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(editedData);
    }
  };

  return (
    <div className="border rounded p-3">
      <h5>Edit Profile</h5>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={editedData.name}
            onChange={handleInputChange}
          />
          <div className="invalid-feedback">
            {validationErrors.name}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={editedData.email}
            onChange={handleInputChange}
          />
          <div className="invalid-feedback">
            {validationErrors.email}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input
            type="tel"
            className={`form-control ${validationErrors.phone ? 'is-invalid' : ''}`}
            id="phone"
            name="phone"
            value={editedData.phone}
            onChange={handleInputChange}
          />
          <div className="invalid-feedback">
            {validationErrors.phone}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={editedData.password}
            onChange={handleInputChange}
          />
          <div className="invalid-feedback">
            {validationErrors.password}
          </div>
        </div>
        <div className="mb-3">
          <button type="button" className="btn btn-success" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
