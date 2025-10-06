import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListSection } from './task-list-section';

describe('TaskListSection', () => {
  let component: TaskListSection;
  let fixture: ComponentFixture<TaskListSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
