/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IngressosGeradosComponent } from './ingressos-gerados.component';

describe('IngressosGeradosComponent', () => {
  let component: IngressosGeradosComponent;
  let fixture: ComponentFixture<IngressosGeradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngressosGeradosComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngressosGeradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
