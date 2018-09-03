import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCategoriaComponent } from './show-categoria.component';

describe('ShowCategoriaComponent', () => {
  let component: ShowCategoriaComponent;
  let fixture: ComponentFixture<ShowCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCategoriaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
