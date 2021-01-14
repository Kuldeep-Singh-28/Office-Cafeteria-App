const homeController = require("../app/http/controllers/homecontroller");
const authController = require("../app/http/controllers/authcontroller");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");

// middlewares
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");

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

  // customer/order routes
  app.post("/orders", auth, orderController().store);
  app.get("/customer/orders", auth, orderController().index);
};

module.exports = initRoutes;
