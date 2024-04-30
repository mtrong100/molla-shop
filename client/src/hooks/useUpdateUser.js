import { useState } from "react";
import toast from "react-hot-toast";
import { updateUserApi } from "../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { storeCurrentUser } from "../redux/slices/userSlice";

export default function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleUpdateUser = async (values) => {
    try {
      const req = { ...values };

      const res = await updateUserApi(currentUser?._id, req);

      dispatch(storeCurrentUser(res));
      toast.success("Update user successfully");
    } catch (error) {
      toast.error(error.message);
      console.log("Something wrong with handleUpdateUser function: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateUser, loading };
}
