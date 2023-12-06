// const { Server } = require("socket.io");

// async function socketServer(server) {
//   const io = new Server(server, { cors: "*" });
//   let onlineUsers = [];
//   const addUsers = async (user, socketId) => {
//     const existingUserIndex = onlineUsers.findIndex(
//       (u) => u.email === user.email
//     );

//     if (existingUserIndex !== -1) {
//       if (onlineUsers[existingUserIndex].socketId !== socketId) {
//         onlineUsers.splice(existingUserIndex, 1); // Eliminar el usuario existente
//       } else {
//         return; // No hacer nada si el socketId es el mismo
//       }
//     }

//     if (!onlineUsers.some((u) => u.email === user.email)) {
//       onlineUsers.push({ ...user, socketId }); // Agregar el nuevo usuario
//     }
//   };
//   const getUser = (email) => {
//     return onlineUsers.find((u) => u.email === email);
//   };

//   const removeUser = (id) => {
//     onlineUsers = onlineUsers.filter((u) => u.id !== id);
//   };

//   try {
//     io.on("connection", (socket) => {
//       socket.on("onlineUsers", (data) => {
//         addUsers(data, socket.id);
//         io.emit("onlineUsers", onlineUsers);
//         console.log(onlineUsers.map((el) => el.email));
//       });
//       socket.on("new_message", async (data) => {
//         const receiver = await getUser(data.receiverEmail);
//         await io.to(receiver.socketId).emit("new_message", data);
//       });
//       io.on("disconnect", () => {
//         removeUser(socket.id);
//         console.log("user disconnected");
//         console.log("onlineUsers", onlineUsers);
//       });
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// module.exports = socketServer;
