import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sjs-toggle-all-button',
  templateUrl: './toggle-all-button.component.html',
})
export class ToggleAllButtonComponent {

  @Input() allCompleted = false;
  @Output() toggleAllRequested = new EventEmitter<boolean>();

  constructor() { }

  requestToggleAll(completed: boolean): void {
    this.toggleAllRequested.emit(completed);
  }
}
