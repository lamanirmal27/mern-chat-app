import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axios from "../../api/axios";

const AuthCheck = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setAuthUser } = useAuthContext();

  useEffect(() => {
    let timeoutId;

    const verifyAuth = async () => {
      try {
        const { data } = await axios.get("/auth/auth-status");
        console.log(data);
        if (data.authenticated && data.user) {
          localStorage.setItem("chat-user", JSON.stringify(data.user));
          setAuthUser(data.user);
          timeoutId = setTimeout(() => {
            navigate("/");
            setLoading(false);
          }, 1500);
        } else {
          navigate("/login");
        }
      } catch (error) {
        setError("Authentication failed");
        timeoutId = setTimeout(() => {
          navigate("/login");
          setLoading(false);
        }, 1500);
      }
    };

    verifyAuth();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navigate, setAuthUser]);

  return (
    <div className="h-[400px] w-[600px] flex items-center justify-center bg-white-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 ">
      {loading && (
        <p className="flex justify-center items-center text-4xl font-semibold text-white">
          Loading...<span className="loading loading-spinner loading-lg"></span>
        </p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AuthCheck;
