const Menu = require("../../models/menu");

const homeController = () => {
  // factory functions
  return {
    index: async (req, res) => {
      // Menu.find().then(function (pizzas) {
      //   return res.render("home", { pizzas: pizzas });
      // });
      const pizzas = await Menu.find();
      return res.render("home", { pizzas: pizzas });
    },
  };
};

module.exports = homeController;
