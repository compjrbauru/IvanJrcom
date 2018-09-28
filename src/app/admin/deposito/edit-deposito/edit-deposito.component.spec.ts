import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepositoComponent } from './edit-deposito.component';

describe('EditDepositoComponent', () => {
  let component: EditDepositoComponent;
  let fixture: ComponentFixture<EditDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
