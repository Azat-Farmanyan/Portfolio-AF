import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorInstructionComponent } from './error-instruction.component';

describe('ErrorInstructionComponent', () => {
  let component: ErrorInstructionComponent;
  let fixture: ComponentFixture<ErrorInstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorInstructionComponent]
    });
    fixture = TestBed.createComponent(ErrorInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
