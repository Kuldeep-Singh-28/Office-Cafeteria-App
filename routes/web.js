const homeController = require("../app/http/controllers/homecontroller");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const adminOrderController = require("../app/http/controllers/admin/orderController");
const statusController = require("../app/http/controllers/admin/statusController");

// middlewares
const check = require("../app/http/middleware/check");
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");
const admin = require("../app/http/middleware/admin");
var myModule = require("../app/http/middleware/upload");
var upload = myModule.upload;

const initRoutes = (app) => {
  // routes

  //   home
  app.get("/", homeController().index);
  app.get("/menu", homeController().menu);

  //   auth
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register", guest, authController().register);
  app.post("/register", upload, authController().postRegister);
  app.post("/preview", authController().postPreview);
  app.post("/logout", authController().logout);

  //  cart
  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);

  // customer/order routes
  app.post("/orders", auth, orderController().store);
  app.get("/customer/orders", auth, check, orderController().index);
  app.get("/customer/orders/:id", auth, orderController().show);

  // Admin routes
  app.get("/admin/orders", admin, adminOrderController().index);
  app.post("/admin/order/status", admin, statusController().update);

  // contactus
  app.post("/contact_us", homeController().contact_us);
};

module.exports = initRoutes;
