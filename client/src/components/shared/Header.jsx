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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { NAV_LINKS, PRODUCT_CATEGORIES } from "../../utils/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../form/FieldInput";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "../../validations/loginSchema";
import useLoginUser from "../../hooks/useLoginUser";
import { registerSchema } from "../../validations/registerSchema";
import useRegisterUser from "../../hooks/useRegisterUser";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import useWishlist from "../../hooks/useWishlist";
import { setCheckedCategory } from "../../redux/slices/globalSlice";
import useGetProduct from "../../hooks/useGetProduct";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("login");
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { userWishlist } = useWishlist();
  const { products, loading, setFilter, filter, searchQuery } = useGetProduct();

  const handleOpen = () => setOpen(!open);

  const handleSetFilter = (cat) => {
    dispatch(setCheckedCategory(cat));
    navigate("/shop");
  };

  const onNavigateToProduct = (id) => {
    setFilter({ ...filter, query: "" });
    navigate(`/product/${id}`);
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

            {/* Search box */}
            <div className="relative">
              <div className="rounded-full py-3 px-5 flex items-center gap-3 bg-white">
                <GoSearch size={22} />
                <input
                  type="text"
                  className="outline-none border-none w-full bg-transparent "
                  placeholder="Search products..."
                  value={filter.query}
                  onChange={(e) =>
                    setFilter({ ...filter, query: e.target.value })
                  }
                />
              </div>

              {searchQuery && (
                <div className="absolute h-[400px] overflow-y-auto top-full mt-3 w-full bg-white border rounded-xl border-gray-200 rounded-b-lg shadow-lg z-20">
                  <ul>
                    {loading && (
                      <p className="text-center animate-pulse opacity-50 text-lg">
                        Looking for your product...
                      </p>
                    )}

                    {!loading &&
                      products.length > 0 &&
                      products.map((item) => (
                        <li
                          key={item?._id}
                          className="flex items-center p-3 gap-3 h-[70px] hover:bg-amber-50 rounded-lg cursor-pointer"
                          onClick={() => onNavigateToProduct(item?._id)}
                        >
                          <img
                            src={item?.thumbnails[0]}
                            alt={item?.name}
                            className="w-[60px] h-[60px] object-contain"
                          />
                          <p className="font-semibold">{item?.name}</p>
                        </li>
                      ))}
                  </ul>

                  <Button
                    onClick={() => navigate("/shop")}
                    variant="text"
                    className="w-full"
                    size="lg"
                    color="amber"
                  >
                    Show more
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 justify-end">
              <div className="flex items-center gap-7 text-white">
                {currentUser && (
                  <div
                    onClick={() => navigate("/wishlist")}
                    className="relative cursor-pointer"
                  >
                    <FaRegHeart size={25} className="hover:text-amber-600" />
                    <span className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center bg-amber-600  rounded-full  text-sm text-black font-bold pointer-events-none">
                      {userWishlist.length || 0}
                    </span>
                  </div>
                )}

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

              if (item.name === "My Account" && !currentUser) {
                return null;
              }

              if (item.name === "Wishlist" && !currentUser) {
                return null;
              }

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const { handleLogin, loading } = useLoginUser();

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
          type="password"
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
          disabled={loading}
          color="amber"
          className="w-full"
          size="lg"
          type="submit"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleRegister, loading } = useRegisterUser();

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
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
          type="password"
          errorMessage={errors?.password?.message}
        />
        <FieldInput
          labelText="Confirm Password"
          register={register}
          name="confirmPassword"
          type="password"
          errorMessage={errors?.confirmPassword?.message}
        />

        <Button
          disabled={loading}
          color="amber"
          className="w-full"
          size="lg"
          type="submit"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

function GoogleLogin() {
  const { handleGoogleLogin, loading } = useGoogleLogin();

  return (
    <Button
      disabled={loading}
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
