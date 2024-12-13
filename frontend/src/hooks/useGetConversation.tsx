import { useEffect, useState } from "react";
import axios from "../api/axios";

const useGetConversation = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("api/users");
        setConversations(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversation;
