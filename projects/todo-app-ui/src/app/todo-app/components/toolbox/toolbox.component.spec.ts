import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { ToolboxComponent } from './toolbox.component';
import { Filter } from '../../models/filters';
import { RouterTestingModule } from '@angular/router/testing';

describe('ToolboxComponent', () => {
  let component: ToolboxComponent;
  let fixture: ComponentFixture<ToolboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [ToolboxComponent],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxComponent);
    component = fixture.componentInstance;
    component.remaining = [];
    component.completed = [];
    component.filter = Filter.default();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.be.instanceOf(ToolboxComponent);
  });
});
