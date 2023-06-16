import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FQComponent } from './fq.component';

describe('FQComponent', () => {
  let component: FQComponent;
  let fixture: ComponentFixture<FQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FQComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
