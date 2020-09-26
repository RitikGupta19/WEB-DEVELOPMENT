const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Connecting DB
connectDB();

// Init BodyPARSER type Role
app.use(express.json({ extended: false }));

// Connecting Express
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("APP RUNNING!"));

// Defining ROUTES
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(PORT, () => console.log(`Server Running At ${PORT}`));
