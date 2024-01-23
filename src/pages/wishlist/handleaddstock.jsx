import React, { useState, useEffect } from 'react';
import './handleaddstock.css';

const HandleAddStock = ({ userEmail, watchlistId, watchlistName, onAdd, onCancel }) => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [matchingAssets, setMatchingAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const assets = JSON.parse(localStorage.getItem('Assets')) || [];
    const filteredAssets = assets.filter((asset) =>
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMatchingAssets(filteredAssets);
  }, [searchTerm]);

  const handleAdd = (event) => {
    if (!stockSymbol.trim()) {
      alert('Stock symbol cannot be empty');
      return;
    }

    onAdd(event,userEmail, watchlistId, stockSymbol);
  };

  return (
    <div className="add-stock-popup">
      <h4>Add Stock to "{watchlistName}"</h4>
      <label htmlFor="stockSymbol">Search and Select Asset:</label>
      <input
        type="text"
        id="stockSymbol"
        value={stockSymbol}
        onChange={(e) => {
          setStockSymbol(e.target.value);
          setSearchTerm(e.target.value);
        }}
        placeholder="Type to search..."
      />
      {matchingAssets.length > 0 && (
        <div className="matching-assets">
          {matchingAssets.map((asset) => (
            <div
              key={asset.symbol}
              className="asset-item"
              onClick={() => {
                setStockSymbol(asset.symbol);
                setSearchTerm('');
              }}
            >
              {asset.symbol} - {asset.name}
            </div>
          ))}
        </div>
      )}
      <div className="button-container">
        <button className="add-button" onClick={handleAdd}>
          Add
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HandleAddStock;
