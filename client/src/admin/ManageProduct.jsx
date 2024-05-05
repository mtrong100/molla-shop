/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useRef } from "react";
import TitleSection from "../components/TitleSection";
import {
  Typography,
  Input,
  Select,
  Option,
  Card,
  Button,
} from "@material-tailwind/react";
import { PRODUCT_CATEGORIES } from "../utils/constants";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdOutlineFileDownload } from "react-icons/md";
import { displayRating } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import useDeleteProduct from "../hooks/useDeleteProduct";
import useProduct from "../hooks/useProduct";

const TABLE_HEAD = [
  // "ID",
  "Name",
  "Category",
  "Price",
  "Stock",
  "Size",
  "Brand",
  "Color",
  "Rating",
  "Action",
];

const ManageProduct = () => {
  const tableRef = useRef(null);
  const { handlePageClick, products, isLoading, setFilter, filter, paginate } =
    useProduct();

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div>
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

      <div className="w-full grid grid-cols-[minmax(0,_1fr)_250px] gap-3 mt-5">
        <Input
          label="Tìm kiếm"
          size="lg"
          value={filter.query}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        />
        <Select
          size="lg"
          label="Filter"
          onChange={(val) => setFilter({ ...filter, category: val })}
        >
          {PRODUCT_CATEGORIES.map((item) => (
            <Option value={item} key={item}>
              <span className={`capitalize font-semibold`}>{item}</span>
            </Option>
          ))}
        </Select>
      </div>

      <div className="mt-5">
        {isLoading && (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Loading...
          </p>
        )}

        {!isLoading && products?.docs?.length === 0 ? (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Product not found
          </p>
        ) : (
          <TableWithStripedRows ref={tableRef} results={products?.docs} />
        )}
      </div>

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
    </div>
  );
};

export default ManageProduct;

const TableWithStripedRows = forwardRef(({ results = [] }, ref) => {
  const navigate = useNavigate();
  const { handleDeleteProduct, isDeleting } = useDeleteProduct();

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
            <tr
              key={item?._id}
              className={`${
                isDeleting ? "bg-red-50" : ""
              } even:bg-blue-gray-50/50`}
            >
              {/* <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item?._id}
                </Typography>
              </td> */}
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item?.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal capitalize"
                >
                  {item?.category}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal capitalize"
                >
                  {item?.price}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal capitalize"
                >
                  {item?.stock}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal capitalize"
                >
                  {item?.size}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal capitalize"
                >
                  {item?.brand}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal capitalize"
                >
                  {item?.color}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal capitalize"
                >
                  {displayRating(item?.rating)}
                </Typography>
              </td>
              <td className="p-4 ">
                <div className="flex items-center gap-3">
                  <Typography
                    variant="small"
                    color="blue"
                    onClick={() => navigate(`/product/${item?._id}`)}
                    className="font-medium cursor-pointer"
                  >
                    View
                  </Typography>
                  <Typography
                    variant="small"
                    color="green"
                    onClick={() =>
                      navigate(`/admin/update-product/${item?._id}`)
                    }
                    className="font-medium cursor-pointer"
                  >
                    Edit
                  </Typography>
                  <Typography
                    onClick={() => handleDeleteProduct(item?._id)}
                    variant="small"
                    color="red"
                    className="font-medium cursor-pointer"
                  >
                    Delete
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
