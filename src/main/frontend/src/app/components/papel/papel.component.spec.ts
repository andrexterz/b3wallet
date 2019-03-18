import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PapelComponent } from './papel.component';

describe('PapelComponent', () => {
  let component: PapelComponent;
  let fixture: ComponentFixture<PapelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PapelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
