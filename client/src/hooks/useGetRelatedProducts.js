import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllProductsApi } from "../api/productApi";

export default function useGetRelatedProducts(category) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRelatedProducts() {
      setIsLoading(true);

      try {
        const res = await getAllProductsApi({ category });
        setRelatedProducts(res);
      } catch (error) {
        toast.error(error?.response?.data?.error);
        console.log("Failed to fetchRelatedProducts: ", error);
        setRelatedProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRelatedProducts();
  }, [category]);

  return { relatedProducts, setRelatedProducts, isLoading };
}
