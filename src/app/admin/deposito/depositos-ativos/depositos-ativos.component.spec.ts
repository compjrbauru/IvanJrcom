import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosAtivosComponent } from './depositos-ativos.component';

describe('DepositosAtivosComponent', () => {
  let component: DepositosAtivosComponent;
  let fixture: ComponentFixture<DepositosAtivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepositosAtivosComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
