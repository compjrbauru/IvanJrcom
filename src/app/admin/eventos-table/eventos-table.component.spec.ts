import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosTableComponent } from './eventos-table.component';

describe('EventosTableComponent', () => {
  let component: EventosTableComponent;
  let fixture: ComponentFixture<EventosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosTableComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
