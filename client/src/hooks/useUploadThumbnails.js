import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "sonner";

export default function useUploadThumbnails() {
  const [thumbnails, setThumbnails] = useState([]);

  const handleUploadThumbnails = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const storage = getStorage();
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, "pictures/" + file.name + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.log("Failed to upload images: ", error);
          toast.error("Failed to upload images");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            uploadedImages.push(downloadURL);
            if (uploadedImages.length === files.length) {
              setThumbnails((prevImages) => [...prevImages, ...uploadedImages]);
            }
          });
        }
      );
    }
  };

  return { handleUploadThumbnails, thumbnails, setThumbnails };
}
