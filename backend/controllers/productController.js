import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc Get All Products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.count({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

//@desc Get Single  Product
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Products not found.");
  }
});

//@desc Get Top Rated Products
//@route GET /api/products/top
//@access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Products not found.");
  }
});

//@desc Delete a Product
//@route DELETE /api/products/:id
//@access Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product deleted." });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Create a Product
//@route POST /api/products
//@access Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    options: null,
    optionName: null,
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc Update a Product
//@route PUT /api/products/:id
//@access Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
    options,
    optionName,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;
    product.options = options;
    product.optionName = optionName;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Write Product Review
//@route POST /api/products/:id/review
//@access User
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

//@desc Delete Product Review
//@route DELETE /api/products/:id/review/:rid
//@access Admin
const deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const review = await product.reviews.find(
    (r) => r._id.toString() === req.params.rid
  );
  if (product && review) {
    await review.remove();
    product.numReviews = product.reviews.length;
    if (product.reviews.length === 0) {
      product.rating = 0;
    } else {
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
    }

    await product.save();
    res.json({ message: "Review deleted." });
  } else {
    res.status(404);
    throw new Error("Review could not be found.");
  }
});

export {
  getProducts,
  getProductById,
  getTopProducts,
  createProduct,
  updateProduct,
  createReview,
  deleteReview,
  deleteProduct,
};
