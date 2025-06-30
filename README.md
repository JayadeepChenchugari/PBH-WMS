📦 PBH Warehouse Management System (WMS)
A role-based MERN stack application to manage warehouse operations such as inventory, locations, suppliers, and shipments with user authentication and protected routes.

📖 Project Description
PBH WMS is a Warehouse Management System built to help organizations efficiently manage inventory, monitor incoming and outgoing shipments, organize locations, and track supplier data.
It provides role-based access for admin, manager, and operator users, ensuring only authorized personnel can perform specific operations.

👥 Target Users
Warehouse Staff

Admins

Logistics Managers

🎯 Problem Solved
Manual tracking of warehouse operations often leads to errors, delays, and lack of visibility. PBH WMS solves this by providing a centralized, secure, and real-time platform for warehouse management.

🧱 Tech Stack
This is a MERN stack project:

MongoDB – Document-based NoSQL database

Express.js – REST API backend framework

React.js – Frontend library for UI

Node.js – Runtime for backend logic

Other tools & libraries used:

JWT for authentication

bcrypt for password hashing

Mongoose for MongoDB object modeling

React Router for routing

CSS (custom styles)

✨ Features
🔐 JWT Authentication

👥 Role-Based Access (Admin / Manager / Operator)

📦 Inventory Management (CRUD)

🏢 Supplier Management

📍 Location Handling

🚚 Incoming & Outgoing Shipments

🧭 Dashboard

⛔ Unauthorized Access Handling

🔒 Protected Routes (Frontend & Backend)

🧾 Logout Functionality

🖼️ Screenshots
(Optional) Add screenshots/GIFs of:

Dashboard

Login/Register page

Role-based navigation

Inventory & Supplier list

You can add images like this:

markdown
Copy
Edit
![Login Page](./screenshots/login.png)
🛠️ Installation & Setup Instructions
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/pbh-wms.git
Backend Setup

bash
Copy
Edit
cd backend
npm install
Frontend Setup

bash
Copy
Edit
cd ../frontend
npm install
Start the Application

Start backend:

bash
Copy
Edit
cd backend
npm start
Start frontend:

bash
Copy
Edit
cd ../frontend
npm start
🌐 Environment Variables
Create a .env file inside the backend folder with the following variables:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
📁 Folder Structure
pgsql
Copy
Edit
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
📡 API Documentation
✅ Auth Routes
Method	Endpoint	Description
POST	/api/auth/login	User Login
POST	/api/auth/register	Register new user

📦 Inventory Routes
Method	Endpoint	Description
GET	/api/inventory	Get inventory list
POST	/api/inventory	Add inventory item
PUT	/api/inventory/:id	Update inventory
DELETE	/api/inventory/:id	Delete inventory

(Similarly for Locations, Shipments, and Suppliers)

🪪 License
This project is licensed under the MIT License.

👨‍💻 Author / Contact
Jayadeep Chenchugari
📧 Email: your-email@example.com
🔗 GitHub: your-github-profile
