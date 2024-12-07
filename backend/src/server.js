import express from "express"
import dotenv from "dotenv"
import chatRoutes from "./routes/chatRoute.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http"
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 8000 
const app = express()

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: err.message });
});


app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "./public/uploads")));
app.use(express.urlencoded({extended:true}))
app.use("/auth", authRoutes)
app.use("/chat", chatRoutes)
app.use("/user", userRoutes)
app.use("/message", messageRoutes)

const uploadDir = path.resolve()

 if(process.env.NODE_ENV === "production") {
  //  app.use(express.static(path.join(uploadDir, "/frontend/dist")))
   app.use(express.static(path.join(__dirname, "public")));
   app.get("*",(req,res) => {
    // res.sendFile(path.resolve(uploadDir,"frontend", "dist", "index.html"))
    res.sendFile(path.join(__dirname, "public", "index.html"));
   })
 }

const server = createServer(app)

const BaseUrl =
  process.env.NODE_ENV !== "development"
    ? "" 
    : "http://localhost:8000";

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin:BaseUrl,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("setup", (userData) => {
        if (!userData || !userData.id) {
          return;
        }
        
    socket.userData = userData; 
    socket.join(userData.id);
    socket.emit("connected"); // Add this line
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) {
      return;
    }

    chat.users.forEach((user) => {
      // If message is from sender, skip
      if (user.id === newMessageReceived.senderId) {
        return;
      }

      socket.in(user.id).emit("message received", newMessageReceived);
    });
  });
    
  socket.on("disconnect",() => {
    if(socket.userData){
        socket.leave(socket.userData.id); 
    }else{
      console.log("User disconnected without setup");
    }
  })

});

server.listen(PORT, () => {console.log(`server is running on port ${PORT}`)})