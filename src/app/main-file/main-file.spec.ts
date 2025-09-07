import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFile } from './main-file';

describe('MainFile', () => {
  let component: MainFile;
  let fixture: ComponentFixture<MainFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainFile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainFile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
