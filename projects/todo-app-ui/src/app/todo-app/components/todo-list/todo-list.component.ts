import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoItem } from '@serenity-dojo/todo-app-domain';
import { Subscription } from 'rxjs';
import { Filter } from '../../models/filters';
import { TodoStorageService } from '../../services/todo-storage.service';

@Component({
  selector: 'sjs-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {

  private routeSubscription: Subscription;

  filter = Filter.default();
  todos: TodoItem[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly storageService: TodoStorageService,
  ) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.filter = Filter.fromString(params.filter);
    });

    this.storageService.findAll()
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  addNewItem(todo: TodoItem): void {
    const newTodo = todo.clone();
    newTodo.name = todo.name.trim();

    if (newTodo.name.length === 0) {
      return;
    }

    this.storageService.create(todo).subscribe(created => {
      this.todos = this.todos.concat(created);
    });
  }

  update(todo: TodoItem): void {
    todo.name = todo.name.trim();

    if (todo.name === '') {
      this.delete(todo);
    } else {
      this.storageService.update(todo).subscribe(updatedTodo => {
        this.todos = this.todos.map(item => item.id === updatedTodo.id ? updatedTodo : item);
      });
    }
  }

  delete(unwantedTodo: TodoItem): void {
    this.storageService.delete(unwantedTodo).subscribe(() => {
      this.todos = this.todos.filter((t) => !t.equals(unwantedTodo));
    });
  }

  deleteAll(unwantedTodos: TodoItem[]): void {
    unwantedTodos.map(unwantedTodo => this.delete(unwantedTodo));
  }

  setAllToCompleted(completed: boolean): void {
    this.todos.map(todo => {
      if (todo.completed !== completed) {
        const updated = todo.clone();
        updated.completed = completed;

        this.update(updated);
      }
    });
  }

  get filteredTodos(): TodoItem[] {
    return this.todos.filter(todo => this.filter.allows(todo));
  }

  get remaining(): TodoItem[] {
    return this.todos
      .filter(t => !t.completed);
  }

  get completed(): TodoItem[] {
    return this.todos
      .filter(t => t.completed);
  }
}
