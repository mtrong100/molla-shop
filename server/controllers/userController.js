import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getAllUsers = async (req, res, next) => {
  const {
    page = 1,
    limit = 20,
    sort = "name",
    order = "desc",
    query,
  } = req.query;

  try {
    const filter = {};

    if (query) {
      filter.name = new RegExp(query, "i");
    }

    const options = {
      page,
      limit,
      sort: {
        [sort]: order === "asc" ? 1 : -1,
      },
    };

    const data = await User.paginate(filter, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "Users not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getUserDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id, {
      _id: 1,
      name: 1,
      email: 1,
      avatar: 1,
      address: 1,
      provider: 1,
      phone: 1,
      role: 1,
      verified: 1,
      favorites: 1,
      createdAt: 1,
      updatedAt: 1,
    });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, phone, address, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name, phone, address, avatar },
      { new: true }
    );

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const updatedUser = {
      name: user.name,
      phone: user.phone,
      address: user.address,
    };

    return res
      .status(200)
      .json({ message: "Update infomation success", results: updatedUser });
  } catch (error) {
    next(error);
  }
};
