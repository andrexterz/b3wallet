import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProventoComponent } from './provento.component';

describe('ProventoComponent', () => {
  let component: ProventoComponent;
  let fixture: ComponentFixture<ProventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
