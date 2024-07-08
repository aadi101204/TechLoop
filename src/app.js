const express = require("express");
const app = express();
const path = require("path");

//loading up static files and middleware
app.use(express.static(path.resolve(__dirname, "../public")));

//home page route
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
