import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline, IoWalletOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";

export const ADMIN_ID = "66111c2378e7d7db7d0e243b";

export const COUPON_CODES = [
  {
    label: "molla",
    discount: 5,
  },
  {
    label: "cool",
    discount: 10,
  },
  {
    label: "awesome",
    discount: 7,
  },
];

export const PAYMENT_METHOD = {
  CASH: "Cash on delivery",
  CARD: "Pay with card",
};

export const SORT_CATEGORIES = [
  "all",
  "laptop",
  "smartphone",
  "tablet",
  "mouse",
  "keyboard",
];

export const SORT_STATUS = [
  {
    label: "Lastest",
    value: "desc",
  },
  {
    label: "Oldest",
    value: "asc",
  },
];

export const PRODUCT_CATEGORIES = [
  "laptop",
  "smartphone",
  "tablet",
  "mouse",
  "keyboard",
];

export const PRODUCT_SIZES = ["small", "medium", "large"];

export const PHONE_SIZES = ["1TB", "128GB", "256GB", "512GB", "64GB"];

export const LAPTOP_SIZES = [
  "8GB RAM, 512GB SSD",
  "16GB RAM, 512GB SSD",
  "32GB RAM, 512GB SSD",
  "32GB RAM, 1TB SSD",
];

export const PRODUCT_COLORS = [
  "blue",
  "red",
  "green",
  "amber",
  "teal",
  "blue-gray",
  "gray",
  "indigo",
  "lime",
  "pink",
  "purple",
  "orange",
];

export const PRODUCT_BRANDS = [
  "apple",
  "samsung",
  "google pixel",
  "lenovo",
  "asus",
  "acer",
  "msi",
  "microsoft",
  "sony",
  "bose",
  "razer",
  "corsair",
  "logitech",
];

export const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const PROFILE_SIDEBAR = [
  {
    name: "Profile",
    icon: <FaRegCircleUser size={20} />,
    link: "/my-account",
  },
  {
    name: "Dashboard",
    icon: <LuLayoutDashboard size={20} />,
    link: "/admin/dashboard",
  },
  {
    name: "My Orders",
    icon: <IoWalletOutline size={20} />,
    link: "/my-orders",
  },
  {
    name: "My Cart",
    icon: <IoCartOutline size={20} />,
    link: "/my-cart",
  },
];

export const PRODUCT_RATING = ["1", "2", "3", "4", "5"];

export const NAV_LINKS = [
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
