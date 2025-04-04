const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/Week5-DB", {});

// API Routes
app.use("/api", projectRoutes);

// Serve index.html from /views folder on the root route (/)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App listening on port: " + port);
});
