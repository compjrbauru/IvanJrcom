import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselLocalComponent } from './carousel-local.component';

describe('CarouselComponent', () => {
  let component: CarouselLocalComponent;
  let fixture: ComponentFixture<CarouselLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselLocalComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
