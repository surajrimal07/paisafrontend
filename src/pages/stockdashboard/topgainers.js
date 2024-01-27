import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './stock.css';


const TopGainers = ({ stocks }) => {
  const navigate = useNavigate();

  const handleClick = (event, stock) => {
    event.stopPropagation();

    navigate(`/stockdetailview?symbol=${stock.symbol}`);
  };

  return (
    <div>
      <div className="card mb-4 test">
        <div className="card-header d-flex justify-content-between">
          <h4>Top Gainers</h4>
        </div>
        <div className="table-responsive" style={{maxHeight: '300px', overflowY: 'auto' }}>
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
  <span style={{ color: '#15AD4C' }}>{stock.percentchange}%</span>
  {stock.percentchange > 0 && <FaArrowUp style={{ color: '#15AD4C', marginLeft: '5px' }} />}
</td>
<td>{stock.pointchange? `Rs ${stock.pointchange}` : '' }</td>
                  <td>{stock.ltp ? `Rs ${stock.ltp}` : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopGainers;
