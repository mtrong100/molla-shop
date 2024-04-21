import React from "react";
import {
  Button,
  Card,
  Checkbox,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import BoxQuantityProduct from "../components/BoxQuantityProduct";
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { selectShippingPrice } from "../redux/slices/cartSlice";
import { TiArrowRight } from "react-icons/ti";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const TABLE_HEAD = ["Product", "Price", "Quantity", "Total", "Action"];
const SHIPPING = [
  {
    label: "Standard:",
    price: 10,
  },
  {
    label: "Fast Delivery:",
    price: 20,
  },
];

const Cart = () => {
  const dispatch = useDispatch();
  const { shippingPrice } = useSelector((state) => state.cart);

  return (
    <div className="my-10 grid grid-cols-[minmax(0,_1fr)_300px] gap-5 items-start">
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
            {Array(6)
              .fill(0)
              .map((item, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-5">
                      <div className="aspect-square w-[60px] h-[60px]">
                        <img
                          src="https://source.unsplash.com/random"
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Sony – Alpha a5100 Mirrorless Camera
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-normal"
                    >
                      $499,99
                    </Typography>
                  </td>
                  <td className="p-4">
                    <BoxQuantityProduct />
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="paragraph"
                      color="amber"
                      className="font-medium"
                    >
                      $499,99
                    </Typography>
                  </td>
                  <td className="p-4">
                    <IoMdClose
                      size={25}
                      className="cursor-pointer hover:text-amber-600"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>

      <div className="border-2 bg-gray-100 p-5">
        <Typography variant="lead" color="blue-gray" className="font-normal">
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
            $914,98
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
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      color="amber"
                      checked={Number(item.price === shippingPrice)}
                      onChange={() => dispatch(selectShippingPrice(item.price))}
                      className="rounded-full"
                    />
                    {item.label}
                  </div>

                  <p>${item.price}.00</p>
                </li>
              );
            })}
          </ul>
        </div>

        <hr className="my-2 border-gray-500" />

        <div className="flex items-center justify-between my-5 gap-2">
          <Input variant="outlined" label="Coupon code" />

          <IconButton className=" flex-shrink-0">
            <TiArrowRight size={20} />
          </IconButton>
        </div>

        <hr className="my-2 border-gray-500" />

        <div className="flex items-center justify-between my-5 ">
          <Typography variant="lead" color="blue-gray" className="font-normal">
            Total:
          </Typography>

          <Typography variant="lead" color="amber" className="font-semibold">
            $914,98
          </Typography>
        </div>

        <Button
          variant="outlined"
          color="amber"
          className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
        >
          <IoMdCheckmarkCircleOutline size={20} />
          Process to checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
