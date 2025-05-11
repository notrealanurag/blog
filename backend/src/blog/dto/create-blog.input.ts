import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateBlogInput {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @Field()
  @IsNotEmpty()
  @MinLength(10)
  content: string;
}
