import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServerInfo = () => {
  const [serverInfo, setServerInfo] = useState(null);
  const [serverInfoHistory, setServerInfoHistory] = useState([]);

  useEffect(() => {
    const fetchServerInfo = async () => {
      try {
        const response = await axios.get('https://192.168.42.34:3001/server-info');
        setServerInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch server info:', error.message);
      }
    };

    const fetchServerInfoHistory = async () => {
      try {
        const response = await axios.get('http://192.168.42.34:3001/server-info-history');
        setServerInfoHistory(response.data);
      } catch (error) {
        console.error('Failed to fetch server info history:', error.message);
      }
    };

    fetchServerInfo();
    fetchServerInfoHistory();

    const interval = setInterval(() => {
      fetchServerInfo();
      fetchServerInfoHistory();
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString(); // Format date as "MM/DD/YYYY"
    const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); // Format time as "HH:MM AM/PM"
    return `${dateString} ${timeString}`;
  };

  return (
    <div className="bg-gray-800 text-gray-100 p-4 rounded">
      <h1 className="text-xl font-bold mb-4">Server Information</h1>
      {serverInfo && (
        <div className="mb-4">
          <strong>Current Information</strong>
          <ul className="divide-y divide-gray-300">
            <li className="py-2">
              <strong>Timestamp:</strong> {formatTimestamp(Date.now())}<br />
              <strong>CPU Load:</strong> {serverInfo.cpuLoad.toFixed(2)}%<br />
              <strong>RAM Usage:</strong> {((serverInfo.totalMemory - serverInfo.freeMemory) / Math.pow(1024, 3)).toFixed(2)} GB<br />
              {serverInfo.gpuInfo && (
                <>
                  <strong>GPU Name:</strong> {serverInfo.gpuInfo.name}<br />
                  <strong>GPU Memory:</strong> {serverInfo.gpuInfo.memoryTotal} MB<br />
                </>
              )}
            </li>
          </ul>
        </div>
      )}
      {serverInfoHistory.length > 0 && (
        <div>
          <strong>Last Hour History</strong>
          <ul className="divide-y divide-gray-300">
            {serverInfoHistory.map((info, index) => (
              <li key={index} className="py-2">
                <strong>Timestamp:</strong> {formatTimestamp(info.timestamp)}<br />
                <strong>CPU Load:</strong> {info.cpuLoad.toFixed(2)}%<br />
                <strong>RAM Usage:</strong> {((info.totalMemory - info.freeMemory) / Math.pow(1024, 3)).toFixed(2)} GB<br />
                {info.gpuInfo && (
                  <>
                    <strong>GPU Name:</strong> {info.gpuInfo.name}<br />
                    <strong>GPU Memory:</strong> {info.gpuInfo.memoryTotal} MB<br />
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServerInfo;
