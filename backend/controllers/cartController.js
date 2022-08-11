import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

//@desc Get User Cart
//@route GET /api/users/cart
//@access private
const getUserCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user.cartItems);
  } else {
    res.status(404);
    throw new Error("Cart not found");
  }
});

//@desc Add item to cart
//@route POST /api/cart
//@access User
const addItemToCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, qty, image, _id, options = null, optionName = null } = req.body;
  const product = await Product.findById(_id);
  const price = product.price;
  const productExist = user.cartItems.find(
    (i) => i.productId.toString() === _id && i.options === options
  );
  if (productExist) {
    productExist.qty = +productExist.qty + +qty;
    productExist.totalPrice = productExist.qty * productExist.price;
    await user.save();
    res.json(user.cartItems);
  } else {
    try {
      const cartItem = {
        name,
        image,
        price,
        totalPrice: (price * qty).toFixed(2),
        qty,
        productId: _id,
        options,
        optionName,
      };
      user.cartItems.push(cartItem);
      await user.save();
      res.json(user.cartItems);
    } catch (error) {
      res.status(400);
      throw new Error("Addition to cart could not be made.");
    }
  }
});

//@desc Control cart modifications
//@route PUT /api/cart
//@access User
const cartControls = asyncHandler(async (req, res) => {
  const { _id, input } = req.body;

  const user = await User.findById(req.user._id);
  const cartItem = await user.cartItems.find(
    (c) => c._id.toString() === _id.toString()
  );
  const price = cartItem.price;
  if (user && cartItem && input === "up") {
    cartItem.qty++;
    cartItem.totalPrice = cartItem.qty * price;
    await user.save();
    res.json(user.cartItems);
  }
  if (user && cartItem && input === "down") {
    cartItem.qty--;
    if (
      cartItem.qty === 0 ||
      cartItem.qty === undefined ||
      cartItem.qty === null
    ) {
      cartItem.remove();
    }
    cartItem.totalPrice = cartItem.qty * price;
    await user.save();
    res.json(user.cartItems);
  }
  if (user && cartItem && input === "trash") {
    cartItem.remove();
    await user.save();
    res.json(user.cartItems);
  } else {
    res.status(404);
    throw new Error("Cart item not found.");
  }
});

export { getUserCart, addItemToCart, cartControls };
