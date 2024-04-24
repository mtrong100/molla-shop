/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import useDebounce from "../hooks/useDebounce";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  loadingOrders,
  orderList,
  setCurrentPage,
  setNextPage,
  setQueryOrder,
  setSortOptionVal,
} from "../redux/slices/orderSlice";
import { getUserOrdersApi } from "../api/orderApi";
import ReactPaginate from "react-paginate";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  "Customer",
  "Phone",
  "Email",
  "Address",
  "Payment Method",
  "Total Cost",
  "Action",
];

const ORDER_OPTIONS = [
  {
    label: "Lastest",
    value: "desc",
  },
  {
    label: "Oldest",
    value: "asc",
  },
];

const MyOrder = () => {
  const tableRef = useRef(null);
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { orders, isLoadingOrders, query, sortOption, currentPage } =
    useSelector((state) => state.order);
  const searchQuery = useDebounce(query, 500);

  useEffect(() => {
    async function fetchUserOrders() {
      try {
        dispatch(loadingOrders(true));
        const res = await getUserOrdersApi({
          userToken: currentUser?.token,
          userId: currentUser?._id,
          order: sortOption,
          query: searchQuery,
        });
        dispatch(orderList(res));
      } catch (error) {
        console.log("Failed to fetch products: ", error);
        dispatch(orderList([]));
        dispatch(loadingOrders(false));
      }
    }
    fetchUserOrders();
  }, [currentUser?._id, currentUser?.token, dispatch, searchQuery, sortOption]);

  // CLICK PAGE
  const handlePageClick = (event) => {
    dispatch(setCurrentPage(event.selected));
    dispatch(setNextPage(event.selected + 1));
  };

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <TitleSection>Manage products</TitleSection>
        <DownloadTableExcel
          filename="Product Excel Table"
          sheet="product sheet"
          currentTableRef={tableRef.current}
        >
          <Button
            variant="gradient"
            size="md"
            className="flex items-center gap-2"
          >
            <MdOutlineFileDownload size={20} />
            Download excel file
          </Button>
        </DownloadTableExcel>
      </div>

      <div className="w-full grid grid-cols-[minmax(0,_1fr)_250px] gap-3 mt-8">
        <Input
          value={query}
          onChange={(e) => dispatch(setQueryOrder(e.target.value))}
          label="Search"
          size="lg"
        />
        <Select
          onChange={(val) => dispatch(setSortOptionVal(val))}
          size="lg"
          label="Order by"
        >
          {ORDER_OPTIONS.map((item) => (
            <Option value={item.value} key={item}>
              <span className={`capitalize font-semibold`}>{item.label}</span>
            </Option>
          ))}
        </Select>
      </div>

      <div className="mt-5">
        {isLoadingOrders && (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Loading...
          </p>
        )}

        {!isLoadingOrders && orders?.docs?.length === 0 ? (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Product not found
          </p>
        ) : (
          <TableWithStripedRows ref={tableRef} results={orders?.docs} />
        )}
      </div>

      {/* Pagination */}
      {orders?.totalDocs > 12 && (
        <div className="mt-8 mb-3">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<LuChevronRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={orders?.totalPages}
            previousLabel={<LuChevronLeft />}
            renderOnZeroPageCount={null}
            forcePage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default MyOrder;

const TableWithStripedRows = forwardRef(({ results = [] }, ref) => {
  const navigate = useNavigate();

  return (
    <Card className="h-full w-full">
      <table ref={ref} className="w-full  text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results?.map((item) => (
            <tr key={item?._id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item?.shippingAddress?.fullName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal "
                >
                  {item?.shippingAddress?.phone}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal "
                >
                  {item?.shippingAddress?.email}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal "
                >
                  {item?.shippingAddress?.address}
                </Typography>
              </td>

              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal capitalize"
                >
                  {item?.paymentMethod}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="green"
                  className="font-semibold capitalize"
                >
                  ${item?.total}
                </Typography>
              </td>
              <td className="p-4 ">
                <div className="flex items-center gap-3">
                  <Typography
                    variant="small"
                    color="deep-orange"
                    className="font-medium cursor-pointer"
                  >
                    View
                  </Typography>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
});
