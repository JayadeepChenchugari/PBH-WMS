import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/InventoryPage.css";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [locations, setLocations] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    quantity: "",
    location: "",
    supplier: "",
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const token = localStorage.getItem("token");

  const fetchInventory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/inventory`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setInventory(res.data);
  };

  const fetchData = async () => {
    const [locRes, supRes] = await Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}/api/locations`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${process.env.REACT_APP_API_URL}/api/suppliers`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);
    setLocations(locRes.data);
    setSuppliers(supRes.data);
  };

  useEffect(() => {
    fetchInventory();
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/inventory`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", sku: "", quantity: "", location: "", supplier: "" });
      fetchInventory();
    } catch {
      alert("Failed to add inventory item.");
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditForm({
      name: item.name,
      sku: item.sku,
      quantity: item.quantity,
      location: item.location?._id || "",
      supplier: item.supplier?._id || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/inventory/${editId}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditId(null);
      fetchInventory();
    } catch {
      alert("Failed to update item.");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/inventory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInventory();
    } catch {
      alert("Failed to delete item.");
    }
  };

  return (
    <>
      <Header />
      <div className="inventory-top-space" />
      <div className="inventory-container">
        <div className="inventory-header">
          <h2>Inventory Management</h2>
        </div>

        <form className="inventory-form" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Item Name" required />
          <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU" required />
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" required />
          <select name="location" value={form.location} onChange={handleChange} required>
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.name}
              </option>
            ))}
          </select>
          <select name="supplier" value={form.supplier} onChange={handleChange} required>
            <option value="">Select Supplier</option>
            {suppliers.map((sup) => (
              <option key={sup._id} value={sup._id}>
                {sup.name}
              </option>
            ))}
          </select>
          <button type="submit">Add Item</button>
        </form>

        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item._id}>
                  {editId === item._id ? (
                    <>
                      <td><input name="name" value={editForm.name} onChange={handleEditChange} /></td>
                      <td><input name="sku" value={editForm.sku} onChange={handleEditChange} /></td>
                      <td><input type="number" name="quantity" value={editForm.quantity} onChange={handleEditChange} /></td>
                      <td>
                        <select name="location" value={editForm.location} onChange={handleEditChange}>
                          <option value="">Select</option>
                          {locations.map((loc) => (
                            <option key={loc._id} value={loc._id}>{loc.name}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select name="supplier" value={editForm.supplier} onChange={handleEditChange}>
                          <option value="">Select</option>
                          {suppliers.map((sup) => (
                            <option key={sup._id} value={sup._id}>{sup.name}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button onClick={saveEdit}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td>
                      <td>{item.sku}</td>
                      <td>{item.quantity}</td>
                      <td>{item.location?.name || "N/A"}</td>
                      <td>{item.supplier?.name || "N/A"}</td>
                      <td>
                        <button onClick={() => startEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
