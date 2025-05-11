import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Blog } from '../entities/blog.entity';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
})
export class BlogGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  private sanitizeBlog(blog: Blog) {
    const { author, ...safeBlog } = blog;
    return {
      ...safeBlog,
      author: author
        ? {
            id: author.id,
            username: author.username,
            createdAt: author.createdAt,
            updatedAt: author.updatedAt,
          }
        : null,
    };
  }

  notifyNewBlog(blog: Blog) {
    console.log('Emitting new blog...');
    const safeBlog = this.sanitizeBlog(blog);
    this.server.emit('newBlog', safeBlog);
  }
}
