const Menu = require("../../models/menu");

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
  };
};

module.exports = homeController;
