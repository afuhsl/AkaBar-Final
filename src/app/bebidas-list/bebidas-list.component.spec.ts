import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidasListComponent } from './bebidas-list.component';

describe('BebidasListComponent', () => {
  let component: BebidasListComponent;
  let fixture: ComponentFixture<BebidasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BebidasListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BebidasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
