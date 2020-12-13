import { ensure, isBoolean, isInteger, isString, JSONObject, or, TinyType } from 'tiny-types';
import { isUndefined } from './predicates/isUndefined';

export class TodoItem extends TinyType {
  static fromJSON(o: SerialisedTodoItem): TodoItem {
    return new TodoItem(o.id, o.name, o.completed);
  }

  constructor(
    public id: number | undefined,
    public name: string,
    public completed: boolean = false,
  ) {
    super();

    ensure('Todo ID', id, or(isUndefined(), isInteger()));
    ensure('Todo name', name, isString());
    ensure('Todo completion status', completed, isBoolean());
  }

  clone(): TodoItem {
    return new TodoItem(this.id, this.name, this.completed);
  }

  toJSON(): SerialisedTodoItem {
    return super.toJSON() as SerialisedTodoItem;
  }
}

export interface SerialisedTodoItem extends JSONObject {
  id?: number;
  name: string;
  completed: boolean;
}
