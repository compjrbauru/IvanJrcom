import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngressosFisicosComponent } from './ingressos-fisicos.component';

describe('IngressosFisicosComponent', () => {
  let component: IngressosFisicosComponent;
  let fixture: ComponentFixture<IngressosFisicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngressosFisicosComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngressosFisicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
