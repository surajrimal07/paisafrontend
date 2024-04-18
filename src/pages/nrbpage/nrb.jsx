import React, { useEffect, useState } from 'react';
import { FaCubes } from 'react-icons/fa';
import { getNrbdata } from '../../apis/api';
import './nrb.css';

const NrbData = () => {
  const [nrbData, setNrbData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nrbData = await getNrbdata();
        setNrbData(nrbData.data.data);
        console.log(nrbData.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NRB data:', error);
      }
    };

    fetchData();
  }, []);

  const dates = nrbData ? Object.keys(nrbData.nrbBankingData['Total Deposits']) : [];


  const InfoCard = ({ icon, value, label }) => {
    return (
      <div className="info-card-container">
        <div className="info-card">
          <div className="info-item">
            {icon && <div className="info-icon">{icon}</div>}
            <div className="info-text">
              <div className="info-value">{value}</div>
              <div className="info-label">{label}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="loading-container">
    <div className="loading-spinner" data-testid="loading-spinner"></div>
    <p>Loading...</p>
  </div>
  }
  return (
    <div className="containers">
 <h1 className="headers">
    NRB Data<span className="small-text">({nrbData.nrbBankingData['Short Term Interest Rates'].date})</span>
  </h1>
      <div className="user-info-cards">
      {Object.entries(nrbData.nrbBankingData['Short Term Interest Rates'].values).map(([duration, rate]) => (
          <InfoCard
            key={duration}
            icon={<FaCubes />}
            value={rate+'%'}
            label={`${duration} Days Interest Rate`}
          />
        ))}
        </div>
      {nrbData && (
        <div className="data-container">
          <div className="section">
            <h2>Banking Data</h2>
            <div className="data-item">
              <div className="table-wrapper">
              <table className="table table-compact">
                <thead>
                  <tr>
                  <th>Indicator</th>
                    <th>{dates[0]}</th>
                    <th>{dates[1]}</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
    <td>Total Deposits</td>
    <td>{nrbData.nrbBankingData['Total Deposits'][Object.keys(nrbData.nrbBankingData['Total Deposits'])[0]]}</td>
    <td>{nrbData.nrbBankingData['Total Deposits'][Object.keys(nrbData.nrbBankingData['Total Deposits'])[1]]}</td>
</tr>
<tr>
    <td>Commercial Banks Total Deposits</td>
    <td>{nrbData.nrbBankingData['Commercial Banks Total Deposits'][Object.keys(nrbData.nrbBankingData['Commercial Banks Total Deposits'])[0]]}</td>
    <td>{nrbData.nrbBankingData['Commercial Banks Total Deposits'][Object.keys(nrbData.nrbBankingData['Commercial Banks Total Deposits'])[1]]}</td>
</tr>
<tr>
    <td>Other BFIs Total Deposits</td>
    <td>{nrbData.nrbBankingData['Other BFIs Total Deposits'][Object.keys(nrbData.nrbBankingData['Other BFIs Total Deposits'])[0]]}</td>
    <td>{nrbData.nrbBankingData['Other BFIs Total Deposits'][Object.keys(nrbData.nrbBankingData['Other BFIs Total Deposits'])[1]]}</td>
</tr>
<tr>
    <td>Total Lending</td>
    <td>{nrbData.nrbBankingData['Total Lending'][Object.keys(nrbData.nrbBankingData['Total Lending'])[0]]}</td>
    <td>{nrbData.nrbBankingData['Total Lending'][Object.keys(nrbData.nrbBankingData['Total Lending'])[1]]}</td>
</tr>


<tr>
    <td>Commercial Banks Total Lending</td>
    <td>{nrbData.nrbBankingData['Commercial Banks Total Lending'][Object.keys(nrbData.nrbBankingData['Commercial Banks Total Lending'])[0]]}</td>
    <td>{nrbData.nrbBankingData['Commercial Banks Total Lending'][Object.keys(nrbData.nrbBankingData['Commercial Banks Total Lending'])[1]]}</td>
</tr>
<tr>
    <td>Other BFIs Total Lending</td>
    <td>{nrbData.nrbBankingData['Other BFIs Total Lending'][Object.keys(nrbData.nrbBankingData['Other BFIs Total Lending'])[0]]}</td>
    <td>{nrbData.nrbBankingData['Other BFIs Total Lending'][Object.keys(nrbData.nrbBankingData['Other BFIs Total Lending'])[1]]}</td>
</tr>
<tr>
    <td>CD Ratio</td>
    <td>{nrbData.nrbBankingData['CD Ratio'][Object.keys(nrbData.nrbBankingData['CD Ratio'])[0]]}</td>
    <td>{nrbData.nrbBankingData['CD Ratio'][Object.keys(nrbData.nrbBankingData['CD Ratio'])[1]]}</td>
</tr>
<tr>
    <td>Interbank Interest Rate LCY - Weighted Avg.</td>
    <td>{nrbData.nrbBankingData['Interbank Interest Rate LCY - Weighted Avg.'][Object.keys(nrbData.nrbBankingData['Interbank Interest Rate LCY - Weighted Avg.'])[0]]}</td>
    <td>{nrbData.nrbBankingData['Interbank Interest Rate LCY - Weighted Avg.'][Object.keys(nrbData.nrbBankingData['Interbank Interest Rate LCY - Weighted Avg.'])[1]]}</td>
</tr>

                </tbody>
              </table>
            </div>
            </div>

          </div>
          <div className="section">
            <h2>Forex Data</h2>
            <div className="card-bt card-bt--nrb">
              <div className="card-bt-header">
                <div className="card-bt-header-title card-bt-header-title--nrb">

                </div>

              </div>
              <div className="card-bt-divider"></div>
              <div className="card-bt-body">
                <table className="table table-compact forex-table">
                  <thead>
                    <tr>
                      <th scope="col">Currency</th>
                      <th className="text-right" scope="col">Unit</th>
                      <th className="text-right" scope="col">Buy</th>
                      <th className="text-right" scope="col">Sell</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(nrbData.nrbForexData).map(([currency, data]) => (
                      <tr key={currency}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className={`flag flag--${currency.toLowerCase().replace(/\s/g, '-')}`}></div>
                            <div className="ml-2">{currency}</div>
                          </div>
                        </td>
                        <td className="text-right">{data.unit}</td>
                        <td className="text-right">{data.buy}</td>
                        <td className="text-right">{data.sell}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-bt-footer d-flex justify-content-between font-size-xs">

                <div>
                  <a href="https://www.nrb.org.np/forex">View More in NRB <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NrbData;
