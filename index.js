const dotenv = require("dotenv");
dotenv.config();
const app = require("./app.js");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_PASSWORD);

const server = app.listen(4000, () => {
  console.log("Socket server is running");
});

io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connection is ready", socket.id);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const start = async () => {
  try {
    app.listen(process.env.PORT || 3001, () =>
      console.log("Server is Running on port 3001")
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
