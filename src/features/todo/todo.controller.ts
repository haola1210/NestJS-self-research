import { TodoService } from './todo.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './../auth/auth.guard';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { AttachedUserRequest } from './../auth/interfaces/attached-user-request.interface';

@Controller('todo')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @Req() request: AttachedUserRequest,
  ) {
    const { user } = request;
    return await this.todoService.createTodo(createTodoDto, user.id);
  }

  @Get()
  async getTodoListOfCurrentUser(@Req() request: AttachedUserRequest) {
    const { user } = request;
    return await this.todoService.getTodoListOfUser(user.id);
  }
}
