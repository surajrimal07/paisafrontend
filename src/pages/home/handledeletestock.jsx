import React, { useState } from 'react';
import './handleRemoveStock.css';

const HandleRemoveStock = ({ userEmail, watchlistId, portfolioName, stocks, onSave, onCancel }) => {
  const [selectedStock, setSelectedStock] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSave = (event) => {
    event.preventDefault();

    if (!selectedStock) {
      alert('Please select a stock to remove');
      return;
    }

    if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) {
      alert('Please enter a valid quantity (a positive number)');
      return;
    }

    onSave(event, userEmail, watchlistId, selectedStock, quantity);
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

      <label htmlFor="quantity">Quantity:</label>
      <input
        type="text"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

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
