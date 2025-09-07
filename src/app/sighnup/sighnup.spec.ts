import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sighnup } from './sighnup';

describe('Sighnup', () => {
  let component: Sighnup;
  let fixture: ComponentFixture<Sighnup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sighnup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sighnup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
