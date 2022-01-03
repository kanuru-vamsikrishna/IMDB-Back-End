const User = require("../models/users");

const authenticateUser = function (req, res, next) {
  const token = req.header("x-auth");
  User.findByToken(token)
    .then((user) => {
      if (user) {
        req.user = user;
        req.token = token;
        next();
      } else {
        res.status(401).json({ message: "Unauthorised" });
      }
    })
    .catch((err) => {
      res.status(403).json({ message: "Unauthorised" });
    });
};

module.exports = authenticateUser;
