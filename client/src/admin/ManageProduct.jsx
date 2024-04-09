/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import TitleSection from "../components/TitleSection";
import useDebounce from "../hooks/useDebounce";
import {
  Typography,
  Input,
  Select,
  Option,
  Card,
  Button,
} from "@material-tailwind/react";
import { PRODUCT_CATEGORIES } from "../utils/constants";
import { deleteProductApi, getAllProductsApi } from "../api/productApi";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdOutlineFileDownload } from "react-icons/md";
import { displayRating } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "sonner";

const TABLE_HEAD = [
  "ID",
  "Name",
  "Category",
  "Price",
  "Size",
  "Brand",
  "Color",
  "Rating",
  "Action",
];

const ManageProduct = () => {
  const tableRef = useRef(null);
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const searchQuery = useDebounce(query, 500);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await getAllProductsApi({ category, query: searchQuery });
        setproducts(res?.docs);
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to fetch products: ", error);
        setproducts([]);
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [category, searchQuery]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Manage products</TitleSection>
        <DownloadTableExcel
          filename="SF Girls Excel Character"
          sheet="excel characters"
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          label="Tìm kiếm"
          size="lg"
        />
        <Select onChange={(val) => setCategory(val)} size="lg" label="Filter">
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

        {!isLoading && products.length === 0 ? (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Product not found
          </p>
        ) : (
          <TableWithStripedRows ref={tableRef} results={products} />
        )}
      </div>
    </div>
  );
};

export default ManageProduct;

const TableWithStripedRows = forwardRef(({ results = [] }, ref) => {
  const navigate = useNavigate();

  // DELETE
  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteProductApi(productId);
          toast.success(res?.message);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <Card className="h-full w-full ">
      <table ref={ref} className="w-full min-w-max table-auto text-left">
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
                  {item?.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item?.category}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item?.price}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item?.size}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item?.brand}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item?.color}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {displayRating(item?.rating)}
                </Typography>
              </td>
              <td className="p-4 flex items-center gap-3">
                <Typography
                  variant="small"
                  color="green"
                  onClick={() => navigate(`/admin/update-product/${item?._id}`)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
});
