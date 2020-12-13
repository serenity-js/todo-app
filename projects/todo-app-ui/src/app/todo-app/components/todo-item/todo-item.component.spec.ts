import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { TodoItemComponent } from './todo-item.component';
import { TodoItem } from '@serenity-dojo/todo-app-domain';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [TodoItemComponent],
      })
      .compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.todo = new TodoItem(1, 'Learn Serenity/JS', true);

    fixture.detectChanges();

    expect(component).to.be.instanceOf(TodoItemComponent);
  });
});
