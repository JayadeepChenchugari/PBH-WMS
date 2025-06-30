import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalInventory: 0,
    totalSuppliers: 0,
    totalLocations: 0,
    lowStockItems: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h2>📊 Warehouse Dashboard</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="dashboard-grid">
            <div className="card">
              <div className="emoji">📦</div>
              <div>
                <h4>Total Inventory</h4>
                <p>{stats.totalInventory}</p>
              </div>
            </div>
            <div className="card">
              <div className="emoji">🏬</div>
              <div>
                <h4>Total Locations</h4>
                <p>{stats.totalLocations}</p>
              </div>
            </div>
            <div className="card">
              <div className="emoji">🚚</div>
              <div>
                <h4>Total Suppliers</h4>
                <p>{stats.totalSuppliers}</p>
              </div>
            </div>
            <div className="card">
              <div className="emoji">⚠️</div>
              <div>
                <h4>Low Stock Items</h4>
                <p>{stats.lowStockItems}</p>
              </div>
            </div>
            <div className="card">
              <div className="emoji">📑</div>
              <div>
                <h4>Total Orders</h4>
                <p>{stats.totalOrders}</p>
              </div>
            </div>
            <div className="card">
              <div className="emoji">👥</div>
              <div>
                <h4>Total Users</h4>
                <p>{stats.totalUsers}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
