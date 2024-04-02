import { Spinner } from "@material-tailwind/react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import VerifyEmail from "../pages/VerifyEmail";

/* MAIN PAGES */
const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const Shop = lazy(() => import("../pages/Shop"));
const MyAccount = lazy(() => import("../pages/MyAccount"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Checkout = lazy(() => import("../pages/Checkout"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));

/* ADMIN PAGES */
const Dashboard = lazy(() => import("../admin/Dashboard"));
const ManageOrder = lazy(() => import("../admin/ManageOrder"));
const ManageProduct = lazy(() => import("../admin/ManageProduct"));
const ManageUser = lazy(() => import("../admin/ManageUser"));
const CreateProduct = lazy(() => import("../admin/CreateProduct"));
const UpdateProduct = lazy(() => import("../admin/UpdateProduct"));

const mainRoutes = [
  { path: "/", element: <Home /> },
  { path: "/cart", element: <Cart /> },
  { path: "/shop", element: <Shop /> },
  { path: "/my-account", element: <MyAccount /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
];

const adminRoutes = [
  { path: "/admin/dashboard", element: <Dashboard /> },
  { path: "/admin/manage-products", element: <ManageProduct /> },
  { path: "/admin/create-product", element: <CreateProduct /> },
  { path: "/admin/update-product/:id", element: <UpdateProduct /> },
  { path: "/admin/manage-orders", element: <ManageOrder /> },
  { path: "/admin/manage-users", element: <ManageUser /> },
];

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {mainRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-screen">
                    <Spinner className="h-24 w-24" />
                  </div>
                }
              >
                {route.element}
              </Suspense>
            }
          />
        ))}
      </Route>

      <Route element={<DashboardLayout />}>
        {adminRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-screen">
                    <Spinner className="h-24 w-24" />
                  </div>
                }
              >
                {route.element}
              </Suspense>
            }
          />
        ))}
      </Route>

      <Route path="/verify-email" element={<VerifyEmail />} />
    </Routes>
  );
};

export default AppRouter;
