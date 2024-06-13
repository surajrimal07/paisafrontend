import React from 'react';

const Chart = () => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        title="Nepse Chart"
        src="https://chukul.com/nepse-charts?"
        frameBorder="0"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Chart;