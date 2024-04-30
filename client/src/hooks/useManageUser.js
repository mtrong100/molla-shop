import useDebounce from "./useDebounce";
import { getAllUserApi } from "../api/userApi";
import { useEffect, useState } from "react";

export default function useManageUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginate, setPaginate] = useState({
    nextPage: 1,
    totalPages: 1,
    currentPage: 0,
  });
  const [filter, setFilter] = useState({
    query: "",
    order: "desc",
  });

  const searchQuery = useDebounce(filter.query, 500);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);

      try {
        const res = await getAllUserApi({
          order: filter.order,
          query: searchQuery,
        });
        setUsers(res);
      } catch (error) {
        console.log("Failed to fetchUsers: ", error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, [filter.order, searchQuery]);

  const handlePageClick = (event) => {
    setPaginate({
      ...paginate,
      currentPage: event.selected,
      nextPage: event.selected + 1,
    });
  };

  return {
    handlePageClick,
    users,
    isLoading,
    filter,
    setFilter,
    paginate,
  };
}
