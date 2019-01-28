import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendoComponent } from './dividendo.component';

describe('DividendoComponent', () => {
  let component: DividendoComponent;
  let fixture: ComponentFixture<DividendoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
