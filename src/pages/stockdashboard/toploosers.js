import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stock.css';


const TopLosers = ({ stocks }) => {

  const navigate = useNavigate();

  const handleClick = (event, stock) => {
    event.stopPropagation();

    console.log("selected stock is ", stock.symbol);

    navigate(`/stockdetailview?symbol=${stock.symbol}`);
  };

  return (
  <div className="card mb-4">
    <div className="card-header d-flex justify-content-between">
      <h4>Top Losers</h4>
      <button className="btn btn-primary">View All</button>
    </div>
    <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
          <th>Symbol</th>
            <th>Name</th>
            <th>Change (%)</th>
            <th>Point Change</th>
            <th>LTP</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index} onClick={(event) => handleClick(event, stock)}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.percentchange}%</td>
              <td>{stock.pointchange}</td>
              <td>{stock.ltp ? `Rs ${stock.ltp}` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default TopLosers;
