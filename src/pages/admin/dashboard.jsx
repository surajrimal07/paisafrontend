import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { deleteUser, getAllAssets, getAllUsers } from '../../apis/api';
import './dashboard.css';

function AdminDashboard() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState({});
  const [currentUsersPage, setCurrentUsersPage] = useState(1);
  const [currentAssetsPage, setCurrentAssetsPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [searchQueryUsers, setSearchQueryUsers] = useState('');
  const [searchQueryAssets, setSearchQueryAssets] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetResponse = await getAllAssets();
        if (assetResponse.status === 200 && Array.isArray(assetResponse.data.data)) {
          const jsonDecode = JSON.stringify(assetResponse.data.data);
          localStorage.setItem('Assets', jsonDecode);
          setAssets(assetResponse.data.data);
        } else {
          console.error('Error fetching assets:', assetResponse.error);
        }

        const userResponse = await getAllUsers();
        if (userResponse.status === 200 && Array.isArray(userResponse.data.data)) {
          const jsonDecode = JSON.stringify(userResponse.data.data);
          localStorage.setItem('Users', jsonDecode);
          setUsers(userResponse.data.data);
        } else {
          console.error('Error fetching users:', userResponse.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };

    fetchData();
  }, []);

  const handleEditUser = (userId) => {
    // Implement edit user functionality
    console.log(`Edit user with ID ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    setDeletingUser(userId);
  };

  function DeleteConfirmationModal({ confirmDelete, cancelDelete }) {
    return (
      <div className="modal-container">
        <div className="modal-box">
          <p>Are you sure you want to delete this user?</p>
          <div>
            <button className="confirm-button" onClick={confirmDelete}>
              Yes
            </button>
            <button className="cancel-button" onClick={cancelDelete}>
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCancelDelete = () => {
    setDeletingUser(null);
  };

  const confirmDelete = async () => {
    try {
      console.log("Deleting user email is "+deletingUser)
      const response = await deleteUser(deletingUser);

      if (response.status === 200 || response.status === 204) {
        toast.success('User deleted successfully');
        setUsers(users.filter((user) => user.email !== deletingUser));
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('An error occurred while deleting user');
    } finally {
      setDeletingUser(null);
    }
  };

  const handleViewDetail = (item) => {
    setSelectedItem(item);
  };

  const indexOfLastUser = currentUsersPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalUsersPageCount = Math.ceil(users.length / itemsPerPage);

  const renderUserPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentUsersPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalUsersPageCount, startPage + maxButtonsToShow - 1);
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentUsersPage(i)}
          className={currentUsersPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const indexOfLastAsset = currentAssetsPage * itemsPerPage;
  const indexOfFirstAsset = indexOfLastAsset - itemsPerPage;
  const currentAssets = assets.slice(indexOfFirstAsset, indexOfLastAsset);

  const totalAssetsPageCount = Math.ceil(assets.length / itemsPerPage);

  const renderAssetPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentAssetsPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalAssetsPageCount, startPage + maxButtonsToShow - 1);
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentAssetsPage(i)}
          className={currentAssetsPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const handleSearchUsers = () => {
    console.log('Search query:', searchQueryUsers);

    // Filter users based on search query
    const filteredUsers = users.filter((user) => {
      console.log('User:', user);
      const lowerCaseQuery = searchQueryUsers.toLowerCase();
      return (
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        (user.phone && user.phone.toString().includes(lowerCaseQuery)) ||
        user.token.toLowerCase().includes(lowerCaseQuery)
      );
    });

    console.log('Filtered Users:', filteredUsers);

    // Set the filtered users
    setUsers(filteredUsers);

    // Reset user pagination to the first page
    setCurrentUsersPage(1);
  };

  const handleSearchAssets = () => {
    // Filter assets based on search query
    const filteredAssets = assets.filter(
      (asset) =>
        asset.symbol.toLowerCase().includes(searchQueryAssets.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchQueryAssets.toLowerCase())
    );
    // Set the filtered assets
    setAssets(filteredAssets);

    // Reset asset pagination to the first page
    setCurrentAssetsPage(1);
  };

  const handleCloseDialog = () => {
    // Close the dialog box
    setSelectedItem(null);
  };

  const handleEditDetail = () => {
    // Implement edit functionality for the selected item
    console.log(`Edit item:`, selectedItem);
  };

  return (
    <div className="m-4">
      <h2>Admin Dashboard</h2>

      {/* Search Users */}
      <div className="search-container mb-4">
        <input
          type="text"
          placeholder="Search users by name, email, phone, or token..."
          value={searchQueryUsers}
          onChange={(e) => setSearchQueryUsers(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchUsers}>
          Search Users
        </button>
      </div>

      {/* Users Section */}
      <div className="category-sector-box users-section">
        <h3>Users</h3>
        <table className="table mt-2">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Admin</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index} >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{JSON.stringify(user.isAdmin)}</td>
                <td>{user.userAmount}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditUser(user._id)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteUser(user.email)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          {renderUserPaginationButtons()}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <DeleteConfirmationModal
          confirmDelete={confirmDelete}
          cancelDelete={handleCancelDelete}
        />
      )}

      {/* Search Assets */}
      <div className="search-container mb-4">
        <input
          type="text"
          placeholder="Search assets by symbol or name..."
          value={searchQueryAssets}
          onChange={(e) => setSearchQueryAssets(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchAssets}>
          Search Assets
        </button>
      </div>

      {/* Assets Section */}
      <div className="category-sector-box">
        <h3>Assets</h3>
        <table className="table mt-2">
          <thead className="table-dark">
            <tr>
              <th>Category</th>
              <th>Sector</th>
              <th>Symbol</th>
              <th>Last Price (LTP)</th>
              <th>Point Change</th>
              <th>Percent Change</th>
            </tr>
          </thead>
          <tbody>
            {currentAssets.map((asset, index) => (
              <tr key={index} onClick={() => handleViewDetail(asset)}>
                <td>{asset.name}</td>
                <td>{asset.sector}</td>
                <td>{asset.symbol}</td>
                <td>{asset.ltp}</td>
                <td>{asset.pointchange}</td>
                <td>{asset.percentchange}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          {renderAssetPaginationButtons()}
        </div>
      </div>

      {/* Dialog Box */}
      {selectedItem && (
        <div className="dialog-container">
          <div className="dialog-box">
            <button className="edit-button" onClick={() => handleEditUser(selectedItem._id)}>
              Edit
            </button>
            <button className="close-button" onClick={handleCloseDialog}>
              Close
            </button>
            <h3>Details</h3>
            {/* Render details in a more readable format */}
            <div>
              {Object.keys(selectedItem).map((key) => (
                <div key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {selectedItem[key]}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" />
    </div>
  );

}

export default AdminDashboard;
