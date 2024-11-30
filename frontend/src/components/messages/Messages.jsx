import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import TypingState from "./TypingState";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const { selectedConversation } = useConversation();
  const isTyping = true;
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 250);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((chat) => (
          <div key={chat._id} ref={lastMessageRef}>
            <Message chat={chat} />
          </div>
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start conversation
        </p>
      )}
      {isTyping && <TypingState chat={selectedConversation} />}
    </div>
  );
};

export default Messages;
