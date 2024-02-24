import React, { useEffect, useState } from 'react';
import { getWorlddata } from '../../apis/api';
import './app.css';


const MarketData = () => {
  const [worldData, setWorldData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nrbData = await getWorlddata();
        setWorldData(nrbData.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching World data:', error);
      }

    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
  }

  return (
    <div className="container">
   <h1 className="header">World Market Today</h1>
      <Tabs worldData={worldData} />
    </div>
  );
};

const Tabs = ({ worldData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div>
        {Object.keys(worldData).map((key, index) => (
          <button
            key={index}
            onClick={() => handleChange(index)}
            style={{
              padding: '8px 16px',
              margin: '0 4px',
              backgroundColor: index === activeIndex ? '#ddd' : '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <div>
        <DataTable data={Object.values(worldData)[activeIndex]} />
      </div>
    </div>
  );
};

const DataTable = ({ data }) => {
    return (
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} style={{ border: '1px solid #ddd', padding: '8px' }}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.entries(item).map(([key, value], colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    color: (key === 'change' || key === 'changepercentage') && parseFloat(value) <= 0 ? 'red' : 'black',
                  }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };



export default MarketData;
