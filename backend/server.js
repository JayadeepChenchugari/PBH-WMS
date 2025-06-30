const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
// Load env
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/shipments', require('./routes/shipments'));
app.use('/api/returns', require('./routes/returns'));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/audits', require('./routes/audits'));
app.use("/api/outgoing-shipments", require("./routes/outgoingShipmentRoutes"));
app.use("/api/stock-movements", require("./routes/stockRoutes"));


app.get('/', (req, res) => res.send('📦 WMS Backend is live!'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
