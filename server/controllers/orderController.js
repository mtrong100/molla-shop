import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { sendEmailCompletePurchase } from "../services/emailService.js";

const ORDER_QUERY = {
  PAGE: 1,
  LIMIT: 10,
  ORDER: "desc",
};

export const getOrderCollection = async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "orders not found" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error in send getOrderCollection controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const {
      page = ORDER_QUERY.PAGE,
      limit = ORDER_QUERY.LIMIT,
      order = ORDER_QUERY.ORDER,
    } = req.query;

    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    const options = {
      page,
      limit,
      sort: {
        createdAt: order === "asc" ? 1 : -1,
      },
    };

    const orders = await Order.paginate({}, options);

    if (!orders.docs || orders.docs.length === 0) {
      return res.status(404).json({ error: "Orders not found" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getOrders controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log("Error in getOrderDetail controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const {
      page = ORDER_QUERY.PAGE,
      limit = ORDER_QUERY.LIMIT,
      order = ORDER_QUERY.ORDER,
    } = req.query;

    const userId = req.params.id;

    const filter = { user: userId };

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: {
        createdAt: order === "asc" ? 1 : -1,
      },
    };

    const orders = await Order.paginate(filter, options);

    if (!orders.docs || orders.docs.length === 0) {
      return res.status(404).json({ error: "User orders not found" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getUserOrders controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, shippingType, details } = req.body;

    for (const order of orderItems) {
      await Product.findOneAndUpdate(
        {
          _id: order.id,
          stock: { $gte: order.quantity },
        },
        {
          $inc: {
            stock: -order.quantity,
            sold: +order.quantity,
          },
        },
        { new: true }
      );
    }

    const newOrder = new Order(req.body);
    await newOrder.save();

    await sendEmailCompletePurchase(
      orderItems,
      shippingAddress,
      shippingType,
      details
    );

    return res.status(200).json(newOrder);
  } catch (error) {
    console.log("Error in createOrder controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
