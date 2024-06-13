import React, { useEffect, useState } from "react";
import { getDashboardItems } from "../../apis/api";
import TopGainers from "./topgainers";
import TopLosers from "./toploosers";
import TopTransaction from "./toptransaction";
import TopTurnover from "./topturnover";
import TopVolume from "./topvolume";

import "./stock.css";
import { toast } from "react-toastify";

const StockDashboard = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [topVolume, setTopVolume] = useState([]);
  const [topTurnover, setTopTurnover] = useState([]);
  const [topTransaction, setTopTransaction] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  const fetchData = async () => {
    try {
      const userResponse = await getDashboardItems();
      const data = userResponse.data;

      if (data.data) {
        const gain = data.data.topGainers.data;
        const loss = data.data.topLoosers.data;
        const vol = data.data.topVolume.data;
        const turn = data.data.topTurnover.data;
        const trans = data.data.topTrans.data;

        setGainers(gain);
        localStorage.setItem("Gainers", JSON.stringify(gain));

        setLosers(loss);
        localStorage.setItem("Loosers", JSON.stringify(loss));

        setTopVolume(vol);
        localStorage.setItem("Volume", JSON.stringify(vol));

        setTopTurnover(turn);
        localStorage.setItem("Turnover", JSON.stringify(turn));

        setTopTransaction(trans);
        localStorage.setItem("Transaction", JSON.stringify(trans));

        setLoading(false);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Stock Dashboard</h2>
      <div className="iframe-container" style={{ padding: "0px" }}>
        <iframe
          src={`https://chukul.com/nepse-charts`}
          title="Stock Chart"
          width="98%"
          height="500"
          style={{ border: "1px solid #ccc" }}
        ></iframe>
      </div>
      <div className="stockto">
        <TopGainers stocks={gainers} />
        <TopLosers stocks={losers} />
        <TopVolume stocks={topVolume} />
        <TopTurnover stocks={topTurnover} />
        <TopTransaction stocks={topTransaction} />
      </div>
    </div>
  );
};

export default StockDashboard;
