# 📦 PBH Warehouse Management System (WMS)

A role-based MERN stack application to manage warehouse operations such as inventory, locations, suppliers, and shipments with user authentication and protected routes.

---

## 📖 Project Description

PBH WMS is a Warehouse Management System designed to help organizations efficiently:

- Manage inventory
- Track shipments
- Organize storage locations
- Maintain supplier records

It provides **role-based access** for **Admin**, **Manager**, and **Operator** users, ensuring that only authorized personnel can access and modify specific resources.

---

## 👥 Target Users

- Warehouse Staff  
- Admins  
- Logistics Managers  

---

## 🎯 Problem Solved

Manual warehouse operations often lead to human errors, lack of visibility, and operational delays. PBH WMS provides a centralized and secure platform to manage all critical warehouse activities in **real time**, improving efficiency and accountability.

---

## 🧱 Tech Stack

**MERN Stack:**

- 🔹 **MongoDB** – NoSQL document database  
- 🔹 **Express.js** – Web framework for Node.js  
- 🔹 **React.js** – Frontend UI library  
- 🔹 **Node.js** – JavaScript runtime environment  

**Other Tools & Libraries:**

- 🔐 **JWT** – Secure user authentication  
- 🔒 **bcrypt** – Password hashing  
- 📦 **Mongoose** – MongoDB ODM  
- 🚏 **React Router** – Client-side routing  
- 🎨 **CSS** – Custom styling  

---

## ✨ Features

- 🔐 JWT-based Authentication  
- 👥 Role-Based Access (Admin / Manager / Operator)  
- 📦 Inventory Management (CRUD)  
- 🏢 Supplier Management  
- 📍 Location Handling  
- 🚚 Incoming & Outgoing Shipments  
- 🧭 Dashboard Overview  
- ⛔ Unauthorized Access Handling  
- 🔒 Protected Routes (Frontend & Backend)  
- 🔓 Secure Logout  

---


## 🛠️ Installation & Setup

### 1. Clone the Repository

git clone https://github.com/your-username/pbh-wms.git
cd pbh-wms

Backend Setup:
cd backend
npm install

Frontend Setup:
cd ../frontend
npm install


Start backend:
cd backend
npm start

Start frontend:
cd ../frontend
npm start

🌐 Environment Variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

📁 Folder Structure:
pbh-wms/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js


👨‍💻 Author / Contact
Jayadeep Chenchugari
📧 Email: jayadeepchenchugari@gmail.com
🔗 GitHub: https://github.com/Jayadeepchenchugari
