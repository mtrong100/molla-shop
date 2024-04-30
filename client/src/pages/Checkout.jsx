import {
  Button,
  Card,
  Checkbox,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import FieldInput from "../components/form/FieldInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal, resetCart } from "../redux/slices/cartSlice";
import { PAYMENT_METHOD } from "../utils/constants";
import { createOrderApi } from "../api/orderApi";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { checkoutSchema } from "../validations/checkoutValidation";
import toast from "react-hot-toast";
import useCheckout from "../hooks/useCheckout";
import { setIsPaying } from "../redux/slices/orderSlice";

const TABLE_HEAD = ["Product", "Total"];

const Checkout = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { shippingMethod, cart, couponCode } = useSelector(
    (state) => state.cart
  );
  const { isPaying } = useSelector((state) => state.order);
  const total = useSelector(calculateTotal);
  const { handleCheckout, isCheckout } = useCheckout();

  const handlePayWithCard = async () => {
    const values = getValues();
    if (!(values.fullName && values.phone && values.email && values.address)) {
      toast.error("You forgot to fill in the form");
      return;
    }

    dispatch(setIsPaying(true));

    try {
      const req = {
        shippingAddress: {
          ...values,
        },
        orderItems: cart,
        shippingType: {
          type: shippingMethod.name,
          price: shippingMethod.price,
        },
        details: {
          paymentMethod: PAYMENT_METHOD.CARD,
          totalCost: total.toFixed(2),
          couponCodeApply: couponCode,
        },
        user: currentUser?._id,
      };

      await createOrderApi(req);
      toast.success("Pay with card successfully");
      dispatch(resetCart());
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log("Failed to handlePayWithCard: ", error);
    } finally {
      dispatch(setIsPaying(false));
    }
  };

  return (
    <div className="my-10">
      <Typography variant="h3" color="blue-gray" className="font-semibold">
        Checkout your order
      </Typography>

      <section className="grid grid-cols-2 items-start gap-5 mt-5">
        <form onSubmit={handleSubmit(handleCheckout)}>
          <div className="space-y-5">
            <FieldInput
              labelTitle="Full Name"
              labelText="full Name"
              register={register}
              name="fullName"
              errorMessage={errors?.fullName?.message}
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
                  <Checkbox
                    color="amber"
                    checked
                    className="rounded-full"
                    onChange={() => {}}
                  />
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
              disabled={isCheckout}
              className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
            >
              {isCheckout ? (
                <Spinner color="amber" className="h-4 w-4" />
              ) : (
                <IoMdCheckmarkCircleOutline size={20} />
              )}
              {isCheckout ? "Please waiting..." : "Place an order"}
            </Button>
            <div>
              <StripeCheckout
                token={handlePayWithCard}
                stripeKey="pk_test_51OmAzrG1T7kyPILea5z6uMUN5VoCKA4yOluRVCMezmlcHYQnMIs7djqN1mmiWbDoFmyt4sCVqlN69H6MekMafLr900ocV4xdiu"
                name="Molla-shop"
                email={currentUser?.email}
                amount={Number(total.toFixed(2)) * 100}
                description="Payment with Stripe"
              >
                <Button
                  type="button"
                  variant="gradient"
                  color="amber"
                  disabled={isPaying}
                  className="flex rounded-none items-center gap-3  w-full justify-center"
                >
                  {isPaying ? (
                    <Spinner color="amber" className="h-4 w-4" />
                  ) : (
                    <FaRegCreditCard size={20} />
                  )}
                  {isPaying ? "Please waiting..." : "Pay with card"}
                </Button>
              </StripeCheckout>
            </div>
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
                        <div className="aspect-square w-[60px] h-[60px]">
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
