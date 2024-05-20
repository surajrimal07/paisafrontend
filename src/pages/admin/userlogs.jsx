import React, { useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserLogs } from "../../apis/api.js";
import "./UserLogs.css";

const UserLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 100;

  const [filters, setFilters] = useState({
    environment: "",
    user: "",
    method: "",
    url: "",
    period: "",
    responseTime: "",
    statusCode: "",
    responseTimeFilter: "greater",
  });

  const fetchUserLogs = async () => {
    try {
      setLoading(true);
      const response = await getUserLogs();

      if (response.status === 200) {
        setLogs(response.data.data);
        setFilteredLogs(response.data.data);
      } else {
        toast.error("Error fetching user logs");
        setError("Error fetching user logs");
      }
    } catch (error) {
      toast.error("Error fetching user logs");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [filters, logs]);

  const filterLogs = () => {
    let filtered = logs;
    if (filters.environment) {
      filtered = filtered.filter((log) =>
        log.environment.includes(filters.environment)
      );
    }
    if (filters.user) {
      filtered = filtered.filter((log) =>
        log.user.toLowerCase().includes(filters.user.toLowerCase())
      );
    }
    if (filters.statusCode) {
      filtered = filtered.filter((log) =>
        String(log.statusCode).includes(filters.statusCode)
      );
    }

    if (filters.method) {
      filtered = filtered.filter((log) =>
        log.method.toLowerCase().includes(filters.method.toLowerCase())
      );
    }
    if (filters.url) {
      filtered = filtered.filter((log) =>
        log.url.includes(filters.url.toLocaleLowerCase())
      );
    }
    if (filters.responseTime) {
      const responseTimeValue = parseInt(filters.responseTime, 10);
      if (!isNaN(responseTimeValue)) {
        filtered = filtered.filter((log) => {
          const logResponseTime = parseInt(log.responseTime, 10);
          if (filters.responseTimeFilter === "greater") {
            return logResponseTime > responseTimeValue;
          } else {
            return logResponseTime < responseTimeValue;
          }
        });
      }
    }
    if (filters.period) {
      const now = new Date();
      const timestampFilter = now.getTime() - filters.period * 60000;

      filtered = filtered.filter(
        (log) => new Date(log.timestamp).getTime() > timestampFilter
      );
    }

    setFilteredLogs(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      environment: "",
      user: "",
      method: "",
      url: "",
      responseTime: "",
      statusCode: "",
      period: "",
      responseTimeFilter: "greater",
    });
  };

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const totalCount = filteredLogs.length;

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="user-logs-container">
      <h1>
        User Logs
        <span style={{ fontSize: "small", textTransform: "lowercase" }}>
            (total:
        </span>{" "}
        <span style={{ fontSize: "small", textTransform: "lowercase" }}>
          {totalCount} items)
        </span>
      </h1>

      <div className="filter-bar">
        <select
          name="environment"
          value={filters.environment}
          onChange={handleFilterChange}
        >
          <option value="">All Environments</option>
          <option value="production">Production</option>
          <option value="development">Development</option>
        </select>
        <input
          type="text"
          name="user"
          placeholder="User"
          value={filters.user}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="method"
          placeholder="Method"
          value={filters.method}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="url"
          placeholder="Endpoint"
          value={filters.url}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="statusCode"
          placeholder="statusCode"
          value={filters.statusCode}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="period"
          placeholder="period"
          value={filters.period}
          onChange={handleFilterChange}
        />
        <div className="response-time-filter">
          <select
            name="responseTimeFilter"
            value={filters.responseTimeFilter}
            onChange={handleFilterChange}
          >
            <option value="greater">Greater</option>
            <option value="lower">Lower</option>
          </select>
          <input
            type="text"
            name="responseTime"
            placeholder="Response Time"
            value={filters.responseTime}
            onChange={handleFilterChange}
          />

          <div className="clear-filter-button" onClick={clearFilters}>
            Clear
          </div>
        </div>
      </div>
      <table className="logs-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Method</th>
            <th>URL</th>
            <th>Status Code</th>
            <th>Response Time</th>
            <th>Timestamp</th>
            <th>Client IP</th>
            <th>Server Hostname</th>
            <th>Environment</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.user}</td>
              <td>{log.method}</td>
              <td>{log.url}</td>
              <td>{log.statusCode}</td>
              <td>{log.responseTime}</td>
              <td>{log.timestamp}</td>
              <td>{log.clientIP}</td>
              <td>{log.serverHostname}</td>
              <td>{log.environment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
      <div className="floating-icon">
        <div className="icon-container" onClick={fetchUserLogs}>
          <FaSyncAlt size={30} color="#fff" />
        </div>
      </div>
    </div>
  );
};

export default UserLogs;
