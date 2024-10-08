import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PortfolioCompare.css';
import secureLocalStorage from 'react-secure-storage';

const PortfolioCompare = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [comparePortfolio, setComparePortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portfolioList, setPortfolioList] = useState([]);
  const [selectedCompareId, setSelectedCompareId] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);

  const { id, compareId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const storedData = JSON.parse(secureLocalStorage.getItem('Portfolio')) || {};
      const storedPortfolios = storedData.portfolio || [];

      if (!Array.isArray(storedPortfolios)) {
        setLoading(false);
        return;
      }

      const selectedPortfolio = storedData.find(port => port._id === id);

      setPortfolioList(storedData);

      if (compareId) {
        const comparePortfolioData = storedPortfolios.find(port => port._id === compareId);
        setComparePortfolio(comparePortfolioData);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      setPortfolio(selectedPortfolio);
      setLoading(false);
    };

    fetchData();
  }, [id, compareId]);

  const handleCompareChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCompareId(selectedId);

    const comparePortfolioData = portfolioList.find(port => port._id === selectedId);
    setComparePortfolio(comparePortfolioData);
  };

  const comparePortfolios = () => {
    if (portfolio && comparePortfolio) {
      const result = {
        totalUnits: {
          portfolio: portfolio.totalunits,
          comparePortfolio: comparePortfolio.totalunits,
        },
        portfolioCost: {
          portfolio: portfolio.portfoliocost,
          comparePortfolio: comparePortfolio.portfoliocost,
        },
        portfolioStocks: {
          portfolio: portfolio.totalStocks,
          comparePortfolio: comparePortfolio.totalStocks,
        },
        profitLoss: {
          portfolio: portfolio.gainLossRecords[0].portgainloss,
          comparePortfolio: comparePortfolio.gainLossRecords[0].portgainloss,
        },
        portfolioValue: {
          portfolio: portfolio.portfoliovalue,
          comparePortfolio: comparePortfolio.portfoliovalue,
        },
        percentage: {
            portfolio: portfolio.percentage,
            comparePortfolio: comparePortfolio.percentage,
          },
          recom: {
            portfolio: portfolio.recommendation,
            comparePortfolio: comparePortfolio.recommendation,
          },
      };

      setComparisonResult(result);
    }
  };

  return (
    <div className="portfolio-compare">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
                    <h2 className="portfolio-title">
            {portfolio.name} vs {comparePortfolio ? comparePortfolio.name : 'not selected'}
          </h2>
          <div className="portfolio-info">
          </div>

          <label htmlFor="comparePortfolio">Select Portfolio to Compare:</label>
          <select id="comparePortfolio" onChange={handleCompareChange} value={selectedCompareId || ''}>
            <option value="" disabled>Select a Portfolio</option>
            {portfolioList.map(portfolioItem => (
              <option key={portfolioItem._id} value={portfolioItem._id}>
                {portfolioItem.name}
              </option>
            ))}
          </select>

          <button className="compare-button" onClick={comparePortfolios}>
            Compare Portfolios
          </button>

          {comparisonResult && (
            <div className="comparison-table">
              <h3>Comparison Result</h3>
              <table>
                <thead>
                  <tr>
                    <th>Metrics</th>
                    <th>{portfolio.name} Portfolio</th>
                    <th>{comparePortfolio.name} Portfolio</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Total stocks</td>
                    <td>{comparisonResult.portfolioStocks.portfolio} Stocks</td>
                    <td>{comparisonResult.portfolioStocks.comparePortfolio} Stocks</td>
                  </tr>
                  <tr>
                    <td>Total Units</td>
                    <td>{comparisonResult.totalUnits.portfolio} Units</td>
                    <td>{comparisonResult.totalUnits.comparePortfolio} Units</td>
                  </tr>
                  <tr>
                    <td>Portfolio Cost</td>
                    <td>Rs {comparisonResult.portfolioCost.portfolio}</td>
                    <td>Rs {comparisonResult.portfolioCost.comparePortfolio}</td>
                  </tr>
                  <tr>
                    <td>Profit / Loss</td>
                    <td>Rs {comparisonResult.profitLoss.portfolio}</td>
                    <td>Rs {comparisonResult.profitLoss.comparePortfolio}</td>
                  </tr>
                  <tr>
                    <td>Portfolio Value</td>
                    <td>Rs {comparisonResult.portfolioValue.portfolio}</td>
                    <td>Rs {comparisonResult.portfolioValue.comparePortfolio}</td>
                  </tr>
                  <tr>
                    <td>Percentage P&L</td>
                    <td>{comparisonResult.percentage.portfolio}%</td>
                    <td>{comparisonResult.percentage.comparePortfolio}%</td>
                  </tr>
                  <tr>
                    <td>Recommendation</td>
                    <td>{comparisonResult.recom.portfolio}</td>
                    <td>{comparisonResult.recom.comparePortfolio}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {!selectedCompareId && (
            <p className="select-portfolio-message">Select a portfolio to compare</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioCompare;
