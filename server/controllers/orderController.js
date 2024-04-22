import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { sendEmailCompletePurchase } from "../services/emailService.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getAllOrders = async (req, res, next) => {
  const { page = 1, limit = 20, order = "desc" } = req.query;

  try {
    const options = {
      page,
      limit,
      sort: {
        createdAt: order === "asc" ? 1 : -1,
      },
    };

    const data = await Order.paginate({}, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "Orders not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getOrderDetail = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  const { page = 1, limit = 20, order = "desc" } = req.query;

  try {
    const userId = req.params.id;

    const options = {
      page,
      limit,
      sort: {
        createdAt: order === "asc" ? 1 : -1,
      },
    };

    const data = await Order.paginate({ user: userId }, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "User orders not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  const { orderItems, shippingAddress, total } = req.body;

  try {
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

    await sendEmailCompletePurchase(orderItems, shippingAddress?.email, total);

    return res.status(200).json(newOrder);
  } catch (error) {
    next(error);
  }
};
