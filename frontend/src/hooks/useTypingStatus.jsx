import { useEffect } from "react";

const useTypingStatus = (message) => {
  useEffect(() => {
    if (message.length > 0) {
      console.log("user is typing");

      const typingTimeout = setTimeout(() => {
        console.log("user stopped typing");
      }, 1000);

      return () => clearTimeout(typingTimeout);
    }
  }, [message]);
};

export default useTypingStatus;
