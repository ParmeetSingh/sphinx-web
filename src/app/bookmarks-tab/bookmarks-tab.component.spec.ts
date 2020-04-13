import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksTabComponent } from './bookmarks-tab.component';

describe('BookmarksTabComponent', () => {
  let component: BookmarksTabComponent;
  let fixture: ComponentFixture<BookmarksTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarksTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
