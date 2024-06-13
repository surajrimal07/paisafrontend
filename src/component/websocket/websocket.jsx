import React, { createContext, useContext, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { midUrl } from "../../apis/api.js";
import { GlobalContext } from "../../globalcontext.js";

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

//only connect if the user is logged in

export const WebSocketProvider = ({ children }) => {
  const { setIsSocketConnected } = useContext(GlobalContext);
  const jwtToken = secureLocalStorage.getItem("authtoken");
  const isLoggedIn = jwtToken ? true : false;

  const [ws, setWs] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  const [ws2, setWs2] = useState(null); // WebSocket instance for room 2
  const [profileNotification, setProfileNotification] = useState(null); // Last message for room 2

  useEffect(() => {
    if (isLoggedIn) {
      let newsUrl = `wss://${midUrl}:8081/?room=news&jwt=${jwtToken}`;
      let profileUrl = `wss://${midUrl}:8081/?room=profile&jwt=${jwtToken}`;

      if (process.env.NODE_ENV === "production") {
        newsUrl = `wss://socket.zorsha.com.np/?room=news&jwt=${jwtToken}`;
        profileUrl = `wss://socket.zorsha.com.np/?room=profile&jwt=${jwtToken}`;
      }

      //const url = `wss://socket.zorsha.com.np/?room=news&wt=${encodeURIComponent(jwtToken)}`;

      const websocket = new WebSocket(newsUrl);
      const websocket2 = new WebSocket(profileUrl);

      websocket.onopen = () => {
        setIsSocketConnected(true);
      };

      websocket2.onopen = () => {
        //toast.success("Profile Server connected");
      };

      websocket.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        setLastMessage(receivedData);
      };

      websocket2.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        setProfileNotification(receivedData);
        //toast.info(receivedData.message);
      };

      websocket.onclose = () => {
        //toast.error("News Server disconnected");
        setIsSocketConnected(false);
      };

      websocket2.onclose = () => {
        //toast.error("Profile Server disconnected");
      };

      setWs2(websocket2);

      setWs(websocket);

      return () => {
        websocket.close();
        websocket2.close();
        setIsSocketConnected(false);
        //toast.error("WebSocket closed");
      };
    }
  }, [jwtToken, setIsSocketConnected, isLoggedIn]);

  return (
    <WebSocketContext.Provider
      value={{ ws, lastMessage, ws2, profileNotification }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
