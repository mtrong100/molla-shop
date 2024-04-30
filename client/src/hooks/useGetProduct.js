import { useEffect, useState } from "react";
import { getAllProductsApi } from "../api/productApi";
import useDebounce from "./useDebounce";

export default function useGetProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    query: "",
    category: "all",
  });

  const searchQuery = useDebounce(filter.query, 300);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      try {
        let res;

        if (filter.category === "all") {
          res = await getAllProductsApi({ query: filter.query });
        } else {
          res = await getAllProductsApi({ category: filter.category });
        }

        setProducts(res?.docs);
      } catch (error) {
        console.log("Failed to fetchProducts: ", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filter.category]);

  return { products, loading, setFilter, filter, searchQuery };
}
