import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { LayoutService } from '../services/layout.service';
import { HeaderService } from '../services/header.service';
import { StyleUpdateService } from '../services/style-update.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent], 
      providers: [
	      LayoutService, 
	      HeaderService, 
	      StyleUpdateService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle the view and update the calendar title', ()  => {
	  spyOn(component, 'updateTitle').and.callThrough();
	  expect(component.view).toBe('Monthly');

	  component.toggleView('Weekly');
	  expect(component.view).toBe('Weekly');
	  expect(component.updateTitle).toHaveBeenCalled();

	  component.toggleView('Yearly');
	  expect(component.view).toBe('Yearly');

	  component.toggleView('Daily');
	  expect(component.view).toBe('Daily');

	  expect(component.updateTitle).toHaveBeenCalledTimes(3);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
