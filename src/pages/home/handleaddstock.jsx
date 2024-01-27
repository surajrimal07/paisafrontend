import React, { useState, useEffect } from 'react';
import './handleaddstock.css';

const HandleAddStock = ({ userEmail, portfolioId, portfolioName, onAdd, onCancel }) => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [matchingAssets, setMatchingAssets] = useState([]);
  const [ltp, setLtp] = useState('N/A');

  useEffect(() => {
    const fetchLTP = async () => {
      if (stockSymbol.trim() !== '') {
        const ltpValue = await getLTPForStock(stockSymbol);
        setLtp(ltpValue);
      }
    };

    fetchLTP();
  }, [stockSymbol]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const assets = JSON.parse(localStorage.getItem('Assets')) || [];
    const filteredAssets = assets.filter((asset) =>
      asset.symbol.toLowerCase().includes(searchTerm)
    );
    setMatchingAssets(filteredAssets);
  };

  const handleAdd = (event) => {
    if (stockSymbol.trim() === '' || isNaN(price) || isNaN(quantity)) {
      alert('Please enter valid values for symbol, price, and quantity.');
      return;
    }

    onAdd(event, userEmail, portfolioId, stockSymbol, price, quantity);
    setStockSymbol('');
    setPrice('');
    setQuantity('');
    setMatchingAssets([]);
    setLtp('N/A');
  };

  return (
    <div className="add-stock-popup">
      <h4>Add Stock to "{portfolioName}"</h4>
      <label htmlFor="stockSymbol">Search and Select Asset:</label>
      <div className="input-container">
        <input
          type="text"
          id="stockSymbol"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          onBlur={() => setMatchingAssets([])}
          placeholder="Type to search..."
          list="assetSymbols"
          autoComplete="off"
          onInput={handleSearch}
        />
        <datalist id="assetSymbols">
          {matchingAssets.map((asset) => (
            <option key={asset.symbol} value={asset.symbol}>
              {asset.symbol} - {asset.name}
            </option>
          ))}
        </datalist>
      </div>
      <div className="input-container">
        <label htmlFor="price">Price: {ltp}</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price..."
        />
      </div>
      <div className="input-container">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity..."
        />
      </div>
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

const getLTPForStock = (symbol) => {
  try {
    const assets = JSON.parse(localStorage.getItem('Assets')) || [];
    const asset = assets.find((a) => a.symbol === symbol);

    if (asset) {
      return 'LTP '+ asset.ltp || 'N/A';
    } else {
      console.error(`Asset with symbol ${symbol} not found.`);
      return 'N/A';
    }
  } catch (error) {
    console.error('Error fetching LTP:', error.message);
    return 'N/A';
  }
};
