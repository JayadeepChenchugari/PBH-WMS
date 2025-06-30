// src/pages/NotFoundPage.js
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="notfound-content">
        <h1>404</h1>
        <p>Oops! The page you are looking for doesn’t exist.</p>
        <Link to="/" className="back-home">Go Back Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
