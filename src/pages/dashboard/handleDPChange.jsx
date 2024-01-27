import React, { useState } from 'react';
import './handledp.css';

const HandleDPChange = ({ userData, onDPChange, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setSelectedImage(file);
        setPreviewImage(URL.createObjectURL(file))
        handleSave();
    }
};

  const handleSave = () => {
    if (selectedImage) {
      onDPChange(selectedImage);
      onClose();
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content handle-dp-change">
        <div className="modal-header">
          <h5 className="modal-title">Select a new image</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <div className="current-image-container">
            <img className="current-image" src={previewImage || userData.dpImage} alt="User DP" />
          </div>
          <div className="input-group mb-3">
          <input
    type="file"
    accept="image/*"
    onChange={(e) => handleFileChange(e)}
    className="form-control"
    id="inputGroupFile"
/>

            <label className="input-group-text" htmlFor="inputGroupFile">
              Choose Image
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandleDPChange;
