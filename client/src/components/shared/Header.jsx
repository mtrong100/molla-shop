import React, { useEffect } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  DEFAULT_AVATAR,
  NAV_LINKS,
  PRODUCT_CATEGORIES,
} from "../../utils/constants";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../form/FieldInput";
import { googleLogin, loginApi, registerApi } from "../../api/authApi";
import { toast } from "sonner";
import { storeCurrentUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { checkedCategory } from "../../redux/slices/sortSlice";
import {
  setLoadingWishlist,
  setUserWishlist,
} from "../../redux/slices/wishlistSlice";
import { getUserWishlistApi } from "../../api/wishlistApi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("login");
  const { userWishlist } = useSelector((state) => state.wishlist);
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        dispatch(setLoadingWishlist(true));
        const res = await getUserWishlistApi({
          userId: currentUser?._id,
          token: currentUser?.token,
        });
        dispatch(setUserWishlist(res?.wishlist));
        dispatch(setLoadingWishlist(false));
      } catch (error) {
        console.log(error);
        setUserWishlist([]);
        dispatch(setLoadingWishlist(false));
      }
    };
    fetchWishlist();
  }, [currentUser?._id, currentUser?.token, dispatch]);

  const handleOpen = () => setOpen(!open);

  const handleSetFilter = (cat) => {
    dispatch(checkedCategory(cat));
    navigate("/shop");
  };

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
                <div
                  onClick={() => navigate("/wishlist")}
                  className="relative cursor-pointer"
                >
                  <FaRegHeart size={25} className="hover:text-amber-600" />
                  <span className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center bg-amber-600  rounded-full  text-sm text-black font-bold pointer-events-none">
                    {userWishlist.length || 0}
                  </span>
                </div>

                <div
                  onClick={() => navigate("/cart")}
                  className="relative cursor-pointer"
                >
                  <BsCart3 size={28} className="hover:text-amber-600" />
                  <span className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center bg-amber-600  rounded-full  text-sm text-black font-bold pointer-events-none">
                    {cart.length || 0}
                  </span>
                </div>
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
                <MenuItem
                  onClick={() => handleSetFilter(item)}
                  className="py-3 capitalize"
                  key={item}
                >
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((item) => {
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

      window.location.reload();
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

      window.location.reload();
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
