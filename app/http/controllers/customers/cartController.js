const { json } = require("express");

const cartController = () => {
  // factory functions
  return {
    index: (req, res) => {
      res.render("customers/cart");
    },
    update: (req, res) => {
      // for first time add item in cart
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }

      let cart = req.session.cart;

      // check if doesn't added in cart
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }

      return res.status(200).json({ totalqty: req.session.cart });
    },
  };
};

module.exports = cartController;
