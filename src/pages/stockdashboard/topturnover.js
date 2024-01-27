import React from 'react';
import './stock.css';
import { useNavigate } from 'react-router-dom';


const TopTurnover = ({ stocks }) => {

    const navigate = useNavigate();

    const handleClick = (event, stock) => {
      event.stopPropagation();
      navigate(`/stockdetailview?symbol=${stock.symbol}`);
    };

    return(
  <div className="card mb-4 test">
    <div className="card-header d-flex justify-content-between">
      <h4>Top Turnover</h4>
    </div>
    <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
          <th>Symbol</th>
            <th>Name</th>
            <th>Turnover</th>
            <th>LTP</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index} onClick={(event) => handleClick(event, stock)}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.turnover}</td>
              <td>{stock.ltp ? `Rs ${stock.ltp}` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default TopTurnover;
