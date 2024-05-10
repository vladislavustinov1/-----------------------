const { User } = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const logger = require("../logs/logger");
const bcrypt = require("bcrypt");

exports.register = async function (req, res) {
  await registerUser(req.body, (err, result) => {
    if (err) {
      logger.error("Пользователь уже зарегистрирован");
      return next(err);
    } else {
      req.session.name = result.dataValues.username;
      req.session.email = result.dataValues.email;
      req.session.role = result.dataValues.role;
      return res.redirect("/");
    }
  });
};
exports.form = function (req, res) {
  const role = req.session.role;
  return res.render(`register`, { title: "Регистрация", role: role });
};

async function registerUser(dataFromForm, callback) {
  const searchUser = await User.findOne({
    where: {
      email: dataFromForm.email,
    },
  });
  if (searchUser >= 1) {
    return callback("Пользователь уже найден", null);
  } else {
    const uuid = uuidv4();
    const salt = await bcrypt.hash(dataFromForm.password, 10);
    const hash = await bcrypt.hash(dataFromForm.password, salt);
    const user = await User.create({
      uuid: uuid,
      username: dataFromForm.login,
      password: hash,
      email: dataFromForm.email,
      role: "user",
      avatar: undefined,
      status: null,
    });
    return callback(null, user);
  }
}
