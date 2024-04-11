import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllProductsApi } from "../api/productApi";

export default function useGeRealtedProducts(category) {
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const res = await getAllProductsApi({ category });
        setRelatedProducts(res);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch products");
        console.log(
          `Failed to fetch products with ctegory: ${category}  =>`,
          error
        );
        setIsLoading(false);
        setRelatedProducts(null);
      }
    }
    fetchProduct();
  }, [category]);

  return { relatedProducts, setRelatedProducts, isLoading };
}
