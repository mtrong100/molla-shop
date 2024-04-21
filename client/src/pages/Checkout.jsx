import { Button, Card, Checkbox, Typography } from "@material-tailwind/react";
import React from "react";
import FieldInput from "../components/form/FieldInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa";

const TABLE_HEAD = ["Product", "Total"];

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(),
    defaultValues: {
      fullname: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const req = {
        ...values,
      };
      //...
    } catch (error) {
      console.log(error);
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
                  Standard:
                </div>

                <p>$10.00</p>
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
              <div className="p-3 mt-2 border-2 border-gray-500  bg-gray-50 text-gray-700 font-bold opacity-60">
                THIS IS COUPON CODE
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
                $914,98
              </Typography>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <Button
              variant="outlined"
              color="amber"
              className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
            >
              <IoMdCheckmarkCircleOutline size={20} />
              Place an order
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
                        <div className="aspect-square w-[40px] h-[40px]">
                          <img
                            src="https://source.unsplash.com/random"
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Sony – Alpha a5100 Mirrorless Camera
                          </Typography>

                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            Quantity: x2
                          </Typography>
                        </div>
                      </div>
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
