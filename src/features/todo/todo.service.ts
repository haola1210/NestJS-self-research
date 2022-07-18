import { CreateTodoDto } from './dtos/create-todo.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodo(createTodoDto: CreateTodoDto, ownerId: string) {
    const { title, description } = createTodoDto;
    try {
      const todo = await this.prisma.todo.create({
        data: {
          title,
          description,
          ownerId,
        },
      });
      return todo;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getTodoListOfUser(ownerId: string) {
    return await this.prisma.todo.findMany({
      where: {
        ownerId,
      },
    });
  }
}
