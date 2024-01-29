import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PortfolioView.css';

const PortfolioView = () => {
  const [portfolio, setPortfolio] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = JSON.parse(localStorage.getItem('Portfolio')) || {};
      const storedPortfolios = storedData.portfolio || [];

      if (!Array.isArray(storedPortfolios)) {
        console.error('Stored portfolios is not an array:', storedPortfolios);
        setLoading(false);
        return;
      }

      const selectedPortfolio = storedPortfolios.find(port => port._id === id);

      await new Promise(resolve => setTimeout(resolve, 1000));

      setPortfolio(selectedPortfolio);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <div className="portfolio-container">
      <div className="portfolio-view-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <h2 className="portfolio-title">{portfolio.name} Portfolio</h2>

            <div className="portfolio-info-container">
            <div className="card-container">
            <div className="card">
              <h3>Total Units:</h3>
              <p>{portfolio.totalunits}</p>
            </div>

            <div className="card">
              <h3>Portfolio Cost:</h3>
              <p>{portfolio.portfoliocost}</p>
            </div>

            <div className="card">
              <h3>Profit / Loss:</h3>
              <p className={portfolio.portfoliovalue - portfolio.portfoliocost >= 0 ? 'profit' : 'loss'}>
                Rs {portfolio.portfoliovalue - portfolio.portfoliocost}
              </p>
            </div>

            <div className="card">
              <h3>Portfolio Value:</h3>
              <p>{portfolio.portfoliovalue}</p>
            </div>
          </div>
            </div>
            <h3>List of Stocks : {portfolio.stocks.length}</h3>
            <div className="stocks-gain-loss-container">

              <div className="stocks-container">

                <ul>
                  {portfolio.stocks.map(stock => (
                    <li key={stock._id} className="stock-item">
                      <p><strong>Symbol:</strong> {stock.symbol}</p>
                      <p><strong>Name:</strong> {stock.name}</p>
                      <p><strong>Quantity:</strong> {stock.quantity} Units</p>
                      <p><strong>WACC:</strong> Rs {stock.wacc}</p>
                      <p><strong>Cost Price:</strong> Rs {stock.costprice}</p>
                      <p><strong>Current Price:</strong> Rs {stock.currentprice}</p>
                      <p>
                        <strong>Net Gain/Loss:</strong>{' '}
                        <span className={stock.netgainloss >= 0 ? 'profit' : 'loss'}>
                          Rs {stock.netgainloss}
                        </span>
                      </p>
                      <p><strong>Last Trade Price:</strong> Rs {stock.ltp}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="gain-loss-container">
                <h3>Gain/Loss Records</h3>
                <ul>
                  {portfolio.gainLossRecords.map(record => (
                    <li key={record._id} className="record-item">
                      <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
                      <p><strong>Value:</strong> Rs {record.value}</p>
                      <p>
                        <strong>Portfolio Gain/Loss:</strong>{' '}
                        <span className={record.portgainloss >= 0 ? 'profit' : 'loss'}>
                          Rs {record.portgainloss}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioView;
