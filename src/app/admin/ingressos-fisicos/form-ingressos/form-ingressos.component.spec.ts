/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormIngressosComponent } from './form-ingressos.component';

describe('FormIngressosComponent', () => {
  let component: FormIngressosComponent;
  let fixture: ComponentFixture<FormIngressosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormIngressosComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIngressosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
