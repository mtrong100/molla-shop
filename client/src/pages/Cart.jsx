import React from "react";
import {
  Button,
  Card,
  Checkbox,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import {
  calculateSubTotal,
  calculateTotal,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProductFromCart,
  selectCouponCode,
  selectShipppingMethod,
} from "../redux/slices/cartSlice";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { COUPON_CODES } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { SAMPLE_IMAGES } from "../utils/project-images";

const TABLE_HEAD = ["Product", "Price", "Quantity", "Total", "Action"];
const SHIPPING = [
  {
    name: "Standard",
    price: 10.0,
  },
  {
    name: "Fast Delivery",
    price: 20.0,
  },
];

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingMethod, cart } = useSelector((state) => state.cart);
  const subtotal = useSelector(calculateSubTotal);
  const total = useSelector(calculateTotal);

  return (
    <>
      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center my-10">
          <div className="w-[400px] h-[400px] mx-auto">
            <img
              src={SAMPLE_IMAGES.emptyCart}
              alt="empty-cart"
              className="img-cover"
            />
          </div>
          <p className="text-lg">
            Your cart is currently empty. Go ahead and buy something in our shop
          </p>
          <Button
            onClick={() => navigate("/shop")}
            size="lg"
            variant="gradient"
            color="amber"
            className="mt-5"
          >
            Shop now
          </Button>
        </div>
      ) : (
        <div className="my-10 grid grid-cols-[minmax(0,_1fr)_300px] gap-5 items-start">
          {/* CART TABLE */}
          <Card className="h-fit w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className={`${
                        head === "Product" ? "w-[400px]" : ""
                      } border-b border-blue-gray-100 bg-blue-gray-50 p-4`}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 &&
                  cart.map((item) => (
                    <tr key={item.id} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <div className="flex items-center gap-5">
                          <div className="aspect-square w-[60px] h-[60px]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.name}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="paragraph"
                          color="blue-gray"
                          className="font-normal"
                        >
                          ${item.price}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <div className="border border-gray-500 w-fit rounded-md h-[50px] flex items-center ">
                          <button
                            className="text-2xl font-medium w-[50px] h-[50px]"
                            onClick={() =>
                              dispatch(decreaseProductQuantity(item.id))
                            }
                          >
                            -
                          </button>
                          <span className="mx-4">{item.quantity}</span>
                          <button
                            className="text-2xl font-medium w-[50px] h-[50px]"
                            onClick={() =>
                              dispatch(increaseProductQuantity(item.id))
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="paragraph"
                          color="amber"
                          className="font-medium"
                        >
                          {Number(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <IoMdClose
                          onClick={() =>
                            dispatch(removeProductFromCart(item.id))
                          }
                          size={25}
                          className="cursor-pointer hover:text-amber-600"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Card>

          {/* BILL */}
          <div className="border-2 bg-gray-100 p-5">
            <Typography
              variant="lead"
              color="blue-gray"
              className="font-normal"
            >
              Cart Total
            </Typography>

            <hr className="my-2 border-gray-500" />

            <div className="flex items-center justify-between mt-5 mb-3">
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-normal"
              >
                Subtotal:
              </Typography>

              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-normal"
              >
                ${subtotal.toFixed(2)}
              </Typography>
            </div>

            <div>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-normal"
              >
                Shipping:
              </Typography>

              <ul className="space-y-1 mt-2">
                {SHIPPING.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Checkbox
                          color="amber"
                          checked={item.name === shippingMethod?.name}
                          onChange={() => dispatch(selectShipppingMethod(item))}
                          className="rounded-full"
                        />
                        {item.name}:
                      </div>

                      <p>${item.price}.00</p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <hr className="my-2 border-gray-500" />

            <div className="my-5">
              <Select
                className="uppercase"
                size="lg"
                label="Select Couponcode"
                onChange={(val) => dispatch(selectCouponCode(val))}
              >
                {COUPON_CODES.map((item) => (
                  <Option
                    key={item.label}
                    value={item.label}
                    className="uppercase font-semibold"
                  >
                    {item.label}
                  </Option>
                ))}
              </Select>
            </div>

            <hr className="my-2 border-gray-500" />

            <div className="flex items-center justify-between my-5 ">
              <Typography
                variant="lead"
                color="blue-gray"
                className="font-normal"
              >
                Total:
              </Typography>

              <Typography variant="h4" color="amber" className="font-semibold">
                ${total.toFixed(2)}
              </Typography>
            </div>

            <Button
              onClick={() => navigate("/checkout")}
              variant="gradient"
              color="amber"
              className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
            >
              <IoMdCheckmarkCircleOutline size={20} />
              Process to checkout
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
