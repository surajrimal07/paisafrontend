import React, { useState } from 'react';

import './handlerename.css';

const HandleRename = ({ userEmail, portfolioId, newName, onSave, onCancel }) => {
    const [updatedName, setUpdatedName] = useState(newName);
    const [error, setError] = useState('');

    const handleSave = (event) => {
        if (!updatedName.trim()) {
          setError('Field cannot be empty');
          return;
        }

        onSave(event, userEmail, portfolioId, updatedName);
      };

      return (
        <div className="rename-popup">
          <label htmlFor="newName">Name:</label>
          <input
            type="text"
            id="newName"
            value={updatedName}
            onChange={(e) => {
              setUpdatedName(e.target.value);
              setError('');
            }}
          />
          {error && <p className="error-message">{error}</p>}
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

export default HandleRename;
