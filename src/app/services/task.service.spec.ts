import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClient, HttpParams, HttpHandler } from '@angular/common/http';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
	    providers: [
		    HttpClient, 
		    HttpParams, 
		    HttpHandler
	    ]
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
