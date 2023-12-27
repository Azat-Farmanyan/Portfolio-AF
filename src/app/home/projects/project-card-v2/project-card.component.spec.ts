import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardComponentV2 } from './project-card.component';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponentV2;
  let fixture: ComponentFixture<ProjectCardComponentV2>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCardComponentV2],
    });
    fixture = TestBed.createComponent(ProjectCardComponentV2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
