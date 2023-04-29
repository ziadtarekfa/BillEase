import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillModalComponent } from './add-bill-modal.component';

describe('AddBillModalComponent', () => {
  let component: AddBillModalComponent;
  let fixture: ComponentFixture<AddBillModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBillModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
