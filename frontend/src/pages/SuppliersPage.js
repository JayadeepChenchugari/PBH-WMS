// src/pages/SuppliersPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/SuppliersPage.css";

const ITEMS_PER_PAGE = 5;

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    supplierCode: "",
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    active: true,
  });
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);

  const token = localStorage.getItem("token");

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/suppliers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuppliers(res.data);
    } catch {
      alert("Failed to load suppliers.");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/suppliers", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        supplierCode: "",
        name: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        active: true,
      });
      fetchSuppliers();
    } catch {
      alert("Failed to add supplier.");
    }
  };

  const handleDelete = async (id, isActive) => {
    if (isActive) return alert("Cannot delete an active supplier.");
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSuppliers();
    } catch {
      alert("Failed to delete supplier.");
    }
  };

  const startEdit = (supplier) => {
    setEditId(supplier._id);
    setEditForm({ ...supplier });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/suppliers/${editId}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditId(null);
      fetchSuppliers();
    } catch {
      alert("Failed to update supplier.");
    }
  };

  const filtered =
    filter === "all"
      ? suppliers
      : suppliers.filter((s) => s.active === (filter === "active"));

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "status") return b.active - a.active;
    return 0;
  });

  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);

  return (
    <div className="page-wrapper">
      <Header />
      <div className="content">
        <h2>Suppliers</h2>

        <form onSubmit={handleSubmit} className="supplier-form">
          <input
            type="text"
            name="supplierCode"
            placeholder="Supplier Code (e.g., SUP123)"
            value={form.supplierCode}
            onChange={handleChange}
            required
          />
          <input
            name="name"
            placeholder="Supplier Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="contactPerson"
            placeholder="Contact Person"
            value={form.contactPerson}
            onChange={handleChange}
          />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <label>
            <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
            Active
          </label>
          <button type="submit">Add Supplier</button>
        </form>

        <div className="filter-controls">
          <label>Filter: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <label>Sort By: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </div>

        <table className="suppliers-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((s) => (
              <tr key={s._id} className={!s.active ? "inactive" : ""}>
                {editId === s._id ? (
                  <>
                    <td><input value={editForm.supplierCode} onChange={(e) => setEditForm({ ...editForm, supplierCode: e.target.value })} /></td>
                    <td><input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} /></td>
                    <td><input value={editForm.contactPerson || ""} onChange={(e) => setEditForm({ ...editForm, contactPerson: e.target.value })} /></td>
                    <td><input value={editForm.email || ""} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} /></td>
                    <td><input value={editForm.phone || ""} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} /></td>
                    <td>
                      <select
                        value={editForm.active ? "active" : "inactive"}
                        onChange={(e) =>
                          setEditForm({ ...editForm, active: e.target.value === "active" })
                        }
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={saveEdit}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{s.supplierCode}</td>
                    <td>{s.name}</td>
                    <td>{s.contactPerson || "—"}</td>
                    <td>{s.email || "—"}</td>
                    <td>{s.phone || "—"}</td>
                    <td>{s.active ? "Active" : "Inactive"}</td>
                    <td>
                      <button className="edit-btn" onClick={() => startEdit(s)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(s._id, s.active)} disabled={s.active}>
                      Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={page === i + 1 ? "active" : ""} onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuppliersPage;
