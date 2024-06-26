import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParticipanteComponent } from './participante.component';

describe('ParticipanteComponent', () => {
  let component: ParticipanteComponent;
  let fixture: ComponentFixture<ParticipanteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipanteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
