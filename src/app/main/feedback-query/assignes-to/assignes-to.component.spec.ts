import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignesToComponent } from './assignes-to.component';

describe('AssignesToComponent', () => {
  let component: AssignesToComponent;
  let fixture: ComponentFixture<AssignesToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignesToComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignesToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
