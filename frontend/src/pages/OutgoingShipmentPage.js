import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/OutgoingShipmentPage.css";

const OutgoingShipmentPage = () => {
  const [form, setForm] = useState({ item: "", quantity: "", customerName: "", address: "" });
  const [items, setItems] = useState([]);
  const [shipments, setShipments] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get("http://localhost:5000/api/inventory", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    };
    const fetchShipments = async () => {
      const res = await axios.get("http://localhost:5000/api/outgoing-shipments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShipments(res.data);
    };

    fetchItems();
    fetchShipments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/outgoing-shipments", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Shipment created!");
      setForm({ item: "", quantity: "", customerName: "", address: "" });
      window.location.reload();
    } catch {
      alert("Failed to create shipment.");
    }
  };

  return (
    <>
      <Header />
      <div className="inventory-top-space" />
      <div className="content">
        <h2>📦 Outgoing Shipments</h2>
        <form className="shipment-form" onSubmit={handleSubmit}>
          <select name="item" value={form.item} onChange={handleChange} required>
            <option value="">Select Item</option>
            {items.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name} (Stock: {i.quantity})
              </option>
            ))}
          </select>
          <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
          <input name="customerName" placeholder="Customer Name" value={form.customerName} onChange={handleChange} />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <button type="submit">Create Shipment</button>
        </form>

        <h3>Shipment History</h3>
        <table className="shipment-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr key={s._id}>
                <td>{s.item?.name || "N/A"}</td>
                <td>{s.quantity}</td>
                <td>{s.customerName}</td>
                <td>{s.address}</td>
                <td>{new Date(s.shippedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OutgoingShipmentPage;
