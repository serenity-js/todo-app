import { Injectable } from '@angular/core';
import { TodoItem } from '@serenity-dojo/todo-app-domain';
import { Observable } from 'rxjs';

@Injectable()
export abstract class TodoStorageService {

  abstract create(todo: TodoItem): Observable<TodoItem>;

  abstract findAll(): Observable<TodoItem[]>;

  abstract update(todo: TodoItem): Observable<TodoItem>;

  abstract delete(todo: TodoItem): Observable<TodoItem>;

  abstract toggle(todo: TodoItem): Observable<TodoItem>;
}
