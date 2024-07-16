import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getSupplyDemand } from "../../apis/api";
import { useWebSocket } from "../../component/websocket/websocket";
import "./App.css";

const Supplydemand = () => {
  const { supplyDemandNotification } = useWebSocket();

  const [data, setData] = useState({
    highestQuantityperOrder: [],
    highestSupply: [],
    highestDemand: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSupplyDemand();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching supply and demand data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (supplyDemandNotification) {
      const { highestQuantityperOrder, highestSupply, highestDemand } =
        supplyDemandNotification;
      setData({
        highestQuantityperOrder,
        highestSupply,
        highestDemand,
      });
    }
  }, [supplyDemandNotification]);

  const highestcolumns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Order Side",
      dataIndex: "orderSide",
      key: "orderSide",
      render: (text) => text.split(" ")[0],
    },
    {
      title: "Buy Quantity",
      dataIndex: "totalBuyQuantity",
      key: "totalBuyQuantity",
    },
    {
      title: "Sell Quantity",
      dataIndex: "totalSellQuantity",
      key: "totalSellQuantity",
    },
    {
      title: "Buy Quantity Per Order",
      dataIndex: "buyQuantityPerOrder",
      key: "buyQuantityPerOrder",
    },
    {
      title: "Sell Quantity Per Order",
      dataIndex: "sellQuantityPerOrder",
      key: "sellQuantityPerOrder",
    },
    {
      title: "Buy to Sell Order",
      dataIndex: "buyToSellOrderRatio",
      key: "buyToSellOrderRatio",
    },
    {
      title: "Buy to Sell Quantity",
      dataIndex: "buyToSellQuantityRatio",
      key: "buyToSellQuantityRatio",
    },
  ];

  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      width: 100, // Smaller width for the second and third tables
    },
    {
      title: "Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      width: 100,
    },
    {
      title: "Order",
      dataIndex: "totalOrder",
      key: "totalOrder",
      width: 100,
    },
    {
      title: "Quantity Per Order",
      dataIndex: "quantityPerOrder",
      key: "quantityPerOrder",
      width: 100,
    },
  ];

  return (
    <div className="app">
      <div className="tables-container">
        <div className="table">
          <h2>Highest Quantity per Order</h2>
          <Table
            dataSource={data.highestQuantityperOrder}
            columns={highestcolumns}
            pagination={{ pageSize: 20 }}
          />
        </div>
        <div className="table">
          <h2>Highest Supply</h2>
          <Table
            dataSource={data.highestSupply}
            columns={columns}
            pagination={{ pageSize: 20 }}
          />
        </div>
        <div className="table">
          <h2>Highest Demand</h2>
          <Table
            dataSource={data.highestDemand}
            columns={columns}
            pagination={{ pageSize: 20 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Supplydemand;
