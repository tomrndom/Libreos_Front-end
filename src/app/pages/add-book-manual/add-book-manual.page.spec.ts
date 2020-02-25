import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookManualPage } from './add-book-manual.page';

describe('AddBookManualPage', () => {
  let component: AddBookManualPage;
  let fixture: ComponentFixture<AddBookManualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookManualPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookManualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
