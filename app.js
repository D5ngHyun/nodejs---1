const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const port = 3000;
const admin = require("./routes/admin");
const logger = require("morgan");
const bodyParser = require("body-parser");

// nunjucks 템플릿
nunjucks.configure("template", {
  autoescape: true,
  express: app,
});

// 미들웨어 세팅
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.use((req, _res, next) => {
  app.locals.isLogin = true;
  app.locals.req_path = req.path;

  console.log(req.path);
  next();
});

app.use("/admin", admin);

app.use((req, res, next) => {
  res.status(400).render("common/404.html");
});

app.use((req, res, next) => {
  res.status(500).render("common/500.html");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Express Listening on port", port);
});
