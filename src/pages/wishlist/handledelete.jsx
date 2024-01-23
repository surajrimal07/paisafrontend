import React from 'react';
import './handledelete.css';

const HandleDelete = ({ userEmail, portfolioId, portfolioName, onDelete, onCancel }) => {
  const handleDelete = (event) => {
    onDelete(event,userEmail,portfolioId, );
  };

  return (
    <div className="delete-popup">
      <h4>Delete Watchlist</h4>
      <p>Are you sure you want to delete "{portfolioName}"?</p>
      <div className="button-container">
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HandleDelete;
