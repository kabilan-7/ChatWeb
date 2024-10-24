import { Server as SocketIOServer } from "socket.io"

const setupSocket = (server) =>{
    const io = new SocketIOServer(server,{
        cors:{ 
        origin:process.env.ORIGIN,
        methods:['GET','POST'],
        credentials:true,
        }
    })
    const disconnect = (socket) =>{  //disconnect method
        console.log(`Client discoonnected:${socket.id}`)
        for(const [userId,socketId] of userSocketMap.entries()){
            if(socketId == socket.id){
            userSocketMap.delete(userId)
            break
            }
        }
    }
    const userSocketMap = new Map()
    io.on("connection",(socket)=>{ //make connection
        const userId = socket.handshake.query.userId
        if(userId){
            userSocketMap.set(userId,socket.id)
            console.log(`User connected:${userId} with socket ID:${socket.id}`)
        }else{
            console.log("User id not provided during connection")
        }
        socket.on("disconnect",()=> disconnect(socket))
    })
}

export default setupSocket