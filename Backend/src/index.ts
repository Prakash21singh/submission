import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import cors from "cors";
import { routeConfig as Course } from "./routes/course.route";
import { routeConfig as User } from "./routes/user.route";
import cookieParser from "cookie-parser";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173", // Match this exactly with your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
User(app);
Course(app);
// Database connection
mongoose
  .connect(
    "mongodb+srv://demouser21learner:lUvGzVfJ6qnmNlZR@cluster0.2b08g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Socket.io setup
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
