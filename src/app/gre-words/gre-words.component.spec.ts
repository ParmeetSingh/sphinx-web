import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreWordsComponent } from './gre-words.component';

describe('GreWordsComponent', () => {
  let component: GreWordsComponent;
  let fixture: ComponentFixture<GreWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
