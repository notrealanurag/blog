import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from '../entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../entities/user.entity';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [Blog])
  async blogs(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Query(() => Blog)
  async blog(@Args('id') id: string): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  @Query(() => [Blog])
  @UseGuards(JwtAuthGuard)
  async myBlogs(@CurrentUser() user: User): Promise<Blog[]> {
    return this.blogService.findByAuthor(user.id);
  }

  @Mutation(() => Blog)
  @UseGuards(JwtAuthGuard)
  async createBlog(
    @Args('input') createBlogInput: CreateBlogInput,
    @CurrentUser() user: User,
  ): Promise<Blog> {
    return this.blogService.create(createBlogInput, user);
  }

  @Mutation(() => Blog)
  @UseGuards(JwtAuthGuard)
  async updateBlog(
    @Args('id') id: string,
    @Args('input') updateBlogInput: UpdateBlogInput,
    @CurrentUser() user: User,
  ): Promise<Blog> {
    return this.blogService.update(id, updateBlogInput, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteBlog(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.blogService.remove(id, user.id);
  }
}
