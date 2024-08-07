import React, { useEffect, useState } from "react";
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
  LAPTOP_SIZES,
  PHONE_SIZES,
  PRODUCT_BRANDS,
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
  SORT_STATUS,
} from "../utils/constants";
import { FaList } from "react-icons/fa6";
import { FiGrid } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import ProductCardHorizontal, {
  ProductCardHorizontalSkeleton,
} from "../components/ProductCardHorizontal";
import ReactPaginate from "react-paginate";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import useProduct from "../hooks/useProduct";

const Shop = () => {
  const [displayUi, setDisplayUi] = useState("grid");
  const {
    handdleFilteringPrice,
    handlePageClick,
    products,
    isLoading,
    isFilteringPrice,
    setFilter,
    filter,
    paginate,
    handleResetFilter,
  } = useProduct();

  const handleToggleDisplay = () => {
    setDisplayUi((prevDisplayUi) =>
      prevDisplayUi === "grid" ? "list" : "grid"
    );
  };

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-[300px_minmax(0,_1fr)] gap-5">
        <FilterSidebar
          setFilter={setFilter}
          filter={filter}
          onReset={handleResetFilter}
        />

        <section>
          {/* Order & Layout */}
          <div className="flex items-center justify-between">
            <p>
              Showing <strong>12 of {products?.totalDocs}</strong> products
            </p>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <p>Order by: </p>
                <select
                  id="sortby"
                  value={filter.order}
                  onChange={(e) =>
                    setFilter({ ...filter, order: e.target.value })
                  }
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
              value={filter.query}
              onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            />

            <Popover placement="bottom">
              <PopoverHandler>
                <Button size="md" className="px-4">
                  <IoFilterOutline size={20} />
                </Button>
              </PopoverHandler>
              <PopoverContent className="w-[250px] z-30 border-gray-500 !left-[1100px]">
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
                    value={filter.minPrice}
                    onChange={(e) =>
                      setFilter({ ...filter, minPrice: e.target.value })
                    }
                  />
                  <Input
                    type="number"
                    min={0}
                    max={1000}
                    variant="static"
                    label="Max Price"
                    placeholder="Choose max price"
                    value={filter.maxPrice}
                    onChange={(e) =>
                      setFilter({ ...filter, maxPrice: e.target.value })
                    }
                  />
                </div>

                <Button
                  disabled={isFilteringPrice}
                  onClick={handdleFilteringPrice}
                  variant="gradient"
                  className="w-full mt-3"
                >
                  {isFilteringPrice ? "Filtering..." : " Filter price"}
                </Button>
              </PopoverContent>
            </Popover>
          </div>

          {/* Render Products */}
          <section className="mt-5">
            {!isLoading && products?.length === 0 && (
              <p className="text-center my-5 text-lg opacity-50 font-semibold">
                Product not found...
              </p>
            )}

            <ul
              className={
                displayUi === "grid"
                  ? "grid grid-cols-3 gap-2"
                  : "flex flex-col gap-5"
              }
            >
              {isLoading &&
                Array(12)
                  .fill(0)
                  .map((_, index) =>
                    displayUi === "grid" ? (
                      <ProductCardSkeleton key={index} />
                    ) : (
                      <ProductCardHorizontalSkeleton key={index} />
                    )
                  )}

              {!isLoading &&
                products?.docs?.map((item) =>
                  displayUi === "grid" ? (
                    <ProductCard key={item?._id} p={item} />
                  ) : (
                    <ProductCardHorizontal key={item?._id} p={item} />
                  )
                )}
            </ul>
          </section>

          {/* Pagination */}
          {products?.totalDocs > 12 && (
            <div className="mt-8 mb-3">
              <ReactPaginate
                breakLabel="..."
                nextLabel={<LuChevronRight />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={products?.totalPages}
                previousLabel={<LuChevronLeft />}
                renderOnZeroPageCount={null}
                forcePage={paginate.currentPage}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Shop;

function FilterSidebar({ setFilter, filter, onReset }) {
  const [openAcc1, setOpenAcc1] = useState(true);
  const [openAcc2, setOpenAcc2] = useState(true);
  const [openAcc3, setOpenAcc3] = useState(true);
  const [openAcc4, setOpenAcc4] = useState(true);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);
  const handleOpenAcc4 = () => setOpenAcc4((cur) => !cur);

  function renderSizeOption() {
    let sizeOptions = [];

    switch (filter.category) {
      case "laptop":
        sizeOptions = LAPTOP_SIZES;
        break;
      case "smartphone":
        sizeOptions = PHONE_SIZES;
        break;
      default:
        sizeOptions = PRODUCT_SIZES;
    }

    return sizeOptions.map((item) => (
      <ListItem className="p-0 capitalize" key={item}>
        <Checkbox
          checked={item === filter.size}
          onChange={() => setFilter({ ...filter, size: item })}
        />
        {item}
      </ListItem>
    ));
  }

  return (
    <Card className="p-4 sticky overflow-y-auto top-[90px] border-2 shadow-xl shadow-blue-gray-900/5 h-[700px]">
      <div className="flex items-center justify-between text-sm p-4">
        <p>Filter</p>
        <div onClick={onReset} className="text-amber-600 cursor-pointer">
          Clean All
        </div>
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
                    checked={item === filter.category}
                    onChange={() => setFilter({ ...filter, category: item })}
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
            <List className="p-0">{renderSizeOption()}</List>
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
                    checked={item === filter.color}
                    onChange={() => setFilter({ ...filter, color: item })}
                    className="rounded-full"
                  />
                  <span className={`text-black`}>{item}</span>
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
                    checked={item === filter.brand}
                    onChange={() => setFilter({ ...filter, brand: item })}
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
