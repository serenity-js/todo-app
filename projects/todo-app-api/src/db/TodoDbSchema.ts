import { SerialisedTodoItem } from '@serenity-dojo/todo-app-domain';

export interface TodoDbSchema {
  todos: SerialisedTodoItem[];
}
