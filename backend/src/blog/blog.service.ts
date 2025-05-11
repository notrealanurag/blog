import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';
import { User } from '../entities/user.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { BlogGateway } from './blog.gateway';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    private blogGateway: BlogGateway,
  ) {}

  async create(createBlogInput: CreateBlogInput, author: User): Promise<Blog> {
    const blog = this.blogRepository.create({
      ...createBlogInput,
      author,
    });
    const savedBlog = await this.blogRepository.save(blog);
    this.blogGateway.notifyNewBlog(savedBlog);
    return savedBlog;
  }

  async findAll(): Promise<Blog[]> {
    return this.blogRepository.find({
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }
    return blog;
  }

  async findByAuthor(authorId: string): Promise<Blog[]> {
    return this.blogRepository.find({
      where: { author: { id: authorId } },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(
    id: string,
    updateBlogInput: UpdateBlogInput,
    userId: string,
  ): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }

    if (blog.author.id !== userId) {
      throw new NotFoundException('You can only update your own blogs');
    }

    Object.assign(blog, updateBlogInput);
    return this.blogRepository.save(blog);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }

    if (blog.author.id !== userId) {
      throw new NotFoundException('You can only delete your own blogs');
    }

    await this.blogRepository.remove(blog);
    return true;
  }
}
