import { useEffect, useState, useRef } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

interface Message{
  sender: string
}

const useTypingStatus = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket?.on("typingResponse", (data: Message) => {
      if (selectedConversation?._id === data?.sender) {
        setIsTyping(() => {
          return true;
        });
      }
    });

    socket?.on("stopTypingResponse", () => {
      setIsTyping(() => {
        return false;
      });
    });

    return () => {
      socket?.off("typingResponse");
      socket?.off("stopTypingResponse");
    };
  }, [socket, selectedConversation, authUser]);

  return { isTyping, setIsTyping };
};

export default useTypingStatus;
