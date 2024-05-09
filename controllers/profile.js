exports.getProfile = function (req, res) {
  const role = req.session.role;
  return res.render("profile", {
    title: `Профиль ${req.session.name}`,
    role: role,
  });
};
