import { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer: React.FC = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col h-[80vh] w-full overflow-y-auto">
      <>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            {/* Header */}
            <div className="bg-slate-500 px-4 py-2 mb-2 flex relative">
              <div className="avatar h-9 w-9 ">
                <div className="w-24 rounded-xl ">
                  <img src={selectedConversation?.profilePicture || selectedConversation?.profilePic  } />
                </div>
              </div>
              <span className="text-gray-900 font-bold my-auto ml-3">
                {selectedConversation?.fullName}
              </span>
              {/* <div className="sm:hidden text-xl">←</div> */}
              <button onClick={() => setSelectedConversation(null) } className="sm:hidden absolute right-3 top-[15px] ">&#8592;</button>
            </div>
            <Messages />
            {/* <TypingState /> */}
            <MessageInput />
          </>
        )}
      </>
    </div>
  );
};

const NoChatSelected: React.FC = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
        <img src={authUser?.profilePicture || authUser?.profilePic} />
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome ✋ {authUser.fullName} ❄️</p>
        <p>Select chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
