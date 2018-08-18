import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsPieEventComponent } from './echarts-pie-event.component';

describe('EchartsPieEventComponent', () => {
  let component: EchartsPieEventComponent;
  let fixture: ComponentFixture<EchartsPieEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsPieEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsPieEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
