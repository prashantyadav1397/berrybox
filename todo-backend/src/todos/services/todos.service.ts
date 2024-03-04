import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrUpdateTodo } from '../dto/request-dto/create-or-update-todo.dto';
import { ListTodo } from '../dto/response-dto/list-todo.dto';
import { UUID } from 'crypto';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);
  private data = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/database/db.json`, 'utf-8'),
  );

  public createTodo(body: CreateOrUpdateTodo): ListTodo {
    const { todoItem } = body;
    const id = uuidv4();
    const newTodoItem = {
      id,
      todoItem,
    };

    this.data.todos.push(newTodoItem);
    fs.writeFileSync(
      `${process.cwd()}/src/database/db.json`,
      JSON.stringify(this.data),
    );
    this.logger.verbose(
      `New todo added successfully ${JSON.stringify(newTodoItem)}`,
    );

    return this.getTodoItem(id);
  }

  public listTodos(): ListTodo[] {
    return this.data.todos;
  }

  public updateTodo(todoItemId: UUID, body: CreateOrUpdateTodo): ListTodo {
    const itemIndex = this.data.todos.findIndex(
      (todo) => todo.id === todoItemId,
    );
    if (itemIndex === -1) {
      this.logger.error(`Todo Item not found with id ${todoItemId}`);
      throw new NotFoundException(`Todo Item not found with id ${todoItemId}`);
    }
    const { todoItem } = body;
    this.data.todos[itemIndex] = {
      id: todoItemId,
      todoItem,
    };
    fs.writeFileSync(
      `${process.cwd()}/src/database/db.json`,
      JSON.stringify(this.data),
    );

    this.logger.verbose(`Todo Item ${todoItemId} updated successfully`);

    return this.getTodoItem(todoItemId);
  }

  public deleteTodo(todoItemId: UUID) {
    const itemIndex = this.data.todos.findIndex(
      (todo) => todo.id === todoItemId,
    );

    if (itemIndex === -1) {
      this.logger.error(`Todo Item not found with id ${todoItemId}`);
      throw new NotFoundException(`Todo Item not found with id ${todoItemId}`);
    }

    this.data.todos.splice(itemIndex, 1);

    fs.writeFileSync(
      `${process.cwd()}/src/database/db.json`,
      JSON.stringify(this.data),
    );

    this.logger.verbose(`Todo Item ${todoItemId} deleted successfully`);
  }

  private getTodoItem(todoItemId: uuidv4): ListTodo {
    return this.data.todos.find((todo) => todo.id === todoItemId);
  }
}
