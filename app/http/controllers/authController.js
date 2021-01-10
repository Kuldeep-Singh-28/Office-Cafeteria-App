const User = require("../../models/user");
const bcrypt = require("bcrypt");

const authController = () => {
  // factory functions
  return {
    login: (req, res) => {
      res.render("auth/login");
    },
    register: (req, res) => {
      res.render("auth/register");
    },
    postRegister: async (req, res) => {
      const { name, employeeid, email, password } = req.body;

      // validate request
      if (!name || !email || !password || !employeeid) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);
        req.flash("employeeid", employeeid);
        return res.redirect("/register");
      }

      // check unique employee id and email id
      User.exists({ email: email, employeeid: employeeid }, (err, result) => {
        if (result) {
          req.flash("error", "Email Id or Employee Id already registered!!");
          req.flash("name", name);
          req.flash("email", email);
          req.flash("employeeid", employeeid);
          return res.redirect("/register");
        }
      });

      // hash password
      const hashedPassword = bcrypt.hash(password, 10);

      // create a user
      const user = new User({
        name,
        email,
        employeeid,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          // Login
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong!!");
          return res.redirect("/register");
        });

      console.log(req.body);
    },
  };
};

module.exports = authController;
