const Menu = require("../../models/menu");
// Deepika------start----
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alpha@gmail.com",
    pass: "",
  },
});
// Deepika------end------
const homeController = () => {
  // factory functions
  return {
    index: async (req, res) => {
      const foods = await Menu.find();
      return res.render("home", { foods: foods });
    },
    menu: async (req, res) => {
      const foods = await Menu.find();
      return res.render("menu", { foods: foods });
    },
    // Deepika -----start-----
    contact_us: async (req, res) => {
      const { name, email, message } = req.body;
      var mailOptions = {
        from: "alphacafetria@gmail.com",
        to: email,
        subject: "Thanks for contacting us!",
        html: `<p>Hello ${name}</p><p>Thanks for contacting us! This auto-reply is just to let you know that we have received your email and will get back to you with a (human) response as soon as possible.</p>
        <p>Cheers!</p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.redirect("/");
    },
    // Deepika ------end------
  };
};

module.exports = homeController;
