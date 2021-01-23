const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

//global variables
let employee_id;
let name;
let email;
let organization_name;
let mobile_no;
let password;
let confirmpassword;
let image;
let id = "";

const authController = () => {
  const _getRedirectUrl = (req) => {
    return req.user.role === "admin" ? "/admin/orders" : "/";
    // factory functions
  };
  return {
    login: (req, res) => {
      res.render("auth/login");
    },
    postLogin: (req, res, next) => {
      employee_id = req.body.employee_id;
      password = req.body.password;
      // Validate request
      if (!employee_id || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("/login");
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }

          return res.redirect(_getRedirectUrl(req));
        });
      })(req, res, next);
    },

    register: (req, res) => {
      return res.render("auth/register");
    },
    async postRegister(req, res) {
      // Validate request

      image = req.file.filename;
      employee_id = req.body.employee_id;
      name = req.body.name;
      email = req.body.email;
      organization_name = req.body.organization_name;
      mobile_no = req.body.mobile_no;
      password = req.body.password;
      confirmpassword = req.body.confirmpassword;
      if (
        !employee_id ||
        !name ||
        !email ||
        !organization_name ||
        !mobile_no ||
        !password ||
        !confirmpassword ||
        !image
      ) {
        req.flash("error", "All fields are required");
        return res.redirect("/register");
      }
      // Check if mobile no is of 10 digits
      if (mobile_no.length != 10) {
        req.flash("error", "Mobile number is not of 10 digits");
        return res.redirect("/register");
      }
      //Check if confirm password is same as password or not
      if (confirmpassword != password) {
        req.flash("error", "Confirm password is not same as password");
        return res.redirect("/register");
      }

      // Check if employee id or email exists
      const user = await User.findOne({
        $or: [{ employee_id: employee_id }, { email: email }],
      });
      if (user) {
        req.flash("error", "User already exists");
        return res.redirect("/register");
      }

      return res.render("auth/preview", {
        image,
        employee_id,
        name,
        email,
        organization_name,
        mobile_no,
      });
    },

    async postPreview(req, res) {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a user
      const user = new User({
        employee_id,
        name,
        organization_name,
        email,
        mobile_no,
        password: hashedPassword,
        image,
      });

      user
        .save()
        .then((user) => {
          // Login
          id = user.id;
          employee_id = "";
          name = "";
          email = "";
          organization_name = "";
          mobile_no = "";
          password = "";
          confirmpassword = "";
          image = "";
          return res.render("auth/success", { id });
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/preview");
        });
    },

    logout(req, res) {
      employee_id = "";
      password = "";
      req.logout();
      return res.redirect("/login");
    },
  };
};

module.exports = authController;
