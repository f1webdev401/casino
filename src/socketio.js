import { io } from "socket.io-client";

const socket = io("https://smmserver.onrender.com",{'multiplex':false,transports: ['websocket'],autoConnect:false})


export default socket