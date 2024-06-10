const express = require("express");
const routes = express.Router();
const registerModule = require("../controllers/register");
const loginModule = require("../controllers/login");
const validationModule = require("../middlewares/validation");
const profileModule = require("../controllers/profile");
const postModule = require("../controllers/post");

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
routes.post("/login", loginModule.login);

routes.get("/logout", loginModule.logout);

routes.get("/questions", function (req, res) {
  const role = req.session.role;
  return res.render(`QandA`, { title: "ЧАВО", role: role });
});

routes.get("/register", registerModule.form);

routes.post("/register", validationModule, registerModule.register);

routes.get("/profile", profileModule.getProfile);

routes.get("/profile/createPost", postModule.getPage);
routes.post("/profile/createPost", postModule.createPost);
routes.get("/profile/changeStatus", profileModule.getPageStatus);
routes.post("/profile/changeStatus", profileModule.changeStatus);

module.exports = routes;
