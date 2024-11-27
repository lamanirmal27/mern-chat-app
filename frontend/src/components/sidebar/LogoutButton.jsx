import React from "react";
import { CiLogout } from "react-icons/ci";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const logout = useLogout();
  return (
    <div className="mt-auto" onClick={() => logout()}>
      <CiLogout className="w-6 h-6 text-white cursor-pointer" />
    </div>
  );
};

export default LogoutButton;
