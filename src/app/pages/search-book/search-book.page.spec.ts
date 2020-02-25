import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookPage } from './search-book.page';

describe('SearchBookPage', () => {
  let component: SearchBookPage;
  let fixture: ComponentFixture<SearchBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
