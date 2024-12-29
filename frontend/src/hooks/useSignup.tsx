import { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const SIGNUP_URL = "/auth/signup";

interface SignupData{
    fullName: string;
    username:string;
    password: string;
    confirmPassword: string;
    gender:string
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }: SignupData) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (success === false) return;

    try {
      setLoading(true);
      const res = await axios.post(
        SIGNUP_URL,
        JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        })
      );
      toast.success("Hurray!");
      //setting user info in local storage
      localStorage.setItem("chat-user", JSON.stringify(res.data));
      setAuthUser(res.data);
      console.log(res.data);
    } catch (error:any) {
      if (!error?.response) {
        toast.error("No response from server");
      } else {
        toast.error("Login failed");
      }
      // console.log(error);
      // toast.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}: SignupData) {
  if (!fullName || !username || !password || !confirmPassword) {
    toast.error("Enter all the details!!");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match!!");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long!!");
    return false;
  }
}
