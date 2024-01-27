import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { updateUser } from '../../apis/api';
import './dashboard.css';

const EditUserDialogBox = ({ user, onCancel}) => {
  const [editedUser, setEditedUser] = useState({ ...user,password: '******' });
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [oldEmail] = useState(user.email);
  const dropdownRef = useRef(null);

  const editableFields = ['name', 'email', 'phone', 'isAdmin', 'userAmount', 'password', 'style'];

  const validations = {
    name: (value) => /^[a-zA-Z]+ [a-zA-Z]+$/.test(value),
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => /^[0-9]{10}$/.test(value),
    isAdmin: (value) => typeof value === 'boolean',
    userAmount: (value) => /^\d+$/.test(value),
    style: (value) => /^[0-4]$/.test(value),
    password: (value) => value.length >= 6,
  };

  const handleSave = async () => {
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
      try {
        const response = await updateUser({
          oldEmail: oldEmail,
          newEmail: editedUser.email,
          password: editedUser.password,
          phone: editedUser.phone,
          style: editedUser.style,
          name: editedUser.name,
          useramount: editedUser.userAmount,
          isAdmin: editedUser.isAdmin.toString(),
        });

        const { success, message } = response.data;

        if (success) {
          toast.success(message);
          onCancel();
        } else {
          toast.error(message);
        }
      } catch (error) {
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'An error occurred.';
        toast.error(errorMessage);
      }
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClick = (value) => {
    setEditedUser({ ...editedUser, isAdmin: value });
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="edit-dialog-container">
      <div className="edit-dialog-box">
        <h2 style={{ color: 'black', textAlign: 'center' }}>Edit User</h2>
        <div className="edit-dialog-content">
          {editableFields.map((key) => (
            <div key={key} className="edit-dialog-input">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
              {key === 'isAdmin' ? (
                <div className="custom-dropdown" ref={dropdownRef}>
                  <input
                    type="text"
                    value={editedUser[key] ? 'True' : 'False'}
                    readOnly
                    onClick={handleDropdownToggle}
                    style={{ outline: 'none' }}
                  />
                  {isDropdownOpen && (
                    <div className="dropdown-options">
                      <div onClick={() => handleDropdownClick(true)}>True</div>
                      <div onClick={() => handleDropdownClick(false)}>False</div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {key === 'password' ? (
                    <input
                      type="password"
                      value={editedUser[key]}
                      style={{ outline: 'none' }}
                      onChange={(e) => setEditedUser({ ...editedUser, [key]: e.target.value })}
                    />
                  ) : (
                    <input
                      type="text"
                      value={editedUser[key]}
                      style={{ outline: 'none' }}
                      onChange={(e) => setEditedUser({ ...editedUser, [key]: e.target.value })}
                    />
                  )}
                </>
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
