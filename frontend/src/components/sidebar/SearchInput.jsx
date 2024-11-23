import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search user.."
        className="input input-bordered rounded-full"
      ></input>
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
      <FaSearch className="w-6 h-5/6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
