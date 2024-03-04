import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from '../services/todos.service';
import { CreateOrUpdateTodo } from '../dto/request-dto/create-or-update-todo.dto';
import { ListTodo } from '../dto/response-dto/list-todo.dto';
import { UUID } from 'crypto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  createTodo(@Body() body: CreateOrUpdateTodo): ListTodo {
    return this.todosService.createTodo(body);
  }

  @Get()
  listTodos(): ListTodo[] {
    return this.todosService.listTodos();
  }

  @Put('items/:id')
  listTodo(
    @Param('id', ParseUUIDPipe) todoItemId: UUID,
    @Body() body: CreateOrUpdateTodo,
  ): ListTodo {
    return this.todosService.updateTodo(todoItemId, body);
  }

  @HttpCode(204)
  @Delete('items/:id')
  deleteTodo(@Param('id', ParseUUIDPipe) todoItemId: UUID) {
    return this.todosService.deleteTodo(todoItemId);
  }
}
