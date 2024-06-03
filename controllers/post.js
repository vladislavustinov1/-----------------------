const { Post } = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.getPage = function (req, res) {
  if (req.session.name) {
    const role = req.session.role;
    return res.render("createPost", { title: "Выложить пост", role: role });
  } else {
    return res.redirect("login");
  }
};

exports.createPost = async function (req, res) {
  if (req.session.name) {
    const uuid = uuidv4();
    await Post.create({
      uuid: uuid,
      title: req.body.title,
      text: req.body.text,
      author_email: req.session.email,
    });
    return res.redirect("/profile");
  }
};
