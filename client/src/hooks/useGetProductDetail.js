import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProductDetailApi } from "../api/productApi";

export default function useGetBlogDetail(productId) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const res = await getProductDetailApi(productId);
        setProduct(res);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch product");
        console.log(`Failed to fetch product #${productId}  =>`, error);
        setIsLoading(false);
        setProduct(null);
      }
    }
    fetchProduct();
  }, [productId]);

  return { product, setProduct, isLoading };
}
