import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isAuthor: user.isAuthor,
      authorRequest: user.authorRequest,
      cartItems: user.cartItems,
      shippingAddress: user.shippingAddress,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@ desc Get User Profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      shippingAddress: user.shippingAddress,
      cartItems: user.cartItems,
      isAuthor: user.isAuthor,
      authorRequest: user.authorRequest,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Register a new user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isAuthor: user.isAuthor,
      authorRequest: user.authorRequest,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Update own profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.authorRequest = req.body.authorRequest || user.authorRequest;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isAuthor: updatedUser.isAuthor,
      authorRequest: updatedUser.authorRequest,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user shipping
//@route PUT /api/users/shipping
//@access Private
const updateUserShipping = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.shippingAddress.address =
      req.body.address || user.shippingAddress.address;
    user.shippingAddress.city = req.body.city || user.shippingAddress.city;
    user.shippingAddress.state = req.body.state || user.shippingAddress.state;
    user.shippingAddress.postalCode =
      req.body.postalCode || user.shippingAddress.postalCode;
    user.shippingAddress.country =
      req.body.country || user.shippingAddress.country;
    await user.save();

    res.json(user.shippingAddress);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc Get all users
//@route GET /api/users
//@access Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User deleted." });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc get user by ID
//@route GET /api/users/:id
//@access Admin
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User could not be found.");
  }
});

//@desc Update User
//@route PUT /api/users/:id/author
//@access Admin
const authorRequest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.authorRequest = true;
    await user.save();
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Request could not be made.");
  }
});

//@desc Update User
//@route PUT /api/users/:id
//@access Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.isAuthor = req.body.isAuthor;
    user.cartItems = user.cartItems;
    user.shippingAddress = user.shippingAddress;

    if (user.isAuthor) {
      user.authorRequest = false;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isAuthor: updatedUser.isAuthor,
      cartItems: updatedUser.cartItems,
    });
  } else {
    res.status(404);
    throw new Error("User could not be found.");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
  updateUserShipping,
  authorRequest,
};
