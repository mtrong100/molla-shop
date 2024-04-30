import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logOutApi } from "../api/authApi";
import { storeCurrentUser } from "../redux/slices/userSlice";
import { useState } from "react";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logOutApi();
      dispatch(storeCurrentUser(null));
      toast.success("Logout successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
      console.log("Something wrong with handleLogout function: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading };
}
