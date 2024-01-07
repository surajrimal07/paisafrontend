// EditUserDialogBox.js
import React, { useState } from 'react';

function EditUserDialogBox({ user, onSave, onCancel }) {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedUser);
    onCancel();
  };

  return (
    <div className="edit-dialog-container">
      <div className="edit-dialog-box">
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" name="email" value={editedUser.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={editedUser.phone} onChange={handleInputChange} />
        </div>
        <div className="edit-dialog-buttons">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUserDialogBox;
