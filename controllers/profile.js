const { User, Post } = require("../config/db");

exports.getProfile = async function (req, res) {
  if (req.session.email) {
    console.log(req.session);
    const role = req.session.role;
    const name = req.session.name;
    const email = req.session.email;
    const user = await User.findOne({ where: { email: email } });
    const userPosts = await Post.findAll({
      where: { author_email: res.locals.user.email },
    });
    console.log(userPosts);
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
