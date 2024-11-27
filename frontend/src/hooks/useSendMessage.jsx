import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "../api/axios";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `api/messages/send/${selectedConversation._id}`,
        JSON.stringify({ message })
      );
      // console.log(res.data);
      setMessages([...messages, res.data]);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
