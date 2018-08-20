import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEvento2Component } from './show-evento2.component';

describe('ShowEvento2Component', () => {
  let component: ShowEvento2Component;
  let fixture: ComponentFixture<ShowEvento2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEvento2Component ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEvento2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
