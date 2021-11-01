import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetablepageComponent } from './timetablepage.component';

describe('TimetablepageComponent', () => {
  let component: TimetablepageComponent;
  let fixture: ComponentFixture<TimetablepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetablepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetablepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
