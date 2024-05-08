import React from "react";
import TitleSection from "../components/TitleSection";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { LuBoxes } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import CategoryStatistic from "../components/charts/CategogryStastistic";
import useGetCollectionApi from "../hooks/useGetCollectionApi";
import OderStatstictic from "../components/charts/OderStatstictic";

const Dashboard = () => {
  const { results: products } = useGetCollectionApi("product");
  const { results: orders } = useGetCollectionApi("order");
  const { results: users } = useGetCollectionApi("user");

  return (
    <div>
      <TitleSection>Shop Statistics</TitleSection>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <CardWithLink
          title="Total Orders"
          amount={orders?.length}
          path="/admin/manage-orders"
          icon={<FaCartPlus size={30} />}
        />
        <CardWithLink
          title="Total Products"
          amount={products?.length}
          path="/admin/manage-products"
          icon={<LuBoxes size={30} />}
        />
        <CardWithLink
          title="Total Users"
          amount={users?.length}
          path="/admin/manage-users"
          icon={<FaUsers size={30} />}
        />
      </div>

      <div className="mt-10 space-y-12">
        <div className="space-y-8">
          <TitleSection>Category Statistics</TitleSection>
          <CategoryStatistic results={products} />
        </div>

        <div className="space-y-8">
          <TitleSection>Order Statistics</TitleSection>
          <OderStatstictic results={orders} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function CardWithLink({ title, amount, icon, path = "/" }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardBody>
        <div className="flex items-center gap-6 mb-3 relative">
          <span className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-amber-50 text-amber-500">
            {icon}
          </span>

          <div>
            <Typography variant="h3" color="black">
              {amount || 0}
            </Typography>
            <Typography variant="h6" color="gray">
              {title}
            </Typography>
          </div>

          <div className="absolute top-0 right-0">
            <IconButton onClick={() => navigate(path)} variant="text">
              <IoEyeOutline size={22} />
            </IconButton>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
