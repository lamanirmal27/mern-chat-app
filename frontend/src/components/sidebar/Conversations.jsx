import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";
import User from "../../../../backend/models/user.model";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((user, idx) => (
        <Conversation
          key={user._id}
          conversations={user}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {/* <Conversation/> */}
    </div>
  );
};

export default Conversations;
