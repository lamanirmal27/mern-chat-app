import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import AuthCheck from "./components/oauth-google/AuthCheck";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center p-4">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUp />}
        />
        <Route
          path="/auth-success"
          element={<AuthCheck />}
        />
      </Routes>
    </div>
  );
}

export default App;