import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentlistPage } from './studentlist.page';

describe('StudentlistPage', () => {
  let component: StudentlistPage;
  let fixture: ComponentFixture<StudentlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
