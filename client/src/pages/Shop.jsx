import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  PRODUCT_BRANDS,
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
  SORT_STATUS,
} from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  checkedBrand,
  checkedCategory,
  checkedColor,
  checkedSize,
  selectedOrder,
} from "../redux/slices/sortSlice";
import { FaList } from "react-icons/fa6";
import { FiGrid } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";
import ProductCard from "../components/ProductCard";
import ProductCardHorizontal from "../components/ProductCardHorizontal";

const Shop = () => {
  const dispatch = useDispatch();
  const [displayUi, setDisplayUi] = useState("grid");

  const { category, color, size, brand, order } = useSelector(
    (state) => state.sort
  );

  const handleToggleDisplay = () => {
    setDisplayUi((prevDisplayUi) =>
      prevDisplayUi === "grid" ? "list" : "grid"
    );
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-[300px_minmax(0,_1fr)] gap-5">
        <FilterSidebar />

        <section>
          {/* Order & Layout */}
          <div className="flex items-center justify-between">
            <p>
              Showing <strong>4 of 50</strong> products
            </p>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <p>Order by: </p>
                <select
                  id="sortby"
                  value={order}
                  onChange={(e) => dispatch(selectedOrder(e.target.value))}
                  className="block w-[120px] text-sm p-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500 capitalize "
                >
                  {SORT_STATUS.map((option) => (
                    <option
                      className="capitalize"
                      key={option.label}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <FaList
                  size={22}
                  className={`cursor-pointer ${
                    displayUi === "list" ? "opacity-100" : "opacity-50"
                  }`}
                  onClick={handleToggleDisplay}
                />
                <FiGrid
                  size={22}
                  className={`cursor-pointer ${
                    displayUi === "grid" ? "opacity-100" : "opacity-50"
                  }`}
                  onClick={handleToggleDisplay}
                />
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="w-full mt-5 flex items-center gap-1">
            <Input
              variant="outlined"
              size="lg"
              label="Search"
              placeholder="What are you looking for?"
            />

            <Popover placement="bottom">
              <PopoverHandler>
                <Button size="md" className="px-4">
                  <IoFilterOutline size={20} />
                </Button>
              </PopoverHandler>
              <PopoverContent className="w-[250px] border-gray-500 !left-[1100px]">
                <div>
                  <Typography
                    variant="lead"
                    color="blue-gray"
                    className="mr-auto font-medium"
                  >
                    Filter price
                  </Typography>

                  <div className="space-y-6 mt-5">
                    <Input
                      type="number"
                      min={0}
                      max={1000}
                      variant="static"
                      label="Min Price"
                      placeholder="Choose min price"
                    />
                    <Input
                      type="number"
                      min={0}
                      max={1000}
                      variant="static"
                      label="Max Price"
                      placeholder="Choose max price"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Render Products */}
          <section className="mt-5">
            {displayUi === "grid" ? (
              <ul className="grid grid-cols-3 gap-2">
                {Array(10)
                  .fill(0)
                  .map((item, index) => (
                    <ProductCard key={index} />
                  ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-5">
                {Array(10)
                  .fill(0)
                  .map((item, index) => (
                    <ProductCardHorizontal key={index} />
                  ))}
              </ul>
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Shop;

function FilterSidebar() {
  const dispatch = useDispatch();
  const { category, color, size, brand } = useSelector((state) => state.sort);

  const [openAcc1, setOpenAcc1] = useState(true);
  const [openAcc2, setOpenAcc2] = useState(true);
  const [openAcc3, setOpenAcc3] = useState(true);
  const [openAcc4, setOpenAcc4] = useState(true);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);
  const handleOpenAcc4 = () => setOpenAcc4((cur) => !cur);

  return (
    <Card className="p-4 sticky top-[90px] border-2 shadow-xl shadow-blue-gray-900/5 h-fit">
      <div className="flex items-center justify-between text-sm p-4">
        <p>Filter</p>
        <p className="text-amber-600 cursor-pointer">Clean All</p>
      </div>

      {/* Category Filter */}
      <List>
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
              className="border-b-0 py-2 px-3"
            >
              <Typography
                color="blue-gray"
                variant="lead"
                className="mr-auto font-medium"
              >
                Category
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {PRODUCT_CATEGORIES.map((item) => (
                <ListItem className="p-0 capitalize" key={item}>
                  <Checkbox
                    checked={item === category}
                    onChange={() => dispatch(checkedCategory(item))}
                  />
                  {item}
                </ListItem>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
      </List>

      {/* Size Filter */}
      <List>
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
              className="border-b-0 py-2 px-3"
            >
              <Typography
                variant="lead"
                color="blue-gray"
                className="mr-auto font-medium"
              >
                Size
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {PRODUCT_SIZES.map((item) => (
                <ListItem className="p-0 capitalize" key={item}>
                  <Checkbox
                    checked={item === size}
                    onChange={() => dispatch(checkedSize(item))}
                  />
                  {item}
                </ListItem>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
      </List>

      {/* Color Filter */}
      <List>
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
              className="border-b-0 py-2 px-3"
            >
              <Typography
                variant="lead"
                color="blue-gray"
                className="mr-auto font-medium"
              >
                Color
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {PRODUCT_COLORS.map((item) => (
                <ListItem className="p-0 capitalize" key={item}>
                  <Checkbox
                    color={item}
                    checked={item === color}
                    onChange={() => dispatch(checkedColor(item))}
                  />
                  {item}
                </ListItem>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
      </List>

      {/* Brand Filter */}
      <List>
        <Accordion
          open={openAcc4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                openAcc4 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0">
            <AccordionHeader
              onClick={handleOpenAcc4}
              className="border-b-0 py-2 px-3"
            >
              <Typography
                variant="lead"
                color="blue-gray"
                className="mr-auto font-medium"
              >
                Brand
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {PRODUCT_BRANDS.map((item) => (
                <ListItem className="p-0 capitalize" key={item}>
                  <Checkbox
                    checked={item === brand}
                    onChange={() => dispatch(checkedBrand(item))}
                  />
                  {item}
                </ListItem>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
}
