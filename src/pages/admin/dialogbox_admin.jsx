import React, { useEffect, useRef } from 'react';

function UserDialogBox({ user, onEdit, onClose, isEditing }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const handleSaveChanges = () => {
    if (isEditing) {
      onEdit(user);
    }
    onClose();
  };

  // Configuration object to manage which fields to exclude
  const fieldsToExclude = ['_id', '__v'];

  return (
    <div className="dialog-container">
      <div className="dialog-box" ref={dialogRef}>
        <div className="dialog-buttons">
          {isEditing && (
            <button className="edit-button-dialog" onClick={handleSaveChanges}>
              Save Changes
            </button>
          )}
          <button className="close-button" onClick={onClose}>
            Close
          </button>
          <h3>{isEditing ? 'Edit' : 'Details'}</h3>
          <div className="user-details">
            {Object.entries(user).map(([key, value]) => (
              // Only render if the key is not in the fieldsToExclude array
              !fieldsToExclude.includes(key) && (
                <div key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {key === 'isAdmin' ? (value ? 'True' : 'False') : value}
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
              }
export default UserDialogBox;
