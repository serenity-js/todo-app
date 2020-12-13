import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from '@serenity-dojo/todo-app-domain';
import { Filter } from '../../models/filters';

@Component({
  selector: 'sjs-toolbox',
  templateUrl: './toolbox.component.html',
})
export class ToolboxComponent implements OnInit {

  @Input() remaining: TodoItem[];
  @Input() completed: TodoItem[];
  @Input() filter: Filter;

  @Output() deleteAllTodosRequested = new EventEmitter<TodoItem[]>();

  constructor() { }

  removeAll(todos: TodoItem[]): void {
    this.deleteAllTodosRequested.emit(todos);
  }

  ngOnInit(): void {
  }
}
