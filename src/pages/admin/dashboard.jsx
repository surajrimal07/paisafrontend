import React, { useEffect, useState } from "react";
import { getAllAssets } from '../../apis/api';
import './dashboard.css';

function AdminDashboard() {
  const [assets, setAssets] = useState([]);
  const [currentPage, setCurrentPage] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust this number as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllAssets();

        if (response.status === 200) {
          if (Array.isArray(response.data.data)) {
            setAssets(response.data.data);

            // Initialize currentPage for each category and sector group
            const initialPages = {};
            response.data.data.forEach((asset) => {
              const key = `${asset.category}-${asset.sector}`;
              initialPages[key] = 1;
            });
            setCurrentPage(initialPages);
          } else {
            console.error('Invalid data format. Expected an array:', response.data);
          }
        } else {
          console.error('Error fetching assets:', response.error);
        }
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = (category, sector) => currentPage[`${category}-${sector}`] * itemsPerPage;
  const indexOfFirstItem = (category, sector) => indexOfLastItem(category, sector) - itemsPerPage;
  const currentAssets = (category, sector) => assets
    .filter(asset => asset.category === category && asset.sector === sector)
    .slice(indexOfFirstItem(category, sector), indexOfLastItem(category, sector));

  const totalPageCount = (category, sector) =>
    Math.ceil(
      assets.filter(asset => asset.category === category && asset.sector === sector).length / itemsPerPage
    );

  const renderPaginationButtons = (category, sector) => {
    const buttons = [];
    const maxButtonsToShow = 5;

    // Determine the range of buttons to show
    let startPage = Math.max(1, currentPage[`${category}-${sector}`] - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPageCount(category, sector), startPage + maxButtonsToShow - 1);

    // Adjust the startPage based on the endPage
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(prev => ({ ...prev, [`${category}-${sector}`]: i }))}
          className={currentPage[`${category}-${sector}`] === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      <div className="m-4">
        <h2>Admin Dashboard</h2>
        <div className="category-sector-boxes">
          {Array.from(new Set(assets.map(asset => `${asset.category}-${asset.sector}`))).map((group, index) => {
            const [category, sector] = group.split('-');
            return (
              <div key={index} className="category-sector-box">
                <h3>{category}</h3>
                <h4>{sector}</h4>
                <table className="table mt-2">
                  <thead className="table-dark">
                    <tr>
                      <th>Symbol</th>
                      <th>Last Price (LTP)</th>
                      {/* Add more headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentAssets(category, sector).map((asset, index) => (
                      <tr key={index}>
                        <td>{asset.symbol}</td>
                        <td>{asset.ltp}</td>
                        {/* Add more cells as needed */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination-container">
                  {renderPaginationButtons(category, sector)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
