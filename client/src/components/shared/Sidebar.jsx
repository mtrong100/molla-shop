import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaProductHunt, FaCartPlus, FaUsers } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { MdManageSearch } from "react-icons/md";
import { IoMdHome, IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const [openAcc1, setOpenAcc1] = useState(true);
  const [openAcc2, setOpenAcc2] = useState(true);
  const [openAcc3, setOpenAcc3] = useState(true);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);

  return (
    <Card className="sticky top-0 max-w-[300px] h-screen border-r-2 w-full p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="px-4">
        <Typography variant="h2" color="amber">
          Molla
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => navigate("/")}>
          <ListItemPrefix>
            <IoMdHome size={25} />
          </ListItemPrefix>
          Home
        </ListItem>

        <ListItem onClick={() => navigate("/admin/dashboard")}>
          <ListItemPrefix>
            <LuLayoutDashboard size={20} />
          </ListItemPrefix>
          Dashboard
        </ListItem>

        <Accordion
          open={openAcc1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                openAcc1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0">
            <AccordionHeader
              onClick={handleOpenAcc1}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <FaProductHunt size={20} />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Product
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                onClick={() => navigate("/admin/create-product")}
                className="pl-8"
              >
                <ListItemPrefix>
                  <GoPlus size={25} />
                </ListItemPrefix>
                Create
              </ListItem>
              <ListItem
                onClick={() => navigate("/admin/manage-products")}
                className="pl-8"
              >
                <ListItemPrefix>
                  <MdManageSearch size={25} />
                </ListItemPrefix>
                Manage
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={openAcc2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                openAcc2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0">
            <AccordionHeader
              onClick={handleOpenAcc2}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <FaCartPlus size={20} />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Order
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                onClick={() => navigate("/admin/manage-orders")}
                className="pl-8"
              >
                <ListItemPrefix>
                  <MdManageSearch size={25} />
                </ListItemPrefix>
                Manage
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={openAcc3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                openAcc3 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0">
            <AccordionHeader
              onClick={handleOpenAcc3}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <FaUsers size={20} />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                User
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                onClick={() => navigate("/admin/manage-users")}
                className="pl-8"
              >
                <ListItemPrefix>
                  <MdManageSearch size={25} />
                </ListItemPrefix>
                Manage
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <hr className="my-2 border-blue-gray-50" />

        <ListItem>
          <ListItemPrefix>
            <IoMdLogOut size={20} />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
