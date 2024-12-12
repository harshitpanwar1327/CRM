import { useEffect, useState } from 'react';
import './dashboard.css';
import Menubar from '../components/Menubar';
import { fetchRecords, fetchUsers } from '../api/fetchapi.js';
import { fetchAdmins } from '../services/FirestoreManager';
import DataBoxes from '../components/DataBoxes';
import BarGraph from '../components/BarGraph';
import PieChart from '../components/PieChart';
import PriortyCustomers from '../components/TopCustomerTable.jsx';
import '../components/stats.css';

const Dashboard = () => {
  const [data, setData] = useState({
    sales: {
      title: "Total Sales",
      amount: 0,
      backgroundColor: "#ffe7e7",
      icon: <i className="fa-solid fa-money-bill-trend-up"></i>
    },
    customers: {
      title: "Total Customers",
      amount: 0,
      backgroundColor: "#caa6a6",
      icon: <i className="fa-solid fa-user"></i>
    },
    viewers: {
      title: "Total Viewers",
      amount: 0,
      backgroundColor: "#b47b84",
      icon: <i className="fa-solid fa-users-viewfinder"></i>
    },
    admins: {
      title: "Total Admins",
      amount: 0,
      backgroundColor: "#944e63",
      icon: <i className="fa-solid fa-laptop-code"></i>
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesData, userData, adminData] = await Promise.all([
          fetchRecords(1, 1000), 
          fetchUsers(1, 1000),
          fetchAdmins(),
        ]);

        setData((prevState) => ({
          ...prevState,
          sales: {
            ...prevState.sales,
            amount: salesData.totalAmount || 0,
          },
          customers: {
            ...prevState.customers,
            amount: salesData.totalRecords || 0,
          },
          admins: {
            ...prevState.admins,
            amount: adminData.length || 0,
          },
          viewers: {
            ...prevState.viewers,
            amount: userData.totalRecords,
          }
        }));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className='dashboard-body'>
      <Menubar heading='Dashboard' />
      <div className='dashboard-content'>
        <div className="data-boxes">
          {Object.keys(data).map((category, index) => (
            <DataBoxes key={index} data={data[category]} />
          ))}
        </div>
        <div className="charts">
          <BarGraph />
          <PieChart />
        </div>
        <div className="priortyCustomers">
          <PriortyCustomers/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;