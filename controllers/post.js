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

exports.createPost = function (req, res) {
  if (req.session.name) {
    // createPost(req.body, (err, )
  }
};

async function createPost(dataFromForm, callback) {
  const uuid = uuidv4();
  const newPost = await Post.create({
    uuid: uuid,
    title: dataFromForm.title,
    text: dataFromForm.text,
    author_email: req.session.email,
  });
  return callback();
}
