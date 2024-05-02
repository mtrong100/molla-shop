import { createContext, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers, setSocket } from "../redux/slices/socketSlice";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { socket, onlineUsers } = useSelector((state) => state.socket);

  console.log("🚀 ~ SocketContextProvider ~ onlineUsers:", onlineUsers);

  useEffect(() => {
    if (currentUser) {
      const socket = io("http://localhost:5000");

      dispatch(setSocket(socket.id));

      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
