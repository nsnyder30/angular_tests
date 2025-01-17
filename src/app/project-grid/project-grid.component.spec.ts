import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams, HttpHandler } from '@angular/common/http';
import { ProjectGridComponent } from './project-grid.component';
import { DatePipe } from '@angular/common';

describe('ProjectGridComponent', () => {
  let component: ProjectGridComponent;
  let fixture: ComponentFixture<ProjectGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectGridComponent], 
      providers: [
	      HttpClient, 
	      HttpParams, 
	      HttpHandler, 
	      DatePipe
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
