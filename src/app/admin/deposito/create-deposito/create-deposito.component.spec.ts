import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepositoComponent } from './create-deposito.component';

describe('CreateDepositoComponent', () => {
  let component: CreateDepositoComponent;
  let fixture: ComponentFixture<CreateDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDepositoComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
