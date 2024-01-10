module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    var {userSocketMap} = require('../socket-server.js');
  
    router.get('/socketApi', function(req, res, next) {
        // Emitting a Socket.IO event

        io.to(userSocketMap.get(req?.query?.userId)).emit('user event', { message: 'Your Id is '+ userSocketMap.get(req?.query?.userId) });
  
        res.status(200).json({ message: "Hello World" });
    });
  
    return router;
  };