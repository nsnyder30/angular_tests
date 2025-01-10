import { TestBed } from '@angular/core/testing';

import { StyleUpdateService } from './style-update.service';

describe('StyleUpdateService', () => {
  let service: StyleUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
