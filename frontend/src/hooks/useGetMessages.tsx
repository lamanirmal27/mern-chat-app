import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "../api/axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `api/messages/${selectedConversation?._id}`,
        );
        setMessages(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) {
      getMessages();
    } else {
      // Clear messages when no conversation is selected
      setMessages([]);
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
