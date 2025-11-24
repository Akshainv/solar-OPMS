import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkProgressDetailComponent } from './work-progress-detail.component';

describe('WorkProgressDetailComponent', () => {
  let component: WorkProgressDetailComponent;
  let fixture: ComponentFixture<WorkProgressDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkProgressDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkProgressDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
