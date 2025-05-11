import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { Blog } from '../entities/blog.entity';
import { BlogGateway } from './blog.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [BlogService, BlogResolver, BlogGateway],
  exports: [BlogService],
})
export class BlogModule {}
