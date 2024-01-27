import React, { useState } from 'react';
import './handlecreate.css';

const HandleCreate = ({ userEmail, onSave, onCancel }) => {
  const [watchlistName, setWatchlistName] = useState('');

  const handleSave = (event) => {
    if (!watchlistName.trim()) {
      alert('Portfolio name cannot be empty');
      return;
    }

    onSave(event,userEmail, watchlistName);
  };

  return (
    <div className="create-popup">
        <h4>Create Portfolio</h4>
      <label htmlFor="watchlistName">Name:</label>
      <input
        type="text"
        id="watchlistName"
        value={watchlistName}
        onChange={(e) => setWatchlistName(e.target.value)}
      />
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HandleCreate;
