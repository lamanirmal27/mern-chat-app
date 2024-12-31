import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

interface PropType {
  chat: {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

const Message: React.FC<PropType> = ({ chat }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const formMe = chat.senderId === authUser._id;
  const formattedTime = extractTime(chat.createdAt);
  const chatClassName = formMe ? "chat-end" : "chat-start";
  const profilePic = formMe
    ? authUser?.profilePicture 
    : selectedConversation?.profilePicture;
  const bubbleBgColor = formMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="chat profile bubble" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {chat.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center ">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
