// import {Server, Socket} from "socket.io"
// import http from "http"
// import express from "express"

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server,{
//     cors: {
//         origin: "https://chatty-app-84qw.onrender.com",
//         credentials: true,
//     }
// });
//  export function getReceiverSocketId(userId) {
// return userSocketMap [userId];
//  }

//  const userSocketMap = {};


// io.on("connection", (socket)=> {
//     console.log("A user connected !", socket.id);
//     const userId = socket.handshake.query.userId;
//     if(userId) userSocketMap[userId] = socket.id
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     socket.on("disconnect", ()=> {
//         console.log("User is disconnected!", socket.id);
//         delete userSocketMap[userId];
//         io.emit("getOnlineUsers", Object.keys(userSocketMap))
//     })
// })
// export {io, app, server} 
import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend origin
    credentials: true,
  }
});

const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// 🔐 Middleware for auth
io.use((socket, next) => {
  const token = socket.handshake.auth.token?.split(" ")[1];

  if (!token) {
    console.log("❌ No token in WebSocket auth");
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (err) {
    console.log("❌ Invalid token in WebSocket auth");
    return next(new Error("Authentication error"));
  }
});

// 🔌 Socket connection
io.on("connection", (socket) => {
  console.log("✅ WebSocket connected:", socket.id);

  const userId = socket.userId;

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("⚠️ WebSocket disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
