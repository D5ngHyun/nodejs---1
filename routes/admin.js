const express = require("express");
const router = express.Router();

function middleWare(req, res, next) {
  console.log("??");
  next();
}

router.get("/", middleWare, (req, res) => {
  res.send("admin 이후 url");
});

router.get("/products", (req, res) => {
  res.render("admin/products.html", {
    message: "Hello World",
  });
});

router.get("/products/write", (req, res) => {
  res.render("admin/write.html", {
    message: "Hello",
  });
});

router.post("/products/write", (req, res) => {
  const { name, price, description } = req.body;

  res.send(`${name}, ${price}, ${description}`);
});

module.exports = router;
