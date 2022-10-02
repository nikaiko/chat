import jsonServer from "json-server";
import { Server } from "socket.io";
import http from "http";
import path from "path";

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const PORT = 8888;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("message", () => {
    io.emit("message");
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });

  console.log("user connected", socket.id);
});

app.use(middlewares);
app.use(router);

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
