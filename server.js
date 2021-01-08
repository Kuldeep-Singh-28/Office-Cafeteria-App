const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// assests
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

// set template engine
app.use(expressLayouts);
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log("Server is Up on port 3000!!");
});
