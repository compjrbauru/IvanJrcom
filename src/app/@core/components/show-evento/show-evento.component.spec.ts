import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEventoComponent } from './show-evento.component';

describe('ShowEventoComponent', () => {
  let component: ShowEventoComponent;
  let fixture: ComponentFixture<ShowEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
