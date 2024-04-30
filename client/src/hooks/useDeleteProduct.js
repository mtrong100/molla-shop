import Swal from "sweetalert2";
import { deleteProductApi } from "../api/productApi";
import toast from "react-hot-toast";
import { useState } from "react";

export default function useDeleteProduct() {
  const [isDeleting, setIsDeleting] = useState(false);

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
        setIsDeleting(true);
        try {
          await deleteProductApi(productId);
          toast.success("Product has been deleted");
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          window.location.reload();
        } catch (error) {
          toast.error(error?.response?.data?.error);
          console.log("Failed to handleDeleteProduct: ", error);
        } finally {
          setIsDeleting(false);
        }
      }
    });
  };

  return { handleDeleteProduct, isDeleting };
}
