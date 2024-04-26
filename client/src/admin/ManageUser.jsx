/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useRef } from "react";
import TitleSection from "../components/TitleSection";
import { DownloadTableExcel } from "react-export-table-to-excel";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { MdOutlineFileDownload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setNextPage } from "../redux/slices/orderSlice";
import {
  loadingUsers,
  setQueryUser,
  setSortOptionVal,
  userList,
} from "../redux/slices/userSlice";
import { getAllUserApi } from "../api/userApi";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const TABLE_HEAD = [
  "ID",
  "Name",
  "Email",
  "Address",
  "Phone",
  "Provider",
  "Role",
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

const ManageUser = () => {
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { users, isLoadingUser, query, sortOption, currentPage } = useSelector(
    (state) => state.user
  );
  const searchQuery = useDebounce(query, 500);

  useEffect(() => {
    async function fetchUsers() {
      try {
        dispatch(loadingUsers(true));
        const res = await getAllUserApi({
          userToken: currentUser?.token,
          order: sortOption,
          query: searchQuery,
        });
        dispatch(userList(res));
        dispatch(loadingUsers(false));
      } catch (error) {
        console.log("Failed to fetch users: ", error);
        dispatch(loadingUsers(false));
        dispatch(userList([]));
      }
    }
    fetchUsers();
  }, [currentUser?.token, dispatch, searchQuery, sortOption]);

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
        <TitleSection>Manage all users</TitleSection>
        <DownloadTableExcel
          filename="Order Excel Table"
          sheet="Order sheet"
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
          onChange={(e) => dispatch(setQueryUser(e.target.value))}
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
        {isLoadingUser && (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Loading...
          </p>
        )}

        {!isLoadingUser && users?.docs?.length === 0 ? (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            User not found
          </p>
        ) : (
          <TableWithStripedRows ref={tableRef} results={users?.docs} />
        )}
      </div>

      {/* Pagination */}
      {users?.totalDocs > 12 && (
        <div className="mt-8 mb-3">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<LuChevronRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={users?.totalPages}
            previousLabel={<LuChevronLeft />}
            renderOnZeroPageCount={null}
            forcePage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ManageUser;

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
                  {item?.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal "
                >
                  {item?.email}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item?.address || "Not update"}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal "
                >
                  {item?.phone || "Not update"}
                </Typography>
              </td>

              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal capitalize"
                >
                  {item?.provider}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="amber"
                  className="font-semibold capitalize"
                >
                  {item?.role}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
});
