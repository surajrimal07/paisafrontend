import React, { useEffect, useState } from 'react';
import { getAllAssets, getAllUsers } from '../../apis/api';
import './dashboard.css';

function AdminDashboard() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState({});
  const [currentUsersPage, setCurrentUsersPage] = useState(1);
  const [currentAssetsPage, setCurrentAssetsPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15)
  const [searchQuery, setSearchQuery] = useState('');;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetResponse = await getAllAssets();
        if (assetResponse.status === 200 && Array.isArray(assetResponse.data.data)) {
          setAssets(assetResponse.data.data);
        } else {
          console.error('Error fetching assets:', assetResponse.error);
        }

        const userResponse = await getAllUsers();
        if (userResponse.status === 200 && Array.isArray(userResponse.data)) {
          setUsers(userResponse.data);
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
    // Implement delete user functionality
    console.log(`Delete user with ID ${userId}`);
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

  const handleSearch = () => {
    // Filter assets based on search query
    const filteredAssets = assets.filter(
      (asset) =>
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Set the filtered assets
    setAssets(filteredAssets);

    // Reset pagination to the first page
    setCurrentPage({});

    // Filter users based on search query
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Set the filtered users
    setUsers(filteredUsers);

    // Reset user pagination to the first page
    setCurrentUsersPage(1);
  };

  return (
    <div className="m-4">
      <h2>Admin Dashboard</h2>


    {/* Search */}
    <div className="search-container mb-4">
      <input
        type="text"
        placeholder="Enter symbol, name, or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditUser(user._id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          {renderUserPaginationButtons()}
        </div>
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
              <tr key={index}>
                <td>{asset.name}</td>
                <td>{asset.sector}</td>
                <td>{asset.symbol}</td>
                <td>{asset.ltp}</td>
                <td>{asset.pointchange}</td>
                <td>{asset.percentchange}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          {renderAssetPaginationButtons()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
