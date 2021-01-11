const homeController = require("../app/http/controllers/homecontroller");
const authController = require("../app/http/controllers/authcontroller");
const cartController = require("../app/http/controllers/customers/cartController");
const guest = require("../app/http/middleware/guest");

const initRoutes = (app) => {
  // routes

  //   home
  app.get("/", homeController().index);
  app.get("/menu", homeController().menu);

  //   auth
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);
  app.post("/logout", authController().logout);

  //  cart
  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);
};

module.exports = initRoutes;
