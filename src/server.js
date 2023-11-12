const express=required('express')
const app=express();
const http=require('http');
const{server}=require('socket.io');
const ACTIONS = require('./Actions');
const server=http.createServer(app);


const io=new server(server);

const userSocketMap={};

function getAllConnectedClients(roomId){
    //map
    return Array.from(io.sockets.adapter.rooms.get(roomId)||[]).map(
        (socketId)=>{
            return{
                socketId,
                usernamr:userSocketMap[socketId],
            };
        }
    );
}

io.on('connection',(socket)=>{
    console.log('socket connected',socket.id);
    socket.on(ACTIONS.JOIN,({roomId,usernamr})=>{
     userSocketMap[socket.id]=usernamr;
     socket.join(roomId);
     const clients=getAllConnectedClients(roomId);
   //console.log(clients);
      clients.forEach(({socketId})=>{
        io.to(socketId).emit(ACTIONS.JOINED,{
            clients,
            usernamr,
            socketId:socket.id,

        });
      });
    });
  socket.on('disconnecting',()=>{
    const room=[...socket.rooms];
    rooms.forEach((roomId)=>{
        socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
            socketId:socket.id,
            usernamr:userSocketMap[socket.id],

        });
    });


    delete userSocketMap[socket.id];
    socket.leave();
  })



});



const PORT=process.env.PORT||5000;
server.listen(PORT,()=>console.log('Listening on port ${PORT}'));
