import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import toast from "react-hot-toast";
import { updateProductApi } from "../api/productApi";
import { useNavigate, useParams } from "react-router-dom";

export default function useUpdateProduct() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingThumbnails, setLoadingThumbnails] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    category: "",
    color: "",
    size: "",
    brand: "",
    rating: "",
    info: "",
  });

  const handleValidateForm = () => {
    const { category, color, size, brand, rating, info } = form;

    if (!(size || color || brand || category || rating)) {
      toast.info("Please select all the fields");
      return;
    }

    if (images.length === 0) {
      toast.info("Please upload 5 images");
      return;
    }

    if (images.length > 5) {
      toast.info("Maximum 5 images for 1 product");
      return;
    }

    if (thumbnails.length === 0) {
      toast.info("Please upload 2 thumbnail images");
      return;
    }

    if (thumbnails.length > 2) {
      toast.info("Thumbnail only have 2 images");
      return;
    }

    if (!info.trim()) {
      toast.info("Product infomation is required");
      return;
    }
  };

  const handleUpdateProduct = async (values) => {
    setLoading(true);

    handleValidateForm();

    const { category, color, size, brand, rating, info } = form;

    try {
      const req = {
        ...values,
        discount: Number(values.discount) || 0,
        stock: Number(values.stock) || 1000,
        price: Number(values.price),
        images,
        thumbnails,
        size,
        color,
        brand,
        category,
        info,
        rating: Number(rating),
      };

      await updateProductApi(productId, req);
      toast.success("Update product successfully");
      navigate("/admin/manage-products");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to update product: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImages = async (event) => {
    setLoadingImages(true);

    const files = event.target.files;
    if (!files || files.length === 0) {
      setLoadingImages(false);
      return;
    }

    const storage = getStorage();

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const storageRef = ref(storage, "pictures/" + file.name + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, file);
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    } catch (error) {
      console.log("Failed to upload images: ", error);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleUploadThumbnails = async (event) => {
    setLoadingThumbnails(true);

    const files = event.target.files;
    if (!files || files.length === 0) {
      setLoadingThumbnails(false);
      return;
    }

    const storage = getStorage();

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const storageRef = ref(storage, "pictures/" + file.name + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, file);

        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setThumbnails((prevImages) => [...prevImages, ...uploadedImages]);
    } catch (error) {
      console.log("Failed to upload thumbnails: ", error);
      toast.error("Failed to upload thumbnails");
    } finally {
      setLoadingThumbnails(false);
    }
  };

  return {
    handleUploadImages,
    handleUploadThumbnails,
    handleUpdateProduct,
    setForm,
    form,
    loading,
    loadingImages,
    loadingThumbnails,
    thumbnails,
    setThumbnails,
    images,
    setImages,
  };
}
