import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdateBlogInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  @MinLength(3)
  title?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @MinLength(10)
  content?: string;
}
