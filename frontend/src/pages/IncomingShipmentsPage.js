import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/IncomingShipmentsPage.css";

const IncomingShipmentsPage = () => {
  const [form, setForm] = useState({
    sku: "",
    name: "",
    quantity: "",
    supplier: "",
    receivedDate: "",
    location: "", // ✅ new field
  });

  const [shipments, setShipments] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [locations, setLocations] = useState([]); // ✅ location state
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchShipments = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/shipments/incoming`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShipments(res.data);
    } catch (err) {
      console.error("Error fetching shipments", err);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/suppliers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuppliers(res.data);
    } catch (err) {
      console.error("Error fetching suppliers", err);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/locations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(res.data);
    } catch (err) {
      console.error("Error fetching locations", err);
    }
  };

  useEffect(() => {
    fetchShipments();
    fetchSuppliers();
    fetchLocations(); // ✅ fetch location data
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/shipments/incoming`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ sku: "", name: "", quantity: "", supplier: "", receivedDate: "", location: "" });
      fetchShipments();
    } catch (err) {
      console.error("Error adding shipment", err);
    }
  };

  return (
    <>
      <Header />
      <div className="page-wrapper">
        <div className="content">
          <h2>📦 Incoming Shipments</h2>

          <form className="shipment-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="sku"
              placeholder="SKU (e.g., SKU123)"
              value={form.sku}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />
            <select name="supplier" value={form.supplier} onChange={handleChange} required>
              <option value="">Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* ✅ Location selector */}
            <select name="location" value={form.location} onChange={handleChange} required>
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc._id}>
                  {loc.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="receivedDate"
              value={form.receivedDate}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Shipment</button>
          </form>

          <table className="shipments-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Received Date</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s, i) => (
                <tr key={i}>
                  <td>{s.sku || "N/A"}</td>
                  <td>{s.name || s.product}</td>
                  <td>{s.quantity}</td>
                  <td>{s.supplier?.name || s.supplier || "Unknown"}</td>
                  <td>{new Date(s.receivedDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default IncomingShipmentsPage;
