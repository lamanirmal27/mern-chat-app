import { useAuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import toast from "react-hot-toast";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      const response = await axios.post("api/auth/logout");
      console.log(response);
      toast.success(response.data);
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
