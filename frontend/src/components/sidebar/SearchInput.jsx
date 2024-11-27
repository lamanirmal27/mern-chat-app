import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";

const SearchInput = () => {
  const { conversations } = useGetConversation();
  const { setSelectedConversation } = useConversation();
  const [tempUser, setTempUser] = useState("");

  const findUser = async (event) => {
    event.preventDefault();
    if (!tempUser) return;
    if (tempUser.length < 3) return;
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(tempUser.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setTempUser("");
    } else toast.error("No such user found!");
  };

  return (
    <form className="flex items-center gap-2" onSubmit={findUser}>
      <input
        type="text"
        placeholder="Search user.."
        value={tempUser}
        onChange={(e) => setTempUser(e.target.value)}
        className="input input-bordered rounded-full"
      ></input>
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <FaSearch className="w-6 h-5/6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
