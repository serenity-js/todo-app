import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TodoItem } from '@serenity-dojo/todo-app-domain';

@Component({
  selector: '[sjs-todo-item]',              // tslint:disable-line:component-selector
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  @HostBinding('class.editing') isEditing = false;

  @Input() todo: TodoItem;
  @Output() todoEditRequested = new EventEmitter<TodoItem>();
  @Output() todoDeleteRequested = new EventEmitter<TodoItem>();

  editedTodo?: TodoItem;

  constructor() { }

  toggle(todo: TodoItem): void {
    const edited = todo.clone();
    edited.completed = ! todo.completed;

    this.todoEditRequested.emit(edited);
  }

  edit(todo: TodoItem): void {
    this.isEditing = true;

    this.editedTodo = todo.clone();
  }

  update(): void {
    this.todoEditRequested.emit(this.editedTodo);
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.editedTodo = undefined;
    this.isEditing = false;
  }

  delete(todo: TodoItem): void {
    this.todoDeleteRequested.emit(todo);
  }
}
