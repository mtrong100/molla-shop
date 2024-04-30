import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProductDetailApi } from "../api/productApi";

export default function useGetBlogDetail(productId) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProductDetail() {
      setIsLoading(true);

      try {
        const res = await getProductDetailApi(productId);
        setProduct(res);
      } catch (error) {
        toast.error(error?.response?.data?.error);
        console.log("Failed to fetchProductDetail: ", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProductDetail();
  }, [productId]);

  return { product, setProduct, isLoading };
}
