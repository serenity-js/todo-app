import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { NewTodoInputComponent } from './new-todo-input.component';
import { FormsModule } from '@angular/forms';

describe('NewTodoItemComponent', () => {
  let component: NewTodoInputComponent;
  let fixture: ComponentFixture<NewTodoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ FormsModule ],
        declarations: [NewTodoInputComponent],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it.only('should create', () => {
    expect(component).to.be.instanceOf(NewTodoInputComponent);
  });
});
