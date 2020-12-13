import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { ToggleAllButtonComponent } from './toggle-all-button.component';

describe('ToggleAllButtonComponent', () => {
  let component: ToggleAllButtonComponent;
  let fixture: ComponentFixture<ToggleAllButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ToggleAllButtonComponent],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleAllButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.be.instanceOf(ToggleAllButtonComponent);
  });
});
