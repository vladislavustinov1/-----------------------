const logger = require("../logs/logger");

module.exports = function (req, res, next) {
  if (!req.body.check__rules) {
    logger.error(`Не прочитаны правила`);
    return res.redirect("/register");
  }
  const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const regexpPassword =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const checkValidityEmail = regexpEmail.test(req.body.email);
  const checkValidityPassword = regexpPassword.test(req.body.password);
  if (!checkValidityEmail) {
    logger.error("Неправильная почта");
    return res.redirect("/register");
  } else if (!checkValidityPassword) {
    logger.error("Неправильный пароль");
    return res.redirect("/register");
  } else {
    const password = req.body.password;
    const again_pswrd = req.body.again_pswrd;
    if (password !== again_pswrd) {
      logger.error("Пароли различаются");
      return res.redirect("/register");
    } else {
      return next();
    }
  }
};
