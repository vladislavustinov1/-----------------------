const { User } = require("../config/db");

module.exports = async (req, res, next) => {
  if (req.session.name) {
    let user = await User.findOne({ where: { email: req.session.email } });
    if (!user) {
      return next(new Error("Невозможно найти пользователя"));
    } else {
      req.user = res.locals.user = user;
      return next();
    }
  } else if (req.session.passport) {
    req.user = res.locals.user = req.session.passport.user;
    return next();
  } else {
    return next();
  }
};
