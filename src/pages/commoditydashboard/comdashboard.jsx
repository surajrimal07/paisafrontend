import React, { useEffect, useState } from 'react';
import { getCommodityData } from '../../apis/api'; // Assuming you have an API function for commodity data retrieval










//work in progress //

const CommodityPage = () => {
  const [commodityData, setCommodityData] = useState([]);

  // Fetch commodity data
  const fetchData = async () => {
    try {
      const response = await getCommodityData(); // Replace with your actual API call
      const data = response.data;

      if (data.data) {
        const commodityList = data.data.commodityList.data;

        setCommodityData(commodityList);
        localStorage.setItem('CommodityData', JSON.stringify(commodityList));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error('Error fetching commodity data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Commodity Page</h2>

      {/* Your component to display commodity data, modify it as per your needs */}
      <CommodityComponent data={commodityData} />
    </div>
  );
};

// Create a separate component for displaying commodity data
const CommodityComponent = ({ data }) => {
  return (
    <div>
      {/* Customize this part based on your data structure */}
      {data.map((commodity) => (
        <div key={commodity.id}>
          <h3>{commodity.name}</h3>
          {/* Display other relevant information about the commodity */}
        </div>
      ))}
    </div>
  );
};

export default CommodityPage;
