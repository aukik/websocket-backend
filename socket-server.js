
const userSocketMap = new Map();
const socketServer = (io,httpServer) => {
    
    io.on('connection', (socket) => {
        console.log('A user connected with id: ' + socket.id);

    

        socket.on('userId', (data) => {
            userSocketMap.set(data?.userId.toString(), socket.id);
            console.log(data);
        });

        socket.on('user event', (data) => {
          console.log(data);
      });


    
        socket.on('disconnect', () => {
            console.log(socket.id);
            console.log('User disconnected!');
            let userIdToRemove;
            for (let [userId, socketId] of userSocketMap.entries()) {
                if (socketId === socket.id) {
                    userIdToRemove = userId;
                    break;
                }
            }

            // Remove the user ID from the map if found
            if (userIdToRemove) {
                userSocketMap.delete(userIdToRemove);
                console.log(`Removed User ID ${userIdToRemove} from the map`);
            }
        });
    });


    httpServer.listen(5000, () => {
        console.log("Socket server listening on port 5000");
    });
}

module.exports = {socketServer,userSocketMap}

