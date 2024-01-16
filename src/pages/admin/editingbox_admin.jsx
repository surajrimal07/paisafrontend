// import React, { useEffect, useRef, useState } from 'react';
// import { toast } from 'react-toastify';
// import './dashboard.css';

// const EditUserDialogBox = ({ user, onSave, onCancel }) => {
//   const [editedUser, setEditedUser] = useState({ ...user });
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dialogRef = useRef(null);

//   useEffect(() => {
//     // Set initial values
//     setEditedUser({ ...user });
//   }, [user]);

//   const handleOutsideClick = (event) => {
//     if (dialogRef.current && !dialogRef.current.contains(event.target)) {
//       onCancel();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleOutsideClick);

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, [onCancel]);


//   const editableFields = ['name', 'email', 'phone', 'isAdmin', 'userAmount', 'style'];

//   const validations = {
//     name: (value) => /^[a-zA-Z]+ [a-zA-Z]+$/.test(value),
//     email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
//     phone: (value) => /^[0-9]{10}$/.test(value),
//     isAdmin: (value) => typeof value === 'boolean',
//     userAmount: (value) => /^\d+$/.test(value),
//     style: (value) => /^[0-4]$/.test(value),
//   };

//   const handleSave = () => {
//     // Validate before saving
//     const validationResults = {};

//     editableFields.forEach((key) => {
//       const isValid = validations[key](editedUser[key]);
//       validationResults[key] = isValid;

//       if (!isValid) {
//         toast.error(`Validation failed for ${key}. Please check your input.`);
//       }
//     });

//     const isValid = Object.values(validationResults).every((result) => result);

//     if (isValid) {
//       onSave(editedUser);
//       toast.success('User saved successfully');
//     }
//   };

//   return (
//     <div className="edit-dialog-container">
//       <div className="edit-dialog-box">
//         <h2 style={{ color: 'black', textAlign: 'center' }}>Edit User</h2>
//         <div className="edit-dialog-content">
//           {editableFields.map((key) => (
//             <div key={key} className="edit-dialog-input">
//               <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
//               {key === 'isAdmin' ? (
//                 <div className={`custom-dropdown ${showDropdown ? 'active' : ''}`}>
//                   <input
//                     type="text"
//                     value={editedUser[key] ? 'True' : 'False'}
//                     readOnly
//                     onClick={() => setShowDropdown(!showDropdown)}
//                   />
//                   <div className="dropdown-options">
//                     <div onClick={() => setEditedUser({ ...editedUser, [key]: true })}>True</div>
//                     <div onClick={() => setEditedUser({ ...editedUser, [key]: false })}>False</div>
//                   </div>
//                 </div>
//               ) : (
//                 <input
//                   type="text"
//                   value={editedUser[key]}
//                   onChange={(e) => setEditedUser({ ...editedUser, [key]: e.target.value })}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="edit-dialog-buttons">
//           <button className="edit-button-diaglogg" onClick={handleSave}>
//             Save Changes
//           </button>
//           <button className="close-button-dialog" onClick={onCancel}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUserDialogBox;


import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { editUser } from '../../apis/api';
import './dashboard.css';


const EditUserDialogBox = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const editableFields = ['name', 'email', 'phone', 'isAdmin', 'userAmount', 'style'];

  const handleEditUser = async (user, field, value) => {
    try {
      const response = await editUser(user, field, value);
      if (response.status === 200) {
        toast.success('User edited successfully');
      } else {
        toast.error('An error occurred while editing user');
      }

    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('An error occurred while editing user');
    }
  };


  const validations = {
    name: (value) => /^[a-zA-Z]+ [a-zA-Z]+$/.test(value),
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => /^[0-9]{10}$/.test(value),
    isAdmin: (value) => typeof value === 'boolean',
    userAmount: (value) => /^\d+$/.test(value),
    style: (value) => /^[0-4]$/.test(value),
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


        const response = await handleEditUser({
          email: editedUser.email,
          field: editedUser.updatedField,
          value: editedUser[editedUser.updatedField],
        });
        if (response.status === 200) {
          toast.success('User edited successfully');
          onSave();
        } else {
          toast.error('An error occurred while editing user');
        }
      } catch (error) {
        console.error('Error editing user:', error);
        toast.error('An error occurred while editing user');
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
                  />
                  {isDropdownOpen && (
                    <div className="dropdown-options">
                      <div onClick={() => handleDropdownClick(true)}>True</div>
                      <div onClick={() => handleDropdownClick(false)}>False</div>
                    </div>
                  )}
                </div>
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
