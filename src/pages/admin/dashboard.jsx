/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCubes,
  FaDollarSign,
  FaExchangeAlt,
  FaSortDown,
  FaSortUp,
  FaTimes,
  FaUser,
  FaUsersCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import {
  deleteUser,
  getAllAssets,
  getAllPortfolios,
  getAllUsers,
  getCommo,
  getMetals,
} from "../../apis/api";
import "./dashboard.css";
import UserDialogBox from "./dialogbox_admin.jsx";
import EditUserDialogBox from "./editingbox_admin.jsx";

function AdminDashboard() {
  // const [assets, setAssets] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [commodities, setCommodities] = useState([]);
  // const [metals, setMetals] = useState([]);
  // const [portfolios, setPortfolios] = useState([]);

  const [data, setData] = useState({
    assets: [],
    users: [],
    portfolios: [],
    metals: [],
    commodities: [],
  });

  const [currentUsersPage, setCurrentUsersPage] = useState(1);
  const [currentAssetsPage, setCurrentAssetsPage] = useState(1);

  const [currentCommoditiesPage, setCurrentCommoditiesPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchQueryUsers, setSearchQueryUsers] = useState("");
  const [searchQueryAssets, setSearchQueryAssets] = useState("");
  const [searchQueryCommodities, setSearchQueryCommodities] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [isEditingUser, setEditingUser] = useState(null);
  const [isEditingDialogOpen, setEditingDialogOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrderUsers, setSortOrderUsers] = useState({
    column: null,
    ascending: true,
  });
  const [sortOrderAssets, setSortOrderAssets] = useState({
    column: null,
    ascending: true,
  });
  const [sortOrderCommodities, setSortOrderCommodities] = useState({
    column: null,
    ascending: true,
  });

  const totalUsers = data.users.length;
  const totalAssets = data.assets.length;
  const totalAmount = data.users.reduce(
    (total, user) => total + user.userAmount,
    0
  );
  const totalAdmins = data.users.filter((user) => user.isAdmin).length;
  const totalCommodity = data.commodities.length;
  const totalMetals = data.metals.length;

  // const fetchData = async () => {
  //   try {
  //     const assetResponse = await getAllAssets();
  //     if (
  //       assetResponse.status === 200 &&
  //       Array.isArray(assetResponse.data.data.stockDataWithoutName)
  //     ) {
  //       const jsonDecode = JSON.stringify(
  //         assetResponse.data.data.stockDataWithoutName
  //       );
  //       localStorage.setItem("Assets", jsonDecode);
  //       setAssets(assetResponse.data.data.stockDataWithoutName);
  //     } else {
  //       if (assetResponse.error) {
  //         toast.error(`Error fetching assets: ${assetResponse.error}`);
  //       } else {
  //         toast.error("Error fetching assets. Please try again later.");
  //       }
  //     }

  //     const userResponse = await getAllUsers();
  //     if (
  //       userResponse.status === 200 &&
  //       Array.isArray(userResponse.data.data)
  //     ) {
  //       const jsonDecode = JSON.stringify(userResponse.data.data);
  //       secureLocalStorage.setItem("Users", jsonDecode);
  //       setUsers(userResponse.data.data);
  //     } else {
  //       toast.error("Error fetching users");
  //       console.error("Error fetching users:", userResponse.error);
  //     }

  //     const portfolioRespose = await getAllPortfolios();
  //     if (
  //       portfolioRespose.status === 200 &&
  //       Array.isArray(portfolioRespose.data.data)
  //     ) {
  //       const jsonDecode = JSON.stringify(portfolioRespose.data.data);
  //       secureLocalStorage.setItem("Portfolios", jsonDecode);

  //       setPortfolios(portfolioRespose.data.data);

  //     } else {
  //       toast.error("Error fetching portfolios");
  //     }

  //     const metalsResponse = await getMetals();
  //     if (
  //       metalsResponse.status === 200 &&
  //       Array.isArray(metalsResponse.data.metalData)
  //     ) {
  //       const jsonDecode = JSON.stringify(metalsResponse.data.metalData);
  //       localStorage.setItem("Metals", jsonDecode);
  //       setMetals(metalsResponse.data.metalData);
  //     } else {
  //       toast.error("Error fetching metals");
  //       console.error("Error fetching metals:", metalsResponse.error);
  //     }

  //     const commodityResponse = await getCommo();
  //     if (
  //       commodityResponse.status === 200 &&
  //       Array.isArray(commodityResponse.data.data)
  //     ) {
  //       const jsonDecode = JSON.stringify(commodityResponse.data.data);
  //       localStorage.setItem("Commodities", jsonDecode);
  //       setCommodities(commodityResponse.data.data);
  //     } else {
  //       toast.error("Error fetching commodities");
  //       console.error("Error fetching commodities:", commodityResponse.error);
  //     }

  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = useCallback(async () => {
    try {
      const [
        assetResponse,
        userResponse,
        portfolioResponse,
        metalsResponse,
        commodityResponse,
      ] = await Promise.all([
        getAllAssets(),
        getAllUsers(),
        getAllPortfolios(),
        getMetals(),
        getCommo(),
      ]);

      let newState = {};

      if (
        assetResponse.status === 200 &&
        Array.isArray(assetResponse.data.data.stockDataWithoutName)
      ) {
        const jsonDecode = JSON.stringify(
          assetResponse.data.data.stockDataWithoutName
        );
        localStorage.setItem("Assets", jsonDecode);
        newState.assets = assetResponse.data.data.stockDataWithoutName;
      } else {
        if (assetResponse.error) {
          toast.error(`Error fetching assets: ${assetResponse.error}`);
          console.error("Error fetching assets:", assetResponse.error);
        } else {
          toast.error("Error fetching assets. Please try again later.");
          console.error("Error fetching assets: Undefined error.");
        }
      }

      if (
        userResponse.status === 200 &&
        Array.isArray(userResponse.data.data)
      ) {
        const jsonDecode = JSON.stringify(userResponse.data.data);
        secureLocalStorage.setItem("Users", jsonDecode);
        newState.users = userResponse.data.data;
      }

      if (
        portfolioResponse.status === 200 &&
        Array.isArray(portfolioResponse.data.data)
      ) {
        const jsonDecode = JSON.stringify(portfolioResponse.data.data);
        secureLocalStorage.setItem("Portfolios", jsonDecode);
        newState.portfolios = portfolioResponse.data.data;
      }

      if (
        metalsResponse.status === 200 &&
        Array.isArray(metalsResponse.data.metalData)
      ) {
        const jsonDecode = JSON.stringify(metalsResponse.data.metalData);
        localStorage.setItem("Metals", jsonDecode);
        newState.metals = metalsResponse.data.metalData;
      }

      if (
        commodityResponse.status === 200 &&
        Array.isArray(commodityResponse.data.data)
      ) {
        const jsonDecode = JSON.stringify(commodityResponse.data.data);
        localStorage.setItem("Commodities", jsonDecode);
        newState.commodities = commodityResponse.data.data;
      }

      setData(newState);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderSortIcon = (column, sortOrder) => {
    if (sortOrder.column === column) {
      return sortOrder.ascending ? <FaSortUp /> : <FaSortDown />;
    }
    return null;
  };

  const handleSortUsers = (column) => {
    const isAscending =
      sortOrderUsers.column === column ? !sortOrderUsers.ascending : true;
    setSortOrderUsers({ column, ascending: isAscending });

    const sortedUsers = [...data.users].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return isAscending
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return isAscending
          ? valueA > valueB
            ? 1
            : -1
          : valueA > valueB
          ? -1
          : 1;
      }
    });

    data.users = sortedUsers;
    //setUsers(sortedUsers);
  };

  const handleSortAssets = (column) => {
    const isAscending =
      sortOrderAssets.column === column ? !sortOrderAssets.ascending : true;
    setSortOrderAssets({ column, ascending: isAscending });

    const sortOrderAsset = [...data.assets].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return isAscending
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return isAscending
          ? valueA > valueB
            ? 1
            : -1
          : valueA > valueB
          ? -1
          : 1;
      }
    });
    data.assets = sortOrderAsset;
    //setAssets(sortOrderAsset);
  };

  const handleSortCommodities = (column) => {
    const isAscending =
      sortOrderCommodities.column === column
        ? !sortOrderCommodities.ascending
        : true;
    setSortOrderCommodities({ column, ascending: isAscending });

    const sortOrderCommodity = [...data.commodities].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return isAscending
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return isAscending
          ? valueA > valueB
            ? 1
            : -1
          : valueA > valueB
          ? -1
          : 1;
      }
    });
    data.commodities = sortOrderCommodity;
    // setCommodities(sortOrderCommodity);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditingDialogOpen(true);
  };

  const handleDeleteUser = (userId) => {
    setDeletingUser(userId);
    setShowDeleteConfirmation(true);
  };

  function DeleteConfirmationModal({ confirmDelete, cancelDelete }) {
    return (
      <div className="modal-container">
        <div className="modal-box delete-confirmation-modal">
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
    setShowDeleteConfirmation(false);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteUser(deletingUser);

      if (response.status === 200 || response.status === 204) {
        toast.success("User deleted successfully");

        data.users = data.users.filter((user) => user.email !== deletingUser);
        //setUsers(users.filter((user) => user.email !== deletingUser));
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("An error occurred while deleting user");
    } finally {
      setDeletingUser(null);
      setShowDeleteConfirmation(false);
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
    fetchData();
  };

  const handleViewDetail = (item) => {
    setSelectedItem(item);
  };

  const indexOfLastUser = currentUsersPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = data.users.slice(indexOfFirstUser, indexOfLastUser);

  const totalUsersPageCount = Math.ceil(data.users.length / itemsPerPage);

  const renderUserPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    let startPage = Math.max(
      1,
      currentUsersPage - Math.floor(maxButtonsToShow / 2)
    );
    let endPage = Math.min(
      totalUsersPageCount,
      startPage + maxButtonsToShow - 1
    );
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);

    const buttonStyle = {
      color: "white",
      backgroundColor: "#858585",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
    };

    const activeButtonStyle = {
      backgroundColor: "#0056b3",
      color: "white",
    };

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentUsersPage(i)}
          style={{
            ...buttonStyle,
            ...(currentUsersPage === i ? activeButtonStyle : {}),
          }}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const indexOfLastAsset = currentAssetsPage * itemsPerPage;
  const indexOfFirstAsset = indexOfLastAsset - itemsPerPage;
  const currentAssets = data.assets.slice(indexOfFirstAsset, indexOfLastAsset);

  const indexOfLastCommodity = currentCommoditiesPage * itemsPerPage;
  const indexOfFirstCommodity = indexOfLastCommodity - itemsPerPage;
  const currentCommodity = data.commodities.slice(
    indexOfFirstCommodity,
    indexOfLastCommodity
  );

  const totalAssetsPageCount = Math.ceil(data.assets.length / itemsPerPage);
  const totalCommoditiesPageCount = Math.ceil(
    data.commodities.length / itemsPerPage
  );

  const totalPortfolioCount = Math.ceil(data.portfolios.length);

  const totalPortfolioValue = data.portfolios.reduce((total, portfolio) => {
    const portfolioValue = portfolio.portfoliovalue;

    const validValue = isNaN(portfolioValue) ? 0 : portfolioValue;

    return total + validValue;
  }, 0);

  const totalPortfolioCost = data.portfolios.reduce((total, portfolio) => {
    const portfolioCost = portfolio.portfoliocost;

    const validCost = isNaN(portfolioCost) ? 0 : portfolioCost;

    return total + validCost;
  }, 0);

  const totalReturns = totalPortfolioValue - totalPortfolioCost;

  const totalAveragePortfolioReturnsPercentage = (
    (totalReturns / totalPortfolioCost / totalPortfolioCount) *
    100
  ).toFixed(2);
  const totalAveragePortfolioReturns = (
    totalReturns / totalPortfolioCount
  ).toFixed(2);

  const renderAssetPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    let startPage = Math.max(
      1,
      currentAssetsPage - Math.floor(maxButtonsToShow / 2)
    );
    let endPage = Math.min(
      totalAssetsPageCount,
      startPage + maxButtonsToShow - 1
    );
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);

    const buttonStyle = {
      color: "white",
      backgroundColor: "#858585",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
    };

    const activeButtonStyle = {
      backgroundColor: "#0056b3",
      color: "white",
    };

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentAssetsPage(i)}
          style={{
            ...buttonStyle,
            ...(currentAssetsPage === i ? activeButtonStyle : {}),
          }}
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
    let startPage = Math.max(
      1,
      currentCommoditiesPage - Math.floor(maxButtonsToShow / 2)
    );
    let endPage = Math.min(
      totalCommoditiesPageCount,
      startPage + maxButtonsToShow - 1
    );
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);

    const buttonStyle = {
      color: "white",
      backgroundColor: "#858585",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
    };

    const activeButtonStyle = {
      backgroundColor: "#0056b3",
      color: "white",
    };

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentCommoditiesPage(i)}
          style={{
            ...buttonStyle,
            ...(currentCommoditiesPage === i ? activeButtonStyle : {}),
          }}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const handleClearSearchUsers = () => {
    setSearchQueryUsers("");
    data.users = JSON.parse(secureLocalStorage.getItem("Users"));
    //setUsers(JSON.parse(secureLocalStorage.getItem("Users")));
  };

  const handleClearSearchAssets = () => {
    setSearchQueryAssets("");
    data.assets = JSON.parse(localStorage.getItem("Assets"));
    //setAssets(JSON.parse(localStorage.getItem("Assets")));
  };

  const handleClearSearchCommodity = () => {
    setSearchQueryCommodities("");
    data.commodities = JSON.parse(localStorage.getItem("Commodities"));
    //setCommodities(JSON.parse(localStorage.getItem("Commodities")));
  };

  const handleSearchUsers = () => {
    const filteredUsers = data.users.filter((user) => {
      const lowerCaseQuery = searchQueryUsers.toLowerCase();
      return (
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        (user.phone && user.phone.toString().includes(lowerCaseQuery)) ||
        user.token.toLowerCase().includes(lowerCaseQuery)
      );
    });
    data.users = filteredUsers;
    //setUsers(filteredUsers);
    setCurrentUsersPage(1);
  };

  const handleSearchAssets = () => {
    const filteredAssets = data.assets.filter(
      (asset) =>
        asset.symbol.toLowerCase().includes(searchQueryAssets.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchQueryAssets.toLowerCase())
    );
    data.assets = filteredAssets;
    //setAssets(filteredAssets);
    setCurrentAssetsPage(1);
  };

  const handleSearchCommodities = () => {
    const filteredCommodities = data.commodities.filter((commodity) => {
      const nameMatch =
        commodity.name &&
        commodity.name
          .toLowerCase()
          .includes(searchQueryCommodities.toLowerCase());
      return nameMatch;
    });

    data.commodities = filteredCommodities;
    // setCommodities(filteredCommodities);
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
  }

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

  // const PortfolioCard = ({ portfolioData }) => {
  //   const { portfoliocount, totalvalue, totalcost, totalreturns, totalreturnspercentage, averageReturns } = portfolioData;

  //   return (
  //     <div className="portfolio-card">
  //       <h2>Portfolios Panel</h2>
  //       <div className="portfolio-info">
  //         <p>Total Portfolios: {portfoliocount}</p>
  //         <p>Total Portfolio Value: Rs {totalvalue}</p>
  //         <p>Total Portfolio Cost: Rs {totalcost}</p>
  //         <p>Total Portfolio Returns: Rs {totalreturns}</p>

  //         <p>Average Portfolio Returns: Rs {averageReturns}</p>
  //         <p>Total Portfolio Returns Percentage: {totalreturnspercentage}%</p>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="user-dashboard">
      <h2>Admin Panel</h2>

      <div className="user-info-cards">
        <InfoCard icon={<FaUser />} value={totalUsers} label="Total Users" />
        <InfoCard icon={<FaCubes />} value={totalAssets} label="Total Assets" />
        <InfoCard
          icon={<FaCubes />}
          value={totalCommodity}
          label="Total Commodities"
        />
        <InfoCard icon={<FaCubes />} value={totalMetals} label="Total Metals" />
        <InfoCard
          icon={<FaDollarSign />}
          value={totalAmount}
          label="Total Amount"
        />
        <InfoCard
          icon={<FaUsersCog />}
          value={totalAdmins}
          label="Total Admins"
        />
      </div>

      <div className="user-info-cards">
        <InfoCard
          icon={<FaUser />}
          value={totalPortfolioCount}
          label="Total Portfolios"
        />
        <InfoCard
          icon={<FaCubes />}
          value={totalPortfolioValue}
          label="Total Values"
        />
        <InfoCard
          icon={<FaCubes />}
          value={totalPortfolioCost}
          label="Total Cost"
        />
        <InfoCard
          icon={<FaCubes />}
          value={totalReturns.toFixed(2)}
          label="Total Returns"
        />
        <InfoCard
          icon={<FaDollarSign />}
          value={totalAveragePortfolioReturns}
          label="Average Returns"
        />
        <InfoCard
          icon={<FaUsersCog />}
          value={totalAveragePortfolioReturnsPercentage}
          label="Average Returns %"
        />
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search users by name, email, phone, or token..."
          value={searchQueryUsers}
          onChange={(e) => setSearchQueryUsers(e.target.value)}
          style={{ outline: "none" }}
        />
        {searchQueryUsers && (
          <button
            className="clear-search-button"
            onClick={handleClearSearchUsers}
          >
            <FaTimes />
          </button>
        )}
        <button className="search-button" onClick={handleSearchUsers}>
          Search Users
        </button>
      </div>

      <div className="category-sector-box users-section">
        <h3>Users</h3>
        <table className="table mt-2">
          <thead className="table-light">
            <tr>
              <th>Picture</th>

              <th onClick={() => handleSortUsers("name")}>
                Name {renderSortIcon("name", sortOrderUsers)}
              </th>
              <th onClick={() => handleSortUsers("email")}>
                Email {renderSortIcon("email", sortOrderUsers)}
              </th>
              <th onClick={() => handleSortUsers("phone")}>
                Phone {renderSortIcon("phone", sortOrderUsers)}
              </th>
              <th onClick={() => handleSortUsers("isAdmin")}>
                Admin {renderSortIcon("isAdmin", sortOrderUsers)}
              </th>
              <th onClick={() => handleSortUsers("userAmount")}>
                Balance {renderSortIcon("userAmount", sortOrderUsers)}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  <img src={user.dpImage} alt="user" className="user-image" />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{JSON.stringify(user.isAdmin)}</td>
                <td>{user.userAmount}</td>
                <td>
                  <button
                    className="view-buttons"
                    onClick={() => handleViewDetail(user)}
                  >
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

      {deletingUser && (
        <DeleteConfirmationModal
          confirmDelete={confirmDelete}
          cancelDelete={handleCancelDelete}
        />
      )}

      <div className="search-container mb-4">
        <input
          type="text"
          placeholder="Search assets by symbol or name..."
          value={searchQueryAssets}
          onChange={(e) => setSearchQueryAssets(e.target.value)}
          style={{ outline: "none" }}
        />
        {searchQueryAssets && (
          <button
            className="clear-search-button"
            onClick={handleClearSearchAssets}
          >
            <FaTimes />
          </button>
        )}
        <button className="search-button" onClick={handleSearchAssets}>
          Search Assets
        </button>
      </div>

      <div className="category-sector-box users-section">
        <h3>Assets</h3>
        <div
          className="table-responsive"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <table className="table mt-2">
            <thead className="table-light">
              <tr>
                <th onClick={() => handleSortAssets("symbol")}>
                  Symbol {renderSortIcon("symbol", sortOrderAssets)}
                </th>
                <th onClick={() => handleSortAssets("name")}>
                  Name {renderSortIcon("name", sortOrderAssets)}
                </th>
                <th onClick={() => handleSortAssets("volume")}>
                  volume {renderSortIcon("volume", sortOrderAssets)}
                </th>
                <th onClick={() => handleSortAssets("ltp")}>
                  LTP {renderSortIcon("ltp", sortOrderAssets)}
                </th>
                <th onClick={() => handleSortAssets("previousclose")}>
                  Previous Close{" "}
                  {renderSortIcon("previousclose", sortOrderAssets)}
                </th>
                <th onClick={() => handleSortAssets("pointchange")}>
                  Point Change {renderSortIcon("pointchange", sortOrderAssets)}
                </th>
                <th onClick={() => handleSortAssets("percentchange")}>
                  Percent Change{" "}
                  {renderSortIcon("percentchange", sortOrderAssets)}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentAssets.map((asset, index) => (
                <tr key={index}>
                  <td>
                    <Link
                      to={`/stockdetailview?symbol=${asset.symbol}`}
                      style={{ color: "black" }}
                    >
                      {asset.symbol}
                    </Link>
                  </td>
                  <td>{asset.name}</td>
                  <td>{asset.volume}</td>
                  <td>{asset.ltp}</td>
                  <td>{asset.previousclose} </td>
                  <td>{asset.pointchange}</td>

                  <td>
                    <span
                      style={{
                        color:
                          asset.percentchange > 0
                            ? "#15AD4C"
                            : asset.percentchange < 0
                            ? "#B91212"
                            : "black",
                      }}
                    >
                      {asset.percentchange}%
                      {(asset.percentchange !== 0 ||
                        asset.percentchange === 0) && (
                        <>
                          {asset.percentchange > 0 && (
                            <FaArrowUp
                              style={{ color: "#15AD4C", marginLeft: "5px" }}
                            />
                          )}
                          {asset.percentchange < 0 && (
                            <FaArrowDown
                              style={{ color: "#B91212", marginLeft: "5px" }}
                            />
                          )}
                          {asset.percentchange === 0 && (
                            <FaExchangeAlt
                              style={{ color: "black", marginLeft: "5px" }}
                            />
                          )}
                        </>
                      )}
                    </span>
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

      <div className="search-container mb-4">
        <input
          type="text"
          placeholder="Search commodities by symbol or name..."
          value={searchQueryCommodities}
          onChange={(e) => setSearchQueryCommodities(e.target.value)}
          style={{ outline: "none" }}
        />
        {searchQueryCommodities && (
          <button
            className="clear-search-button"
            onClick={handleClearSearchCommodity}
          >
            <FaTimes />
          </button>
        )}
        <button className="search-button" onClick={handleSearchCommodities}>
          Search Commodities
        </button>
      </div>
      <div className="category-sector-box users-section">
        <h3>Commodities</h3>
        <div
          className="table-responsive"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <table className="table mt-2">
            <thead className="table-light">
              <tr>
                <th>Symbol</th>

                <th onClick={() => handleSortCommodities("ltp")}>
                  LTP {renderSortIcon("ltp", sortOrderCommodities)}
                </th>

                <th>Unit</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {currentCommodity.map((currentCommodity, index) => (
                <tr
                  key={index}
                  onClick={() => handleViewDetail(currentCommodity)}
                >
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

      <div className="search-container mb-4"></div>
      <div className="category-sector-box users-section">
        <h3>Metals</h3>
        <table className="table mt-2">
          <thead className="table-light">
            <tr>
              <th>Name</th>

              <th>LTP</th>
              <th>Unit</th>

              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {data.metals.map((metal, index) => (
              <tr key={index} onClick={() => handleViewDetail(metal)}>
                <td>{metal.symbol}</td>
                <td>{metal.ltp}</td>
                <td>{metal.unit}</td>
                <td>{metal.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container"></div>
      </div>

      {selectedItem && (
        <UserDialogBox
          user={selectedItem}
          onEdit={handleEditUser}
          onClose={handleCloseDialog}
          isEditing={isEditingUser}
        />
      )}

      {isEditingUser && isEditingDialogOpen && (
        <EditUserDialogBoxWithOverlay
          user={isEditingUser}
          onCancel={handleCancelEdit}
        />
      )}
      <ScrollToTop smooth />
    </div>
  );
}

export default AdminDashboard;
