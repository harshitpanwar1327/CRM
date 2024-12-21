import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { fetchRecords } from '../api/fetchapi.js';
import './barGraph.css';

const Bargraph = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesData = await fetchRecords(1, 100);
        const magazineSales = salesData.magazineSales || [];

        // Round off sales to nearest integer
        const categories = magazineSales.map((item) => item._id || "Unknown");
        const series = magazineSales.map((item) => Math.round(item.totalSales) || 0);  // Round the sales value

        setChartData({ categories, series });
      } catch (error) {
        console.error("Error fetching bargraph data:", error);
        setChartData({ categories: [], series: [] });
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      height: 350,
      type: 'line',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'category',
      categories: chartData.categories.length ? chartData.categories : ["No Data"],
    },
    yaxis: {
      title: {
        text: 'Sales',
      },
    },
  };

  const series = [
    {
      name: 'Sales',
      data: chartData.series.length ? chartData.series : [0],
    },
  ];

  return (
    <div className='barGraph-container'>
      <h3>Sales Graph</h3>
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default Bargraph;