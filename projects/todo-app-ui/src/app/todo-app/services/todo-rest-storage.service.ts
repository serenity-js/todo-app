import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem, SerialisedTodoItem } from '@serenity-dojo/todo-app-domain';
import { Observable } from 'rxjs';

import { TodoStorageService } from './todo-storage.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoRestStorageService extends TodoStorageService {

  constructor(private readonly http: HttpClient) {
    super();
  }

  create(todo: TodoItem): Observable<TodoItem> {
    return this.http.post(`${ environment.apiUrl }/todos`, todo.toJSON())
      .pipe(map(TodoItem.fromJSON));
  }

  findAll(): Observable<TodoItem[]> {
    return (this.http.get(`${ environment.apiUrl }/todos`) as Observable<Array<SerialisedTodoItem>>)
      .pipe(map(items => items.map(TodoItem.fromJSON)));
  }

  update(updatedTodo: TodoItem): Observable<TodoItem> {
    const todo = updatedTodo.clone();

    todo.name = todo.name.trim();

    if (todo.name.length === 0) {
      return this.delete(updatedTodo);
    }

    return this.http.put(`${ environment.apiUrl }/todos/${ todo.id }`, todo.toJSON())
      .pipe(map(TodoItem.fromJSON));
  }

  delete(todo: TodoItem): Observable<TodoItem> {
    return this.http.delete(`${ environment.apiUrl }/todos/${ todo.id }`)
      .pipe(map(() => todo));
  }

  toggle(todo: TodoItem): Observable<TodoItem> {
    todo.completed = ! todo.completed;

    return this.http.put(`${ environment.apiUrl }/todos/${ todo.id }`, todo)
      .pipe(map(TodoItem.fromJSON));
  }
}
