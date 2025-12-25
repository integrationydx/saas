const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/org", require("./routes/org"));
app.use("/api/billing", require("./routes/billing"));
app.use("/api/usage", require("./routes/usage"));

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);

app.use("/api/org", require("./routes/org"));
