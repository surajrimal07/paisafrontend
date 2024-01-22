import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stock.css';


const TopVolume = ({ stocks }) => {

  const navigate = useNavigate();

  const handleClick = (event, stock) => {
    event.stopPropagation();

    console.log("selected stock is ", stock.symbol);

    navigate(`/stockdetailview?symbol=${stock.symbol}`);
  };

  return (
  <div className="card mb-4">
    <div className="card-header d-flex justify-content-between">
      <h4>Top Volume</h4>
    </div>
    <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Volume</th>
            <th>LTP</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index} onClick={(event) => handleClick(event, stock)}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.volume}</td>
              <td>{stock.ltp ? `Rs ${stock.ltp}` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default TopVolume;
