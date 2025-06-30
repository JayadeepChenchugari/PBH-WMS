// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import LocationsPage from "./pages/LocationsPage";
import SuppliersPage from "./pages/SuppliersPage";
import IncomingShipmentsPage from "./pages/IncomingShipmentsPage";
import OutgoingShipmentPage from "./pages/OutgoingShipmentPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* 🔐 Role-based protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "operator"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "operator"]}>
              <InventoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/locations"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <LocationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/suppliers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SuppliersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shipments/incoming"
          element={
            <ProtectedRoute allowedRoles={["admin", "operator"]}>
              <IncomingShipmentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shipments/outgoing"
          element={
            <ProtectedRoute allowedRoles={["admin", "operator"]}>
              <OutgoingShipmentPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
