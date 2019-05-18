import { TestBed } from '@angular/core/testing';

import { IncidentDataService } from './incident-data.service';

describe('IncidentDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncidentDataService = TestBed.get(IncidentDataService);
    expect(service).toBeTruthy();
  });
});
