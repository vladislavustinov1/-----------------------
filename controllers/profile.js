const { User, Post } = require("../config/db");

exports.getProfile = async function (req, res) {
  if (req.session.email) {
    const role = req.session.role;
    const name = req.session.name;
    const email = req.session.email;
    const user = await User.findOne({ where: { email: email } });
    const userPosts = await Post.findAll({
      where: { author_email: res.locals.user.email },
    });
    return res.render("profile", {
      title: `Профиль ${req.session.name}`,
      role: role,
      avatar: user.dataValues.avatar,
      email: email,
      username: name,
      status: user.dataValues.status,
      posts: userPosts,
    });
  } else {
    return res.redirect("/register");
  }
};

exports.getPageStatus = async function (req, res) {
  if (req.session.email) {
    const role = req.session.role;
    const name = req.session.name;
    const email = req.session.email;
    return res.render("changeStatus.ejs", {
      title: `Смена статуса`,
      role: role,
      email: email,
      username: name,
    });
  } else {
    return res.redirect("/register");
  }
};

exports.changeStatus = async function (req, res) {
  try {
    await User.update(
      { status: req.body.status },
      { where: { email: req.session.email } }
    );
    return res.redirect("/");
  } catch (err) {}
};
