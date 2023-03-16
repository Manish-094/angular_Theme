import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfQueryComponent } from './self-query.component';

describe('SelfQueryComponent', () => {
  let component: SelfQueryComponent;
  let fixture: ComponentFixture<SelfQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfQueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
