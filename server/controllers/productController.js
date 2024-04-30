import Product from "../models/productModel.js";

const PRODUCT_QUERY = {
  PAGE: 1,
  LIMIT: 10,
  SORT: "name",
  ORDER: "desc",
  QUERY: "",
  CATEGORY: "",
  SIZE: "",
  COLOR: "",
  BRAND: "",
  MIN_PRICE: 0,
  MAX_PRICE: 1000,
};

export const getProducts = async (req, res) => {
  const {
    page = PRODUCT_QUERY.PAGE,
    limit = PRODUCT_QUERY.LIMIT,
    sort = PRODUCT_QUERY.SORT,
    order = PRODUCT_QUERY.ORDER,
    query = PRODUCT_QUERY.QUERY,
    category = PRODUCT_QUERY.CATEGORY,
    size = PRODUCT_QUERY.SIZE,
    color = PRODUCT_QUERY.COLOR,
    brand = PRODUCT_QUERY.BRAND,
    minPrice = PRODUCT_QUERY.MIN_PRICE,
    maxPrice = PRODUCT_QUERY.MAX_PRICE,
  } = req.query;

  try {
    const filter = {};

    if (query) filter.name = new RegExp(query, "i");
    if (category) filter.category = category;
    if (size) filter.size = size;
    if (color) filter.color = color;
    if (brand) filter.brand = brand;
    if (minPrice && maxPrice) {
      filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }

    const options = {
      page,
      limit,
      sort: {
        [sort]: order === "asc" ? 1 : -1,
      },
    };

    const products = await Product.paginate(filter, options);

    if (!products.docs || products.docs.length === 0) {
      return res.status(404).json({ error: "Products not found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log("Error in send getAllProducts controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("Error in send getProductDetail controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    const newProduct = new Product(req.body);

    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error in send createProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("Error in send updateProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Delete product successfully" });
  } catch (error) {
    console.log("Error in send deleteProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const p = await Product.findById(id);

    if (!p) {
      return res.status(404).json({ message: "Product not found" });
    }

    p.view += 1;

    await p.save();

    return res.status(200).json({ message: "View count updated" });
  } catch (error) {
    console.log("Error in send viewProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
