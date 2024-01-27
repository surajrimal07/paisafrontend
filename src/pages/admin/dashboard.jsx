import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaCubes, FaDollarSign, FaExchangeAlt, FaSortDown, FaSortUp, FaTimes, FaUser, FaUsersCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer, toast } from 'react-toastify';
import { deleteUser, getAllAssets, getAllUsers, getCommo, getMetals } from '../../apis/api';
import './dashboard.css';
import UserDialogBox from './dialogbox_admin.jsx';
import EditUserDialogBox from './editingbox_admin.jsx';

function AdminDashboard() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [metals, setMetals] = useState([]);
  //const [currentPage, setCurrentPage] = useState({});
  const [currentUsersPage, setCurrentUsersPage] = useState(1);
  const [currentAssetsPage, setCurrentAssetsPage] = useState(1);
  const [currentCommoditiesPage, setCurrentCommoditiesPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [searchQueryUsers, setSearchQueryUsers] = useState('');
  const [searchQueryAssets, setSearchQueryAssets] = useState('');
  const [searchQueryCommodities, setSearchQueryCommodities] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [isEditingUser, setEditingUser] = useState(null);
  const [isEditingDialogOpen, setEditingDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrderUsers, setSortOrderUsers] = useState({ column: null, ascending: true });
  const [sortOrderAssets, setSortOrderAssets] = useState({ column: null, ascending: true });
  const [sortOrderCommodities, setSortOrderCommodities] = useState({ column: null, ascending: true });


  const totalUsers = users.length;
  const totalAssets = assets.length;
  const totalAmount = users.reduce((total, user) => total + user.userAmount, 0);
  const totalAdmins = users.filter(user => user.isAdmin).length;
  const totalCommodity = commodities.length;
  const totalMetals = metals.length;

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

      const metalsResponse = await getMetals();
      if (metalsResponse.status === 200 && Array.isArray(metalsResponse.data.metalPrices)) {
        const jsonDecode = JSON.stringify(metalsResponse.data.metalPrices);
        localStorage.setItem('Metals', jsonDecode);
        setMetals(metalsResponse.data.metalPrices);
      } else {
        console.error('Error fetching metals:', metalsResponse.error);
      }

      const commodityResponse = await getCommo();
      if (commodityResponse.status === 200 && Array.isArray(commodityResponse.data.data)) {
        const jsonDecode = JSON.stringify(commodityResponse.data.data);
        localStorage.setItem('Commodities', jsonDecode);
        setCommodities(commodityResponse.data.data);
      } else {
        console.error('Error fetching commodities:', commodityResponse.error);
      }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    fetchData();
  }, []);

  const renderSortIcon = (column, sortOrder) => {
    if (sortOrder.column === column) {
      return sortOrder.ascending ? <FaSortUp /> : <FaSortDown />;
    }
    return null;
  };

  const handleSortUsers = (column) => {
    const isAscending = sortOrderUsers.column === column ? !sortOrderUsers.ascending : true;
    setSortOrderUsers({ column, ascending: isAscending });

    const sortedUsers = [...users].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return isAscending ? (valueA > valueB ? 1 : -1) : valueA > valueB ? -1 : 1;
      }
    });

    setUsers(sortedUsers);
  };

  const handleSortAssets = (column) => {
    const isAscending = sortOrderAssets.column === column ? !sortOrderAssets.ascending : true;
    setSortOrderAssets({ column, ascending: isAscending });

    const sortOrderAsset = [...assets].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return isAscending ? (valueA > valueB ? 1 : -1) : valueA > valueB ? -1 : 1;
      }
    });
    setAssets(sortOrderAsset);
  };

  const handleSortCommodities = (column) => {
    const isAscending = sortOrderCommodities.column === column ? !sortOrderCommodities.ascending : true;
    setSortOrderCommodities({ column, ascending: isAscending });

    const sortOrderCommodity = [...commodities].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return isAscending ? (valueA > valueB ? 1 : -1) : valueA > valueB ? -1 : 1;
      }
    });
    setCommodities(sortOrderCommodity);
  }

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditingDialogOpen(true);
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
      const response = await deleteUser(deletingUser);

      if (response.status === 200 || response.status === 204) {
        toast.success('User deleted successfully');
        setUsers(users.filter((user) => user.email !== deletingUser));
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('An error occurred while deleting user');
    } finally {
      setDeletingUser(null);
    }
  };

  const EditUserDialogBoxWithOverlay = ({ user, onSave, onCancel }) => (
    <div className="edit-dialog-overlay">
      <EditUserDialogBox user={user} onSave={onSave} onCancel={onCancel} />
    </div>
  );

  const handleCancelEdit = () => {
    setEditingDialogOpen(false);
    setEditingUser(null);
    setSelectedItem(null);
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

    const buttonStyle = {
      color: 'white',
      backgroundColor: '#858585',
      border: 'none',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
    };

    const activeButtonStyle = {
      backgroundColor: '#0056b3',
      color: 'white',
    };

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentUsersPage(i)}
          style={{ ...buttonStyle, ...(currentUsersPage === i ? activeButtonStyle : {}) }}
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

  const indexOfLastCommodity = currentCommoditiesPage * itemsPerPage;
  const indexOfFirstCommodity = indexOfLastCommodity - itemsPerPage;
  const currentCommodity = commodities.slice(indexOfFirstCommodity, indexOfLastCommodity);

  const totalAssetsPageCount = Math.ceil(assets.length / itemsPerPage);
  const totalCommoditiesPageCount = Math.ceil(commodities.length / itemsPerPage);

  const renderAssetPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentAssetsPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalAssetsPageCount, startPage + maxButtonsToShow - 1);
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);

    const buttonStyle = {
      color: 'white',
      backgroundColor: '#858585',
      border: 'none',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
    };

    const activeButtonStyle = {
      backgroundColor: '#0056b3',
      color: 'white',
    };

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentAssetsPage(i)}
          style={{ ...buttonStyle, ...(currentAssetsPage === i ? activeButtonStyle : {}) }}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const renderCommodityPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentCommoditiesPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalCommoditiesPageCount, startPage + maxButtonsToShow - 1);
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);

    const buttonStyle = {
      color: 'white',
      backgroundColor: '#858585',
      border: 'none',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
    };

    const activeButtonStyle = {
      backgroundColor: '#0056b3',
      color: 'white',
    };

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentCommoditiesPage(i)}
          style={{ ...buttonStyle, ...(currentCommoditiesPage === i ? activeButtonStyle : {}) }}
        >
          {i}
        </button>
      );
    }

    return buttons;
  }

  const handleSaveEdit = (editedUser) => {

    console.log('Saving changes:', editedUser);

  };

  const handleClearSearchUsers = () => {
    setSearchQueryUsers('');
    setUsers(JSON.parse(localStorage.getItem('Users')));
  };

  const handleClearSearchAssets = () => {
    setSearchQueryAssets('');
    setAssets(JSON.parse(localStorage.getItem('Assets')));
  };

  const handleClearSearchCommodity = () => {
    setSearchQueryCommodities('');
    setCommodities  (JSON.parse(localStorage.getItem('Commodities')));
  };

  const handleSearchUsers = () => {
    const filteredUsers = users.filter((user) => {
      const lowerCaseQuery = searchQueryUsers.toLowerCase();
      return (
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        (user.phone && user.phone.toString().includes(lowerCaseQuery)) ||
        user.token.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setUsers(filteredUsers);
    setCurrentUsersPage(1);
  };

  const handleSearchAssets = () => {
    const filteredAssets = assets.filter(
      (asset) =>
        asset.symbol.toLowerCase().includes(searchQueryAssets.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchQueryAssets.toLowerCase())
    );
    setAssets(filteredAssets);
    setCurrentAssetsPage(1);
  };

  const handleSearchCommodities = () => {
    const filteredCommodities = commodities.filter((commodity) => {

      const nameMatch =
        commodity.name && commodity.name.toLowerCase().includes(searchQueryCommodities.toLowerCase());
      return nameMatch;
    });

    setCommodities(filteredCommodities);
    setCurrentCommoditiesPage(1);
  };


  const handleCloseDialog = () => {
    setSelectedItem(null);
  };


  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  };

  const InfoCard = ({ icon, value, label }) => {
    return (
      <div className="info-card-container">
        <div className="info-card">
          <div className="info-item">
            {icon && <div className="info-icon">{icon}</div>}
            <div className="info-text">
              <div className="info-value">{value}</div>
              <div className="info-label">{label}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="user-dashboard">
      <h2>Admin Panel</h2>

      <div className="user-info-cards">
      <InfoCard icon={<FaUser />} value={totalUsers} label="Total Users" />
      <InfoCard icon={<FaCubes />} value={totalAssets} label="Total Assets" />
      <InfoCard icon={<FaCubes />} value={totalCommodity} label="Total Commodities" />
      <InfoCard icon={<FaCubes />} value={totalMetals} label="Total Metals" />
      <InfoCard icon={<FaDollarSign />} value={totalAmount} label="Total Amount" />
      <InfoCard icon={<FaUsersCog />} value={totalAdmins} label="Total Admins" />

      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search users by name, email, phone, or token..."
          value={searchQueryUsers}
          onChange={(e) => setSearchQueryUsers(e.target.value)}
          style={{ outline: 'none' }}
        />
        {searchQueryUsers && (
          <button className="clear-search-button" onClick={handleClearSearchUsers}>
            <FaTimes />
          </button>
        )}
        <button className="search-button" onClick={handleSearchUsers}>
          Search Users
        </button>
      </div>

      {/* Users Section */}
      <div className="category-sector-box users-section">
        <h3>Users</h3>
        <table className="table mt-2">
          <thead className="table-light">
            <tr>
              <th>Picture</th>

              <th onClick={() => handleSortUsers('name')}>
              Name {renderSortIcon('name', sortOrderUsers)}
        </th>
        <th onClick={() => handleSortUsers('email')}>
        Email {renderSortIcon('email', sortOrderUsers)}
        </th>
        <th onClick={() => handleSortUsers('phone')}>
        Phone {renderSortIcon('phone', sortOrderUsers)}
        </th>
        <th onClick={() => handleSortUsers('isAdmin')}>
        Admin {renderSortIcon('isAdmin', sortOrderUsers)}
        </th>
        <th onClick={() => handleSortUsers('userAmount')}>
        Balance {renderSortIcon('userAmount', sortOrderUsers)}
        </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index}>
                <td><img src={user.dpImage} alt="user" className='user-image'/></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{JSON.stringify(user.isAdmin)}</td>
                <td>{user.userAmount}</td>
                <td>
                  <button className="view-buttons" onClick={() => handleViewDetail(user)}>
                    View
                  </button>
                  <button
                    className="edit-buttons"
                    onClick={() => handleEditUser(user)}

                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteUser(user.email)}
                    disabled={isEditingUser}
                  >
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
          style={{ outline: 'none' }}
        />
                {searchQueryAssets && (
          <button className="clear-search-button" onClick={handleClearSearchAssets}>
            <FaTimes />
          </button>
        )}
        <button className="search-button" onClick={handleSearchAssets}>
          Search Assets
        </button>
      </div>

      {/* Assets Section */}
      <div className="category-sector-box users-section">
        <h3>Assets</h3>
        <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table className="table mt-2">
            <thead className="table-light" >
              <tr>
                <th>Symbol</th>
                <th onClick={() => handleSortAssets('name')}>
                  Name {renderSortIcon('name', sortOrderAssets)}
                </th>
                <th onClick={() => handleSortAssets('sector')}>
                  Sector {renderSortIcon('sector', sortOrderAssets)}
                </th>
                <th onClick={() => handleSortAssets('symbol')}>
                  Symbol {renderSortIcon('symbol', sortOrderAssets)}
                </th>
                <th onClick={() => handleSortAssets('ltp')}>
                  LTP {renderSortIcon('ltp', sortOrderAssets)}
                </th>
                <th onClick={() => handleSortAssets('pointchange')}>
                  Point Change {renderSortIcon('pointchange', sortOrderAssets)}
                </th>
                <th onClick={() => handleSortAssets('percentchange')}>
                  Percent Change {renderSortIcon('percentchange', sortOrderAssets)}
                </th>
              </tr>
            </thead>
            <tbody>
  {currentAssets.map((asset, index) => (
    <tr key={index}>
      <td>
      <Link to={`/stockdetailview?symbol=${asset.symbol}`} style={{ color: 'black' }}>
          {asset.symbol}
        </Link>
      </td>
      <td>{asset.name}</td>
      <td>{asset.sector}</td>
      <td>{asset.symbol}</td>
      <td>{asset.ltp}</td>
      <td>{asset.pointchange}</td>
      <td>
      <td>
  <span style={{ color: asset.percentchange > 0 ? '#15AD4C' : (asset.percentchange < 0 ? '#B91212' : 'black') }}>
    {asset.percentchange}%
    {(asset.percentchange !== 0 || asset.percentchange === 0) && (
      <>
        {asset.percentchange > 0 && <FaArrowUp style={{ color: '#15AD4C', marginLeft: '5px' }} />}
        {asset.percentchange < 0 && <FaArrowDown style={{ color: '#B91212', marginLeft: '5px' }} />}
        {asset.percentchange === 0 && <FaExchangeAlt style={{ color: 'black', marginLeft: '5px' }} />}
      </>
    )}
  </span>
</td>

</td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
        <div className="pagination-container">
          {renderAssetPaginationButtons()}
        </div>
      </div>

      {/* Search Commodities */}
      <div className="search-container mb-4">
        <input
          type="text"
          placeholder="Search commodities by symbol or name..."
          value={searchQueryCommodities}
          onChange={(e) => setSearchQueryCommodities(e.target.value)}
          style={{ outline: 'none' }}  //remove the blue outline on focus
        />
      {searchQueryCommodities && (
          <button className="clear-search-button" onClick={handleClearSearchCommodity}>
            <FaTimes />
          </button>
        )}
        <button className="search-button" onClick={handleSearchCommodities}>
          Search Commodities
        </button>
      </div>

      {/* Commodities Section */}
      <div className="category-sector-box users-section">
        <h3>Commodities</h3>
        <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <table className="table mt-2">
          <thead className="table-light">
            <tr>
              <th>Symbol</th>

              <th>
              LTP
        </th>
        <th onClick={() => handleSortCommodities('ltp')}>
        Unit {renderSortIcon('ltp', sortOrderCommodities)}
        </th>
            <th >
            Category
            </th>
            </tr>
          </thead>
          <tbody>
            {currentCommodity.map((currentCommodity, index) => (
              <tr key={index} onClick={() => handleViewDetail(currentCommodity)}>
                <td>{currentCommodity.symbol}</td>
                <td>{currentCommodity.ltp}</td>
                <td>{currentCommodity.unit}</td>
                <td>{currentCommodity.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="pagination-container">
          {renderCommodityPaginationButtons()}
        </div>
      </div>


      {/* Metals Section*/}
      <div className="search-container mb-4"></div>
      <div className="category-sector-box users-section">
        <h3>Metals</h3>
        <table className="table mt-2">
          <thead className="table-light">
            <tr>
              <th>Name</th>

              <th>
              LTP
        </th>
        <th>
        Unit
        </th>

            <th >
            Category
            </th>
            </tr>
          </thead>
          <tbody>
            {metals.map((metal, index) => (
              <tr key={index} onClick={() => handleViewDetail(metal)}>
                <td>{metal.symbol}</td>
                <td>{metal.ltp}</td>
                <td>{metal.unit}</td>
                <td>{metal.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
        </div>
      </div>



      {/* Dialog Boxes */}
      {selectedItem && (
        <UserDialogBox
          user={selectedItem}
          onEdit={handleEditUser}
          onClose={handleCloseDialog}
          isEditing={isEditingUser}
        />
      )}

{isEditingUser && isEditingDialogOpen && (
  <EditUserDialogBoxWithOverlay user={isEditingUser} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
)}

      <ToastContainer position="top-right" />
      <ScrollToTop smooth />
    </div>
  );
}

export default AdminDashboard;
