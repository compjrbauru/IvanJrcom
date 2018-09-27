import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasDestaqueComponent } from './categorias-destaque.component';

describe('CategoriasDestaqueComponent', () => {
  let component: CategoriasDestaqueComponent;
  let fixture: ComponentFixture<CategoriasDestaqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasDestaqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasDestaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
