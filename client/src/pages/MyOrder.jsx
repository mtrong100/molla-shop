/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useRef } from "react";
import TitleSection from "../components/TitleSection";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
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
import { IoEyeOutline } from "react-icons/io5";
import { formatDate } from "../utils/helper";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TABLE_HEAD = [
  "ID",
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

  // FILTER ORDERS
  const filterOrders = orders?.docs?.filter((item) =>
    item?._id.includes(searchQuery)
  );

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <TitleSection>Manage your orders</TitleSection>
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

      {/* Action */}
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

      {/* Render orders */}
      <div className="mt-5">
        {isLoadingOrders && (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Loading...
          </p>
        )}

        {!isLoadingOrders && filterOrders?.length === 0 ? (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Product not found
          </p>
        ) : (
          <TableWithStripedRows ref={tableRef} results={filterOrders} />
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
  return (
    <Card className="h-full w-full">
      <table ref={ref} className="w-full text-left">
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
                  {item?._id}
                </Typography>
              </td>
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
                  {item?.details?.paymentMethod}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="green"
                  className="font-semibold capitalize"
                >
                  ${item?.details?.totalCost}
                </Typography>
              </td>
              <td className="p-4 ">
                <DialogDefault order={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
});

export function DialogDefault({ order }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const exportToPDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Add title "Billing Details" centered
    doc.setFontSize(20);
    doc.setTextColor("#333333");
    doc.text("Billing Details", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    // Add content to the PDF document
    doc.setFontSize(12);
    doc.setTextColor("#666666");
    doc.text(`Order ID: #${order?._id}`, 20, 40);
    doc.text(`Buyer: ${order?.shippingAddress?.fullName}`, 20, 50);
    doc.text(`Date: ${formatDate(order?.createdAt)}`, 20, 60);
    doc.text(`Payment Method: ${order?.details?.paymentMethod}`, 20, 70);

    // Additional information
    if (order?.details?.couponCodeApply) {
      doc.text(`Coupon Code Used: ${order?.details?.couponCodeApply}`, 20, 80);
    }
    if (order?.shippingType) {
      doc.text(
        `Shipping Type: ${order?.shippingType?.type} - Cost ${order?.shippingType?.price}$`,
        20,
        90
      );
    }
    if (order?.details?.totalCost) {
      doc.text(`Total Cost: ${order?.details?.totalCost}$`, 20, 100);
    }

    // Add a table for order items
    const orderItems = order?.orderItems || [];
    const tableData = orderItems.map((item) => [
      item.name,
      `$${item.price}`,
      `x${item.quantity}`,
      `$${(item.price * item.quantity).toFixed(2)}`,
    ]);
    doc.autoTable({
      startY: 120,
      head: [["Product", "Price", "Quantity", "Total"]],
      body: tableData,
      theme: "grid",
      styles: {
        font: "Arial",
        fontSize: 10,
        textColor: "#333333",
        lineWidth: 0.5,
        cellPadding: 2,
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
      },
    });

    // Add a footer with the current date
    const currentDate = formatDate(new Date());
    doc.setFontSize(10);
    doc.setTextColor("#999999");
    doc.text(
      `Generated on: ${currentDate}`,
      doc.internal.pageSize.getWidth() - 70,
      doc.internal.pageSize.getHeight() - 10
    );

    // Save the PDF document
    doc.save("billing_details.pdf");
  };

  return (
    <>
      <Button
        size="sm"
        onClick={handleOpen}
        variant="filled"
        color="amber"
        className="flex items-center gap-2"
      >
        <IoEyeOutline size={18} />
        View
      </Button>
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader className="flex items-center justify-between">
          Order ID: #{order?._id}{" "}
          <Button
            variant="filled"
            color="orange"
            onClick={exportToPDF}
            className="flex items-center gap-2"
          >
            <MdOutlineFileDownload size={20} />
            Export PDF file
          </Button>
        </DialogHeader>
        <DialogBody className="overflow-y-auto max-h-[600px]">
          {/* Billing Details */}
          <div className="flex flex-col border rounded-lg p-4 border-gray-400">
            <span className="text-lg font-semibold text-indigo-700">
              Order Details
            </span>
            <div className="flex flex-col mt-2">
              <span className="text-gray-900">
                Buyer: {order?.shippingAddress?.fullName}
              </span>
              <span className="text-gray-900">
                Date: {formatDate(order?.createdAt)}
              </span>
              <span className="text-gray-900">
                Payment Method: {order?.details?.paymentMethod}
              </span>
              {order?.details?.couponCodeApply && (
                <span className="text-gray-900">
                  Coupon Code Applied:{" "}
                  <span className="uppercase text-amber-600 font-semibold">
                    {order?.details?.couponCodeApply}
                  </span>
                </span>
              )}
              <span className="text-gray-900">
                Shipping: {order?.shippingType?.type} - Cost{" "}
                <span className="text-blue-600 font-semibold">
                  {order?.shippingType?.price}$
                </span>
              </span>
              <span className="text-gray-900">
                Total Cost:{" "}
                <span className="text-green-600 font-semibold text-xl">
                  {order?.details?.totalCost}$
                </span>
              </span>
            </div>
          </div>

          {/* OrderItems table */}
          <table className="w-full text-left mt-5">
            <thead>
              <tr>
                <th className="border-b w-[500px] border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Product
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Price
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Quantity
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Total
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItems?.map((item) => (
                <tr key={item?._id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-5">
                      <div className="w-[60px] h-[60px] flex-shrink-0">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>{item?.name}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal "
                    >
                      ${item?.price}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal "
                    >
                      x{item?.quantity}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="green"
                      className="font-semibold"
                    >
                      ${Number(item?.price * item.quantity).toFixed(2)}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </>
  );
}
