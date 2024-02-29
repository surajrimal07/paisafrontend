import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowDown, FaArrowUp, FaArrowsAltH } from 'react-icons/fa';


import './stock.css';

const StockDetailView = () => {
  const location = useLocation();
  const stockSymbol = new URLSearchParams(location.search).get('symbol');
  const [completeStockInfo, setCompleteStockInfo] = useState(null);

  useEffect(() => {
    const assets = JSON.parse(localStorage.getItem('Assets'));
    const stockInfo = assets.find(item => item.symbol === stockSymbol);
    setCompleteStockInfo(stockInfo);
  }, [stockSymbol]);

  if (!completeStockInfo) {
    return null;
  }

  return (
    <div className="container mt-4">

<h2 className="stocktitle">{completeStockInfo.name} ({completeStockInfo.symbol})</h2>

<div style={{ padding: '10px' }}>
      <iframe
        src={`https://www.nepsealpha.com/trading/chart?symbol=${completeStockInfo.symbol}`}
        title="Stock Chart"
        width="100%"
        height="500"
        style={{ border: '1px solid #ccc' }}
      ></iframe>
    </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>General Information</h4>
            </div>
            <div className="card-body">
              <p><strong>Category:</strong> {completeStockInfo.category}</p>
              <p><strong>Sector:</strong> {completeStockInfo.sector}</p>
              <p><strong>Volume:</strong> {completeStockInfo.volume} Units</p>
              <p><strong>VWAP:</strong>Rs {completeStockInfo.vwap}</p>
              <p><strong>Turnover:</strong> {completeStockInfo.Turnover}</p>

            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Price Information</h4>
            </div>
            <div className="card-body">
              <p><strong>LTP (Last Trade Price):</strong> {completeStockInfo.ltp}</p>
              <p><strong>Open:</strong>Rs {completeStockInfo.open}</p>
              <p><strong>High:</strong>Rs {completeStockInfo.high}</p>
              <p><strong>Low:</strong>Rs {completeStockInfo.low}</p>
              <p><strong>Intraday Volatility:</strong>Rs {completeStockInfo.high-completeStockInfo.low}</p>
              <p><strong>Previous Close:</strong>Rs {completeStockInfo.previousclose}</p>
              <p><strong>Week 52 High:</strong>Rs {completeStockInfo.week52high}</p>
              <p><strong>Week 52 Low:</strong>Rs {completeStockInfo.week52low}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4" style={{ marginBottom: '20px' }}>
      <div className="card-header">
        <h4>Price Changes</h4>
      </div>
      <div className="card-body">
  <p>
    <strong>Percent Change:</strong>
    <span style={{ color: completeStockInfo.percentchange > 0 ? 'green' : completeStockInfo.percentchange < 0 ? 'red' : 'black' }}>
      {completeStockInfo.percentchange}%
      {completeStockInfo.percentchange > 0 ? <FaArrowUp style={{ color: 'green' }} /> : completeStockInfo.percentchange < 0 ? <FaArrowDown style={{ color: 'red' }} /> : <FaArrowsAltH style={{ color: 'black' }} />}
    </span>
  </p>
  <p>
    <strong>Point Change:</strong>
    <span style={{ color: completeStockInfo.pointchange > 0 ? 'green' : completeStockInfo.pointchange < 0 ? 'red' : 'black' }}>
      Rs {completeStockInfo.pointchange}
      {completeStockInfo.pointchange > 0 ? <FaArrowUp style={{ color: 'green' }} /> : completeStockInfo.pointchange < 0 ? <FaArrowDown style={{ color: 'red' }} /> : <FaArrowsAltH style={{ color: 'black' }} />}
    </span>
  </p>
</div>
    </div>

  </div>
);
  };

export default StockDetailView;
