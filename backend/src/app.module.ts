import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { User } from './entities/user.entity';
import { Blog } from './entities/blog.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      context: ({ req }: { req: any }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'blog_db',
      entities: [User, Blog],
      synchronize: false, // false for prod env
      migrations: ['dist/database/migrations/*.js'],
      migrationsRun: true, // Automatically run migrations on startup
    }),
    AuthModule,
    BlogModule,
  ],
})
export class AppModule {}
