const homeController = require("../app/http/controllers/homecontroller");
const authController = require("../app/http/controllers/authcontroller");
const cartController = require("../app/http/controllers/customers/cartController");

const initRoutes = (app) => {
  // routes

  //   home
  app.get("/", homeController().index);

  //  cart
  app.get("/cart", cartController().cart);

  //   auth
  app.get("/login", authController().login);
  app.get("/register", authController().register);
};

module.exports = initRoutes;
