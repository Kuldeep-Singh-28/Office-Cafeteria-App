const homeController = require("../app/http/controllers/homecontroller");
const authController = require("../app/http/controllers/authcontroller");
const cartController = require("../app/http/controllers/customers/cartController");

const initRoutes = (app) => {
  // routes

  //   home
  app.get("/", homeController().index);

  //   auth
  app.get("/login", authController().login);
  app.get("/register", authController().register);
  app.post("/register", authController().postRegister);

  //  cart
  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);
};

module.exports = initRoutes;
