import { io } from "socket.io-client";

const SOCKET_URL = "https://conversa-socket-io.onrender.com/";

const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling", "flashsocket"],
});

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

export default socket;
