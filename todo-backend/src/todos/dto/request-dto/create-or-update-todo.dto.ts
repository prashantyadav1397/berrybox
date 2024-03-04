import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateTodo {
  @IsString()
  @IsNotEmpty()
  todoItem: string;
}
