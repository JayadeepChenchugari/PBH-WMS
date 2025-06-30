import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/LocationsPage.css";

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({ name: "", type: "shelf", description: "", capacity: "" });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterType, setFilterType] = useState("");
  const token = localStorage.getItem("token");

  const fetchLocations = async () => {
    const res = await axios.get("http://localhost:5000/api/locations", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLocations(res.data);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/locations/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:5000/api/locations", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ name: "", type: "shelf", description: "", capacity: "" });
      setEditMode(false);
      setEditId(null);
      fetchLocations();
    } catch (err) {
      alert("Error saving location");
    }
  };

  const handleEdit = (loc) => {
    setForm({
      name: loc.name,
      type: loc.type,
      description: loc.description,
      capacity: loc.capacity,
    });
    setEditId(loc._id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this location?")) return;
    await axios.delete(`http://localhost:5000/api/locations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchLocations();
  };

  const filteredLocations = filterType
    ? locations.filter((loc) => loc.type === filterType)
    : locations;

  return (
    <>
      <Header />
      <div className="page-wrapper">
        <div className="content">
          <h2>📍 Warehouse Locations</h2>

          <form onSubmit={handleSubmit} className="location-form">
            <input name="name" placeholder="Location Name" value={form.name} onChange={handleChange} required />
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="shelf">Shelf</option>
              <option value="bin">Bin</option>
              <option value="zone">Zone</option>
              <option value="floor">Floor</option>
              <option value="warehouse">Warehouse</option>
            </select>
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            <input name="capacity" type="number" placeholder="Capacity" value={form.capacity} onChange={handleChange} />
            <button type="submit">{editMode ? "Update" : "Add"} Location</button>
          </form>

          <div className="filter-bar">
            <label>Filter by Type: </label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="">All</option>
              <option value="shelf">Shelf</option>
              <option value="bin">Bin</option>
              <option value="zone">Zone</option>
              <option value="floor">Floor</option>
              <option value="warehouse">Warehouse</option>
            </select>
          </div>

          <table className="locations-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocations.map((loc) => (
                <tr key={loc._id}>
                  <td>{loc.name}</td>
                  <td>{loc.type}</td>
                  <td>{loc.description || "N/A"}</td>
                  <td>{loc.capacity ? `${loc.capacity} items` : "N/A"}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(loc)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(loc._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LocationsPage;
