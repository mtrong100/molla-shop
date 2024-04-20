import React, { useEffect } from "react";
import {
  Button,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../components/form/FieldInput";
import { PROFILE_SIDEBAR } from "../utils/constants";
import { Link } from "react-router-dom";
import { storeCurrentUser } from "../redux/slices/userSlice";
import { toast } from "sonner";
import { updateUserApi } from "../api/userApi";

const MyAccount = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Username must be at least 3 characters long.")
      .max(20, "Username must be at most 20 characters long.")
      .required("Username is required."),
    email: yup
      .string()
      .email("Invalid email format.")
      .required("Email is required.")
      .lowercase("Email must be in lowercase."),
    address: yup
      .string()
      .max(255, "Address must be at most 255 characters long."),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits.")
      .min(10, "Phone number must be at least 10 digits long.")
      .max(15, "Phone number must be at most 15 digits long.")
      .required("Phone number is required."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
  });

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const onSubmit = async (values) => {
    try {
      const req = { ...values };

      const res = await updateUserApi({
        userId: currentUser?._id,
        userToken: currentUser?.token,
        req,
      });

      dispatch(storeCurrentUser({ ...currentUser, ...res.results }));
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to update: ", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser?.name,
        email: currentUser?.email,
        address: currentUser?.address,
        phone: currentUser?.phone,
      });
    }
  }, [currentUser, reset]);

  return (
    <div>
      <div className="flex items-center justify-center text-4xl h-[170px] bg-gradient-to-r from-amber-100 to-yellow-100">
        My Account
      </div>

      <div className="my-5 grid grid-cols-[280px_minmax(0,_1fr)] items-start gap-5">
        <DefaultSidebar />
        <main>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 w-full max-w-xl mx-auto"
          >
            <div className="w-[150px] h-[150px] mx-auto">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="img-cover rounded-lg"
              />
            </div>

            <FieldInput
              labelText="Name"
              register={register}
              name="name"
              errorMessage={errors?.name?.message}
            />
            <FieldInput
              labelText="Email"
              register={register}
              name="email"
              errorMessage={errors?.email?.message}
            />
            <FieldInput
              labelText="Address"
              register={register}
              name="address"
              errorMessage={errors?.address?.message}
            />
            <FieldInput
              labelText="Phone number"
              register={register}
              name="phone"
              errorMessage={errors?.phone?.message}
            />

            <Button
              disabled={isSubmitting}
              color="amber"
              className="w-full"
              size="lg"
              type="submit"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default MyAccount;

function DefaultSidebar() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("MOLLA_TOKEN");
    dispatch(storeCurrentUser(null));
  };

  return (
    <Card className="w-full p-4 shadow-xl shadow-blue-gray-900/5 border">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-[40px] h-[40px] object-cover rounded-full flex-shrink-0"
          />
          <div>
            <span className="text-green-500">
              {currentUser?.verified ? "Verified" : "Not verified"}
            </span>
            <h2 className="font-semibold">{currentUser?.name}</h2>
          </div>
        </div>
      </div>
      <List>
        {PROFILE_SIDEBAR.map((item) => (
          <Link to={item.link} key={item.name}>
            <ListItem>
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item.name}
            </ListItem>
          </Link>
        ))}

        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <LiaSignOutAltSolid size={20} />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

const Sidebar = () => {
  return (
    <aside className=" p-5 bg-white shadow-md rounded-md">
      <div className="flex items-center gap-3">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-[35px] h-[35px] object-cover rounded-full"
        />
        <div>
          <span className="text-green-500">Verified</span>
          <h2 className="font-semibold">Username</h2>
        </div>
      </div>

      <ul className="flex flex-col"></ul>
    </aside>
  );
};
