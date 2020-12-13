import { Component, EventEmitter, Output } from '@angular/core';
import { TodoItem } from '@serenity-dojo/todo-app-domain';

@Component({
  selector: 'sjs-new-todo-input',
  templateUrl: './new-todo-input.component.html',
})
export class NewTodoInputComponent {

  name = '';

  @Output() newItemRequested = new EventEmitter<TodoItem>();

  constructor() {
  }

  addNewItem(name: string): void {
    const itemName = name.trim();

    if (itemName.length > 0) {

      this.newItemRequested.emit(
        new TodoItem(undefined, name, false)
      );

      this.name = '';
    }
  }
}
