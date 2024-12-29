import  { useState } from "react";
import toast from "react-hot-toast";
import axios from "../api/axios";
import { useAuthContext } from "../context/AuthContext";

interface LoginCredentials {
  username: string;
  password: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const Login = async ({ username, password }: LoginCredentials) => {
    if (!username || !password) {
      toast.error("Fill in all the details");
      return false;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({
          username,
          password,
        })
      );
      toast.success("Hurray!");
      //setting user info in local storage
      localStorage.setItem("chat-user", JSON.stringify(response.data));
      setAuthUser(response.data);
      console.log(response.data);
    } catch (error: any) {
      if (!error?.response) {
        toast.error("No response from server");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };
  return { Login, loading };
};

export default useLogin;
