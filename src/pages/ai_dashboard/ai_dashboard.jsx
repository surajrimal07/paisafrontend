import React, { useEffect, useState } from "react";
import { FaCubes } from "react-icons/fa";
import { getIndexDataforCharts } from "../../apis/api";
import "./ai.css";
import { createChart, CrosshairMode } from "lightweight-charts";

const AIDashboard = () => {
  const [indexData, setIndexData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartCreated, setChartCreated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getIndexDataforCharts();
        if (isValidResponse(response)) {
          const data = response.data;
          if (isValidDataFormat(data)) {
            setIndexData(transformDataFormat(data));
            setLoading(false);
          } else {
            console.error("Data format is not as expected:", data);
          }
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching NRB data:", error);
      }
    };

    fetchData();
  }, []);

  const isValidResponse = (response) => response && response.data;

  const isValidDataFormat = (data) =>
    data &&
    Array.isArray(data.t) &&
    Array.isArray(data.c) &&
    Array.isArray(data.o) &&
    Array.isArray(data.h) &&
    Array.isArray(data.l);

  const transformDataFormat = (data) =>
    data.t.map((time, index) => ({
      time,
      close: data.c[index],
      open: data.o[index],
      high: data.h[index],
      low: data.l[index],
      volume: data.v ? parseFloat(data.v[index]) : null,
    }));

  useEffect(() => {
    if (!loading && indexData && !chartCreated) {
      const chartContainer = document.getElementById("chart-container");
      if (chartContainer) {
        const chart = createChart(chartContainer, {
          width: chartContainer.offsetWidth,
          height: 500,
          crosshair: {
            mode: CrosshairMode.Normal,
          },
          priceScale: {
            position: "right",
          },
          timeScale: {
            rightOffset: 12,
            barSpacing: 3,
            fixLeftEdge: true,
            lockVisibleTimeRangeOnResize: true,
            rightBarStaysOnScroll: true,
            borderVisible: false,
            visible: true,
            timeVisible: true,
            secondsVisible: false,
            millisecondsVisible: false,
            tickMarkFormatter: (time, tickMarkType, locale) => {
              if (!time) return "";
              const date = new Date(time * 1000);
              return date.toLocaleDateString(locale, {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
            },
          },
        });

        // Create a new candlestick series
        const candlestickSeries = chart.addCandlestickSeries();
        candlestickSeries.setData(indexData);

        // Create a new volume series below the main series
        const volumeSeries = chart.addHistogramSeries({
          color: "#26a69a",
          lineWidth: 2,
          priceScaleId: "volume",
          priceFormat: {
            type: "volume",
          },
          overlay: true,
          scaleMargins: {
            top: 0.8,
            bottom: 0,
          },
        });

        // Normalize volume data
        const maxVolume = Math.max(
          ...indexData.map((data) => data.volume || 0)
        );
        const normalizedVolumeData = indexData.map(({ time, volume }) => ({
          time,
          value: volume ? (volume / maxVolume) * 100 : 0,
        }));
        volumeSeries.setData(normalizedVolumeData);

        chart.timeScale().setVisibleRange({
          from: indexData[indexData.length - 50].time,
          to: indexData[indexData.length - 1].time,
        });

        setChartCreated(true);
      }
    }
  }, [loading, indexData, chartCreated]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" data-testid="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return <div id="chart-container" className="chart-container"></div>;
};

export default AIDashboard;
