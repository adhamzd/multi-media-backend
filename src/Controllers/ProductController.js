import asyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";

// @desc      Fetch all products
// @route     GET /api/products
// @access    Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('model category');

  res.json({ products,count, page, pages: Math.ceil(count / pageSize) });
});

// @desc      Fetch single product
// @route     GET /api/products/:id
// @access    Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc      Delete single product
// @route     DELETE /api/products/:id
// @access    Admin/Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc      Create a product
// @route     POST /api/products
// @access    Admin/Private
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    user: req.user._id,
    image: req.body.image,
    category: req.body.category,
    countInStock: req.body_countInStock,
    numReviews: req.body.numReviews,
    description: req.body.description,
    model: req.body.model,
  });

  product.image = req.files.map((ele) => ele.path);

  if(req.body.onSale) {
    product.onSale=req.body.onSale;
    product.salePrice=req.body.salePrice;
  }

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc      Update a product
// @route     PUT /api/products/:id
// @access    Admin/Private
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, model, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    // product.image = image;
    product.model = model;
    product.category = category;
    product.countInStock = countInStock;

    if (req.files) product.image = req.files.map((ele) => ele.path);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

// @desc      Create new review
// @route     PUT /api/products/:id/reviews
// @access    Private
const createProductReview = asyncHandler(async (req, res) => {
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
      rating: Number(rating),
      comment,
      user: req.user._id,
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
    throw new Error("Product not found!");
  }
});

// @desc      Get top rated products
// @route     PUT /api/products/top
// @access    Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
