import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDepositoComponent } from './form-deposito.component';

describe('FormDepositoComponent', () => {
  let component: FormDepositoComponent;
  let fixture: ComponentFixture<FormDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDepositoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
