import React, { useEffect, useState } from 'react';
import { FaCubes, FaSortDown, FaSortUp, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer } from 'react-toastify';
import { getAllAssets, getCommo, getMetals } from '../../apis/api';
import './dashboard.css';



function AssetDashboard() {
  const [assets, setAssets] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [metals, setMetals] = useState([]);
  const [currentAssetsPage, setCurrentAssetsPage] = useState(1);
  const [currentCommoditiesPage, setCurrentCommoditiesPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchQueryAssets, setSearchQueryAssets] = useState('');
  const [searchQueryCommodities, setSearchQueryCommodities] = useState('');
  const [sortOrderAssets, setSortOrderAssets] = useState({ column: null, ascending: true });
  const [sortOrderCommodities, setSortOrderCommodities] = useState({ column: null, ascending: true });

  const totalAssets = assets.length;
  const totalCommodities = commodities.length;
  const totalMetals = metals.length;

  useEffect(() => {
    const fetchData = async () => {
      const assetResponse = await getAllAssets();
      if (assetResponse.status === 200 && Array.isArray(assetResponse.data.data)) {
        const jsonDecode = JSON.stringify(assetResponse.data.data);
        localStorage.setItem('Assets', jsonDecode);
        setAssets(assetResponse.data.data);
      } else {
        console.error('Error fetching assets:', assetResponse.error);
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
    };

    fetchData();
  }, []);

  const renderSortIcon = (column, sortOrder) => {
    if (sortOrder.column === column) {
      return sortOrder.ascending ? <FaSortUp /> : <FaSortDown />;
    }
    return null;
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
         // className={currentAssetsPage === i ? 'active' : ''}
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

  const handleClearSearchAssets = () => {
    setSearchQueryAssets('');
    setAssets(JSON.parse(localStorage.getItem('Assets')));
  };

  const handleClearSearchCommodities = () => {
    setSearchQueryCommodities('');
    setCommodities(JSON.parse(localStorage.getItem('Commodities')));
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
    <div className="user-dashboards">
      <h2>Asset Dashboard</h2>

      <div className="user-info-cards">
      <InfoCard icon={<FaCubes />} value={totalAssets} label="Total Assets" />
      <InfoCard icon={<FaCubes />} value={totalCommodities} label="Total Commodities" />
      <InfoCard icon={<FaCubes />} value={totalMetals} label="Total Metals" />
      </div>


    <div className = "iframe-container" style={{ padding: '20px' }}>
      <iframe
        src={`https://www.nepsealpha.com/trading/chart`}
        title="Stock Chart"
        width="100%"
        height="500"
        style={{ border: '1px solid #ccc' }}
      ></iframe>
    </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search assets by symbol or name..."
          value={searchQueryAssets}
          style={{ outline: 'none' }}
          onChange={(e) => setSearchQueryAssets(e.target.value)}
        />
      {searchQueryAssets && (
          <button className="clear-search-button" onClick={handleClearSearchAssets}>
            <FaTimes />
          </button>
        )}
        <button className="search-buttons" onClick={handleSearchAssets}>
          Search Assets
        </button>
      </div>

      {/* Assets Section */}
      <div className="category-sector-box users-section">
        <h3>Assets</h3>
        <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>          <table className="table mt-2">
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
      <td>{asset.percentchange}%</td>
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
          style={{ outline: 'none' }}
          onChange={(e) => setSearchQueryCommodities(e.target.value)}
        />
        {searchQueryCommodities && (
          <button className="clear-search-button" onClick={handleClearSearchCommodities}>
            <FaTimes />
          </button>
        )}
        <button className="search-buttons" onClick={handleSearchCommodities}>
          Search Commodities
        </button>
      </div>

      {/* Commodities Section */}
      <div className="category-sector-box users-section">
        <h3>Commodities</h3>
        <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>          <table className="table mt-2">
            <thead className="table-light">
              <tr>
                <th>Symbol</th>
                <th onClick={() => handleSortCommodities('ltp')}>
                  LTP {renderSortIcon('ltp', sortOrderCommodities)}
                </th>
                <th onClick={() => handleSortCommodities('unit')}>
                  Unit {renderSortIcon('unit', sortOrderCommodities)}
                </th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {currentCommodity.map((currentCommodity, index) => (
                <tr key={index} >
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
        <div className="table-container" style={{ overflowY: 'auto', maxHeight: '400px' }}>
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
              {metals.map((metal, index) => (
                <tr key={index}>
                  <td>{metal.symbol}</td>
                  <td>{metal.ltp}</td>
                  <td>{metal.unit}</td>
                  <td>{metal.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
        </div>
      </div>

      <ToastContainer position="top-right" />
      <ScrollToTop smooth />
    </div>
  );
}

export default AssetDashboard;
