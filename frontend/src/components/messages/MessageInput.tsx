import { useState, FormEvent } from "react";
import { BsSend } from "react-icons/bs";

import useSendMessage from "../../hooks/useSendMessage";

import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const MessageInput: React.FC = () => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const [message, setMessage] = useState("");
  const { socket } = useSocketContext();
  const { sendMessage, loading } = useSendMessage();

  const handleTyping = () => {
    socket.emit("typing", {
      sender: authUser?._id,
      receiver: selectedConversation?._id,
    });
  };

  const handleStopTyping = () => {
    socket.emit("stopTyping");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    handleStopTyping();
    setMessage("");
  };

  return (
    <form className="px-4 py-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          id="pathaune message"
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          onBlur={handleStopTyping}
          placeholder="type a message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
        />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? <span className="loading loading-spinner" /> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
