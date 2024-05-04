import { Module } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';
import { createServer, Server } from 'http';
import * as cors from 'cors';

@Module({
  providers: [
    {
      provide: 'SOCKET_IO',
      useFactory: () => {
        const server = createServer();

        // Enable CORS for Socket.IO server
        const io = new socketio.Server(server, {
          cors: {
            origin: '*', // Allow requests from any origin
            methods: ['GET', 'POST'], // Allow the following HTTP methods
            allowedHeaders: ['Content-Type', 'Authorization'], // Allow the following headers
          },
        });

        io.on('connection', (socket) => {
          console.log('Socket.IO client connected:', socket.id);
        });

        server.listen(3001); // Adjust port as needed

        return io;
      },
    },
  ],
  exports: ['SOCKET_IO'],
})
export class SocketIOModule {}
