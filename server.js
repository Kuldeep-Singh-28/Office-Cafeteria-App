require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session);
const passport = require("passport");
const Emitter = require("events");

// routes
const homeController = require("./app/http/controllers/homecontroller");
const authController = require("./app/http/controllers/authcontroller");
const cartController = require("./app/http/controllers/customers/cartController");
const orderController = require("./app/http/controllers/customers/orderController");
const adminOrderController = require("./app/http/controllers/admin/orderController");
const statusController = require("./app/http/controllers/admin/statusController");

// middlewares
const guest = require("./app/http/middleware/guest");
const auth = require("./app/http/middleware/auth");
const admin = require("./app/http/middleware/admin");
var myModule = require("./app/http/middleware/upload");
var upload = myModule.upload;

// Database connection
const DBUrl = process.env.MONGO_CONNECTION_URL;
mongoose.connect(DBUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

// Session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

// Event emitter
const eventEmitter = new Emitter();
app.set("eventEmitter", eventEmitter);

// Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hour
  })
);

// Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(flash());

// assests
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// set template engine
app.use(expressLayouts);
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

// routes

//   home
app.get("/", homeController().index);
app.get("/menu", homeController().menu);

//   auth
app.get("/login", guest, authController().login);
app.post("/login", authController().postLogin);
app.get("/register", guest, authController().register);
app.post("/register", upload, authController().postRegister);
app.get("/preview", guest, authController().preview);
app.post("/preview", authController().postPreview);
app.get("/success", guest, authController().success);
app.post("/logout", authController().logout);

//  cart
app.get("/cart", cartController().index);
app.post("/update-cart", cartController().update);

// customer/order routes
app.post("/orders", auth, orderController().store);
app.get("/customer/orders", auth, orderController().index);
app.get("/customer/orders/:id", auth, orderController().show);

// Admin routes
app.get("/admin/orders", admin, adminOrderController().index);
app.post("/admin/order/status", admin, statusController().update);

// contactus
app.post("/contact_us", homeController().contact_us);

// require(path.join(__dirname, "/routes/web"))(app);

// server
const server = app.listen(PORT, () => {
  console.log("Server is Up on port 3000!!");
});

// Socket

const io = require("socket.io")(server);
io.on("connection", (socket) => {
  // Join
  socket.on("join", (orderId) => {
    socket.join(orderId);
  });
});

eventEmitter.on("orderUpdated", (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data);
});

eventEmitter.on("orderPlaced", (data) => {
  io.to("adminRoom").emit("orderPlaced", data);
});
