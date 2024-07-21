// NetdataMetrics.js
import React, { useEffect, useState } from 'react';

const NetdataMetrics = () => {
  const [cpuData, setCpuData] = useState(null);
  const [memData, setMemData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cpuResponse = await fetch('http://192.168.42.27:19999/api/v1/data?chart=system.cpu');
        const memResponse = await fetch('http://192.168.42.27:19999/api/v1/data?chart=system.ram');

        if (!cpuResponse.ok || !memResponse.ok) {
          throw new Error(`HTTP error! status: ${cpuResponse.status} / ${memResponse.status}`);
        }

        const cpuData = await cpuResponse.json();
        const memData = await memResponse.json();

        console.log('CPU Data:', cpuData); // Inspect the API response
        console.log('Memory Data:', memData); // Inspect the API response

        setCpuData(cpuData);
        setMemData(memData);

        setError(null); // Clear any previous errors
      } catch (error) {
        setCpuData(null); // Clear data on error
        setMemData(null); // Clear data on error
        setError(`Error fetching Netdata data: ${error.message}`);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formatCpuUsage = (data) => {
    if (!data) return 'N/A';
    const cpuUsage = data.data[data.data.length - 1][6]; // Latest data point
    return `${cpuUsage.toFixed(2)}%`;
  };

  const formatMemoryUsage = (data) => {
    if (!data) return 'N/A';
    const memUsage = data.data[data.data.length - 1][2]; // Latest data point
    return `${(memUsage/1024).toFixed(2)} GB`; // Convert to GB
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6 text-center">Fredo Server Metrics</h2>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="flex justify-between">
            <div className="bg-gray-900 rounded-lg p-4 w-full mr-2">
              <h3 className="text-lg font-semibold text-white mb-2">CPU Usage</h3>
              <p className="text-gray-300 text-2xl">{formatCpuUsage(cpuData)}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 w-full ml-2">
              <h3 className="text-lg font-semibold text-white mb-2">Memory Usage</h3>
              <p className="text-gray-300 text-2xl">{formatMemoryUsage(memData)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetdataMetrics;
