import { useDispatch, useSelector } from "react-redux";
import useDebounce from "./useDebounce";
import { useEffect, useState } from "react";
import { getAllOrderApi } from "../api/orderApi";

export default function useManageOrder() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
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
    async function fetchOrders() {
      setIsLoading(true);

      try {
        const res = await getAllOrderApi({
          order: filter.order,
        });
        setOrders(res);
      } catch (error) {
        console.log("Failed to fetchOrders: ", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, [currentUser?._id, dispatch, filter.order]);

  const handlePageClick = (event) => {
    setPaginate({
      ...paginate,
      currentPage: event.selected,
      nextPage: event.selected + 1,
    });
  };

  const filterOrders = orders?.docs?.filter((item) =>
    item?._id.includes(searchQuery)
  );

  return {
    filterOrders,
    handlePageClick,
    orders,
    setFilter,
    filter,
    paginate,
    isLoading,
  };
}
