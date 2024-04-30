import { useState } from "react";
import { loginApi } from "../api/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../redux/slices/userSlice";

export default function useLoginUser() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const { email, password } = values;

      const res = await loginApi({ email, password });

      toast.success("Login successfully");
      dispatch(storeCurrentUser(res));
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
      console.log("Something wrong with handleLogin function: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}
