import React from "react";

const TypingState = () => {
  return (
    <div>
      <div className={`chat chat-start `}>
        <div className="chat-image avatar"></div>
        <div className={`chat-bubble text-white `}>
          <span className="loading loading-dots loading-xl "></span>
        </div>
      </div>
    </div>
  );
};

export default TypingState;
