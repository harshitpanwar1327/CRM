import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import './pieChart.css';
import { fetchUsers } from '../api/fetchapi.js'; // Assuming you have a fetch function for users

const PieChart = () => {
  const [magazineData, setMagazineData] = useState({});
  
  // Fetch data when the component is mounted
  useEffect(() => {
    const fetchMagazineData = async () => {
      try {
        // Fetch the number of records per magazine from your API
        const response = await fetchUsers(1, 1000); // Or any other function that returns magazine data
        const magazineCounts = response.magazineCounts;

        // Map the aggregated data into the chart format
        const magazineData = {};
        magazineCounts.forEach((item) => {
          magazineData[item._id] = item.count;
        });

        setMagazineData(magazineData);
      } catch (error) {
        console.error('Error fetching magazine data:', error);
      }
    };

    fetchMagazineData();
  }, []);

  // Ensure there is data before rendering the chart
  if (Object.keys(magazineData).length === 0) return <p>Loading...</p>;

  const options = {
    labels: Object.keys(magazineData),
    colors: ["#6886af", "#d7adbe", "#ab94b0", "#116594", "#242d62", "#585387", "#adb7dc", "#b6c6db", "#82465c", "#c56477"],
    legend: {
      position: "bottom",
    }
  };

  const series = Object.values(magazineData);

  return (
    <div className='pieChart-container'>
      <h3>Customers Chart</h3>
      <Chart options={options} series={series} type="pie" width={380} />
    </div>
  );
}

export default PieChart;
