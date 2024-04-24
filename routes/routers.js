const express = require("express");
const routes = express.Router();

routes.get("/", function (req, res) {
  const role = req.session.role;
  return res.render(`index`, { title: "CW:RP", role: role });
});

module.exports = routes;
