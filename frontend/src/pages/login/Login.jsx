import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import GoogleAuth from "../../components/oauth-google/GoogleAuth";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { Login, loading } = useLogin();
  const inputRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    await Login({ username, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-xl shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-1">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-orange-500">ChatApp</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              ref={inputRef}
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label ">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full input input-bordered h-10"
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-orange-600 mt-2 inline-block"
          >
            {"Don't"} have an account
          </Link>
          <div>
            <button
              disabled={loading}
              onClick={handleLogin}
              className="btn glass btn-block btn-sm mt-2"
            >
              {loading ? <span className="loading loading-spinner" /> : "Login"}
            </button>
          </div>
        </form>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Login;
