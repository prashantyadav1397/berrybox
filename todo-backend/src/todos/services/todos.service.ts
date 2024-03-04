import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrUpdateTodo } from '../dto/request-dto/create-or-update-todo.dto';
import { ListTodo } from '../dto/response-dto/list-todo.dto';
import { UUID } from 'crypto';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);

  private readDataFromDbJson(): string {
    return fs.readFileSync(`${process.cwd()}/src/database/db.json`, 'utf-8');
  }

  private writeDataToDbJson(data: string) {
    fs.writeFileSync(`${process.cwd()}/src/database/db.json`, data);
  }

  /**
   * Creates a new todo item
   *
   * @param body CreateOrUpdateTodo
   * @returns {ListTodo} - return created todoitem
   */
  public createTodo(body: CreateOrUpdateTodo): ListTodo {
    const data = JSON.parse(this.readDataFromDbJson());
    const { todoItem } = body;
    const id = uuidv4();
    const newTodoItem = {
      id,
      todoItem,
    };

    data.todos.push(newTodoItem);
    this.writeDataToDbJson(JSON.stringify(data));
    this.logger.verbose(
      `New todo added successfully ${JSON.stringify(newTodoItem)}`,
    );

    return this.getTodoItem(id);
  }

  /**
   * @returns {ListTodo[]} - returns a list of todos
   */
  public listTodos(): ListTodo[] {
    const data = JSON.parse(this.readDataFromDbJson());

    return data.todos;
  }

  /**
   * Updates an existing todoItem by it's item id
   *
   * @param todoItemId
   * @param body
   * @returns {ListTodo} - updated todo item
   */
  public updateTodo(todoItemId: UUID, body: CreateOrUpdateTodo): ListTodo {
    const data = JSON.parse(this.readDataFromDbJson());
    const itemIndex = data.todos.findIndex((todo) => todo.id === todoItemId);

    if (itemIndex === -1) {
      this.logger.error(`Todo Item not found with id ${todoItemId}`);
      throw new NotFoundException(`Todo Item not found with id ${todoItemId}`);
    }

    const { todoItem } = body;
    data.todos[itemIndex] = {
      id: todoItemId,
      todoItem,
    };
    this.writeDataToDbJson(JSON.stringify(data));
    this.logger.verbose(`Todo Item ${todoItemId} updated successfully`);

    return this.getTodoItem(todoItemId);
  }

  /**
   * Deletes a todoItem based on the item id
   * @param todoItemId
   */
  public deleteTodo(todoItemId: UUID) {
    const data = JSON.parse(this.readDataFromDbJson());
    const itemIndex = data.todos.findIndex((todo) => todo.id === todoItemId);

    if (itemIndex === -1) {
      this.logger.error(`Todo Item not found with id ${todoItemId}`);
      throw new NotFoundException(`Todo Item not found with id ${todoItemId}`);
    }

    data.todos.splice(itemIndex, 1);
    this.writeDataToDbJson(JSON.stringify(data));

    this.logger.verbose(`Todo Item ${todoItemId} deleted successfully`);
  }

  /**
   * return a todo item based on item id
   * @param todoItemId
   * @returns {ListTodo} - todo item
   */
  private getTodoItem(todoItemId: uuidv4): ListTodo {
    const data = JSON.parse(this.readDataFromDbJson());

    return data.todos.find((todo) => todo.id === todoItemId);
  }
}
