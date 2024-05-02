// socket-io.module.ts

import { Module } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';
import { createServer, Server } from 'http';

@Module({
  providers: [
    {
      provide: 'SOCKET_IO',
      useFactory: () => {
        const server = createServer();
        const io = new socketio.Server(server);
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
