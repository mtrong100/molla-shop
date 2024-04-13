import React from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { DEFAULT_AVATAR, PRODUCT_CATEGORIES } from "../../utils/constants";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../form/FieldInput";
import { googleLogin, loginApi, registerApi } from "../../api/authApi";
import { toast } from "sonner";
import { storeCurrentUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";

const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Shop",
    link: "/shop",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "FAQ",
    link: "/faq",
  },
  {
    name: "Wishlist",
    link: "/wishlist",
  },
  {
    name: "My Account",
    link: "/my-account",
  },
];

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("login");

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <header className=" z-10 h-max max-w-full rounded-none p-4 bg-[#333333]">
        <section className="page-container ">
          <div className="flex items-center justify-between text-white opacity-60 text-sm">
            <p>Call: +0123 456 789</p>
            <div
              onClick={handleOpen}
              className="hover:text-amber-600 font-medium cursor-default"
            >
              Login / Register
            </div>
            <Dialog className="p-7" open={open} handler={handleOpen}>
              <DialogHeader className="grid grid-cols-2 font-normal items-center justify-center place-items-center">
                {["login", "register"].map((item) => (
                  <div
                    onClick={() => setActiveTab(item)}
                    key={item}
                    className={`${
                      activeTab === item
                        ? " w-full text-center border-amber-600 text-amber-600"
                        : "border-transparent hover:text-amber-600"
                    } capitalize border-b-2 transition-all cursor-default`}
                  >
                    {item}
                  </div>
                ))}
              </DialogHeader>
              <DialogBody>
                {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Close</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>

          <hr className="my-3 border-blue-gray-800" />

          <div className="grid  grid-cols-[1fr_minmax(574px,_1fr)_1fr] text-blue-gray-900 items-center">
            <Link to="/" className="text-3xl text-amber-600 font-semibold">
              Molla
            </Link>

            <div className="rounded-full py-3 px-5 flex items-center gap-3 bg-white">
              <GoSearch size={22} />
              <input
                type="text"
                className="outline-none border-none w-full bg-transparent "
                placeholder="Search products..."
              />
            </div>

            <div className="flex items-center gap-4 justify-end">
              <div className="flex items-center gap-7 text-white">
                <FaRegHeart size={25} className="hover:text-amber-600" />
                <BsCart3 size={25} className="hover:text-amber-600" />
              </div>
            </div>
          </div>
        </section>
      </header>

      <div className="h-[60px] bg-white z-10 sticky top-0 flex items-center border-b border-gray-300 ">
        <div className="page-container flex items-center justify-between">
          <Menu>
            <MenuHandler>
              <Button className="flex items-center gap-3" variant="text">
                <RxHamburgerMenu size={20} />
                Browse Categories
              </Button>
            </MenuHandler>
            <MenuList className="w-[240px]">
              {PRODUCT_CATEGORIES.map((item) => (
                <MenuItem className="py-3 " key={item}>
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <ul className="flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = item.link === location.pathname;

              return (
                <Link
                  className={`${
                    isActive
                      ? "text-amber-600 font-semibold"
                      : "hover:text-amber-600"
                  }  transition-all font-medium`}
                  to={item.link}
                  key={item.name}
                >
                  {item.name}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;

const LoginForm = () => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .max(20, "Password must be at most 20 characters long.")
      .required("Password is required."),
    email: yup
      .string()
      .email("Invalid email format.")
      .required("Email is required.")
      .lowercase("Email must be in lowercase."),
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
      password: "",
      email: "",
    },
  });

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      const request = {
        ...values,
      };

      const res = await loginApi(request);
      toast.success(res?.message);
      localStorage.setItem("MOLLA_TOKEN", JSON.stringify(res?.token));
      dispatch(storeCurrentUser({ ...res.results, token: res?.token }));

      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to login: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <GoogleLogin />

        <hr className="my-2 border-blue-gray-200" />

        <FieldInput
          labelText="Email"
          register={register}
          name="email"
          errorMessage={errors?.email?.message}
        />
        <FieldInput
          labelText="Password"
          register={register}
          name="password"
          errorMessage={errors?.password?.message}
        />

        <div className="my-4 text-right text-sm">
          <Link
            className="hover:text-amber-500 hover:underline"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>

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
    </div>
  );
};

const RegisterForm = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Username must be at least 3 characters long.")
      .max(20, "Username must be at most 20 characters long.")
      .required("Username is required."),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .max(20, "Password must be at most 20 characters long.")
      .required("Password is required."),
    email: yup
      .string()
      .email("Invalid email format.")
      .required("Email is required.")
      .lowercase("Email must be in lowercase."),
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
      password: "",
      email: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const req = {
        ...values,
        avatar: DEFAULT_AVATAR,
      };

      const res = await registerApi(req);

      toast.success(res?.message);

      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to register: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <GoogleLogin />

        <hr className="my-2 border-blue-gray-200" />

        <FieldInput
          labelText="Username"
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
          labelText="Password"
          register={register}
          name="password"
          errorMessage={errors?.password?.message}
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
    </div>
  );
};

function GoogleLogin() {
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const results = await signInWithPopup(auth, provider);
      const user = results.user;

      const req = {
        name: user?.displayName,
        email: user?.email,
        avatar: user?.photoURL,
      };

      const res = await googleLogin(req);

      toast.success(res?.message);
      localStorage.setItem("MOLLA_TOKEN", JSON.stringify(res?.token));
      dispatch(storeCurrentUser({ ...res.results, token: res?.token }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to login with google: ", error);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      type="button"
      size="lg"
      variant="outlined"
      color="blue-gray"
      className="flex w-full justify-center items-center gap-3"
    >
      <img
        src="https://docs.material-tailwind.com/icons/google.svg"
        alt="metamask"
        className="h-6 w-6"
      />
      Continue with Google
    </Button>
  );
}
