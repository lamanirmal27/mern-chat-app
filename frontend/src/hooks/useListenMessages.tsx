import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notifySound from "../assets/notify.mp3";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  

  useEffect(() => {
    socket?.on("newMessage", (newMessage: Message) => {
      if (selectedConversation?._id === newMessage.senderId) {
        const notify = new Audio(notifySound);
        notify.play();
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
