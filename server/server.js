// 1. Imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

// 2. Initialize app
const app = express();

// 3. Setup HTTP Server for Socket.IO
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// 4. Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 5. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Error: ", err));

// 6. Routes (ONLY DECLARE ONCE)
const documentRoutes = require("./routes/documents");
const authRoutes = require("./routes/auth");

app.use("/api/documents", documentRoutes);
app.use("/api/auth", authRoutes);

// 7. Models & Basic Meeting Routes
const Meeting = mongoose.model("Meeting", new mongoose.Schema({
  name: String, type: String, code: String, limit: Number, createdAt: { type: Date, default: Date.now }
}));

app.get("/api/meetings", async (req, res) => {
    const m = await Meeting.find().sort({ createdAt: -1 });
    res.json(m);
});

// 8. PAYMENT SYSTEM (NEW)
const Payment = mongoose.model("Payment", new mongoose.Schema({
  name: String,
  amount: Number,
  project: { type: String, default: "General" },
  status: { type: String, default: "Completed" },
  createdAt: { type: Date, default: Date.now }
}));

// GET: Fetch all transactions
app.get("/api/payments", async (req, res) => {
    try {
        const payments = await Payment.find().sort({ createdAt: -1 });
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch payments" });
    }
});

// POST: Add new payment transaction
app.post("/api/payments", async (req, res) => {
    try {
        const { name, amount, project } = req.body;
        const newPayment = new Payment({ name, amount, project });
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (err) {
        res.status(500).json({ error: "Payment processing failed" });
    }
});

// 9. Socket.IO Logic (Preserved)
io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// 10. Server Listener
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));