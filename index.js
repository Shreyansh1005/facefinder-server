require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const photoRoutes = require("./routes/photoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo connected"))
.catch(err=>console.log(err));

app.use("/api", photoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});