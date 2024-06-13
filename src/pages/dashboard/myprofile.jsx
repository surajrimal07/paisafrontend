import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";
import "react-toastify/dist/ReactToastify.css";
import { updateDPImage, updateUser } from "../../apis/api.js";
import "./App.css";
import HandleDPChange from "./handleDPChange";
import EditProfileForm from "./handleEdit";

const MyProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showHandleDPChange, setShowHandleDPChange] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);

  useEffect(() => {
    const storedUserData = JSON.parse(secureLocalStorage.getItem("user"));

    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (event, editedData) => {
    event.preventDefault();

    const data = {
      oldEmail: userData.email,
      name: editedData.name,
      newEmail: editedData.email,
      phone: editedData.phone,
      newPassword: editedData.password,
    };
    try {
      const res = await updateUser(data);
      const { success, message, data: responseData } = res.data;

      if (success) {
        toast.success(message);
        //localStorage.setItem("token", responseData.token);
        //localStorage.setItem("user", JSON.stringify(responseData));
        secureLocalStorage.setItem("user", JSON.stringify(responseData));
        setUserData(responseData);
      } else {
        toast.error(message);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An error occurred.";
      toast.error(errorMessage);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDPChange = async (file) => {
    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    const data = new FormData();
    data.append("dpImage", file);
    data.append("oldEmail", userData.email);

    try {
      toast.info("Uploading image...");
      const res = await updateDPImage(data);

      const { success, message, data: responseData } = res.data;

      if (success) {
        toast.success(message);
       // localStorage.setItem("token", responseData.token);

       //localStorage.setItem("user", JSON.stringify(responseData));

        secureLocalStorage.setItem("authtoken", responseData.token);

        secureLocalStorage.setItem("user", JSON.stringify(responseData));

        setUserData(responseData);
      } else {
        toast.error(message);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleEditIconClick = () => {
    setShowHandleDPChange(true);
  };

  const handleImageClick = () => {
    setShowImageDialog(true);
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
              <div
                className="position-absolute top-0 end-0"
                style={{
                  cursor: "pointer",
                  padding: "5px",
                }}
              >
                <button className="edit-button" onClick={handleEditIconClick}>
                  Edit
                </button>
              </div>
              <div
                className="card-img-top rounded-circle overflow-hidden position-relative"
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "auto",
                  marginTop: "5px",
                  cursor: "pointer",
                }}
                onClick={handleImageClick}
              >
                <img
                  className="w-100 h-100 object-cover"
                  src={userData.dpImage}
                  alt="User DP"
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{userData.name}</h5>
                <p className="card-text">{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            {isEditing ? (
              <EditProfileForm
                userData={userData}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <div className="card">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col">
                      <h4>Personal Information</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {isEditing ? null : (
                        <button
                          className="edit-button"
                          onClick={handleEditClick}
                        >
                          Edit
                        </button>
                      )}
                      <p>
                        <strong>Name:</strong> {userData.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {userData.email}{" "}
                      </p>
                      <p>
                        <strong>Password:</strong> {"******"}
                      </p>
                      <p>
                        <strong>Phone:</strong> {userData.phone}{" "}
                      </p>
                      <p>
                        <strong>Admin:</strong>{" "}
                        {userData.isAdmin ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Premium:</strong>{" "}
                        {userData.premium ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Wallets:</strong>{" "}
                        {(() => {
                          switch (userData.wallets) {
                            case 0:
                              return "None";
                            case 1:
                              return "Khalti";
                            case 2:
                              return "Esewa";
                            case 3:
                              return "Khalti and Esewa";
                            default:
                              return "";
                          }
                        })()}
                      </p>
                      <p>
                        <strong>Amount: </strong> Rs: {userData.userAmount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showHandleDPChange && (
        <HandleDPChange
          userData={userData}
          onClose={() => setShowHandleDPChange(false)}
          onDPChange={handleDPChange}
        />
      )}

      {showImageDialog && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowImageDialog(false)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  className="w-100 h-100 object-cover"
                  src={userData.dpImage}
                  alt="User DP"
                  onClick={() => setShowImageDialog(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
