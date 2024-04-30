import { useState } from "react";
import { registerApi } from "../api/authApi";
import toast from "react-hot-toast";

export default function useRegisterUser() {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);

    try {
      const { email, password, name, confirmPassword } = values;

      await registerApi({ email, password, name, confirmPassword });
      toast.success("Register successfully, please verify your email to login");
    } catch (error) {
      toast.error(error.message);
      console.log("Something wrong with handleRegister function: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
}
