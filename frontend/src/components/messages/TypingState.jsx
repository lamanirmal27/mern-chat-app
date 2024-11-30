import React from "react";

const TypingState = ({ chat }) => {
  return (
    <div>
      <div className={`chat chat-start `}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={chat.profilePic} alt="chat profile bubble" />
          </div>
        </div>
        <div className={`chat-bubble text-white `}>
          <span className="loading loading-dots loading-xl "></span>
        </div>
      </div>
    </div>
  );
};

export default TypingState;
