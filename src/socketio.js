import { io } from "socket.io-client";

// const socket = io("https://smmserver.onrender.com",{'multiplex':false,transports: ['websocket'],autoConnect:false})

const socket = io("http://localhost:5050",{'multiplex':false,transports: ['websocket'],})



export default socket