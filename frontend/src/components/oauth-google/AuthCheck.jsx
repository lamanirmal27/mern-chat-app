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
          window.location.href = "/";
          return;
        }
        navigate("/login");
      } catch (error) {
        if (error.response?.status === 401) {
          console.log(error?.response?.data);
          navigate("/login");
        } else {
          console.error("Auth check failed:", error);
          setError("Connection error - please refresh");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navigate, setAuthUser]);

  return (
    <div className="h-[400px] w-[600px] flex items-center justify-center bg-white-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30">
      {loading ? (
        <p className="flex justify-center items-center text-4xl font-semibold text-white">
          Verifying session...
          <span className="loading loading-spinner loading-lg ml-2"></span>
        </p>
      ) : error ? (
        <div className="text-red-500 text-center">
          <p className="text-2xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AuthCheck;
