const cartController = () => {
  // factory functions
  return {
    cart: (req, res) => {
      res.render("customers/Cart");
    },
  };
};

module.exports = cartController;
