import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const socketUrl =
  import.meta.env.VITE_ENV !== "development"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:4545";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);

  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io(socketUrl, {
        query: { userId: authUser._id },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
