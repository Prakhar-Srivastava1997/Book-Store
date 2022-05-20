import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbooklistComponent } from './viewbooklist.component';

describe('ViewbooklistComponent', () => {
  let component: ViewbooklistComponent;
  let fixture: ComponentFixture<ViewbooklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbooklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
