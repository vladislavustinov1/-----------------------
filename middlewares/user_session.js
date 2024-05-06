const { User } = require("../config/db");

module.exports = async (req, res, next) => {
  if (req.session.name) {
    let user = await User.findOne({ where: { email: req.session.email } });
    !user
      ? next(new Error("Невозможно найти пользователя"))
      : (req.user = res.locals.user = user);
  } else if (req.session.passport) {
    req.user = res.locals.user = req.session.passport.user;
    return next();
  } else {
    return next();
  }
};
