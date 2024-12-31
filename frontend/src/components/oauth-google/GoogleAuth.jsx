import googleIcon from "../../assets/google.svg";
const REDIRECTURL = `${
  import.meta.env.VITE_ENV === "development"
    ? "http://localhost:4545"
    : import.meta.env.VITE_BACKEND_URL
}/auth/google`;
console.log(REDIRECTURL);


const GoogleAuth = () => {
  const handleGoogleLogin = () => {
    window.open(REDIRECTURL, "_self");
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center  px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
    >
      <img src={googleIcon} alt="Google Icon" className="w-6 h-6 mr-2" />
      {/* Sign in with Google */}
    </button>
  );
};

export default GoogleAuth;
