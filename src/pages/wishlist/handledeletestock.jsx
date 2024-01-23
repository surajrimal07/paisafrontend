import React, { useState } from 'react';
import './handleRemoveStock.css';

const HandleRemoveStock = ({ userEmail, watchlistId, stocks, onSave, onCancel }) => {
  const [selectedStock, setSelectedStock] = useState('');

  const handleSave = (event) => {
    if (!selectedStock) {
      alert('Please select a stock to remove');
      return;
    }

    onSave(event,userEmail, watchlistId, selectedStock);
  };

  return (
    <div className="remove-stock-popup">
      <h4>Remove Stock</h4>
      <label htmlFor="stockSymbol">Select Stock:</label>
      <select
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
      >
        <option value="" disabled>
          Select a stock
        </option>
        {stocks.map((stock) => (
          <option key={stock} value={stock}>
            {stock}
          </option>
        ))}
      </select>
      <div className="button-container">
        <button className="remove-button" onClick={handleSave}>
          Remove
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HandleRemoveStock;
