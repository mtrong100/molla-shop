import { Button, Card, Checkbox, Typography } from "@material-tailwind/react";
import React from "react";
import FieldInput from "../components/form/FieldInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa";
import { useSelector } from "react-redux";
import { calculateTotal } from "../redux/slices/cartSlice";
import { PAYMENT_METHOD } from "../utils/constants";
import { createOrderApi } from "../api/orderApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TABLE_HEAD = ["Product", "Total"];

const validationSchema = yup.object().shape({
  fullname: yup
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be at most 50 characters")
    .required("Full name is required"),
  address: yup
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be at most 100 characters")
    .required("Address is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullname: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { shippingMethod, cart, couponCode } = useSelector(
    (state) => state.cart
  );
  const total = useSelector(calculateTotal);

  const onSubmit = async (values) => {
    try {
      const req = {
        shippingAddress: {
          ...values,
        },
        orderItems: cart,
        paymentMethod: PAYMENT_METHOD.CASH,
        total,
        user: currentUser?._id,
      };

      console.log(req);

      const res = await createOrderApi({ userToken: currentUser?.token, req });
      console.log(res);

      //...
      toast.success("Place an order successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to place an order");
    }
  };

  return (
    <div className="my-10">
      <Typography variant="h3" color="blue-gray" className="font-semibold">
        Checkout your order
      </Typography>

      <section className="grid grid-cols-2 items-start gap-5 mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <FieldInput
              labelTitle="Full Name"
              labelText="Fullname"
              register={register}
              name="fullname"
              errorMessage={errors?.fullname?.message}
            />
            <FieldInput
              labelTitle="Email"
              labelText="Email"
              register={register}
              name="email"
              errorMessage={errors?.email?.message}
            />
            <FieldInput
              labelTitle="Address"
              labelText="Address"
              register={register}
              name="address"
              errorMessage={errors?.address?.message}
            />
            <FieldInput
              labelTitle="Phone Number"
              labelText="Phone"
              register={register}
              name="phone"
              errorMessage={errors?.phone?.message}
            />
          </div>

          <hr className="mt-5 mb-3 border-gray-500" />

          <div className="space-y-3">
            <div>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-normal"
              >
                Shipping:
              </Typography>

              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox color="amber" checked className="rounded-full" />
                  {shippingMethod.name}:
                </div>

                <p>${shippingMethod.price}.00</p>
              </li>
            </div>

            <div>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-normal"
              >
                Coupon code used:
              </Typography>
              <div className="p-3 uppercase mt-2 border-2 border-gray-500  bg-gray-50 text-gray-700 font-bold opacity-60">
                {couponCode}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Typography
                variant="lead"
                color="blue-gray"
                className="font-normal"
              >
                Total:
              </Typography>

              <Typography variant="h3" color="amber" className="font-semibold">
                ${Number(total).toFixed(2)}
              </Typography>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <Button
              type="submit"
              variant="outlined"
              color="amber"
              disabled={isSubmitting}
              className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
            >
              {!isSubmitting && <IoMdCheckmarkCircleOutline size={20} />}
              {isSubmitting ? "Please waiting..." : "Place an order"}
            </Button>
            <Button
              variant="gradient"
              color="amber"
              className="flex rounded-none items-center gap-3  w-full justify-center"
            >
              <FaRegCreditCard size={20} />
              Pay with card
            </Button>
          </div>
        </form>
        <Card className=" mt-5 w-full overflow-scroll h-fit">
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
                        <div className="aspect-square w-[40px] h-[40px]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.name}
                          </Typography>

                          <Typography
                            variant="small"
                            color="amber"
                            className="font-semibold"
                          >
                            Quantity: x{item.quantity}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="amber"
                        className="font-semibold"
                      >
                        ${Number(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
};

export default Checkout;
