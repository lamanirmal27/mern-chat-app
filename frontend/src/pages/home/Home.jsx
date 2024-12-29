import { useState, useEffect } from "react";
import SideBar from "../../components/sidebar/SideBar";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const { selectedConversation } = useConversation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // sm breakpoint
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex sm:h-[450px] md:h-[550px] lg:h-[90vh] lg:w-[90vw] rounded-l bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30">
      {(!selectedConversation || !isMobile) && <SideBar />}
      <MessageContainer />
    </div>
  );
};

export default Home;