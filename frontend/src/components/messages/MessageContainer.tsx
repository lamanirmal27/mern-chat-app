import { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import NoChatSelected from "./NoChatSelected";

const MessageContainer: React.FC = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2 flex relative">
            <div className="avatar h-9 w-9">
              <div className="w-24 rounded-xl">
                <img src={selectedConversation?.profilePicture} alt="Profile" />
              </div>
            </div>
            <span className="text-gray-900 font-bold my-auto ml-3">
              {selectedConversation?.fullName}
            </span>
            <button
              onClick={() => setSelectedConversation(null)}
              className="sm:hidden absolute right-3 top-[15px]"
            >
              &#8592;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4">
            <Messages />
          </div>

          {/* Message Input */}
          <div className="p-4">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};



export default MessageContainer;
