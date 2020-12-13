import { Injectable } from '@angular/core';
import { TodoItem } from '@serenity-dojo/todo-app-domain';

import { TodoStorageService } from './todo-storage.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class TodoLocalStorageService extends TodoStorageService {

  private static STORAGE_KEY = 'serenity-js-todo-app';
  private lastInsertId = 0;
  private todos: TodoItem[] = [];

  constructor() {
    super();

    this.todos = this.loadTodos();

    if (this.todos.length > 0) {
      this.lastInsertId = this.todos[this.todos.length - 1].id;
    }
  }

  create(todo: TodoItem): Observable<TodoItem> {
    const created = todo.clone();
    created.id = ++this.lastInsertId;

    this.todos.push(created);
    this.save();

    return of(created);
  }

  findAll(): Observable<TodoItem[]> {
    return of(this.todos.slice(0));
  }

  update(updatedTodo: TodoItem): Observable<TodoItem> {
    this.todos = this.todos.map(item => item.id === updatedTodo.id
      ? updatedTodo
      : item,
    );

    this.save();

    return of(updatedTodo);
  }

  delete(todo: TodoItem): Observable<TodoItem> {
    this.todos = this.todos.filter((t) => t !== todo);

    this.save();

    return of(todo);
  }

  toggle(todo: TodoItem): Observable<TodoItem> {
    todo.completed = !todo.completed;

    this.save();

    return of(todo);
  }

  private loadTodos(): TodoItem[] {
    try {
      const serialised = localStorage.getItem(TodoLocalStorageService.STORAGE_KEY) || '[]';

      return JSON.parse(serialised).map(TodoItem.fromJSON);
    } catch (ignore) {
      return [];
    }
  }

  private save(): void {
    localStorage.setItem(TodoLocalStorageService.STORAGE_KEY, JSON.stringify(this.todos));
  }
}
