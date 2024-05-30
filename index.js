const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Trang chủ");
});

app.get("/products", (req, res) => {
  res.send("Trang danh sách sản phẩm");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});