import React, { useEffect, useState } from 'react';
import { getDashboardItems } from '../../apis/api';

const StockDashboard = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [topVolume, setTopVolume] = useState([]);
  const [topTurnover, setTopTurnover] = useState([]);
  const [topTransaction, setTopTransaction] = useState([]);

  // Fetch data
  const fetchData = async () => {
    try {
      const userResponse = await getDashboardItems();
      const data = userResponse.data;

      if (data.data) {
        const gain = data.data.topGainers.data;
        const loss = data.data.topLoosers.data;
        const vol = data.data.topVolume.data;
        const turn = data.data.topTurnover.data;
        const trans = data.data.topTrans.data;

        setGainers(gain.slice(0, 10)); // Limit to 10 items
        localStorage.setItem('Gainers', JSON.stringify(gain));

        setLosers(loss.slice(0, 10));
        localStorage.setItem('Loosers', JSON.stringify(loss));

        setTopVolume(vol.slice(0, 10));
        localStorage.setItem('Volume', JSON.stringify(vol));

        setTopTurnover(turn.slice(0, 10));
        localStorage.setItem('Turnover', JSON.stringify(turn));

        setTopTransaction(trans.slice(0, 10));
        localStorage.setItem('Transaction', JSON.stringify(trans));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const renderStockSection = (title, stocks) => (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between">
        <h4>{title}</h4>
        <button className="btn btn-primary">View All</button>
      </div>
      <ul className="list-group list-group-flush">
        {stocks.map((stock, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <span>{stock.symbol} - {stock.name}</span>
              {stock.percentchange && <span className="badge bg-info">Change: {stock.percentchange}%</span>}
              {stock.turnover && <span className="badge bg-secondary">Turnover: {stock.turnover}</span>}
              {stock.volume && <span className="badge bg-warning">Volume: {stock.volume}</span>}
              {stock.transactions && <span className="badge bg-danger">Transactions: {stock.transactions}</span>}
            </div>
            <span className="badge bg-success">{stock.ltp || stock.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Stock Dashboard</h2>

      {renderStockSection('Top Gainers', gainers)}
      {renderStockSection('Top Losers', losers)}
      {renderStockSection('Top Volume', topVolume)}
      {renderStockSection('Top Turnover', topTurnover)}
      {renderStockSection('Top Transaction', topTransaction)}
    </div>
  );
};

export default StockDashboard;
