const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
// const MongoDbStore = require("connect-mongo")(session);

// Database connection

const url = "mongodb://localhost/pizza";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
// mongoose.connect(
//   "mongodb+srv://kuldeepdb:kuldeep28@pizzacluster.oubsw.mongodb.net/<dbname>?retryWrites=true&w=majority"
// );
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

// Session store
// let mongoStore = new MongoDbStore({
//   mongooseConnection: connection,
//   collection: "sessions",
// });

// assests
app.use(express.static("public"));

// set template engine
app.use(expressLayouts);
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

// server
app.listen(PORT, () => {
  console.log("Server is Up on port 3000!!");
});
