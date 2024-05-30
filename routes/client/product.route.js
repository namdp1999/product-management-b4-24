const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("client/pages/products/index");
});

// Ví dụ
// router.post("/create", (req, res) => {
//   res.render("client/pages/products/create");
// });

// router.patch("/edit", (req, res) => {
//   res.render("client/pages/products/edit");
// });

// router.get("/detail", (req, res) => {
//   res.render("client/pages/products/detail");
// });

module.exports = router;