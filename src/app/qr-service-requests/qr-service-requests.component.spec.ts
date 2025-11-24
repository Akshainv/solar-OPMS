import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrServiceRequestsComponent } from './qr-service-requests.component';

describe('QrServiceRequestsComponent', () => {
  let component: QrServiceRequestsComponent;
  let fixture: ComponentFixture<QrServiceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrServiceRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrServiceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
