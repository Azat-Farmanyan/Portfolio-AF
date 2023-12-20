import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponentV2 } from './header.component';

describe('HeaderComponentV2', () => {
  let component: HeaderComponentV2;
  let fixture: ComponentFixture<HeaderComponentV2>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponentV2],
    });
    fixture = TestBed.createComponent(HeaderComponentV2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
