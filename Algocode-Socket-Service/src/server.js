const express=require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const Redis=require('ioredis');
const bodyParser=require('body-parser');

const app=express();
const httpServer = createServer(app);

app.use(bodyParser.json());

const redisCache=new Redis();
const io = new Server(httpServer, { 
    cors:{
        origin:'http://localhost:5500',
        methods:['GET','POST']
    }
 });

io.on("connection", (socket) => {
    console.log('a new user is oonnected',socket.id);
    socket.on('setUserId',(userId)=>{
        redisCache.set(userId,socket.id);
    });
    socket.on('getConnectionId',async (userId)=>{
        const connId=await redisCache.get(userId);
        socket.emit('connectionId',connId);
    })

});

app.post('/sendPayload', async (req, res) => {
    console.log("inside server payload");
    const { userId, payload } = req.body;  
    // Check if userId or payload is missing
    if (!userId || !payload) {
        return res.status(400).send('Invalid request'); // Use return to stop execution
    }

    try {
        const socketId = await redisCache.get(userId);
        if (socketId) {
            console.log("Socket id", socketId);
            console.log("payload:", payload);
            io.to(socketId).emit('submissionPayloadResponse', payload);
            return res.status(200).send("payload sent successfully"); // Ensure this is reached only once
        } else {
            return res.status(404).send("User not connected"); // Return if user not connected
        }
    } catch (error) {
        console.error("Error fetching socketId:", error);
        return res.status(500).send("Internal server error"); // Handle any unexpected errors
    }
});

httpServer.listen(3001, () => {
    console.log('Server is running on Port 3001');
});