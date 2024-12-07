import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import TypingState from "./TypingState";
import useTypingStatus from "../../hooks/useTypingStatus";

const Messages: React.FC = () => {
  const { isTyping } = useTypingStatus();
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const typingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    typingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isTyping]);

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
      {isTyping && (
        <div ref={typingRef}>
          <TypingState />
        </div>
      )}
    </div>
  );
};

export default Messages;
