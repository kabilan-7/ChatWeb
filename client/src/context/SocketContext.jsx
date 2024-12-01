import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return socket;
};

export const SocketProvider = ({ children }) => {
    const socket = useRef(null);
    const { userInfo } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            // Initialize socket connection
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id },
            });

            socket.current.on("connect", () => {
                console.log("Connected to socket server");
            });

            // Handle incoming messages
            const handleRecieveMessage = (message) => {
                const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState();
                if (
                    selectedChatType !== undefined &&
                    (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)
                ) {
                    console.log("Message received:", message);
                    if (addMessage) {
                        addMessage(message);
                    } else {
                        console.warn("addMessage is not defined or is not a function.");
                    }
                }
            };

            // Ensure no duplicate listeners
            socket.current.off("recieveMessage", handleRecieveMessage);
            socket.current.on("recieveMessage", handleRecieveMessage);

            // Cleanup on unmount
            return () => {
                if (socket.current) {
                    socket.current.disconnect();
                }
            };
        }
    }, [userInfo]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};
