const express = require("express");
const app = express();

const responseRouter = require("./routes/response-route");
const adminRouter = require("./routes/admin-router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: " Welcome to the EOI challenge",
  });
});

app.use("/api/v1", responseRouter);
app.use("/api/v1/admin", adminRouter);
module.exports = app;
