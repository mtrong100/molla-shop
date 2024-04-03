import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline, IoWalletOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";

export const SORT_CATEGORIES = [
  "All",
  "Computers and Laptops",
  "Smartphones and Tablets",
  "Accessories",
  "Gaming Accessories",
];

export const PRODUCT_CATEGORIES = [
  "Computers and Laptops",
  "Smartphones and Tablets",
  "Accessories",
  "Audio Equipment",
  "Gaming Accessories",
  "Computer Components",
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
    link: "/dashboard",
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
