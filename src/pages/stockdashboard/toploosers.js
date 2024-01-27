import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stock.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TopLosers = ({ stocks }) => {

  const navigate = useNavigate();

  const handleClick = (event, stock) => {
    event.stopPropagation();

    navigate(`/stockdetailview?symbol=${stock.symbol}`);
  };

  return (
  <div className="card mb-4 test">
    <div className="card-header d-flex justify-content-between">
      <h4>Top Losers</h4>
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
              <td>
  <span style={{ color: stock.percentchange >= 0 ? '#15AD4C' : '#A71111' }}>{stock.percentchange}%</span>
  {stock.percentchange > 0 && <FaArrowUp style={{ color: '#15AD4C', marginLeft: '5px' }} />}
  {stock.percentchange < 0 && <FaArrowDown style={{ color: '#B91212', marginLeft: '5px' }} />}
</td>
              <td>{stock.pointchange? `Rs ${stock.pointchange}` : '' }</td>
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
