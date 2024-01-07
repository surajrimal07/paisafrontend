import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import './dashboard.css';

const EditUserDialogBox = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const dialogRef = useRef(null);

  useEffect(() => {
    // Set initial values
    setEditedUser({ ...user });
  }, [user]);

  const handleOutsideClick = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      onCancel();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onCancel]);


  const editableFields = ['name', 'email', 'phone', 'isAdmin', 'userAmount', 'style'];

  const validations = {
    name: (value) => /^[a-zA-Z]+ [a-zA-Z]+$/.test(value),
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => /^[0-9]{10}$/.test(value),
    isAdmin: (value) => typeof value === 'boolean',
    userAmount: (value) => /^\d+$/.test(value),
    style: (value) => /^[0-4]$/.test(value),
  };

  const handleSave = () => {
    // Validate before saving
    const validationResults = {};

    editableFields.forEach((key) => {
      const isValid = validations[key](editedUser[key]);
      validationResults[key] = isValid;

      if (!isValid) {
        toast.error(`Validation failed for ${key}. Please check your input.`);
      }
    });

    const isValid = Object.values(validationResults).every((result) => result);

    if (isValid) {
      onSave(editedUser);
      toast.success('User saved successfully');
    }
  };

  return (
    <div className="edit-dialog-container">
      <div className="edit-dialog-box">
        <h2 style={{ color: 'black', textAlign: 'center' }}>Edit User</h2>
        <div className="edit-dialog-content">
          {editableFields.map((key) => (
            <div key={key} className="edit-dialog-input">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
              {key === 'isAdmin' ? (
                <select
                  value={editedUser[key]}
                  onChange={(e) => setEditedUser({ ...editedUser, [key]: e.target.value })}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={editedUser[key]}
                  onChange={(e) => setEditedUser({ ...editedUser, [key]: e.target.value })}
                />
              )}
            </div>
          ))}
        </div>
        <div className="edit-dialog-buttons">
          <button className="edit-button-diaglogg" onClick={handleSave}>
            Save Changes
          </button>
          <button className="close-button-dialog" onClick={onCancel}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserDialogBox;
