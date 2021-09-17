import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollViewRootComponent } from './poll-view-root.component';

describe('PollViewRootComponent', () => {
  let component: PollViewRootComponent;
  let fixture: ComponentFixture<PollViewRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollViewRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollViewRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
