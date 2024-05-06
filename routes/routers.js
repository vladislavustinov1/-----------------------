const express = require("express");
const routes = express.Router();

routes.get("/", function (req, res) {
  const role = req.session.role;
  return res.render(`index`, { title: "CW:RP", role: role });
});
routes.get("/about", function (req, res) {
  const role = req.session.role;
  return res.render(`about`, { title: "О проекте", role: role });
});
routes.get("/login", function (req, res) {
  const role = req.session.role;
  if (res.locals.user) {
    return res.render(`profile`, {
      title: `Профиль ${req.session.username}`,
      role: role,
    });
  } else {
    return res.render(`login`, { title: "Вход", role: role });
  }
});
routes.get("/questions", function (req, res) {
  const role = req.session.role;
  return res.render(`QandA`, { title: "ЧАВО", role: role });
});
routes.get("/register", function (req, res) {
  const role = req.session.role;
  return res.render(`register`, { title: "Регистрация", role: role });
});

module.exports = routes;
