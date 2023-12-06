const io = require("socket.io");
const socket = io("http://localhost:3001");

socket.on("clientMessage", (data) => {
  socket.join(data.userId);
  console.log(`Connected to ${data.cliente}`);
  console.log(
    io.to(data.userId).emit("clientMessage", data.cliente, data.mensaje)
  );
});
