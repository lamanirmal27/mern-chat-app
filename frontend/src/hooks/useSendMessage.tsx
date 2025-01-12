import { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "../api/axios";
import toast from "react-hot-toast";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `api/messages/send/${selectedConversation?._id}`,
        JSON.stringify({ message })
      );

      setMessages([...messages, res.data]);
    } catch (error:any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
