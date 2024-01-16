// import React, { useEffect, useState } from 'react';
// import { FaEdit } from 'react-icons/fa';

// const MyProfilePage = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const storedUserData = JSON.parse(localStorage.getItem('user'));

//     if (storedUserData) {
//       setUserData(storedUserData);
//     }
//   }, []);

//   const maskPassword = (password) => {
//     return '*'.repeat(password.length);
//   };

//   return (
//     <div className="container my-5">
//       <div className="row">
//         <div className="col">
//           <h2>My Profile</h2>
//         </div>
//       </div>

//       {userData && (
//         <div className="row mt-4">
//           <div className="col-md-4">
//             <div className="card">
//               <img className="card-img-top" src={userData.dpImage} alt="User DP" />
//               <div className="card-body">
//                 <h5 className="card-title">{userData.name}</h5>
//                 <p className="card-text">{userData.email}</p>
//                 <FaEdit className="edit-icon" /> {/* Edit icon for user image */}
//               </div>
//             </div>
//           </div>

//           <div className="col-md-8">
//             <div className="card">
//               <div className="card-body">
//                 <div className="row mb-3">
//                   <div className="col">
//                     <h4>Personal Information</h4>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <p><strong>Name:</strong> {userData.name} <FaEdit className="edit-icon" /></p>
//                     <p><strong>Email:</strong> {userData.email} <FaEdit className="edit-icon" /></p>
//                     <p><strong>Password:</strong> {maskPassword(userData.pass)} <FaEdit className="edit-icon" /></p>
//                     <p><strong>Phone:</strong> {userData.phone} <FaEdit className="edit-icon" /></p>
//                   </div>
//                   <div className="col-md-6">
//                     <p><strong>Amount:</strong> ${userData.userAmount} <FaEdit className="edit-icon" /></p>
//                     <p><strong>Portfolio:</strong> {userData.portfolio.length} assets <FaEdit className="edit-icon" /></p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyProfilePage;

import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Modal from 'react-modal';

const MyProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editField, setEditField] = useState(null);
  const [newValue, setNewValue] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));

    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const maskPassword = (password) => {
    return '*'.repeat(password.length);
  };

  const openModal = (field) => {
    setEditField(field);
    setNewValue(userData[field]);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setEditField(null);
    setNewValue('');
    setModalIsOpen(false);
  };

  const handleEditSubmit = () => {
    // Add your validation logic here before calling the API
    // For simplicity, let's assume the validation is successful
    const updatedUserData = { ...userData, [editField]: newValue };
    setUserData(updatedUserData);

    // Call your API here with the updated data
    // Example: api.updateUserProfile(updatedUserData);

    // Close the modal
    closeModal();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      // You may want to add additional logic for image validation and upload
      // For simplicity, let's assume the file is directly used as the new image
      setNewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col">
          <h2>My Profile</h2>
        </div>
      </div>

      {userData && (
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card">
              <img
                className="card-img-top"
                src={newImage || userData.dpImage}
                alt="User DP"
                onClick={() => document.getElementById('imageInput').click()}
              />
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <div className="card-body">
                <h5 className="card-title">{userData.name}</h5>
                <p className="card-text">{userData.email}</p>
                <FaEdit className="edit-icon" onClick={() => openModal('dpImage')} />
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col">
                    <h4>Personal Information</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Name:</strong>{' '}
                      {editField === 'name' ? (
                        <>
                          <FaEdit className="edit-icon" onClick={() => openModal('name')} />
                          <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Edit Modal"
                            className="modal-content"
                            overlayClassName="modal-overlay"
                          >
                            <p>Edit {editField}</p>
                            <input
                              type="text"
                              value={newValue}
                              onChange={(e) => setNewValue(e.target.value)}
                            />
                            <button onClick={handleEditSubmit}>Submit</button>
                            <button onClick={closeModal}>Cancel</button>
                          </Modal>
                        </>
                      ) : (
                        <>
                          {userData.name} <FaEdit className="edit-icon" onClick={() => openModal('name')} />
                        </>
                      )}
                    </p>
                    <p>
                      <strong>Email:</strong> {editField === 'email' ? (
                        <>
                          <FaEdit className="edit-icon" onClick={() => openModal('email')} />
                          <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Edit Modal"
                            className="modal-content"
                            overlayClassName="modal-overlay"
                          >
                            <p>Edit {editField}</p>
                            <input
                              type="text"
                              value={newValue}
                              onChange={(e) => setNewValue(e.target.value)}
                            />
                            <button onClick={handleEditSubmit}>Submit</button>
                            <button onClick={closeModal}>Cancel</button>
                          </Modal>
                        </>
                      ) : (
                        <>
                          {userData.email} <FaEdit className="edit-icon" onClick={() => openModal('email')} />
                        </>
                      )}
                    </p>
                    {/* Repeat the pattern for other fields */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
