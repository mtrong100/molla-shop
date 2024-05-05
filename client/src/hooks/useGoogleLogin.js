import { useState } from "react";
import { googleLoginApi } from "../api/authApi";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../redux/slices/userSlice";

export default function useGoogleLogin() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const results = await signInWithPopup(auth, provider);
      const user = results.user;

      const req = {
        name: user?.displayName,
        email: user?.email,
        avatar: user?.photoURL,
      };

      const res = await googleLoginApi(req);

      dispatch(storeCurrentUser(res));
      toast.success("Google login successfully");

      window.location.reload();
    } catch (error) {
      toast.error(error.message);
      console.log("Failed to login with google: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleGoogleLogin, loading };
}
