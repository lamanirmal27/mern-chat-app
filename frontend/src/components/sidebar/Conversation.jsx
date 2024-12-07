import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { useEffect, useState } from "react";

const Conversation = ({ conversations, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUser } = useSocketContext();
  const isOnline = onlineUser.includes(conversations._id);
  const { socket } = useSocketContext();
  const [typing, setTyping] = useState({});

  const isSelected = selectedConversation?._id === conversations._id;

  useEffect(() => {
    socket?.on("typingResponse", (data) => {
      setTyping(data);
    });

    socket?.on("stopTypingResponse", () => {
      setTyping({});
    });

    return () => {
      socket?.off("typingResponse");
      socket?.off("stopTypingResponse");
    };
  }, [socket]);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-sky-500" : ""} `}
        onClick={() => setSelectedConversation(conversations)}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img src={conversations.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversations.fullName}</p>
          </div>
          {conversations._id === typing.sender && (
            <div className="absolute">
              <span className="loading loading-dots loading-xl relative top-5 "></span>
            </div>
          )}
        </div>
      </div>
      {!lastIdx && <div className="divider py-0 my-0 h-1 " />}
    </>
  );
};

export default Conversation;
