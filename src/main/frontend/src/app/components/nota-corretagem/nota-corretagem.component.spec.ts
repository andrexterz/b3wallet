import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCorretagemComponent } from './nota-corretagem.component';

describe('NotaCorretagemComponent', () => {
  let component: NotaCorretagemComponent;
  let fixture: ComponentFixture<NotaCorretagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaCorretagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaCorretagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
