import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoConfirmationComponent } from './deposito-confirmation.component';

describe('DepositoConfirmationComponent', () => {
  let component: DepositoConfirmationComponent;
  let fixture: ComponentFixture<DepositoConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositoConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositoConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
