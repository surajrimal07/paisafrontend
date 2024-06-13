import React, { useCallback, useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaArrowsAltH } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { getStockInfo } from "../../apis/api";

import "./stock.css";
import { toast } from "react-toastify";

const StockDetailView = () => {
  const location = useLocation();
  const stockSymbol = new URLSearchParams(location.search).get("symbol");
  const [completeStockInfo, setCompleteStockInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetailedStockInfo = useCallback(async () => {
    try {
      const response = await getStockInfo(stockSymbol);
      const data = response.data;

      if (data) {
        setCompleteStockInfo(data.data);
        setLoading(false);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [stockSymbol]);

  useEffect(() => {
    fetchDetailedStockInfo();
  }, [fetchDetailedStockInfo]);

  if (!completeStockInfo) {
    return null;
  }

  const {
    securityDailyTradeDto,
    security,
    stockListedShares,
    paidUpCapital,
    issuedCapital,
    marketCapitalization,
    publicShares,
    publicPercentage,
    promoterShares,
    promoterPercentage,
  } = completeStockInfo;

  const pointChange =
    securityDailyTradeDto.previousClose - securityDailyTradeDto.lastTradedPrice;
  const percentChange = (
    (pointChange / securityDailyTradeDto.previousClose) *
    100
  ).toFixed(2);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" data-testid="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="stocktitle">
        {security.securityName} ({security.symbol})
      </h2>

      <div style={{ padding: "10px" }}>
        <iframe
          src={`https://chukul.com/nepse-charts?symbol=${stockSymbol}`}
          title="Stock Chart"
          width="100%"
          height="500"
          style={{ border: "1px solid #ccc" }}
        ></iframe>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>General Information</h4>
            </div>
            <div className="card-body">
              <p>
                <strong>IssuedCapital:</strong> {issuedCapital}
              </p>
              <p>
                <strong>MarketCapitalization:</strong> {marketCapitalization}
              </p>
              <p>
                <strong>PaidUpCapital:</strong> {paidUpCapital}
              </p>
              <p>
                <strong>PromoterPercentage:</strong> {promoterPercentage}
              </p>
              <p>
                <strong>PromoterShares:</strong> {promoterShares}
              </p>
              <p>
                <strong>PublicPercentage:</strong> {publicPercentage}
              </p>
              <p>
                <strong>PublicShares:</strong> {publicShares}
              </p>
              <p>
                <strong>Listed Shares:</strong> {stockListedShares}
              </p>
              <p>
                <strong>Category:</strong> {security.instrumentType.description}
              </p>
              <p>
                <strong>Sector:</strong>{" "}
                {security.companyId.sectorMaster.sectorDescription}
              </p>
              <p>
                <strong>RegulatoryBody :</strong>{" "}
                {security.companyId.sectorMaster.regulatoryBody}
              </p>

              <p>
                <strong>ListingDate:</strong>Rs {security.listingDate}
              </p>
              <p>
                <strong>ContactPerson:</strong>Rs{" "}
                {security.companyId.companyContactPerson}
              </p>
              <p>
                <strong>email:</strong>Rs {security.companyId.email}
              </p>
              {/* Remove Turnover if not available */}
              {security.Turnover && (
                <p>
                  <strong>Turnover:</strong> {security.Turnover}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Price Information</h4>
            </div>
            <div className="card-body">
              <p>
                <strong>LTP (Last Trade Price):</strong>{" "}
                {securityDailyTradeDto.lastTradedPrice}
              </p>
              <p>
                <strong>Open:</strong>Rs {securityDailyTradeDto.open}
              </p>
              <p>
                <strong>High:</strong>Rs {securityDailyTradeDto.high}
              </p>
              <p>
                <strong>Low:</strong>Rs {securityDailyTradeDto.low}
              </p>
              <p>
                <strong>Volume:</strong>{" "}
                {securityDailyTradeDto.totalTradeQuantity} Units
              </p>
              <p>
                <strong>TotalTrades:</strong>{" "}
                {securityDailyTradeDto.totalTrades} Transactions
              </p>
              <p>
                <strong>Intraday Volatility:</strong>Rs{" "}
                {securityDailyTradeDto.high - securityDailyTradeDto.low}
              </p>
              <p>
                <strong>Previous Close:</strong>Rs{" "}
                {securityDailyTradeDto.previousClose}
              </p>
              <p>
                <strong>Week 52 High:</strong>Rs{" "}
                {securityDailyTradeDto.fiftyTwoWeekHigh}
              </p>
              <p>
                <strong>Week 52 Low:</strong>Rs{" "}
                {securityDailyTradeDto.fiftyTwoWeekLow}
              </p>
              <p>
                <strong>Updated at:</strong>{" "}
                {securityDailyTradeDto.lastUpdatedDateTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4" style={{ marginBottom: "20px" }}>
        <div className="card-header">
          <h4>Price Changes</h4>
        </div>
        <div className="card-body">
          <p>
            <strong>Percent Change:</strong>
            <span
              style={{
                color:
                  percentChange > 0
                    ? "green"
                    : percentChange < 0
                    ? "red"
                    : "black",
              }}
            >
              {percentChange}%
              {percentChange > 0 ? (
                <FaArrowUp style={{ color: "green" }} />
              ) : percentChange < 0 ? (
                <FaArrowDown style={{ color: "red" }} />
              ) : (
                <FaArrowsAltH style={{ color: "black" }} />
              )}
            </span>
          </p>
          <p>
            <strong>Point Change:</strong>
            <span
              style={{
                color:
                  pointChange > 0 ? "green" : pointChange < 0 ? "red" : "black",
              }}
            >
              Rs {pointChange}
              {pointChange > 0 ? (
                <FaArrowUp style={{ color: "green" }} />
              ) : pointChange < 0 ? (
                <FaArrowDown style={{ color: "red" }} />
              ) : (
                <FaArrowsAltH style={{ color: "black" }} />
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockDetailView;
