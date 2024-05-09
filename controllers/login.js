const { User } = require("../config/db");
const bcrypt = require("bcrypt");
const logger = require("../logs/logger");

async function auth(dataFromForm, cb) {
  try {
    console.log(dataFromForm);
    const user = await User.findOne({
      where: {
        username: [dataFromForm.login],
      },
    });
    if (user < 1) {
      return cb("Пользователь не найден", null);
    } else {
      bcrypt.compare(
        dataFromForm.password,
        user.dataValues.password,
        (err, res) => {
          if (res) return cb(null, user);
          return cb(err, null);
        }
      );
    }
  } catch (e) {
    logger.error("Возникла ошибка при авторизации: " + e.message);
    console.error(e);
  }
}

exports.login = async function (req, res) {
  await auth(req.body, (err, result) => {
    if (err) {
      logger.error(
        "Возникла непредвиденная ошибка при авторизации: " + err.message
      );
      console.error(err);
      return res.redirect("/login");
    } else {
      req.session.name = result.dataValues.username;
      req.session.email = result.dataValues.email;
      req.session.role = result.dataValues.role;
      res.redirect("/");
    }
  });
};
exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.clearCookie("connect.sid");
  req.session.destroy((err) => {
    if (err) {
      logger.error(`Ошибка при попытке выхода из системы: ${err}`);
      next(err);
    }
    res.redirect("/");
  });
};
