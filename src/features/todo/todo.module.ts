import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { AuthModule } from './../auth/auth.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
