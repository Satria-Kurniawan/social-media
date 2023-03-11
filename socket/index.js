const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
})

let users = []

const addUser = (socketId, userId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ socketId, userId })
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId)
}

io.on("connection", (socket) => {
  console.log("a user connected.")

  socket.on("user-connected", (userId) => {
    addUser(socket.id, userId)
    io.emit("get-online-users", users)
  })

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId)
    io.to(user.socketId).emit("getMessage", { senderId, text })
    console.log("pesan terkirim " + text)
  })

  socket.on("disconnect", () => {
    console.log("a user disconnected.")
    removeUser(socket.id)
    io.emit("get-online-users", users)
  })
})
