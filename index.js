const http = require("http");
const express = require("express")
const cors = require("cors")
const socketIO = require("socket.io")
const port = 4500
const path = require("path")
const users =[{}];

const app = express();
app.use(cors());
app.get("/",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"client","build")))
  res.sendFile(path.resolve(__dirname,"client","build","index.html"))
})
const server = http.createServer(app)

const io = socketIO(server);

io.on("connection",(socket)=>{
   console.log("new connection") ;
 socket.on("joined",({user})=>{
    users[socket.id] = user;
   console.log(`${user} has joined`)
   socket.broadcast.emit('userJoind',{user:"Admin",message:`${users[socket.id]} has joind`})
   socket.emit('welcome',{user:"Admin",message:`welcome to the chat,${users[socket.id]} `})
 })
 socket.on('message', ({ message }) => {
    io.emit('send message', { user: users[socket.id], message, id: socket.id });
  });
socket.on('disConnect',()=>{
    socket.broadcast.emit('leave',{user:"Admin",message:`,${users[socket.id]}has left`})
    console.log(`user left`)
})
   
})


server.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})
