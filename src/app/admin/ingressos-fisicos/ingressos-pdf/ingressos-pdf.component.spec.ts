/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IngressosPdfComponent } from './ingressos-pdf.component';

describe('IngressosPdfComponent', () => {
  let component: IngressosPdfComponent;
  let fixture: ComponentFixture<IngressosPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngressosPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngressosPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
