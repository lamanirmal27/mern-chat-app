import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef(null);
  // console.log(messages);

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
      {}
    </div>
  );
};

export default Messages;
