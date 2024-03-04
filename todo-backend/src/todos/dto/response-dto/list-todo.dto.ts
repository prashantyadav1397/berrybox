import { IsDefined, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class ListTodo {
  @IsUUID()
  @IsDefined()
  id: UUID

  @IsString()
  @IsNotEmpty()
  todoItem: string
}